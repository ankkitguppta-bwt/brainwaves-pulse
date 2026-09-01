import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createMiddleware } from "@tanstack/react-start";

// Admin guard middleware: requires user to be signed in AND have the 'admin' role.
export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const { data, error } = await (context as any).supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", (context as any).userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error || !data) throw new Response("Forbidden", { status: 403 });
    return next();
  });

// ================= PEOPLE =================
const personSchema = z.object({
  id: z.string().uuid().optional(),
  category: z.enum(["leadership", "team", "advisor"]),
  name: z.string().min(1).max(200),
  role: z.string().max(400).nullable().optional(),
  description: z.string().max(4000).nullable().optional(),
  image_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  sort_order: z.number().int().default(0),
});

export const upsertPerson = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: z.infer<typeof personSchema>) => personSchema.parse(d))
  .handler(async ({ data, context }) => {
    const payload = { ...data, image_url: data.image_url || null };
    const { data: row, error } = data.id
      ? await (context as any).supabase.from("people").update(payload).eq("id", data.id).select().single()
      : await (context as any).supabase.from("people").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deletePerson = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase.from("people").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ================= TESTIMONIALS =================
const testimonialSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.enum(["text", "video"]),
  author: z.string().min(1).max(200),
  title: z.string().max(300).nullable().optional(),
  quote: z.string().max(5000).nullable().optional(),
  video_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  thumbnail_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

export const upsertTestimonial = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: z.infer<typeof testimonialSchema>) => testimonialSchema.parse(d))
  .handler(async ({ data, context }) => {
    const payload = {
      ...data,
      video_url: data.video_url || null,
      thumbnail_url: data.thumbnail_url || null,
    };
    const { data: row, error } = data.id
      ? await (context as any).supabase.from("testimonials").update(payload).eq("id", data.id).select().single()
      : await (context as any).supabase.from("testimonials").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteTestimonial = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase.from("testimonials").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ================= BLOG POSTS =================
const postSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, hyphens only"),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(500).nullable().optional(),
  cover_image_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  content_html: z.string().max(200000).default(""),
  content_json: z.any().nullable().optional(),
  meta_title: z.string().max(300).nullable().optional(),
  meta_description: z.string().max(500).nullable().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

type NewsletterPost = { slug: string; title: string; excerpt: string | null };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] ?? character);
}

async function notifySubscribers(supabase: any, post: NewsletterPost) {
  const { data: subscribers, error } = await supabase
    .from("subscribers")
    .select("email, unsubscribe_token")
    .eq("status", "active");
  if (error) throw new Error(`Could not load subscribers: ${error.message}`);
  if (!subscribers?.length) return { status: "not_sent", message: "No active newsletter subscribers." };

  const dryRun = process.env.NEWSLETTER_DRY_RUN === "true";
  const testRecipient = process.env.NEWSLETTER_DRY_RUN_TO;
  if (dryRun && !testRecipient) {
    return { status: "not_sent", message: "Dry-run is enabled but NEWSLETTER_DRY_RUN_TO is not set." };
  }
  if (!dryRun && subscribers.length > 100) {
    return {
      status: "not_sent",
      message: `Notification was not sent: ${subscribers.length} active subscribers exceeds Resend's 100-email daily free-tier limit.`,
    };
  }
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return { status: "not_sent", message: "RESEND_API_KEY is not configured." };

  const siteUrl = (process.env.SITE_URL || "https://brainwavestech.co.in").replace(/\/$/, "");
  const readUrl = `${siteUrl}/blog/${encodeURIComponent(post.slug)}`;
  const title = escapeHtml(post.title);
  const excerpt = escapeHtml(post.excerpt || "A new neuroscience insight is now available on the BrainWaves Tech blog.");
  const recipients = dryRun ? [{ email: testRecipient!, unsubscribe_token: subscribers[0].unsubscribe_token }] : subscribers;
  let sent = 0;
  for (const subscriber of recipients) {
    const unsubscribeUrl = `${siteUrl}/api/public/unsubscribe?token=${subscriber.unsubscribe_token}`;
    const html = `<main style="max-width:600px;margin:0 auto;padding:32px;font-family:Arial,sans-serif;color:#102a43"><p style="color:#0f766e;font-weight:700">BRAINWAVES TECH</p><h1 style="font-size:26px">${title}</h1><p style="line-height:1.6">${excerpt}</p><p style="margin:28px 0"><a href="${readUrl}" style="background:#14b8a6;color:#06203a;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700">Read more</a></p><p style="font-size:12px;color:#64748b">You are receiving this because you subscribed to BrainWaves Tech updates. <a href="${unsubscribeUrl}">Unsubscribe</a>.</p></main>`;
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "BrainWaves Tech <news@mail.brainwavestech.co.in>",
        to: [subscriber.email],
        subject: `New from BrainWaves Tech: ${post.title}`,
        html,
      }),
    });
    if (!result.ok) throw new Error(`Resend rejected the notification (${result.status}).`);
    sent += 1;
  }
  return { status: dryRun ? "dry_run" : "sent", message: dryRun ? `Dry run sent to ${testRecipient}.` : `Sent to ${sent} subscriber${sent === 1 ? "" : "s"}.` };
}

export const listAllPosts = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { data, error } = await (context as any).supabase
      .from("blog_posts").select("id, slug, title, excerpt, status, published_at, updated_at")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

export const getPost = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await (context as any).supabase
      .from("blog_posts").select("*").eq("id", data.id).single();
    if (error) throw new Error(error.message);
    return row;
  });

export const upsertPost = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: z.infer<typeof postSchema>) => postSchema.parse(d))
  .handler(async ({ data, context }) => {
    const supabase = (context as any).supabase;
    const { data: priorPost, error: priorPostError } = data.id
      ? await supabase.from("blog_posts").select("status").eq("id", data.id).maybeSingle()
      : { data: null, error: null };
    if (priorPostError) throw new Error(priorPostError.message);
    // Ensure slug uniqueness — append -2, -3, … on collision
    let slug = data.slug;
    let n = 2;
    while (true) {
      const { data: existing } = await supabase
        .from("blog_posts").select("id").eq("slug", slug).maybeSingle();
      if (!existing || (data.id && existing.id === data.id)) break;
      slug = `${data.slug}-${n++}`;
      if (n > 200) break;
    }
    const payload: any = {
      ...data,
      slug,
      cover_image_url: data.cover_image_url || null,
      author_id: (context as any).userId,
    };
    // A newly-created published post is its first publication; later sends require a saved draft.
    const isFirstPublication = data.status === "published" && (!priorPost || priorPost.status === "draft");
    if (isFirstPublication) payload.published_at = new Date().toISOString();
    const { data: row, error } = data.id
      ? await supabase.from("blog_posts").update(payload).eq("id", data.id).select().single()
      : await supabase.from("blog_posts").insert(payload).select().single();
    if (error) throw new Error(error.message);
    if (!isFirstPublication) return row;
    try {
      return { ...row, notification: await notifySubscribers(supabase, row) };
    } catch (notificationError) {
      console.error("blog notification failed", notificationError);
      return { ...row, notification: { status: "not_sent", message: "The post was published, but sending notifications failed. Check server logs before retrying." } };
    }
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ================= CASE STUDIES =================
const caseStudySchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(300),
  summary: z.string().max(1000).nullable().optional(),
  body_html: z.string().max(200000).default(""),
  image_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const upsertCaseStudy = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: z.infer<typeof caseStudySchema>) => caseStudySchema.parse(d))
  .handler(async ({ data, context }) => {
    const payload = { ...data, image_url: data.image_url || null };
    const { data: row, error } = data.id
      ? await (context as any).supabase.from("case_studies").update(payload).eq("id", data.id).select().single()
      : await (context as any).supabase.from("case_studies").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteCaseStudy = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase.from("case_studies").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ================= MEDIA / RECOGNITION =================
const mediaSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.enum([
    "media",
    "recognition",
    "explainer_video",
    "youtube_podcast",
    "video_testimonial",
    "audio_testimonial",
    "written_testimonial",
  ]),
  title: z.string().min(1).max(300),
  outlet: z.string().max(200).nullable().optional(),
  url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  image_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  body: z.string().max(4000).nullable().optional(),
  entry_date: z.string().nullable().optional(),
  sort_order: z.number().int().default(0),
});

export const upsertMedia = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: z.infer<typeof mediaSchema>) => mediaSchema.parse(d))
  .handler(async ({ data, context }) => {
    const payload = {
      ...data,
      url: data.url || null,
      image_url: data.image_url || null,
      body: data.body || null,
      entry_date: data.entry_date || null,
    };
    const { data: row, error } = data.id
      ? await (context as any).supabase.from("media_recognition").update(payload).eq("id", data.id).select().single()
      : await (context as any).supabase.from("media_recognition").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase.from("media_recognition").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ================= ENQUIRIES =================
export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { data, error } = await (context as any).supabase
      .from("contact_enquiries").select("*").order("created_at", { ascending: false }).limit(500);
    if (error) throw new Error(error.message);
    return data;
  });

export const markEnquiryRead = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string; is_read: boolean }) =>
    z.object({ id: z.string().uuid(), is_read: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase
      .from("contact_enquiries").update({ is_read: data.is_read }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteEnquiry = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { error } = await (context as any).supabase.from("contact_enquiries").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ================= ADMIN LISTS (all rows, for management screens) =================
export const listAllPeople = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { data, error } = await (context as any).supabase.from("people").select("*").order("category").order("sort_order");
    if (error) throw new Error(error.message);
    return data;
  });

export const listAllTestimonials = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { data, error } = await (context as any).supabase.from("testimonials").select("*").order("sort_order");
    if (error) throw new Error(error.message);
    return data;
  });

export const listAllCaseStudies = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { data, error } = await (context as any).supabase.from("case_studies").select("*").order("sort_order");
    if (error) throw new Error(error.message);
    return data;
  });

export const listAllMedia = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { data, error } = await (context as any).supabase.from("media_recognition").select("*").order("kind").order("sort_order");
    if (error) throw new Error(error.message);
    return data;
  });

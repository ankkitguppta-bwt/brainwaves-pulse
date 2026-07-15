import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createMiddleware } from "@tanstack/react-start";

// Admin guard middleware: requires user to be signed in AND have the 'admin' role.
export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const { data, error } = await (context as any).supabase.rpc("has_role", {
      _user_id: (context as any).userId,
      _role: "admin",
    });
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
    const payload: any = {
      ...data,
      cover_image_url: data.cover_image_url || null,
      author_id: (context as any).userId,
    };
    if (data.status === "published") payload.published_at = new Date().toISOString();
    const { data: row, error } = data.id
      ? await (context as any).supabase.from("blog_posts").update(payload).eq("id", data.id).select().single()
      : await (context as any).supabase.from("blog_posts").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
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
  kind: z.enum(["media", "recognition"]),
  title: z.string().min(1).max(300),
  outlet: z.string().max(200).nullable().optional(),
  url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
  image_url: z.string().url().max(1000).nullable().optional().or(z.literal("")),
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

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { sanitize } from "@/lib/sanitize";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }) => {
    const p: any = loaderData ?? {};
    const title = p.meta_title || p.title || "Blog post";
    const desc = p.meta_description || p.excerpt || "Article from BrainWaves Tech.";
    const meta: any[] = [
      { title: `${title} — BrainWaves Tech` },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "article" },
    ];
    if (p.cover_image_url) {
      meta.push({ property: "og:image", content: p.cover_image_url });
      meta.push({ name: "twitter:image", content: p.cover_image_url });
    }
    if (!p.id) meta.push({ name: "robots", content: "noindex" });
    return { meta, links: [{ rel: "canonical", href: `/blog/${p.slug ?? ""}` }] };
  },
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, cover_image_url, content_html, meta_title, meta_description, published_at")
      .eq("slug", params.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    if (!data) throw notFound();
    return data;
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl p-16 text-center">
      <h1 className="font-display text-2xl font-bold">Couldn't load this post</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <Link to="/blog" className="mt-4 inline-block text-navy underline">Back to blog</Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl p-16 text-center">
      <h1 className="font-display text-2xl font-bold">Post not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-navy underline">Back to blog</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  // Client-side sanitize just to be defensive (server sanitize on save would be even stricter).
  const q = useQuery({
    queryKey: ["post", "sanitized", post.id],
    queryFn: () => sanitize(post.content_html || ""),
  });
  const html = q.data ?? "";
  return (
    <article className="bg-background">
      {post.cover_image_url && (
        <div className="bg-slate-100">
          <img src={post.cover_image_url} alt={post.title} className="mx-auto max-h-[420px] w-full max-w-6xl object-cover" />
        </div>
      )}
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-navy">← All posts</Link>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy lg:text-4xl">{post.title}</h1>
        {post.published_at && (
          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}
        {post.excerpt && <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>}
        <div className="prose prose-slate mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}

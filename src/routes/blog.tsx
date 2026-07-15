import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Neurofeedback Insights | BrainWaves Tech" },
      { name: "description", content: "Articles, research notes and updates from BrainWaves Tech." },
      { property: "og:title", content: "BrainWaves Tech Blog" },
      { property: "og:description", content: "Articles on neurofeedback, brainwaves and sound therapy." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const q = useQuery({
    queryKey: ["posts", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_image_url, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights from the neuro-tech frontier"
        sub="Articles, research notes and practitioner stories."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {q.isLoading && <p className="text-center text-muted-foreground">Loading posts…</p>}
          {q.data && q.data.length === 0 && (
            <p className="text-center text-muted-foreground">No posts published yet. Check back soon.</p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {q.data?.map((p) => (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }}
                className="glass-card group overflow-hidden rounded-2xl transition hover:shadow-xl">
                {p.cover_image_url && (
                  <img src={p.cover_image_url} alt={p.title} className="h-48 w-full object-cover transition group-hover:scale-105" />
                )}
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">
                    {p.published_at ? new Date(p.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : ""}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold text-navy">{p.title}</h2>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

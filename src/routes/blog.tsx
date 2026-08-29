import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog: Neurofeedback Insights | BrainWaves Tech" },
      {
        name: "description",
        content: "Articles, research notes and updates from BrainWaves Tech.",
      },
      { property: "og:title", content: "BrainWaves Tech Blog" },
      {
        property: "og:description",
        content: "Articles on neurofeedback, brainwaves and sound therapy.",
      },
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
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 8000);
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, cover_image_url, published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .abortSignal(controller.signal);
        if (error) throw error;
        return data ?? [];
      } finally {
        window.clearTimeout(timeout);
      }
    },
    retry: false,
  });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights from the neuro-tech frontier"
        sub="Articles, research notes and practitioner stories."
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {q.isLoading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          )}
          {(q.isError || (q.data && q.data.length === 0)) && <BlogEmptyState />}
          {q.data && q.data.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {q.data.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="glass-card group overflow-hidden rounded-2xl transition hover:shadow-xl"
                >
                  {p.cover_image_url && (
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="h-48 w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground">
                      {p.published_at
                        ? new Date(p.published_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </p>
                    <h2 className="mt-1 font-display text-lg font-bold text-navy">{p.title}</h2>
                    {p.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PostCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

function BlogEmptyState() {
  return (
    <div className="glass-card mx-auto max-w-2xl rounded-2xl px-6 py-14 text-center sm:px-10">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
        <Newspaper className="h-7 w-7" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-display text-2xl font-bold text-navy">Coming soon</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
        We&apos;re preparing practical articles, research notes and practitioner stories. New posts
        are published directly from our team&apos;s admin dashboard, so check back soon.
      </p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

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
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights from the neuro-tech frontier"
        sub="Articles, research notes and practitioner stories. Coming soon."
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center text-muted-foreground lg:px-8">
          New posts are on the way. In the meantime, follow us on social media or get in touch.
        </div>
      </section>
    </>
  );
}

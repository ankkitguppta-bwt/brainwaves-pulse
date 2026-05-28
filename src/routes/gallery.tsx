import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

const imgs = import.meta.glob("../assets/docx/*", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Workshops, Media & Recognition | BrainWaves Tech" },
      { name: "description", content: "Workshops, training cohorts, practitioner sessions, media coverage and recognition moments." },
      { property: "og:title", content: "Gallery — BrainWaves Tech" },
      { property: "og:description", content: "Workshops, media coverage and recognition." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const all = Object.entries(imgs)
    .filter(([p]) => /workshop|accred|hardware|game|graph/.test(p))
    .map(([, u]) => u);
  return (
    <>
      <PageHero eyebrow="Gallery" title="Workshops, media & moments" />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {all.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-cyan-bg">
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" className="h-44 w-full object-cover transition hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

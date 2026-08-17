import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

type ImageModule = string;
const modules = import.meta.glob<ImageModule>(
  "../assets/client/achievements/*.{jpg,jpeg,png}",
  { eager: true, import: "default", query: "?url" },
);

const achievements = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], index) => ({
    src,
    alt: `Dr. Ankit Gupta achievement ${index + 1}: ${path.split("/").at(-1)?.replace(/[_-]/g, " ") ?? ""}`,
  }));

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories, Media & Recognition | BrainWaves Tech" },
      { name: "description", content: "Achievements, media moments, and recognition from BrainWaves Tech." },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Media & Recognition"
        title="Achievements and Media Moments"
        sub="A visual record of Dr. Ankit Gupta’s professional achievements and the BrainWaves Tech journey."
      />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Explore the recognitions, events, and milestones shared by our client team.
          </p>
          <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {achievements.map((image) => (
              <figure key={image.src} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm">
                <img src={image.src} alt={image.alt} loading="lazy" className="w-full object-cover transition duration-300 hover:scale-[1.03]" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

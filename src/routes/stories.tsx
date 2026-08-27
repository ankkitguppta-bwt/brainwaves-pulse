import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, ChevronLeft, ChevronRight, Database as DatabaseIcon, HandHeart, Headphones, Newspaper, Play, Quote, Video, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { clientTestimonialVideos } from "@/lib/client-testimonials";
import type { Database } from "@/integrations/supabase/types";

type MediaItem = Database["public"]["Tables"]["media_recognition"]["Row"];
type ImageModule = string;
const achievementModules = import.meta.glob<ImageModule>(
  "../assets/client/achievements/*.{jpg,jpeg,png}",
  { eager: true, import: "default", query: "?url" },
);
const achievements = Object.entries(achievementModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src], index) => ({
    id: `achievement-${index}`,
    title: `Achievement ${index + 1}`,
    image_url: src,
    url: null,
    outlet: "BrainWaves Tech",
    body: null,
  }));

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Media & Impact | BrainWaves Tech" },
      {
        name: "description",
        content:
          "Research, media coverage, podcasts, and real stories from the BrainWaves Tech community.",
      },
    ],
  }),
  component: StoriesPage,
});

function youtubeId(url: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes("youtu.be")
      ? parsed.pathname.slice(1)
      : (parsed.searchParams.get("v") ?? parsed.pathname.match(/\/embed\/([^/]+)/)?.[1] ?? null);
  } catch {
    return null;
  }
}
function youtubeEmbed(url: string | null) {
  const id = youtubeId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
function youtubeThumbnail(url: string | null) {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

const youtubePodcasts = [
  {
    id: "podcast-1",
    title: "Ankit Gupta, Founder of Brain Seeder — On Brainwave Analysis & Boosting Brain Power",
    outlet: "Amit M Mishra | Tryootech",
    url: "https://youtu.be/mlVmRpTsPNE",
  },
  {
    id: "podcast-2",
    title: "How Does Music Heal Your Heart and Brain? ft. Dr. Ankit Gupta — The Mindale Show, EP 2",
    outlet: "MINDALE — A Lifestyle Change",
    url: "https://youtu.be/p4MzySQIXtY",
  },
  {
    id: "podcast-3",
    title: "Brain Waves Tech Collaboration with Global Fighters Foundation",
    outlet: "Brain Waves Tech",
    url: "https://youtu.be/I9wd6uTe0vg",
  },
] as const;

function StoriesPage() {
  const query = useQuery({
    queryKey: ["media-recognition", "public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_recognition")
        .select("*")
        .order("sort_order")
        .order("entry_date", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const items = query.data ?? [];
  const byKind = (kind: MediaItem["kind"]) => items.filter((item) => item.kind === kind);
  const coverage = [...byKind("media"), ...byKind("recognition")];
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const coverageItems = coverage.length ? coverage : achievements;
  const [activeCoverageIndex, setActiveCoverageIndex] = useState<number | null>(null);
  const explainer = byKind("explainer_video");
  const databasePodcasts = byKind("youtube_podcast");
  const podcasts = databasePodcasts.length
    ? databasePodcasts.map((item) => ({
        id: item.id,
        title: item.title,
        outlet: item.outlet,
        url: item.url,
      }))
    : youtubePodcasts;
  const databaseVideos = byKind("video_testimonial");
  const videoTestimonials = databaseVideos.length
    ? databaseVideos.map((item) => ({
        id: item.id,
        title: item.title,
        author: item.outlet ?? "BrainWaves Tech community",
        video_url: item.url ?? "",
        thumbnail_url: item.image_url,
      }))
    : clientTestimonialVideos;
  const activeCoverage = activeCoverageIndex === null ? null : coverageItems[activeCoverageIndex];

  useEffect(() => {
    if (activeCoverageIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setActiveCoverageIndex((current) =>
          current === null ? null : (current + 1) % coverageItems.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveCoverageIndex((current) =>
          current === null ? null : (current - 1 + coverageItems.length) % coverageItems.length,
        );
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCoverageIndex, coverageItems.length]);
  return (
    <>
      <PageHero
        eyebrow="Media & Impact"
        title={
          <>
            <span className="font-medium text-white/60">Impact of Neuroscience:</span>{" "}
            <span className="font-bold text-white">From Research Labs to Real Lives</span>
          </>
        }
        sub="The people, institutions, and communities reached through BrainWaves Tech neurofeedback."
      />
      <section className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { value: "12,000+", label: "Lives Impacted", icon: HandHeart },
              { value: "120,000+", label: "Brainwave Data Points Collected", icon: DatabaseIcon },
              { value: "27+", label: "Certified Practitioners Nationwide", icon: BadgeCheck },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="group rounded-2xl border border-navy/5 bg-white p-6 text-center shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_56px_-20px_rgba(15,23,42,0.45)] sm:p-7"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-all duration-300 group-hover:scale-105 group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-3xl font-extrabold text-gradient-brand sm:text-4xl">
                  {value}
                </p>
                <p className="mt-2 text-sm font-semibold text-navy">{label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-[15px] leading-8 text-muted-foreground sm:text-base">
            Mental-health support cannot remain locked behind expensive private-clinic doors.
            BrainWaves Tech was built to scale across public infrastructure. Its non-invasive
            two-minute neurofeedback technology has reached broad communities through government and
            institutional programmes including <span className="font-semibold text-navy/75">SPIO</span>,{" "}
            <span className="font-semibold text-navy/75">CWSM</span>,{" "}
            <span className="font-semibold text-navy/75">Police Training</span>, the{" "}
            <span className="font-semibold text-navy/75">Indian Army</span>, the{" "}
            <span className="font-semibold text-navy/75">Indian Navy</span>, and corporate organisations.
          </p>
        </div>
      </section>
      <MediaSection title="Explainer Videos" icon={Video}>
        {explainer.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {explainer.map((item) => (
              <VideoItem key={item.id} item={item} onOpen={setActiveVideo} />
            ))}
          </div>
        ) : (
          <Empty text="Explainer videos can be added from the Media admin panel." />
        )}
      </MediaSection>
      <MediaSection title="Media Coverage & Recognition" icon={Newspaper} tone="muted">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coverageItems.map((item, index) => (
            <CoverageCard
              key={item.id}
              item={item}
              onOpen={() => item.image_url && setActiveCoverageIndex(index)}
            />
          ))}
        </div>
      </MediaSection>
      <MediaSection title="YouTube Podcasts" icon={Play}>
        {podcasts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {podcasts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => item.url && setActiveVideo({ url: item.url, title: item.title })}
                className="group relative aspect-video overflow-hidden rounded-2xl bg-navy text-left"
              >
                {youtubeThumbnail(item.url) && (
                  <img
                    src={youtubeThumbnail(item.url)!}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition group-hover:bg-black/45">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-navy shadow-lg transition group-hover:scale-105">
                    <Play className="ml-0.5 h-6 w-6" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 pt-10">
                  <span className="block font-semibold leading-snug text-white">{item.title}</span>
                  {item.outlet && (
                    <span className="mt-1 block text-xs text-white/70">{item.outlet}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <Empty text="Podcast links can be added from the Media admin panel." />
        )}
      </MediaSection>
      <MediaSection title="Video Testimonials" icon={Play} tone="muted">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoTestimonials.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                item.video_url && setActiveVideo({ url: item.video_url, title: item.title })
              }
              className="group relative aspect-video overflow-hidden rounded-2xl bg-navy text-left"
            >
              {item.thumbnail_url ? (
                <img
                  src={item.thumbnail_url}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <video
                  src={item.video_url}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-navy">
                  <Play className="ml-0.5 h-6 w-6" />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-4 font-semibold text-white">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </MediaSection>
      <MediaSection title="Audio Testimonials" icon={Headphones}>
        {byKind("audio_testimonial").length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {byKind("audio_testimonial").map((item) => (
              <article key={item.id} className="rounded-2xl border border-navy/10 bg-white p-5">
                <h3 className="font-display font-bold text-navy">{item.title}</h3>
                {item.outlet && <p className="mt-1 text-sm text-teal">{item.outlet}</p>}
                {item.body && <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>}
                {item.url && (
                  <audio controls preload="metadata" className="mt-4 w-full" src={item.url} />
                )}
              </article>
            ))}
          </div>
        ) : (
          <Empty text="Audio testimonials can be added from the Media admin panel." />
        )}
      </MediaSection>
      <MediaSection title="Written Testimonials" icon={Quote} tone="muted">
        {byKind("written_testimonial").length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {byKind("written_testimonial").map((item) => (
              <blockquote key={item.id} className="rounded-2xl bg-white p-6">
                <Quote className="h-6 w-6 text-teal" />
                <p className="mt-4 leading-relaxed text-slate-700">“{item.body}”</p>
                <footer className="mt-5">
                  <p className="font-semibold text-navy">{item.title}</p>
                  {item.outlet && <p className="text-sm text-muted-foreground">{item.outlet}</p>}
                </footer>
              </blockquote>
            ))}
          </div>
        ) : (
          <Empty text="Written testimonials can be added from the Media admin panel." />
        )}
      </MediaSection>
      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-h-[90svh] w-[calc(100%-1rem)] max-w-5xl overflow-hidden p-0 sm:w-[calc(100%-2rem)]">
          {activeVideo &&
            (() => {
              const embed = youtubeEmbed(activeVideo.url);
              return embed ? (
                <iframe
                  src={embed}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full bg-black"
                />
              ) : (
                <video
                  src={activeVideo.url}
                  title={activeVideo.title}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[82svh] w-full bg-black object-contain"
                />
              );
            })()}
        </DialogContent>
      </Dialog>
      <Dialog
        open={activeCoverageIndex !== null}
        onOpenChange={(open) => !open && setActiveCoverageIndex(null)}
      >
        <DialogContent className="w-[calc(100%-1rem)] max-w-6xl border-white/15 bg-navy p-2 text-white sm:w-[calc(100%-2rem)] sm:p-3">
          {activeCoverage?.image_url && (
            <div className="relative flex min-h-[50svh] items-center justify-center">
              <img
                src={activeCoverage.image_url}
                alt={activeCoverage.title}
                className="max-h-[78svh] w-full rounded-xl object-contain"
              />
              {coverageItems.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous gallery image"
                    onClick={() =>
                      setActiveCoverageIndex((current) =>
                        current === null ? null : (current - 1 + coverageItems.length) % coverageItems.length,
                      )
                    }
                    className="absolute left-2 grid h-10 w-10 place-items-center rounded-full bg-navy/80 text-white transition hover:bg-teal sm:left-4 sm:h-12 sm:w-12"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next gallery image"
                    onClick={() =>
                      setActiveCoverageIndex((current) =>
                        current === null ? null : (current + 1) % coverageItems.length,
                      )
                    }
                    className="absolute right-2 grid h-10 w-10 place-items-center rounded-full bg-navy/80 text-white transition hover:bg-teal sm:right-4 sm:h-12 sm:w-12"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function MediaSection({
  title,
  icon: Icon,
  tone = "white",
  children,
}: {
  title: string;
  icon: typeof Video;
  tone?: "white" | "muted";
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "muted" ? "bg-background py-16" : "bg-white py-16"}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-teal">
            <Icon className="h-5 w-5" />
          </span>
          <h2 className="font-display text-3xl font-bold text-navy">{title}</h2>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-navy/20 bg-white/60 p-8 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
function VideoItem({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: (item: { url: string; title: string }) => void;
}) {
  const embed = youtubeEmbed(item.url);
  if (embed)
    return (
      <article className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <iframe
          src={embed}
          title={item.title}
          loading="lazy"
          allowFullScreen
          className="aspect-video w-full"
        />
        <div className="p-5">
          <h3 className="font-display font-bold text-navy">{item.title}</h3>
          {item.body && <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>}
        </div>
      </article>
    );
  return (
    <button
      type="button"
      onClick={() => item.url && onOpen({ url: item.url, title: item.title })}
      className="group overflow-hidden rounded-2xl border border-navy/10 bg-white text-left"
    >
      {item.image_url && (
        <img src={item.image_url} alt="" className="aspect-video w-full object-cover" />
      )}
      <div className="p-5">
        <h3 className="font-display font-bold text-navy">{item.title}</h3>
        {item.body && <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>}
      </div>
    </button>
  );
}
function CoverageCard({
  item,
  onOpen,
}: {
  item: {
    id: string;
    title: string;
    image_url: string | null;
    url: string | null;
    outlet: string | null;
    body: string | null;
  };
  onOpen: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-navy/5 bg-white shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_-20px_rgba(15,23,42,0.45)]">
      <button
        type="button"
        onClick={onOpen}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-navy/5 text-left disabled:cursor-default"
        aria-label={`View ${item.title} in full size`}
        disabled={!item.image_url}
      >
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <span className="absolute inset-0 grid place-items-center bg-navy/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-navy shadow-lg">
            <ZoomIn className="h-5 w-5" />
          </span>
        </span>
      </button>
    </article>
  );
}

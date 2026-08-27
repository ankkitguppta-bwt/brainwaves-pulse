import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, CheckCircle2, ChevronLeft, ChevronRight, Database as DatabaseIcon, HandHeart, Headphones, Newspaper, Play, Quote, Video, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { clientTestimonialVideos } from "@/lib/client-testimonials";
import { clientAudioTestimonials } from "@/lib/client-audio-testimonials";
import { researchBackedWrittenTestimonials } from "@/lib/research-testimonials";
import { AudioTestimonialCard } from "@/components/site/AudioTestimonialCard";
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

const defaultExplainerVideos = [
  {
    id: "explainer-1",
    title: "Mental Health Matters: Discover Brain Waves Tech’s Neurofeedback System",
    outlet: "BrainWaves Tech",
    url: "https://www.youtube.com/watch?v=uiPXm0X_6t4",
    body: "An overview of BrainWaves Tech neurofeedback technology, brainwave analysis, and real-time cognitive quantification.",
  },
  {
    id: "explainer-2",
    title: "Brain Wave Analysis",
    outlet: "BrainWaves Tech",
    url: "https://www.youtube.com/watch?v=TQS2it2jsGY",
    body: "Explore how 2-minute non-invasive EEG mapping translates raw frequency patterns into actionable wellness insights.",
  },
  {
    id: "explainer-3",
    title: "Mental Health and Student Support: How Brain Waves Tech Empowers a Stress-Free Life",
    outlet: "BrainWaves Tech",
    url: "https://www.youtube.com/watch?v=bj8ttYUqKXU",
    body: "How targeted neurofeedback and customized sound therapy support students with focus, exam anxiety, and emotional resilience.",
  },
  {
    id: "explainer-4",
    title: "Transforming Mental Health: A Revolutionary Neurofeedback Solution for All Sectors",
    outlet: "BrainWaves Tech",
    url: "https://www.youtube.com/watch?v=gNWz_iz-6zs",
    body: "Discovering scalable neuroscience applications across clinical, corporate, institutional, and defense ecosystems.",
  },
  {
    id: "explainer-5",
    title: "Transform Your Mental Health Practice with Brain Waves Tech",
    outlet: "BrainWaves Tech",
    url: "https://www.youtube.com/watch?v=86fvbps-wZA",
    body: "Equipping psychologists, clinicians, and wellness practitioners with accredited NFP certification and assessment tools.",
  },
  {
    id: "explainer-6",
    title: "Enhancing Corporate Success with Brain Waves Tech: Boost Retention, Productivity & Mental Health",
    outlet: "BrainWaves Tech",
    url: "https://www.youtube.com/watch?v=jXB3yGJb0DI",
    body: "Quantifying workplace cognitive fatigue, reducing burnout, and optimizing executive mental performance.",
  },
] as const;

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
  const databaseExplainer = byKind("explainer_video");
  const explainer = databaseExplainer.length
    ? databaseExplainer.map((item) => ({
        id: item.id,
        title: item.title,
        outlet: item.outlet,
        url: item.url,
        body: item.body,
        image_url: item.image_url,
      }))
    : defaultExplainerVideos;
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
  const databaseAudio = byKind("audio_testimonial");
  const audioTestimonials = databaseAudio.length
    ? databaseAudio.map((item) => ({
        id: item.id,
        title: item.title,
        role: "BrainWaves Tech Client",
        category: "Cognitive Wellness",
        tag: "Verified Client",
        durationApprox: "0:45",
        summary: item.body || "Real recovery and cognitive wellness outcome shared directly by client.",
        url: item.url ?? "",
      }))
    : clientAudioTestimonials;

  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const databaseWritten = byKind("written_testimonial");
  const writtenTestimonials = databaseWritten.length
    ? databaseWritten.map((item) => ({
        id: item.id,
        title: item.title,
        outlet: item.outlet,
        body: item.body,
        metricBadge: null,
        verifiedStudy: null,
      }))
    : researchBackedWrittenTestimonials.map((item) => ({
        id: item.id,
        title: item.author,
        outlet: `${item.role} • ${item.institution}`,
        body: item.quote,
        metricBadge: item.metricBadge,
        verifiedStudy: item.verifiedStudy,
      }));

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      <MediaSection
        title="Audio Testimonials"
        subtitle="Listen to real experiences, recovery journeys, and cognitive wellness outcomes shared directly by our clients."
        icon={Headphones}
      >
        {audioTestimonials.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audioTestimonials.map((item) => (
              <AudioTestimonialCard
                key={item.id}
                item={item}
                isPlaying={activeAudioId === item.id}
                onPlay={() => setActiveAudioId(item.id)}
                onPause={() => setActiveAudioId((curr) => (curr === item.id ? null : curr))}
              />
            ))}
          </div>
        ) : (
          <Empty text="Audio testimonials can be added from the Media admin panel." />
        )}
      </MediaSection>
      <MediaSection title="Written Testimonials" icon={Quote} tone="muted">
        {writtenTestimonials.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {writtenTestimonials.map((item) => (
              <blockquote
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-md"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Quote className="h-5 w-5 text-teal" />
                    {item.metricBadge && (
                      <span className="inline-flex items-center rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-bold text-orange">
                        {item.metricBadge}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">“{item.body}”</p>
                </div>
                <footer className="mt-5 border-t border-navy/5 pt-4">
                  <p className="font-semibold text-navy">{item.title}</p>
                  {item.outlet && <p className="text-xs text-muted-foreground">{item.outlet}</p>}
                  {item.verifiedStudy && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-teal">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{item.verifiedStudy}</span>
                    </div>
                  )}
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
  subtitle,
  icon: Icon,
  tone = "white",
  children,
}: {
  title: string;
  subtitle?: string;
  icon: typeof Video;
  tone?: "white" | "muted";
  children: React.ReactNode;
}) {
  return (
    <section className={tone === "muted" ? "bg-background py-16" : "bg-white py-16"}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-teal">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="font-display text-3xl font-bold text-navy">{title}</h2>
          </div>
          {subtitle && (
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          )}
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
  item: {
    id: string;
    title: string;
    url: string | null;
    image_url?: string | null;
    outlet?: string | null;
    body?: string | null;
  };
  onOpen: (item: { url: string; title: string }) => void;
}) {
  const thumb = item.image_url || (item.url ? youtubeThumbnail(item.url) : null);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <button
        type="button"
        onClick={() => item.url && onOpen({ url: item.url, title: item.title })}
        className="relative aspect-video w-full overflow-hidden bg-navy text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
        aria-label={`Play video: ${item.title}`}
      >
        {thumb && (
          <img
            src={thumb}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors duration-300 group-hover:bg-black/50">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-navy shadow-lg transition-transform duration-300 group-hover:scale-110 group-active:scale-95 sm:h-14 sm:w-14">
            <Play className="ml-0.5 h-5 w-5 text-navy fill-navy sm:h-6 sm:w-6" />
          </span>
        </span>
        <span className="absolute left-3 top-3 rounded-md bg-navy/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-teal backdrop-blur-sm">
          Explainer
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-teal sm:text-lg line-clamp-2">
          {item.title}
        </h3>
        {item.outlet && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-teal">
            {item.outlet}
          </p>
        )}
        {item.body && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2 sm:text-sm">
            {item.body}
          </p>
        )}
        <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-semibold text-teal group-hover:text-navy transition-colors">
          <span>Watch video</span>
          <Play className="h-3 w-3 fill-current" />
        </div>
      </div>
    </article>
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

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Headphones, Newspaper, Play, Quote, Video } from "lucide-react";
import { useState } from "react";
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
    body: path.split("/").at(-1)?.replace(/[_-]/g, " ") ?? "",
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

function youtubeEmbed(url: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be")
      ? parsed.pathname.slice(1)
      : (parsed.searchParams.get("v") ?? parsed.pathname.match(/\/embed\/([^/]+)/)?.[1]);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

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
  const explainer = byKind("explainer_video");
  const podcasts = byKind("youtube_podcast");
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
  return (
    <>
      <PageHero
        eyebrow="Media & Impact"
        title="Impact of Neuroscience: From Research Labs to Real Lives"
        sub="The people, institutions, and communities reached through BrainWaves Tech neurofeedback."
      />
      <section className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["12,000+", "Lives Impacted"],
              ["120,000+", "Brainwave Data Points Collected"],
              ["27+", "Certified Practitioners Nationwide"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-white p-6 text-center">
                <p className="font-display text-3xl font-bold text-teal">{value}</p>
                <p className="mt-2 text-sm font-semibold text-navy">{label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-4xl text-center leading-relaxed text-muted-foreground">
            Mental-health support cannot remain locked behind expensive private-clinic doors.
            BrainWaves Tech was built to scale across public infrastructure. Its non-invasive
            two-minute neurofeedback technology has reached broad communities through government and
            institutional programmes including SPIO, CWSM, Police Training, the Indian Army, the
            Indian Navy, and corporate organisations.
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
        {coverage.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coverage.map((item) => (
              <CoverageCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {achievements.map((item) => (
              <CoverageCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </MediaSection>
      <MediaSection title="YouTube Podcasts" icon={Play}>
        {podcasts.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {podcasts.map((item) => {
              const embed = youtubeEmbed(item.url);
              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-navy/10 bg-white"
                >
                  {embed ? (
                    <iframe
                      src={embed}
                      title={item.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="aspect-video w-full"
                    />
                  ) : item.image_url ? (
                    <img src={item.image_url} alt="" className="aspect-video w-full object-cover" />
                  ) : null}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                    {item.outlet && <p className="mt-1 text-sm text-teal">{item.outlet}</p>}
                    {item.body && <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>}
                  </div>
                </article>
              );
            })}
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
          {activeVideo && (
            <video
              src={activeVideo.url}
              title={activeVideo.title}
              controls
              autoPlay
              playsInline
              className="max-h-[82svh] w-full bg-black object-contain"
            />
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
}: {
  item: {
    id: string;
    title: string;
    image_url: string | null;
    url: string | null;
    outlet: string | null;
    body: string | null;
  };
}) {
  const content = (
    <>
      {item.image_url && (
        <img src={item.image_url} alt={item.title} loading="lazy" className="w-full object-cover" />
      )}
      <div className="p-5">
        <h3 className="font-display font-bold text-navy">{item.title}</h3>
        {item.outlet && <p className="mt-1 text-sm text-teal">{item.outlet}</p>}
        {item.body && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.body}</p>
        )}
        {item.url && (
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy">
            Open story <ExternalLink className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </>
  );
  return item.url ? (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="mb-5 block break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1"
    >
      {content}
    </a>
  ) : (
    <article className="mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm">
      {content}
    </article>
  );
}

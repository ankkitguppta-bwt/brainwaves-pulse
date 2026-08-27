import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Play, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { clientTestimonialVideos } from "@/lib/client-testimonials";
import { researchBackedWrittenTestimonials } from "@/lib/research-testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — BrainWaves Tech" },
      { name: "description", content: "Voices from psychologists, students, parents and wellness professionals using BrainWaves Tech." },
      { property: "og:title", content: "BrainWaves Tech Testimonials" },
      { property: "og:description", content: "What our community says." },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const q = useQuery({
    queryKey: ["testimonials", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const databaseVideos = (q.data ?? []).filter((t) => t.type === "video" && t.video_url);
  const videos = databaseVideos.length > 0 ? databaseVideos : clientTestimonialVideos;
  const databaseTexts = (q.data ?? []).filter((t) => t.type === "text" && t.quote);
  const texts = databaseTexts.length > 0 ? databaseTexts : researchBackedWrittenTestimonials;
  const [active, setActive] = useState<any | null>(null);

  return (
    <>
      <PageHero eyebrow="Testimonials" title="Voices from our community" sub="Real stories and verified empirical outcomes from practitioners, research cohorts, students, and professionals." />

      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy">Video stories</h2>
          {videos.length === 0 && <p className="mt-4 text-muted-foreground">No video testimonials yet.</p>}
          {videos.length > 0 && videos.length <= 3 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => <VideoCard key={v.id} v={v} onOpen={() => setActive(v)} />)}
            </div>
          )}
          {videos.length > 3 && (
            <Carousel opts={{ align: "start" }} className="mt-6">
              <CarouselContent>
                {videos.map((v) => (
                  <CarouselItem key={v.id} className="sm:basis-1/2 lg:basis-1/3">
                    <VideoCard v={v} onOpen={() => setActive(v)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious /><CarouselNext />
            </Carousel>
          )}

          <div className="mt-20 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">Clinical & Empirical Evidence</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">In their own words</h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Documented feedback from clinical trials, IIT research cohorts, institutional educators, and certified practitioners.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {texts.map((t: any) => (
              <blockquote
                key={t.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.22)]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal">
                      {t.category ?? "Research Cohort"}
                    </span>
                    {t.metricBadge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange/10 px-2.5 py-0.5 text-[11px] font-bold text-orange">
                        {t.metricBadge}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">“{t.quote}”</p>
                </div>

                <footer className="mt-6 border-t border-navy/5 pt-4">
                  <p className="font-display font-bold text-navy">{t.author}</p>
                  <p className="text-xs font-medium text-muted-foreground">{t.role ?? t.title}</p>
                  {t.institution && (
                    <p className="mt-0.5 text-[11px] text-slate-500">{t.institution}</p>
                  )}
                  {t.verifiedStudy && (
                    <div className="mt-2.5 flex items-center gap-1 text-[10px] font-semibold text-teal">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>{t.verifiedStudy}</span>
                    </div>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90svh] w-[calc(100%-1rem)] max-w-5xl overflow-hidden p-0 sm:w-[calc(100%-2rem)]">
          {active?.video_url && (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={active.thumbnail_url ?? undefined}
              className="max-h-[78svh] w-full bg-black object-contain"
              src={active.video_url}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function VideoCard({ v, onOpen }: { v: any; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="glass-card group relative aspect-video w-full overflow-hidden rounded-2xl text-left">
      {v.thumbnail_url ? (
        <img src={v.thumbnail_url} alt={v.author} className="absolute inset-0 h-full w-full object-cover" />
      ) : <video src={v.video_url} muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-navy">
          <Play className="h-7 w-7 ml-1" />
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4 text-white">
        <p className="font-display font-semibold">{v.title ?? v.author}</p>
        <p className="text-xs opacity-90">{v.author}</p>
      </div>
    </button>
  );
}

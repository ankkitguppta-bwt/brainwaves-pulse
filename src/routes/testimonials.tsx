import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

  const videos = (q.data ?? []).filter((t) => t.type === "video");
  const texts = (q.data ?? []).filter((t) => t.type === "text");
  const [active, setActive] = useState<any | null>(null);

  return (
    <>
      <PageHero eyebrow="Testimonials" title="Voices from our community" sub="Real stories from practitioners, students, parents and professionals." />

      <section className="bg-white py-16">
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

          <h2 className="mt-16 font-display text-2xl font-bold text-navy">In their own words</h2>
          {texts.length === 0 && <p className="mt-4 text-muted-foreground">No text testimonials yet.</p>}
          {texts.length > 0 && (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {texts.map((t) => (
                <blockquote key={t.id} className="glass-card rounded-2xl p-6">
                  <p className="text-slate-700">“{t.quote}”</p>
                  <footer className="mt-4">
                    <p className="font-display font-semibold text-navy">{t.author}</p>
                    {t.title && <p className="text-xs text-muted-foreground">{t.title}</p>}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {active?.video_url && (
            <video controls autoPlay className="h-full w-full" src={active.video_url} />
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
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-teal" />
      )}
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

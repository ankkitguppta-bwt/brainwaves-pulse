import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Heart, Target, Sparkles, Smile, Moon, Brain } from "lucide-react";

export const Route = createFileRoute("/sound-therapy")({
  head: () => ({
    meta: [
      { title: "Customized Sound Therapy — Neuro-acoustic Wellness | BrainWaves Tech" },
      { name: "description", content: "Personalised sound therapy based on your brainwave pattern. Supports stress, focus, sleep, balance and meditation." },
      { property: "og:title", content: "Customized Sound Therapy — BrainWaves Tech" },
      { property: "og:description", content: "Personalised neuro-acoustic frequencies tuned to your brain." },
      { property: "og:url", content: "/sound-therapy" },
    ],
    links: [{ rel: "canonical", href: "/sound-therapy" }],
  }),
  component: SoundTherapyPage,
});

function SoundTherapyPage() {
  const benefits = [
    { i: Heart, t: "Stress management support" },
    { i: Target, t: "Better focus support" },
    { i: Sparkles, t: "Relaxation support" },
    { i: Smile, t: "Emotional balance support" },
    { i: Moon, t: "Sleep support" },
    { i: Brain, t: "Meditation enhancement" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Sound Therapy"
        title="Personalised sound therapy, tuned to your brain"
        sub="Sound therapy uses personalised frequencies, rhythmic modulation and neuro-acoustic principles to support relaxation, focus, balance and mental wellness."
        cta={{ to: "/contact", label: "Book a Session" }}
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.t} className="glass-card flex items-center gap-4 rounded-2xl p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                  <b.i className="h-6 w-6" />
                </div>
                <p className="font-medium text-navy">{b.t}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-orange/30 bg-orange/5 p-5 text-center text-sm text-navy">
            <strong>Disclaimer:</strong> BrainWaves Tech solutions are designed for wellness, training, assessment
            and professional support. They are not a substitute for medical diagnosis or emergency treatment.
          </p>
        </div>
      </section>
    </>
  );
}

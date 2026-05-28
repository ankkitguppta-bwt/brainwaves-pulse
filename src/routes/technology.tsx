import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Brain, Activity, Cpu, Cloud, Waves, Target } from "lucide-react";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — EEG Neurofeedback & Brainwave Analysis | BrainWaves Tech" },
      { name: "description", content: "Our neuro-tech stack: EEG hardware, real-time brainwave analysis, cloud reporting and customised sound therapy engine." },
      { property: "og:title", content: "Neuro-tech Stack — BrainWaves Tech" },
      { property: "og:description", content: "EEG hardware, real-time analysis, cloud reporting and sound therapy engine." },
      { property: "og:url", content: "/technology" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: TechnologyPage,
});

function TechnologyPage() {
  const features = [
    { i: Cpu, t: "EEG Hardware", d: "Research-grade non-invasive sensors with reliable signal capture." },
    { i: Activity, t: "Real-time Signal Processing", d: "Live multi-band analysis across alpha, beta, theta, delta and gamma." },
    { i: Brain, t: "Cognitive Indicators", d: "Attention, focus, calm, stress, meditation readiness and more." },
    { i: Cloud, t: "Cloud Reporting", d: "Secure session history, exports and practitioner dashboards." },
    { i: Waves, t: "Sound Therapy Engine", d: "Personalised neuro-acoustic prescriptions based on brainwave profile." },
    { i: Target, t: "Game-based Training", d: "Engaging feedback loops to train target brain states." },
  ];
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="The neuro-tech stack powering BrainWaves Tech"
        sub="A complete ecosystem of EEG hardware, real-time analytics, sound therapy and practitioner tooling."
      />
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {features.map((f) => (
            <div key={f.t} className="glass-card rounded-2xl p-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-navy text-white">
                <f.i className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

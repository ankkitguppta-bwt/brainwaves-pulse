import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ImpactCallout } from "@/components/site/ImpactCallout";
import { JourneyCta } from "@/components/site/JourneyCta";
import { FileText, Activity, Database, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Scientific Research — 15 Cognitive Parameters | BrainWaves Tech" },
      {
        name: "description",
        content:
          "Peer-reviewed neurofeedback research, 1.2 lakh+ brainwave data points and a 15-parameter cognitive mapping model powering BrainWaves Tech analytics.",
      },
      { property: "og:title", content: "Scientific Research — BrainWaves Tech" },
      {
        property: "og:description",
        content:
          "Evidence-based neurofeedback: five brainwave bands plus ten proprietary cognitive metrics, validated across 12,000+ assessments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: ResearchPage,
});

const stats = [
  { icon: Database, value: "1.2 L+", label: "Brainwave data points analysed" },
  { icon: Clock, value: "20,000+", label: "Hours of counselling & analysis" },
  { icon: Users, value: "12,000+", label: "Individuals & groups assessed" },
  { icon: Activity, value: "14+", label: "Years of neurofeedback research" },
];

const bands = [
  { name: "Delta (0.5–4 Hz)", body: "Deep restorative sleep, healing and unconscious processing." },
  { name: "Theta (4–8 Hz)", body: "Creativity, deep relaxation, memory consolidation and emotional processing." },
  { name: "Alpha (8–12 Hz)", body: "Calm alertness, relaxed focus and the bridge between conscious and subconscious states." },
  { name: "Beta (12–30 Hz)", body: "Active thinking, problem-solving, analytical focus and alertness." },
  { name: "Gamma (30–100 Hz)", body: "High-level information processing, insight, learning and peak cognitive binding." },
];

const metrics = [
  "Attention Index",
  "Focus Stability",
  "Cognitive Load",
  "Mental Fatigue",
  "Stress Response",
  "Emotional Regulation",
  "Relaxation Quotient",
  "Sleep Readiness",
  "Memory Engagement",
  "Performance Readiness",
];

const papers = [
  {
    title: "Objective Brainwave Mapping vs. Qualitative Self-Reporting",
    summary:
      "Comparative study demonstrating the diagnostic gap between questionnaire-based screening and real-time EEG-derived cognitive parameters.",
  },
  {
    title: "Customised Sound Therapy & Post-Session Brainwave Shift",
    summary:
      "Analysis of pre- and post-intervention brainwave states following personalised soundtrack protocols generated from individual EEG profiles.",
  },
  {
    title: "Neurofeedback for Academic Performance in Student Cohorts",
    summary:
      "Longitudinal observations of attention stability and cognitive load improvements across institutional deployments.",
  },
  {
    title: "Enterprise Cognitive Telemetry & Workforce Well-being",
    summary:
      "Framework paper on applying quantified brainwave metrics to corporate stress, burnout risk and performance readiness programs.",
  },
];

function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Scientific Research"
        title="Evidence, Not Estimation: The Science Behind Our 15 Cognitive Parameters"
        sub="Every BrainWaves Tech report is built on peer-reviewed neuroscience and validated field data — five foundational brainwave bands plus ten proprietary cognitive metrics, computed from raw real-time EEG signals in under two minutes."
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-duration="900"
                className="glass-card rounded-2xl bg-white p-6 text-center"
              >
                <s.icon className="mx-auto h-6 w-6 text-teal" />
                <p className="mt-3 font-display text-2xl font-bold text-navy">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div data-aos="fade-up" data-aos-duration="900">
              <h2 className="font-display text-2xl font-bold text-navy">
                The Five Brainwave Bands
              </h2>
              <ul className="mt-6 space-y-4">
                {bands.map((b) => (
                  <li key={b.name} className="glass-card rounded-2xl bg-white p-5">
                    <p className="font-display text-sm font-bold text-navy">{b.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="120">
              <h2 className="font-display text-2xl font-bold text-navy">
                Ten Proprietary Cognitive Metrics
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Derived through patented signal-processing models, these metrics convert band
                activity into decision-ready indicators for clinicians, educators and enterprise
                leaders.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {metrics.map((m, i) => (
                  <div
                    key={m}
                    className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3"
                  >
                    <span className="font-display text-xs font-bold text-teal">
                      {String(i + 6).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium text-navy">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="mt-20 font-display text-2xl font-bold text-navy">
            Research & Publications
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {papers.map((p) => (
              <article
                key={p.title}
                data-aos="fade-up"
                data-aos-duration="900"
                className="glass-card flex gap-4 rounded-2xl bg-white p-6"
              >
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <div>
                  <h3 className="font-display text-base font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <ImpactCallout quote="Analysing 1.2 lakh+ brainwave data points across 12,000+ assessments has let us translate raw neural activity into an empirical performance blueprint — repeatable, comparable and free from reporting bias." />
          </div>
        </div>
      </section>

      <JourneyCta />
    </>
  );
}

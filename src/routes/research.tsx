import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ImpactCallout } from "@/components/site/ImpactCallout";
import { JourneyCta } from "@/components/site/JourneyCta";
import {
  FileText,
  Activity,
  Database,
  Clock,
  Users,
  ShieldCheck,
  Target,
  Cpu,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import whitePaperPdf from "@/assets/reports/White Paper - Realtime Brainwave Measurement and Data Analytics.pdf";
import workEfficiencyPdf from "@/assets/reports/Enhancement of Work Efficiency in an Organization byApplying Ergonomics and Sound Waves Sessions (1) (1).pdf";
import wujiReportPdf from "@/assets/reports/Wuji Report - IIT India Research 2-3.pdf";
import { canonicalUrl } from "@/lib/site-seo";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Scientific Research — 120,000+ Neural Data Points | BrainWaves Tech" },
      {
        name: "description",
        content:
          "Grounded in data, not guesswork: 120,000+ neural data points across 20,000+ participants, a 14-parameter cognitive mapping model, and 92%+ verified analytical accuracy.",
      },
      { property: "og:title", content: "Scientific Research — BrainWaves Tech" },
      {
        property: "og:description",
        content:
          "Evidence-based neurofeedback: five brainwave bands plus nine proprietary cognitive metrics, validated across 120,000+ data points and 20,000+ participants.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/research") }],
  }),
  component: ResearchPage,
});

const stats = [
  { icon: Database, value: "120,000+", label: "Neural data points analysed" },
  { icon: Users, value: "20,000+", label: "Participants studied" },
  { icon: Activity, value: "92%+", label: "Verified analytical accuracy" },
  { icon: Clock, value: "<2 Min", label: "Non-invasive assessment time" },
];

const dataArchitecture = [
  {
    icon: Database,
    title: "The Scale",
    body: "Our proprietary hardware and analytical algorithmic software are trained on a dataset of over 120,000 data points collected across 20,000+ participants experiencing diverse mental and emotional states.",
  },
  {
    icon: Target,
    title: "The Accuracy",
    body: "Through continuous baseline testing and computational validation, our platform achieves a verified analytical accuracy rate exceeding 92%.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Human Bias",
    body: "By capturing natural prefrontal cortex micro-voltages without intake questionnaires, the system eliminates therapist observer bias and patient trust barriers.",
  },
];

const metrics = [
  "Attention",
  "Inner Calm",
  "Study Focus",
  "Stress & Anxiety Reduction",
  "Schumann Resonance Alignment",
  "Creative Relaxation",
  "Deep Meditation",
  "Inner Peace",
  "Empathy",
];

const coreBands = [
  { name: "Delta", body: "Biological sleep quality, internal satisfaction, and self-esteem." },
  {
    name: "Theta",
    body: "Thought process, feelings, emotions, rigidness, bluntness, overthinking, negative thinking, emotional thinking and behavioral adaptability.",
  },
  { name: "Alpha", body: "Control over mind, thought balancing, positivity, and visionary." },
  {
    name: "Beta",
    body: "Active logic, intellectual interpretation, learning, grasping, and memory retention.",
  },
  {
    name: "Gamma",
    body: "Implementation, action, reaction, aggression, irritation, anxiety, mood swings, and behavioural regulation states.",
  },
];

const ipRights = [
  {
    icon: Cpu,
    title: "U.S. Patented Algorithmic Engine",
    body: "Powered by technology developed in collaboration with global neuro-tech pioneers, including CTO Francesco Garripoli.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusive Regional Rights",
    body: "Brain Waves Tech holds exclusive software licensing and deployment rights across India and globally.",
  },
  {
    icon: Activity,
    title: "Safe Receiver Architecture",
    body: "The BWT-2508 headset utilises medical-grade dry sensors that operate purely as passive signal receivers, introducing zero electrical currents into the user's brain.",
  },
];

const papers = [
  {
    color: "#14b8a6",
    fileUrl: whitePaperPdf,
    filename: "White Paper - Realtime Brainwave Measurement and Data Analytics.pdf",
    title:
      "Quantitative Brainwave Analysis: Eliminating Human Observer Bias in Mental Health Intake Protocols",
    authors: "Dr. Ankit Gupta, Francesco Garripoli, Dr. Paras Kaul",
    category: "Clinical Psychology | BCI Algorithms",
    abstract:
      "Comparative study evaluating qualitative analytical interviews against automated 0.5Hz Fast Fourier Transform (FFT) prefrontal cortex signal processing. Demonstrates how non-invasive, questionnaire-free intake achieves >92% accuracy across diverse age groups while reducing initial evaluation time from 50 minutes to 2 minutes.",
  },
  {
    color: "#f97316",
    fileUrl: wujiReportPdf,
    filename: "Wuji Report - IIT India Research 2-3.pdf",
    title:
      "Algorithmic Pattern Recognition Across 120,000 Neural Data Points for Mind Parameter Extraction",
    authors: "Brain Waves Tech Data Science Group & WujiTech Research Division",
    category: "Data Science | Neuro-Telemetry",
    abstract:
      "Detailed technical breakdown of the 120,000+ data point benchmark collected across 20,000+ participants in collaboration with IIT India. Explains the mathematical mapping connecting raw Alpha, Beta, Theta, Delta, and Gamma frequency bands to distinct metric indicators including Study Focus, Inner Calm, and Stress Reduction.",
  },
  {
    color: "#a855f7",
    fileUrl: workEfficiencyPdf,
    filename: "Enhancement of Work Efficiency in an Organization by Applying Ergonomics and Sound Waves Sessions.pdf",
    title:
      "Enhancement of Work Efficiency in an Organization by Applying Ergonomics and Sound Waves Sessions",
    authors: "Dr. Ankit Gupta",
    category: "Organizational Wellness | Neuro-Acoustic Therapy",
    abstract:
      "Clinical review and organizational study tracking workplace participants over customized acoustic vibration and ergonomic sessions, proving statistically significant baseline improvements in emotional regulation, focus retention, stress reduction, and employee productivity.",
  },
];

function ResearchPage() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Scientific Research"
        title={
          <>
            <span className="font-medium text-white/60">Grounded in Data.</span>{" "}
            <span className="font-bold text-white">Backed by 120,000+ Neural Data Points.</span>
          </>
        }
        sub="Subjective questionnaires and qualitative surveys are inherently prone to human bias, selective memory, and manipulation. Brain Waves Tech replaces guesswork with raw biological metrics, transforming complex EEG signal processing into verifiable, actionable cognitive parameters in under 2 minutes."
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                data-aos="fade-up"
                data-aos-duration="900"
                className="group rounded-2xl border border-navy/5 bg-white p-6 text-center shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-3xl font-extrabold text-gradient-brand">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-20 font-display text-2xl font-bold text-navy">
            Massive Data Architecture & Algorithmic Benchmarking
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {dataArchitecture.map((d) => (
              <div
                key={d.title}
                data-aos="fade-up"
                data-aos-duration="900"
                className="group relative overflow-hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal via-teal/60 to-teal/20" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <d.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{d.title}</h3>
                <p className="mt-2 [text-wrap:balance] text-sm leading-relaxed text-muted-foreground">
                  {d.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-navy">
              Comprehensive 14-Parameter Neural Mapping
            </h2>
            <p className="mt-3 max-w-3xl [text-wrap:balance] text-sm leading-relaxed text-muted-foreground">
              Our system processes incoming signal telemetry at an intensive 0.5Hz resolution,
              deconstructing raw brainwave frequencies into 14 distinct, measurable parameters.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div data-aos="fade-up" data-aos-duration="900">
              <h3 className="font-display text-lg font-bold text-navy">
                5 Core Frequency Spectrum Bands
              </h3>
              <ul className="mt-6 space-y-4">
                {coreBands.map((band) => (
                  <li key={band.name} className="glass-card rounded-2xl bg-white p-5">
                    <p className="font-display text-sm font-bold text-navy">{band.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {band.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div data-aos="fade-up" data-aos-duration="900" data-aos-delay="120">
              <h3 className="font-display text-lg font-bold text-navy">
                9 Proprietary Metric Indicators
              </h3>
              <p className="mt-3 [text-wrap:balance] text-sm leading-relaxed text-muted-foreground">
                Derived through patented signal-processing models, these metrics convert band
                activity into decision-ready indicators for clinicians, educators and enterprise
                leaders.
              </p>
              <div className="mt-6 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map((m) => (
                  <div
                    key={m}
                    className="group flex items-center justify-center rounded-2xl border border-navy/5 bg-white p-5 text-center shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
                  >
                    <span className="text-sm font-medium text-navy">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="mt-20 font-display text-2xl font-bold text-navy">
            Patented BCI Signal Technology & Global IP Rights
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {ipRights.map((r) => (
              <div
                key={r.title}
                data-aos="fade-up"
                data-aos-duration="900"
                className="glass-card rounded-2xl bg-white p-6"
              >
                <r.icon className="h-6 w-6 text-teal" />
                <h3 className="mt-3 font-display text-base font-bold text-navy">{r.title}</h3>
                <p className="mt-2 [text-wrap:balance] text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </div>
            ))}
          </div>

          <h2 className="mt-20 font-display text-2xl font-bold text-navy">
            Published Research Papers & Clinical Validation Reports
          </h2>
          <div className="mt-6 space-y-6">
            {papers.map((p) => {
              const tags = p.category.split(" | ");
              return (
                <article
                  key={p.title}
                  data-aos="fade-up"
                  data-aos-duration="900"
                  className="group relative overflow-hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)] sm:p-7"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{
                      background: `linear-gradient(to right, ${p.color}, ${p.color}55, ${p.color}15)`,
                    }}
                  />
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center sm:gap-1.5">
                      <a
                        href={p.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-13 w-13 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                        style={{ background: `${p.color}1a`, color: p.color }}
                        title="Open PDF Document"
                        aria-label={`Open ${p.title}`}
                      >
                        <FileText className="h-6 w-6" />
                      </a>
                      <span className="rounded-full bg-navy/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-navy/50">
                        PDF
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-lg font-bold leading-snug text-navy sm:text-xl">
                            <a
                              href={p.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-teal"
                            >
                              {p.title}
                            </a>
                          </h3>
                          <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground/60">
                            {p.filename}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: `${p.color}1a`, color: p.color }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {p.abstract}
                      </p>

                      <div className="mt-5 flex flex-col gap-4 border-t border-navy/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5 shrink-0 text-navy/40" /> {p.authors}
                        </p>

                        <a
                          href={p.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95"
                          style={{ backgroundColor: p.color }}
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Read Full Report</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16">
            <ImpactCallout quote="Analysing 120,000+ neural data points across 20,000+ participants has let us translate raw neural activity into an empirical performance blueprint: repeatable, comparable and free from reporting bias, at over 92% verified analytical accuracy." />
          </div>
        </div>
      </section>

      <JourneyCta />
    </>
  );
}

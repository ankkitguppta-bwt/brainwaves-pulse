import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, FileText, Gauge, History, Target, Timer } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import alphaReport from "@/assets/client/reports/Alpha.png";
import sampleReport from "@/assets/reports/brainwaves-sample-report.pdf";

export const Route = createFileRoute("/products/software")({
  head: () => ({ meta: [{ title: "BWT-1408 Neurofeedback Software | BrainWaves Tech" }] }),
  component: SoftwarePage,
});
const modules = [
  [
    Activity,
    "Real-Time 3D Waveform Rendering",
    "Live Multi-Frequency Visualizer.",
    "Monitor raw micro-volt signals at 0.5 Hz resolution with FFT-powered, live 3D visualization across Alpha, Beta, Gamma, Delta, and Theta. See exactly how the brain responds throughout a two-minute session.",
  ],
  [
    Gauge,
    "The 14-Parameter Decoding Engine",
    "Natural Language AI Interpretation.",
    "The proprietary algorithm converts complex spectral interactions into five fundamental brainwave bands and nine qualitative performance gauges, turning technical EEG data into something genuinely easy to read.",
  ],
  [
    FileText,
    "Automated PDF Report Generation",
    "Complete Clinical-Style Reports in 60 Minutes.",
    "Generate expert-supported, client-facing reports that compare baseline signals with standard population ranges, describe the measured parameters, and support a clear next-step conversation.",
  ],
  [
    History,
    "Cloud-Based Longitudinal Progress Tracking",
    "Historical Session Comparison & Pre/Post Analysis.",
    "Securely compare pre- and post-analysis outputs across 30, 60, and 90 days to document measurable progress over time.",
  ],
] as const;
const bands = [
  ["Alpha", "8–12 Hz", "Control over mind, thought balancing, positivity, and visionary thought."],
  ["Beta", "12–38 Hz", "Active intellect, learning, grasping ability, and memory retention."],
  [
    "Gamma",
    "38–42+ Hz",
    "Action, implementation, processing speed, decision-making, and anxiety markers.",
  ],
  ["Delta", "0.5–3 Hz", "Deep-sleep quality, satisfaction, self-esteem, and physical rest."],
  ["Theta", "3–8 Hz", "Emotional processing, rigidity, overthinking, and creative ideation."],
] as const;
const heroMetrics = [
  [BarChart3, "#14b8a6", "14", "Quantifiable Metrics"],
  [Timer, "#f97316", "2-Min", "Scan & Graphical Output"],
  [Target, "#14b8a6", "92%+", "Reading Accuracy"],
] as const;
const gauges = [
  ["Attention Level", "Real-time active focus and resistance to distractions."],
  ["Study Focus", "Sustained persistence for comprehending and retaining complex material."],
  ["Stress & Anxiety Index", "Sympathetic arousal and high-frequency mental tension."],
  ["Inner Calm", "Non-arousal baseline and the ability to release mental friction."],
  ["Inner Peace", "Deep emotional quietude and stability."],
  ["Schumann Resonance", "Alignment with restorative bio-rhythms."],
  ["Deep Meditation", "Slow-wave entrainment reflecting inward quietude."],
  ["Empathy Quotient", "Emotional openness and interpersonal responsiveness."],
  ["Creative Relaxation", "Fluid, uncensored ideation."],
] as const;
function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="BWT-1408 Software"
        title={
          <>
            <span className="font-medium text-white/60">BWT-1408:</span>{" "}
            <span className="font-bold text-white">Patent-Backed Neurofeedback Software</span>
          </>
        }
        sub="Connect directly to BWT hardware and decode raw brainwave frequencies into 14 quantifiable parameters with more than 92% reading accuracy."
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {heroMetrics.map(([Icon, color, headline, label]) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
                style={{ backgroundImage: `linear-gradient(135deg, #ffffff, ${color}0d)` }}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}1a`, color }}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-4 font-display text-3xl font-bold text-navy">{headline}</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
          >
            Request Live Demo
          </Link>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">
            From Raw Micro-Volts to Actionable Cognitive Baselines.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {modules.map(([Icon, title, headline, body]) => (
              <article key={title} className="rounded-2xl border border-navy/10 p-6">
                <Icon className="h-6 w-6 text-teal" />
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm font-semibold text-teal">{headline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">The 14 Decoded Parameters</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-xl font-bold text-navy">
                Five Fundamental Brainwaves
              </h3>
              <div className="mt-4 space-y-3">
                {bands.map(([name, hz, text]) => (
                  <div key={name} className="rounded-xl bg-white p-4">
                    <p className="font-semibold text-navy">
                      {name} <span className="text-sm text-teal">{hz}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-navy">
                Nine Qualitative Performance Gauges
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {gauges.map(([name, text], i) => (
                  <div
                    key={name}
                    className={`rounded-xl bg-white p-4 ${i === gauges.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <p className="font-semibold text-navy">{name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-background py-16 lg:py-24">
        <div aria-hidden className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-teal/10 blur-[110px]" />
        <div aria-hidden className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)", backgroundSize: "28px 28px", maskImage: "linear-gradient(90deg, black, transparent 75%)" }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-teal">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10"><FileText className="h-3.5 w-3.5" /></span>
              Patent-backed architecture
            </p>
            <div className="mt-5 h-px w-14 bg-gradient-to-r from-teal to-transparent" />
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
              Precision Time-Syncing Protected under Patented Architecture.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-muted-foreground sm:text-base">
              BWT-1408 time-syncs raw brainwave recordings to visual and audio stimuli. Exact
              second-by-second reactions help isolate causal triggers for anxiety, focus breaks, and
              emotional responses.
            </p>
            <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-navy/65"><span className="h-2 w-2 rounded-full bg-teal" /> Time-synchronised neurofeedback analysis</div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(6,36,58,0.7)] transition hover:-translate-y-0.5 hover:bg-navy-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                Request Demo Call
              </Link>
              <a
                href={sampleReport}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-navy/15 bg-white/70 px-6 py-3 text-sm font-semibold text-navy transition hover:-translate-y-0.5 hover:border-teal/50 hover:text-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              >
                View Sample Report (PDF)
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div aria-hidden className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-teal/25 via-transparent to-orange/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-navy/10 bg-white p-2 shadow-[0_28px_60px_-30px_rgba(15,23,42,0.5)] sm:p-3">
              <div className="flex items-center justify-between rounded-t-2xl bg-navy px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/65"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal" /> BWT-1408 report preview</span><span>Sample data</span></div>
              <img src={alphaReport} alt="Sample brainwave analysis report" className="w-full rounded-b-xl" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            Empower Your Practice with Automated Biometric Software.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Eliminate analytic guesswork, track long-term progress, and deliver high-trust brainwave
            reports in minutes.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
            >
              Request Demo Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

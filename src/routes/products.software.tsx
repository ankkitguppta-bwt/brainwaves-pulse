import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, FileText, Gauge, History } from "lucide-react";
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
    "Monitor raw signals at 0.5 Hz resolution with FFT-powered live visualisation across Alpha, Beta, Gamma, Delta, and Theta.",
  ],
  [
    Gauge,
    "The 15-Parameter Decoding Engine",
    "Translate complex spectral interactions into five fundamental bands and ten clear qualitative performance gauges.",
  ],
  [
    FileText,
    "Automated PDF Report Generation",
    "Create expert-supported, client-facing reports that compare baseline signals with standard population ranges.",
  ],
  [
    History,
    "Cloud-Based Longitudinal Progress Tracking",
    "Securely compare pre- and post-analysis outputs across 30, 60, and 90 days to document progress.",
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
const gauges = [
  ["Attention Level", "Real-time active focus and resistance to distractions."],
  ["Study Focus", "Sustained persistence for comprehending and retaining complex material."],
  ["Stress & Anxiety Index", "Sympathetic arousal and high-frequency mental tension."],
  ["Inner Calm", "Non-arousal baseline and the ability to release mental friction."],
  ["Inner Peace", "Deep emotional quietude and stability."],
  ["Schumann Resonance", "Alignment with restorative bio-rhythms."],
  ["Deep Meditation", "Slow-wave entrainment reflecting inward quietude."],
  ["Joy", "Positive emotional valence and neurological contentment."],
  ["Empathy Quotient", "Emotional openness and interpersonal responsiveness."],
  ["Creative Relaxation", "Fluid, uncensored ideation."],
] as const;
function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="BWT-1408 Software"
        title="BWT-1408: Patent-Backed Neurofeedback Software"
        sub="Connect directly to BWT hardware and decode raw brainwave frequencies into 15 quantifiable parameters with more than 92% reading accuracy."
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "15 Quantifiable Metrics",
              "2-Minute Scan & Graphical Output",
              "92%+ Reading Accuracy",
            ].map((x) => (
              <div
                key={x}
                className="rounded-2xl bg-white p-6 text-center font-display text-lg font-bold text-navy"
              >
                {x}
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
            {modules.map(([Icon, title, body]) => (
              <article key={title} className="rounded-2xl border border-navy/10 p-6">
                <Icon className="h-6 w-6 text-teal" />
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">The 15 Decoded Parameters</h2>
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
                Ten Qualitative Performance Gauges
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {gauges.map(([name, text]) => (
                  <div key={name} className="rounded-xl bg-white p-4">
                    <p className="font-semibold text-navy">{name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">
              Patent-backed architecture
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy">
              Precision Time-Syncing Protected under Patented Architecture.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              BWT-1408 time-syncs raw brainwave recordings to visual and audio stimuli. Exact
              second-by-second reactions help isolate causal triggers for anxiety, focus breaks, and
              emotional responses.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
              >
                Request Demo Call
              </Link>
              <a
                href={sampleReport}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-navy/20 px-5 py-3 text-sm font-semibold text-navy"
              >
                View Sample Report (PDF)
              </a>
            </div>
          </div>
          <img
            src={alphaReport}
            alt="Sample brainwave analysis report"
            className="w-full rounded-2xl border border-navy/10"
          />
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
        </div>
      </section>
    </>
  );
}

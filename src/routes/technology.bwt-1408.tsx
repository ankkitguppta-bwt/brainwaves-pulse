import { createFileRoute } from "@tanstack/react-router";
import { Brain, Cpu, FileText, Timer } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import softwareImage from "@/assets/client/software/Step 4.png";

export const Route = createFileRoute("/technology/bwt-1408")({
  head: () => ({ meta: [{ title: "BWT-1408 Neurofeedback Software | BrainWaves Tech" }] }),
  component: SoftwarePage,
});
const specs = [
  [Cpu, "0.5 Hz Signal Resolution Processing"],
  [Brain, "Fast Fourier Transform (FFT) Spectral Analysis"],
  [Timer, "U.S. Patent #9,268,905 B2 Time-Sync Architecture"],
  [FileText, "Automated AI Mind Profile Generation in 2 Minutes"],
] as const;
const pipeline = [
  [
    "High-Speed Sampling & Artifact Stripping",
    "Raw digital EEG packets are ingested at high sampling rates and digitally filtered to isolate genuine cerebral activity from ocular, facial, and ambient artefacts.",
  ],
  [
    "Fast Fourier Transform (FFT) Spectral Decomposition",
    "Continuous voltage traces are decomposed at 0.5 Hz resolution into five fundamental brainwave bandwidths.",
  ],
  [
    "Proprietary Algorithmic Value Mapping",
    "Frequency ratios feed proprietary algorithms that convert complex EEG data into ten qualitative, human-understandable performance gauges.",
  ],
  [
    "Real-Time 3D Rendering & Automated Report Export",
    "Values update live waveform spirals during the two-minute scan and compile into a multi-page AI PDF report at completion.",
  ],
] as const;
const bands = [
  [
    "Alpha",
    "8 – 12 Hz",
    "Non-arousal cortical balance, effortless alertness, thought balancing, positivity, and visionary thought.",
  ],
  [
    "Beta",
    "12 – 38 Hz",
    "Active cognitive engagement, intellectual interpretation, problem-solving, learning, and working-memory retention.",
  ],
  [
    "Gamma",
    "38 – 42+ Hz",
    "High-frequency binding associated with concentration, rapid decision-making, sensory integration, and cognitive load.",
  ],
  [
    "Delta",
    "0.5 – 3 Hz",
    "Deep slow-wave sleep, restorative physical recovery, satisfaction, and baseline self-esteem.",
  ],
  [
    "Theta",
    "3 – 8 Hz",
    "Low-arousal twilight states, emotional processing, fluid ideation, intuition, overthinking, and memory consolidation.",
  ],
] as const;
const gauges = [
  ["Attention Level", "Real-time active mental focus and resistance to external distractions."],
  [
    "Study Focus",
    "Sustained cognitive persistence for comprehending and retaining complex material.",
  ],
  [
    "Stress & Anxiety Index",
    "Sympathetic nervous-system arousal and high-frequency mental tension.",
  ],
  ["Inner Calm", "Non-arousal baseline levels and the brain's ability to release mental friction."],
  ["Inner Peace", "Deep emotional quietude and stability when disengaged from external triggers."],
  [
    "Schumann Resonance (Mind Healing)",
    "Alignment with restorative bio-rhythms and natural self-healing capacity.",
  ],
  ["Deep Meditation", "Slow-wave entrainment reflecting profound inward quietude."],
  ["Joy", "Positive emotional valence and neurological contentment."],
  [
    "Empathy Quotient",
    "Emotional openness, social connectivity, and interpersonal responsiveness.",
  ],
  ["Creative Relaxation", "Fluid, uncensored ideation."],
] as const;
function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="BWT-1408"
        title="BWT 1408: The Neurofeedback Software Technology"
        sub="A platform built on 120,000 data points that converts sub-Hertz EEG streams into five major brainwaves and quantifiable cognitive metrics with FFT analytics and millisecond-precise stimulus synchronisation."
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map(([Icon, label]) => (
              <article key={label} className="rounded-2xl border border-navy/10 bg-white p-6">
                <Icon className="h-6 w-6 text-teal" />
                <p className="mt-4 font-display font-bold text-navy">{label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">
              The algorithmic pipeline
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              From raw micro-volts to useful insight.
            </h2>
            <p className="mt-5 font-semibold text-teal">
              Raw Micro-Volts → 0.5–42+ Hz Processing → Algorithmic Decoding → 15-Parameter Analytic
              Output
            </p>
            <div className="mt-8 space-y-5">
              {pipeline.map(([title, text], i) => (
                <div key={title} className="border-l-2 border-teal pl-5">
                  <p className="text-xs font-bold tracking-wider text-teal">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={softwareImage}
            alt="BWT-1408 software dashboard"
            className="w-full rounded-3xl border border-navy/10"
          />
        </div>
      </section>
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">
            Science of the 15 parameters
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
            Five fundamental brainwave frequencies.
          </h2>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="p-4">Bandwidth</th>
                  <th className="p-4">Frequency Range</th>
                  <th className="p-4">Physiological & Neurological Function</th>
                </tr>
              </thead>
              <tbody>
                {bands.map((row) => (
                  <tr key={row[0]} className="border-t border-navy/10">
                    <th className="p-4 font-semibold text-navy">{row[0]}</th>
                    <td className="p-4 font-medium text-teal">{row[1]}</td>
                    <td className="p-4 text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="mt-16 font-display text-3xl font-bold text-navy sm:text-4xl">
            Ten qualitative algorithmic gauges.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {gauges.map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-navy/10 bg-white p-5">
                <h3 className="font-display font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-navy py-16 text-white lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">Patent deep dive</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Causal neuro-analytics via precision time-stamped stimuli.
          </h2>
          <p className="mt-6 leading-relaxed text-white/75">
            Standard neurofeedback captures state changes without knowing what triggered them.
            Protected under U.S. Patent #9,268,905 B2, BWT-1408 time-synchronizes EEG recording to
            millisecond markers from visual and audio stimuli, including embedded video and YouTube
            streams.
          </p>
          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              [
                "Precise Causal Correlation",
                "Track neural spikes as a participant sees a specific frame or hears a specific tone.",
              ],
              [
                "Variable Reduction",
                "Standardize baseline testing across groups with automated, time-locked playback.",
              ],
              [
                "Advertising & Media Testing",
                "Measure attention drop-offs and emotional engagement in real time.",
              ],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <h3 className="font-display font-bold text-teal">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AudioWaveform, Box, Brain, Cog, Cpu, FileText, Timer, Waves } from "lucide-react";
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
    Waves,
    "High-Speed Sampling & Artifact Stripping",
    "Raw digital EEG packets are ingested at high sampling rates and digitally filtered to isolate genuine cerebral activity from ocular, facial, and ambient artefacts.",
  ],
  [
    AudioWaveform,
    "Fast Fourier Transform (FFT) Spectral Decomposition",
    "Continuous voltage traces are decomposed at 0.5 Hz resolution into five fundamental brainwave bandwidths.",
  ],
  [
    Cog,
    "Proprietary Algorithmic Value Mapping",
    "Frequency ratios feed proprietary algorithms that convert complex EEG data into nine qualitative, human-understandable performance gauges.",
  ],
  [
    Box,
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
  [
    "Empathy Quotient",
    "Emotional openness, social connectivity, and interpersonal responsiveness.",
  ],
  ["Creative Relaxation", "Fluid, uncensored ideation."],
] as const;
function AlgorithmicPipeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        style={{
          background:
            "radial-gradient(ellipse 65% 65% at 70% 45%, rgba(15,23,42,0.07), rgba(168,85,247,0.05) 45%, transparent 75%)",
        }}
      />
      <div
        ref={sectionRef}
        className="relative mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-2 lg:px-8"
      >
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            The algorithmic pipeline
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            From raw micro-volts to useful insight.
          </h2>
          <p className="mt-5 font-semibold text-teal">
            Raw Micro-Volts → 0.5–42+ Hz Processing → Algorithmic Decoding → 14-Parameter Analytic
            Output
          </p>

          <div className="relative mt-10">
            <div
              className="absolute bottom-2 left-5 top-2 w-[3px] rounded-full bg-navy/10"
              aria-hidden
            />
            <div
              className="absolute left-5 top-2 w-[3px] rounded-full bg-gradient-to-b from-teal to-teal/20 shadow-[0_0_12px_-1px_rgba(20,184,166,0.65)] transition-[height] duration-[1400ms] ease-out"
              style={{ height: revealed ? "calc(100% - 16px)" : "0%" }}
              aria-hidden
            />
            <div className="space-y-3">
              {pipeline.map(([Icon, title, text], i) => (
                <div
                  key={title}
                  className={`group relative flex gap-5 rounded-2xl border border-navy/5 bg-navy/[0.02] p-5 transition-all duration-500 ease-out hover:border-teal/25 hover:bg-teal/5 ${
                    revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: revealed ? `${i * 150}ms` : "0ms" }}
                >
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-teal/10 text-teal shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-teal">STEP 0{i + 1}</p>
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug text-navy">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative lg:sticky lg:top-28">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[2.5rem] bg-gradient-to-br from-teal/30 via-[#a855f7]/15 to-orange/20 blur-3xl"
          />
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-navy shadow-[0_30px_80px_-30px_rgba(15,23,42,0.5)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-navy/90 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <img
              src={softwareImage}
              alt="BWT-1408 software dashboard showing live brainwave telemetry spirals"
              className="aspect-[1366/768] w-full bg-navy object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PatentDeepDive() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const capabilities = [
    ["Precise Causal Correlation", "Track neural spikes as a participant sees a specific frame or hears a specific tone."],
    ["Variable Reduction", "Standardize baseline testing across groups with automated, time-locked playback."],
    ["Advertising & Media Testing", "Measure attention drop-offs and emotional engagement in real time."],
  ];

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section ref={sectionRef} className="relative overflow-hidden border-y border-navy/10 bg-white py-16 text-navy lg:py-24">
      <div aria-hidden className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-teal/15 blur-[120px]" />
      <div aria-hidden className="absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-orange/10 blur-[120px]" />
      <div aria-hidden className="absolute inset-0 opacity-55" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 35%, transparent 100%)" }} />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
        <div className={revealed ? "animate-step-in" : "opacity-0"}>
          <p className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.17em] text-teal"><span className="h-1.5 w-1.5 rounded-full bg-teal motion-safe:animate-pulse" /> Patent deep dive</p>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">Causal neuro-analytics via precision time-stamped stimuli.</h2>
          <p className="mt-6 leading-7 text-muted-foreground">
            Standard neurofeedback captures state changes without knowing what triggered them. Protected under U.S. Patent #9,268,905 B2, BWT-1408 time-synchronizes EEG recording to millisecond markers from visual and audio stimuli, including embedded video and YouTube streams.
          </p>
          <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy/55"><span className="h-px w-10 bg-teal" /> Stimulus → timestamp → neural response</div>
        </div>
        <div className="relative">
          <div aria-hidden className={`absolute left-8 right-8 top-8 hidden h-px bg-teal/35 transition-transform duration-[1600ms] ease-out motion-reduce:scale-x-100 sm:block ${revealed ? "scale-x-100" : "scale-x-0"}`} style={{ transformOrigin: "left" }} />
          <div className="grid gap-4 sm:grid-cols-3">
            {capabilities.map(([title, text], index) => (
              <article key={title} className={`group relative rounded-2xl border border-navy/5 bg-white p-5 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_24px_55px_-20px_rgba(15,23,42,0.42)] ${revealed ? "animate-step-in" : "opacity-0"}`} style={{ animationDelay: `${220 + index * 180}ms` }}>
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-teal/35 bg-teal/10 font-display text-sm font-bold text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white">0{index + 1}</span>
                <h3 className="mt-5 font-display text-base font-bold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
    <div aria-hidden className="h-12 border-b border-navy/10 bg-background sm:h-16" />
    </>
  );
}

function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="BWT-1408"
        title={
          <>
            <span className="font-medium text-white/60">BWT 1408:</span>{" "}
            <span className="font-bold text-white">The Neurofeedback Software Technology</span>
          </>
        }
        sub="A platform built on 120,000 data points that converts sub-Hertz EEG streams into five major brainwaves and quantifiable cognitive metrics with FFT analytics and millisecond-precise stimulus synchronisation."
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map(([Icon, label], i) => {
              const isPatent = i === 2;
              return (
                <article
                  key={label}
                  className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)] ${
                    isPatent ? "border-orange/20" : "border-navy/5"
                  }`}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
                      isPatent
                        ? "from-orange via-orange/60 to-orange/20"
                        : "from-teal via-teal/60 to-teal/20"
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    {isPatent && (
                      <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-orange">
                        Patented
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-display font-bold leading-snug text-navy">{label}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <AlgorithmicPipeline />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">
            Science of the 14 parameters
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
            Nine qualitative algorithmic gauges.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {gauges.map(([title, text], i) => (
              <article
                key={title}
                className={`rounded-2xl border border-navy/10 bg-white p-5 ${i === gauges.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <h3 className="font-display font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PatentDeepDive />
    </>
  );
}

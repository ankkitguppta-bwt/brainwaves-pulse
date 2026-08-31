import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AudioWaveform,
  Box,
  Brain,
  Cog,
  Cpu,
  FileText,
  Maximize2,
  Timer,
  Waves,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import step1 from "@/assets/client/software/Step 1.jpg";
import step2 from "@/assets/client/software/Step 2.png";
import step3 from "@/assets/client/software/Step 3.png";
import step4 from "@/assets/client/software/Step 4.png";
import step5 from "@/assets/client/software/Step 5.png";
import step6 from "@/assets/client/software/Step 6.png";
import step7 from "@/assets/client/software/Step 7.png";

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
  {
    step: "STEP 01",
    badge: "Hardware Telemetry",
    title: "Headband Placement & Sensor Grounding",
    text: "Deploy the non-invasive dry electrode hardware comfortably across the prefrontal cortex to capture clean, raw micro-volt EEG signals.",
    image: step1,
    Icon: Waves,
  },
  {
    step: "STEP 02",
    badge: "Module Selection",
    title: "Session Configuration & Module Selection",
    text: "Launch the BWT-1408 software suite and choose from targeted training modules, baseline assessments, or multimedia mind sessions.",
    image: step2,
    Icon: Cog,
  },
  {
    step: "STEP 03",
    badge: "Signal Calibration",
    title: "Wireless Telemetry & Real-Time Sync",
    text: "Establish zero-delay wireless communication while the software automatically verifies signal integrity and strips ocular and ambient artifacts.",
    image: step3,
    Icon: AudioWaveform,
  },
  {
    step: "STEP 04",
    badge: "Live 3D Interface",
    title: "Brain Connection & 3D Waveform Initialization",
    text: "Real-time connection is confirmed, initializing live 3D waveform spirals across 5 fundamental bandwidths and 9 qualitative gauges.",
    image: step4,
    Icon: Brain,
  },
  {
    step: "STEP 05",
    badge: "Spectral Analysis",
    title: "Live 2-Minute FFT Spectral Decomposition",
    text: "Sub-Hertz frequency ratios are continuously analyzed at 0.5 Hz resolution as live neural spikes dynamically move the interactive frequency helixes.",
    image: step5,
    Icon: Cpu,
  },
  {
    step: "STEP 06",
    badge: "Data Aggregation",
    title: "Comprehensive Session Completion",
    text: "Complete the 2-minute scan capturing continuous EEG data points, mapping cognitive resilience, attention, calm, and inner peace.",
    image: step6,
    Icon: Timer,
  },
  {
    step: "STEP 07",
    badge: "Mind Profile",
    title: "Instant Session Records & Automated Report Export",
    text: "Export instant Mind Profile reports, compare historical neuro-trends, and formulate targeted sound therapy interventions.",
    image: step7,
    Icon: Box,
  },
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
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string; badge: string } | null>(
    null,
  );

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28">
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-2/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal motion-safe:animate-pulse" />
            The algorithmic pipeline
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            From raw micro-volts to useful insight.
          </h2>
          <p className="mt-4 text-sm font-semibold text-teal sm:text-base">
            Raw Micro-Volts → 0.5–42+ Hz Processing → Algorithmic Decoding → 14-Parameter Analytic Output
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Explore the complete 7-stage neurofeedback workflow, from dry-sensor telemetry to real-time 3D frequency helix rendering and automated AI Mind Profile reporting.
          </p>
        </div>

        {/* 7 Step-by-Step Simultaneous Cards */}
        <div className="mt-16 space-y-12 sm:mt-20 sm:space-y-16 lg:space-y-20">
          {pipeline.map((item, index) => {
            const Icon = item.Icon;
            const isEven = index % 2 === 1;

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-navy/10 bg-white p-6 shadow-[0_15px_45px_-20px_rgba(15,23,42,0.15)] transition-all duration-300 hover:border-teal/30 hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10"
              >
                <div
                  className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${
                    isEven ? "lg:grid-flow-dense" : ""
                  }`}
                >
                  {/* Text Details Column */}
                  <div
                    className={`flex flex-col justify-center lg:col-span-5 ${
                      isEven ? "lg:col-start-8" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal/10 text-teal font-bold transition-all duration-300 group-hover:bg-teal group-hover:text-white group-hover:scale-105">
                        <Icon className="h-5 w-5" strokeWidth={2.2} />
                      </span>
                      <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-navy sm:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.text}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-teal">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                      <span>Simultaneous Real-Time Telemetry</span>
                    </div>
                  </div>

                  {/* Image Display Column */}
                  <div className={`lg:col-span-7 ${isEven ? "lg:col-start-1" : ""}`}>
                    <div className="overflow-hidden rounded-2xl border border-navy/15 bg-navy shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)] transition-all duration-500 group-hover:shadow-[0_25px_65px_-15px_rgba(15,23,42,0.6)]">
                      {/* Top Window Bar with traffic light dots */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-navy/90 px-4 py-3 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="text-[11px] font-medium text-white/70">
                          {item.badge}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setZoomImage({
                              src: item.image,
                              title: item.title,
                              badge: item.badge,
                            })
                          }
                          className="grid h-6 w-6 place-items-center rounded text-white/60 transition hover:bg-white/10 hover:text-white"
                          title="Click to enlarge"
                          aria-label="Click to enlarge screenshot"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Image container */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                          setZoomImage({
                            src: item.image,
                            title: item.title,
                            badge: item.badge,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setZoomImage({
                              src: item.image,
                              title: item.title,
                              badge: item.badge,
                            });
                          }
                        }}
                        className="group/img relative aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-slate-950 focus-visible:outline-none"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover/img:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/85 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg">
                            <Maximize2 className="h-3.5 w-3.5 text-teal" /> Enlarge View
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Dialog open={!!zoomImage} onOpenChange={(open) => !open && setZoomImage(null)}>
        <DialogContent className="max-h-[95svh] w-[calc(100%-1rem)] max-w-6xl overflow-hidden border-white/15 bg-navy p-3 text-white sm:w-[calc(100%-2rem)] sm:p-5">
          {zoomImage && (
            <>
              <div className="mb-3 px-2">
                <p className="text-xs font-bold uppercase tracking-widest text-teal">
                  {zoomImage.badge}
                </p>
                <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                  {zoomImage.title}
                </h3>
              </div>
              <div className="relative flex max-h-[78svh] items-center justify-center overflow-hidden rounded-xl bg-black/60 p-1">
                <img
                  src={zoomImage.src}
                  alt={zoomImage.title}
                  className="max-h-[78svh] w-full object-contain"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
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
      <section
        ref={sectionRef}
        className="relative overflow-hidden border-y border-navy/10 bg-white py-16 text-navy lg:py-24"
      >
        <div
          aria-hidden
          className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-teal/15 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-orange/10 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.05) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 35%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div className={revealed ? "animate-step-in" : "opacity-0"}>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-4xl">
              Causal neuro-analytics via precision time-stamped stimuli.
            </h2>
            <p className="mt-6 leading-7 text-muted-foreground">
              Standard neurofeedback captures state changes without knowing what triggered them.
              Protected under U.S. Patent #9,268,905 B2, BWT-1408 time-synchronizes EEG recording to
              millisecond markers from visual and audio stimuli, including embedded video and
              YouTube streams.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy/55">
              <span className="h-px w-10 bg-teal" /> Stimulus → timestamp → neural response
            </div>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className={`absolute left-8 right-8 top-8 hidden h-px bg-teal/35 transition-transform duration-[1600ms] ease-out motion-reduce:scale-x-100 sm:block ${
                revealed ? "scale-x-100" : "scale-x-0"
              }`}
              style={{ transformOrigin: "left" }}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {capabilities.map(([title, text], index) => (
                <article
                  key={title}
                  className={`group relative rounded-2xl border border-navy/5 bg-white p-5 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/35 hover:shadow-[0_24px_55px_-20px_rgba(15,23,42,0.42)] ${
                    revealed ? "animate-step-in" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${220 + index * 180}ms` }}
                >
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-teal/35 bg-teal/10 font-display text-sm font-bold text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white">
                    0{index + 1}
                  </span>
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
                className={`rounded-2xl border border-navy/10 bg-white p-5 ${
                  i === gauges.length - 1 ? "sm:col-span-2" : ""
                }`}
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

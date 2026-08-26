import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { ArrowRight, AudioLines, CheckCircle2, Ear, Moon, ScanLine, Waves } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/products/sound-therapy")({
  head: () => ({ meta: [{ title: "Customised Sound Therapy | BrainWaves Tech" }] }),
  component: SoundTherapyPage,
});

const pillars = [
  [
    Ear,
    "The Hearing Dominance",
    "Sound is processed and acted on by the brain in milliseconds, making acoustic frequencies one of the fastest routes to neural influence. A precisely structured soundscape can support the brain without requiring active effort during the day.",
  ],
  [
    Waves,
    "Tatva & Frequency Fusion",
    "We blend neuro-frequency entrainment with Vedic Panchtatva acoustic combinations to support the parameters identified in your analysis. Each soundtrack is built around the brainwave patterns and cognitive bottlenecks found during the scan.",
  ],
  [
    Moon,
    "Zero Effort Required",
    "Play your custom soundtrack through headphones each night for 60 days while you rest. The protocol is designed to fit naturally into an existing sleep routine, with no pills, invasive treatment, or daytime exercises required.",
  ],
] as const;
const stages = [
  {
    icon: ScanLine,
    label: "Stage 1",
    title: "Identification & Mapping",
    steps: [
      ["The Scan", "A two-minute, non-invasive BWT brainwave scan."],
      [
        "The Findings",
        "BWT-1408 pinpoints overthinking, focus blocks, suppressed Delta, elevated stress markers, and other measured bottlenecks.",
      ],
    ],
  },
  {
    icon: AudioLines,
    label: "Stage 2",
    title: "Custom Sound Engineering",
    steps: [
      [
        "The Composition",
        "A multi-layered soundtrack calibrated to support and rebalance the flagged parameters identified in your brainwave profile.",
      ],
      ["The Protocol", "Listen nightly for 60 days."],
      ["The Post-Scan", "A second scan objectively measures change."],
    ],
  },
] as const;
function SoundTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="Customised Solutions"
        title="Targeted Sound Therapy Engineered for Your Specific Brainwave DNA"
        sub="No two brains burn out the same way. We use your 14-parameter brainwave analysis to engineer a 60-day personalised frequency soundtrack for your measured needs."
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "100% Drug-Free & Non-Invasive",
              "Mapped to Your Unique Brainwave Baseline",
              "Lifelong Personalised Nightly Protocol",
              "Pre & Post Objective Progress Tracking",
            ].map((x) => (
              <div
                key={x}
                className="group flex items-center gap-4 rounded-2xl border border-navy/5 bg-white p-5 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <span className="font-semibold text-navy">{x}</span>
              </div>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
          >
            Schedule a Call
          </Link>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy">
            Why Sound is the Fastest Gateway to Neural Alignment.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {pillars.map(([Icon, title, body]) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal via-teal/60 to-teal/20" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-background py-16">
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
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[110px]"
        />
        <div className="relative mx-auto max-w-4xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy">
            The 2-Stage Remediation Process
          </h2>
          <div className="mt-10 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            {stages.map((stage, stageIndex) => (
              <Fragment key={stage.title}>
                <article className="group relative flex flex-col rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal transition-transform duration-300 group-hover:scale-110">
                      <stage.icon className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-teal shadow-[0_0_20px_-6px_rgba(20,184,166,0.5)]">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-teal text-[9px] font-bold text-white">
                        {stageIndex + 1}
                      </span>
                      {stage.label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-navy">{stage.title}</h3>
                  <div className="mt-5 space-y-4">
                    {stage.steps.map(([label, text]) => (
                      <div key={label} className="border-l-2 border-teal/20 pl-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-teal">
                          {label}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
                {stageIndex === 0 && (
                  <div className="flex items-center justify-center py-1 md:py-0">
                    <span className="flex h-10 w-10 rotate-90 items-center justify-center rounded-full border border-teal/30 bg-teal/10 text-teal shadow-[0_0_20px_-4px_rgba(20,184,166,0.5)] md:rotate-0">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            Rewire Your Mind with Precision Sound Frequencies.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Experience how customised acoustic entrainment can support sleep, focus, and emotional
            balance.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
          >
            Schedule a Call
          </Link>
        </div>
      </section>
    </>
  );
}

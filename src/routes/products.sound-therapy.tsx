import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/products/sound-therapy")({
  head: () => ({ meta: [{ title: "Customised Sound Therapy | BrainWaves Tech" }] }),
  component: SoundTherapyPage,
});

const pillars = [
  [
    "The Hearing Dominance",
    "Sound is processed and acted on by the brain in milliseconds, making acoustic frequencies a rapid route to neural influence.",
  ],
  [
    "Tatva & Frequency Fusion",
    "We blend neuro-frequency entrainment with Vedic Panchtatva acoustic combinations to support the parameters identified in your analysis.",
  ],
  [
    "Zero Effort Required",
    "Play your custom soundtrack through headphones each night for 60 days while you rest.",
  ],
];
function SoundTherapyPage() {
  return (
    <>
      <PageHero
        eyebrow="Customised Solutions"
        title="Targeted Sound Therapy Engineered for Your Specific Brainwave DNA"
        sub="No two brains burn out the same way. We use your 15-parameter brainwave analysis to engineer a 60-day personalised frequency soundtrack for your measured needs."
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
              <div key={x} className="flex items-center gap-3 rounded-2xl bg-white p-5">
                <CheckCircle2 className="h-5 w-5 text-teal" />
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
            {pillars.map(([title, body], i) => (
              <article key={title} className="rounded-2xl border border-navy/10 p-6">
                <span className="font-display text-2xl font-bold text-teal">0{i + 1}</span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy">
            The 2-Stage Remediation Process
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-teal">Stage 1</p>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">
                Identification & Mapping
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <b className="text-navy">The Scan:</b> A two-minute, non-invasive BWT brainwave
                  scan.
                </li>
                <li>
                  <b className="text-navy">The Findings:</b> BWT-1408 pinpoints overthinking, focus
                  blocks, suppressed Delta, and other measured bottlenecks.
                </li>
              </ul>
            </article>
            <article className="rounded-2xl bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-teal">Stage 2</p>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">
                Custom Sound Engineering
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <b className="text-navy">The Composition:</b> A multi-layered soundtrack
                  calibrated to rebalance flagged parameters.
                </li>
                <li>
                  <b className="text-navy">The Protocol:</b> Listen nightly for 60 days.
                </li>
                <li>
                  <b className="text-navy">The Post-Scan:</b> A second scan objectively measures
                  change.
                </li>
              </ul>
            </article>
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

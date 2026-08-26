import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { Lightbulb, Target, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ImpactCallout } from "@/components/site/ImpactCallout";
import { JourneyCta } from "@/components/site/JourneyCta";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Mission — BrainWaves Tech" },
      {
        name: "description",
        content:
          "Transforming mental healthcare: BrainWaves Tech replaces qualitative guesswork with quantified, clinical-grade brainwave parameters for practitioners and enterprises.",
      },
      { property: "og:title", content: "Our Mission — BrainWaves Tech" },
      {
        property: "og:description",
        content:
          "From a 2013 field observation to a patented B2B neurofeedback ecosystem — the mission behind BrainWaves Tech.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: MissionPage,
});

function highlightStats(text: string) {
  const parts = text.split(/(\d[\d,]*\+)/g);
  return parts.map((part, i) =>
    /^\d[\d,]*\+$/.test(part) ? (
      <span key={i} className="font-bold text-teal">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const chapters = [
  {
    n: "01",
    icon: Lightbulb,
    title: "The Origin: Driven by Compassion & Problem-Solving",
    points: [
      {
        label: "The Blueprint",
        body: "In 2013, while mentoring students under the NSDC program, Dr. Gupta observed and experienced that people need mental health services but are not able to access them because they don't know what their real problems are, who can address them, and how they can overcome them.",
      },
      {
        label: "The Realization",
        body: "With rigorous research and field work, he arrived at a patented neurofeedback solution which not only analyses the state of mind but also provides a customised soundtrack solution followed by post brainwave analysis.",
      },
    ],
  },
  {
    n: "02",
    icon: TrendingUp,
    title: "The Scalable B2B Mandate",
    points: [
      {
        label: "The Transition",
        body: "After successfully providing direct clinical analysis and customized remedies to over 12,000+ individuals and groups, the physical limits of a single B2C clinic (The Brain Seeder) became clear.",
      },
      {
        label: "The Mission Scale",
        body: "Today, Brain Waves Tech operates on a strategic B2B framework. By equipping individual practitioners, educational institutions, and corporate enterprises with patented software, neurofeedback hardware, and accredited training, we scale objective mental wellness across thousands of communities simultaneously.",
      },
    ],
  },
  {
    n: "03",
    icon: Target,
    title: "The 3-Year Strategic Horizon",
    points: [
      {
        label: "Targeted Reach",
        body: "Mental health is the defining challenge of our generation, affecting students, corporate leaders, defence personnel, and families alike.",
      },
      {
        label: "Our Goal",
        body: "To deploy our patented neurofeedback technology across 1,000+ accredited B2B practitioners and 500+ enterprise corporate ecosystems within the next three years, ensuring empirical mental health care is accessible across India and globally.",
      },
    ],
  },
];

function MissionPage() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Our Mission"
        title={
          <>
            <span className="font-medium text-white/60">Transforming Mental Healthcare:</span>{" "}
            <span className="font-bold text-white">
              Where Advanced Neuroscience Meets Human Potential
            </span>
          </>
        }
        sub="Mental health management has long relied on qualitative surveys, self-reporting, and prolonged diagnostic cycles that can be error-prone and time-consuming. We exist to eliminate the guesswork by analysing raw, real-time brainwave activity into quantified, clinical-grade parameters that empower professionals and organizations to find the root cause of psychological issues in minutes."
      />

      <section className="relative overflow-hidden bg-background py-16 lg:py-24">
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
          className="pointer-events-none absolute -left-32 top-1/4 h-[380px] w-[380px] rounded-full bg-teal/10 blur-[110px]"
        />
        <div className="relative mx-auto max-w-5xl px-4 lg:px-8">
          <div ref={timelineRef} className="relative">
            <div
              aria-hidden
              className="absolute bottom-7 left-7 top-7 w-[3px] rounded-full bg-navy/10 sm:left-8"
            />
            <div
              aria-hidden
              className="absolute left-7 top-7 w-[3px] rounded-full bg-gradient-to-b from-teal to-teal/20 shadow-[0_0_12px_-1px_rgba(20,184,166,0.65)] transition-[height] duration-[1600ms] ease-out sm:left-8"
              style={{ height: revealed ? "calc(100% - 56px)" : "0%" }}
            />
            <div className="space-y-10">
              {chapters.map((c, i) => {
                return (
                  <div
                    key={c.n}
                    className={`group/timeline relative flex items-center gap-5 transition-all duration-700 ease-out sm:gap-6 ${
                      revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: revealed ? `${i * 180}ms` : "0ms" }}
                  >
                    <div className="relative z-10 shrink-0">
                      <span
                        className={`about-timeline-icon flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-teal bg-white text-teal shadow-[0_0_0_6px_rgba(20,184,166,0.11)] transition-all duration-300 group-hover/timeline:scale-110 group-hover/timeline:bg-teal group-hover/timeline:text-white sm:h-16 sm:w-16 ${
                          revealed ? "about-timeline-icon--revealed" : ""
                        }`}
                        style={{ animationDelay: `${i * 180 + 120}ms` }}
                      >
                        <c.icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div
                      className="relative flex-1 overflow-hidden rounded-3xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/20 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)] sm:p-8"
                    >
                      <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
                        {c.title}
                      </h2>
                      <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        {c.points.map((p, pi) => (
                          <div key={p.label} className="relative">
                            {pi === 1 && (
                              <span
                                aria-hidden
                                className="absolute -left-[1.65rem] top-1/2 hidden -translate-y-1/2 text-navy/20 sm:block"
                              >
                                →
                              </span>
                            )}
                            <div className="h-full rounded-2xl bg-navy/[0.025] p-5">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-teal">
                                {p.label}
                              </p>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {highlightStats(p.body)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <ImpactCallout
              quote="What people say can be influenced by perception; what the brain reveals is objective. Understanding the mind first enables more accurate counselling and personalized care."
              author="Dr. Gupta, Founder & CEO"
            />
          </div>
        </div>
      </section>

      <JourneyCta />
    </>
  );
}

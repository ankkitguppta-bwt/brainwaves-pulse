import { createFileRoute } from "@tanstack/react-router";
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

const chapters = [
  {
    n: "01",
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
  return (
    <>
      <PageHero
        eyebrow="Our Mission"
        title="Transforming Mental Healthcare: Where Advanced Neuroscience Meets Human Potential"
        sub="Mental health management has long relied on qualitative surveys, self-reporting, and prolonged diagnostic cycles that can be error-prone and time-consuming. We exist to eliminate the guesswork — analysing raw, real-time brainwave activity into quantified, clinical-grade parameters that empower professionals and organizations to find the root cause of psychological issues in minutes."
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="space-y-10">
            {chapters.map((c) => (
              <div
                key={c.n}
                data-aos="fade-up"
                data-aos-duration="900"
                className="glass-card rounded-3xl bg-white p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-3xl font-bold text-teal">{c.n}</span>
                  <h2 className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">
                    {c.title}
                  </h2>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {c.points.map((p) => (
                    <div key={p.label} className="rounded-2xl border border-navy/10 p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange">
                        {p.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

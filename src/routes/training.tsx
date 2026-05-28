import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BannerSection } from "@/components/site/BannerSection";
import bannerTraining from "@/assets/banners/banner-training.png";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Certified Neurofeedback Practitioner Training | BrainWaves Tech" },
      { name: "description", content: "7-day intensive training, practical sessions, hardware & software orientation, 3 months handholding support and certification." },
      { property: "og:title", content: "Certified Neurofeedback Practitioner Training" },
      { property: "og:description", content: "Become a certified neurofeedback practitioner in 7 days with ongoing mentorship." },
      { property: "og:url", content: "/training" },
    ],
    links: [{ rel: "canonical", href: "/training" }],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  const bullets = [
    "7 Days Intensive Training", "Practical Neurofeedback Sessions",
    "Brainwave Report Interpretation", "Hardware + Software Orientation",
    "3 Months Professional Support", "Certificate after completion",
  ];
  return (
    <>
      <PageHero
        eyebrow="Practitioner Training"
        title="Become a Certified Neurofeedback Practitioner"
        sub="An intensive, hands-on programme blending theory, practice and mentorship for psychologists, counselors and wellness professionals."
      />
      <BannerSection
        src={bannerTraining}
        alt="Become a Certified Neurofeedback Practitioner"
        cta={{ to: "/contact", label: "Talk to an expert" }}
      />
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <ul className="glass-card grid gap-3 rounded-2xl p-6 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-navy">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {b}
              </li>
            ))}
          </ul>
          <div>
            <h2 className="font-display text-3xl font-bold text-navy">What you'll learn</h2>
            <p className="mt-3 text-muted-foreground">
              Neurofeedback fundamentals, brainwave physiology, EEG capture, live session protocols,
              report interpretation, sound therapy prescription and ethical practice.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">Apply for Training</Link>
              <Link to="/contact" className="rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold text-navy">Talk to Program Advisor</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

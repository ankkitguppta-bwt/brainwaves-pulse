import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Cpu } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import hardwareImage from "@/assets/client/hardware/bwt-1.png";
import softwareImage from "@/assets/client/software/Step 4.png";

export const Route = createFileRoute("/technology/")({
  head: () => ({ meta: [{ title: "Neurofeedback Technology | BrainWaves Tech" }] }),
  component: TechnologyPage,
});

const products = [
  {
    to: "/technology/bwt-2508",
    eyebrow: "BWT-2508",
    title: "Neurofeedback Hardware",
    body: "The dry-sensor hardware platform engineered to capture clean, real-time brainwave telemetry from the prefrontal cortex.",
    image: hardwareImage,
    Icon: Brain,
  },
  {
    to: "/technology/bwt-1408",
    eyebrow: "BWT-1408",
    title: "Neurofeedback Software",
    body: "The analytical engine that turns raw EEG streams into five brainwaves and 15 actionable cognitive parameters in two minutes.",
    image: softwareImage,
    Icon: Cpu,
  },
] as const;

function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="The BrainWaves Technology Platform"
        sub="Explore the dedicated BWT-2508 hardware and BWT-1408 software systems behind our neurofeedback workflow."
      />
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-7 px-4 lg:grid-cols-2 lg:px-8">
          {products.map(({ to, eyebrow, title, body, image, Icon }) => (
            <article
              key={to}
              className="group overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm"
            >
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-7 sm:p-8">
                <Icon className="h-7 w-7 text-teal" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-teal">
                  {eyebrow}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold text-navy">{title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
                <Link
                  to={to}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal hover:text-navy"
                >
                  Explore {eyebrow}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

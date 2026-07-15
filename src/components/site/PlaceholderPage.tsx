import { Link } from "@tanstack/react-router";
import { ArrowRight, Construction } from "lucide-react";
import { BrainwaveBackdrop } from "@/components/site/BrainwaveBackdrop";

export interface PlaceholderSection {
  title: string;
  body: string;
}

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  sections?: PlaceholderSection[];
  ctaLabel?: string;
  ctaTo?: string;
}

export function PlaceholderPage({
  eyebrow,
  title,
  subtitle = "This page is scaffolded with placeholder content. Final copy, imagery and layout ship in a later phase.",
  sections = [],
  ctaLabel = "Book a Demo",
  ctaTo = "/contact",
}: Props) {
  return (
    <>
      <section className="relative -mt-16 overflow-hidden bg-gradient-hero pt-16 text-white">
        <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 lg:px-8 lg:pb-20 lg:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal">
            <Construction className="h-3.5 w-3.5" /> {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">{subtitle}</p>
          <div className="mt-8">
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy shadow-brand"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      {sections.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
            {sections.map((s) => (
              <div key={s.title} className="glass-card rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                <p className="mt-4 text-[10px] uppercase tracking-wider text-orange">Placeholder</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

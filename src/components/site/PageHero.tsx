import { Link } from "@tanstack/react-router";
import { BrainwaveBackdrop } from "@/components/site/BrainwaveBackdrop";

export function PageHero({
  eyebrow, title, sub, cta,
}: { eyebrow: string; title: string; sub?: string; cta?: { to: string; label: string } }) {
  return (
    <section className="relative -mt-16 overflow-hidden bg-gradient-hero pt-16 text-white">
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-40" />
      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-12 text-center lg:px-8 lg:pb-20 lg:pt-16">
        <span className="inline-block rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">{eyebrow}</span>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-2xl text-white/75">{sub}</p>}
        {cta && (
          <Link to={cta.to} className="mt-8 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

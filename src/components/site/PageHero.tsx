import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { BrainwaveBackdrop } from "@/components/site/BrainwaveBackdrop";

export function PageHero({
  eyebrow, title, sub, cta,
  eyebrowClassName, titleClassName, subClassName,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  cta?: { to: string; label: string };
  /** Per-instance typography overrides — omit to keep this hero's existing default styling. */
  eyebrowClassName?: string;
  titleClassName?: string;
  subClassName?: string;
}) {
  return (
    <section className="relative -mt-16 overflow-hidden bg-gradient-hero pt-16 text-white">
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-40" />
      <div className="relative mx-auto max-w-4xl px-4 pb-16 pt-12 text-center lg:px-8 lg:pb-20 lg:pt-16">
        <span
          className={
            eyebrowClassName ??
            "inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-teal shadow-[0_0_30px_-4px_rgba(20,184,166,0.6)]"
          }
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
          {eyebrow}
        </span>
        <h1
          className={
            titleClassName ??
            "mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-white [text-wrap:balance] sm:text-5xl lg:text-[3.25rem]"
          }
        >
          {title}
        </h1>
        {sub && (
          <p className={subClassName ?? "mx-auto mt-7 max-w-xl text-base leading-[1.55] text-white/70"}>
            {sub}
          </p>
        )}
        {cta && (
          <Link to={cta.to} className="mt-8 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}

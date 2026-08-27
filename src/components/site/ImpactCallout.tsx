import { Quote, Sparkles } from "lucide-react";

interface ImpactCalloutProps {
  quote: string;
  author?: string;
  role?: string;
  image?: string;
  badge?: string;
}

export function ImpactCallout({
  quote,
  author,
  role,
  image,
  badge,
}: ImpactCalloutProps) {
  // If an image is provided, render the modern visual card with photo & glow frame
  if (image) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-teal/30 bg-gradient-to-br from-navy via-[#0c1f38] to-navy p-6 shadow-2xl transition-all duration-300 sm:p-10 lg:p-12">
        {/* Ambient background glow accents */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Watermark Quote Icon */}
        <Quote className="pointer-events-none absolute right-4 top-4 h-32 w-32 text-teal/[0.05] sm:h-44 sm:w-44" />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center lg:gap-12">
          {/* Author Image with Modern Glow Frame */}
          <div className="relative shrink-0 self-center md:self-auto">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal via-cyan-400 to-teal/20 opacity-40 blur-lg transition duration-500 hover:opacity-75" />

            <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-teal/40 bg-navy/80 shadow-2xl sm:h-56 sm:w-56 lg:h-64 lg:w-64">
              <img
                src={image}
                alt={author || "Dr. Ankit Gupta"}
                className="h-full w-full object-cover object-top transition duration-500 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
            </div>

            {badge && (
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-teal/40 bg-navy px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-teal shadow-lg backdrop-blur-md">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
                {badge}
              </span>
            )}
          </div>

          {/* Quote Content Block */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Guiding Philosophy</span>
            </div>

            <blockquote className="relative">
              <p className="font-display text-lg font-medium leading-relaxed text-slate-100 sm:text-xl lg:text-2xl">
                “{quote}”
              </p>
            </blockquote>

            {(author || role) && (
              <div className="mt-6 border-t border-teal/20 pt-4">
                {author && (
                  <h4 className="font-display text-lg font-bold text-white sm:text-xl">
                    {author}
                  </h4>
                )}
                {role && (
                  <p className="text-xs font-medium text-teal sm:text-sm">
                    {role}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render clean text-only layout
  return (
    <div className="relative overflow-hidden rounded-3xl border border-teal/25 bg-navy px-6 py-10 text-white sm:px-10">
      <Quote className="absolute -right-2 -top-2 h-24 w-24 text-teal/10" />
      <p className="relative font-display text-lg leading-relaxed sm:text-xl">
        {quote}
      </p>
      {author && (
        <p className="relative mt-5 text-sm font-semibold uppercase tracking-wider text-teal">
          {author}
        </p>
      )}
    </div>
  );
}

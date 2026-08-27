import { Quote, Sparkles, CheckCircle2 } from "lucide-react";

interface ImpactCalloutProps {
  quote: string;
  author?: string;
  role?: string;
  image?: string;
}

export function ImpactCallout({
  quote,
  author,
  role,
  image,
}: ImpactCalloutProps) {
  // If an image is provided, render an executive editorial separated layout
  if (image) {
    return (
      <div className="relative mx-auto my-6 max-w-5xl">
        {/* Subtle ambient light aura */}
        <div className="pointer-events-none absolute -left-12 -top-12 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Large Editorial Portrait (Separated from the card) */}
          <div className="mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
            <div className="group relative overflow-hidden rounded-[2rem] border-2 border-teal/30 bg-navy shadow-[0_25px_60px_-15px_rgba(6,36,58,0.35)] transition-transform duration-500 hover:scale-[1.02]">
              {/* Image Aspect Box */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={image}
                  alt={author || "Dr. Ankit Gupta"}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                  loading="eager"
                />
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              </div>

              {/* Elegant floating photo caption overlay */}
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-navy/85 p-3.5 shadow-lg backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display text-sm font-bold text-white sm:text-base">
                      {author || "Dr. Ankit Gupta"}
                    </h4>
                    <p className="text-[11px] font-medium text-teal sm:text-xs">
                      Founder & CEO • BrainWaves Tech
                    </p>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-teal/15 text-teal">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller, Compact Floating Luxury Quote Card */}
          <div className="w-full lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-teal/30 bg-gradient-to-br from-[#06243a] via-[#092e49] to-[#06243a] p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-9">
              {/* Subtle Watermark Quote Mark */}
              <Quote className="pointer-events-none absolute right-4 top-4 h-24 w-24 text-teal/[0.06] sm:h-32 sm:w-32" />

              <div className="relative z-10">
                <blockquote className="relative">
                  <p className="font-display text-base font-normal leading-relaxed text-slate-100 sm:text-lg lg:text-xl lg:leading-snug">
                    “{quote}”
                  </p>
                </blockquote>

                {/* Author Signature Section */}
                <div className="mt-6 border-t border-teal/20 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-display text-base font-bold text-white sm:text-lg">
                        {author || "Dr. Ankit Gupta"}
                      </p>
                      {role && (
                        <p className="text-xs font-medium text-teal sm:text-sm">
                          {role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render clean text-only layout
  return (
    <div className="relative overflow-hidden rounded-3xl border border-teal/25 bg-navy px-6 py-8 text-white sm:px-10">
      <Quote className="absolute -right-2 -top-2 h-20 w-20 text-teal/10" />
      <p className="relative font-display text-base leading-relaxed sm:text-lg">
        {quote}
      </p>
      {author && (
        <p className="relative mt-4 text-sm font-semibold uppercase tracking-wider text-teal">
          {author}
        </p>
      )}
    </div>
  );
}

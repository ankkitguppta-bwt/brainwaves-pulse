type Props = {
  src: string;
  alt: string;
  caption?: string;
  tone?: "dark" | "light";
  aspect?: "video" | "4/3" | "auto";
  className?: string;
};

/**
 * Device-style framed mockup. Wraps an image in a window-chrome card with
 * gradient backdrop so screenshots with white/blank areas no longer feel
 * cropped or empty.
 */
export function MockupFrame({
  src,
  alt,
  caption,
  tone = "dark",
  aspect = "video",
  className = "",
}: Props) {
  const dark = tone === "dark";
  const aspectCls =
    aspect === "video" ? "aspect-video" : aspect === "4/3" ? "aspect-[4/3]" : "";
  return (
    <figure
      className={`group relative overflow-hidden rounded-2xl border shadow-brand transition hover:-translate-y-1 hover:shadow-xl ${
        dark
          ? "border-white/10 bg-gradient-to-br from-navy via-navy/95 to-teal/20"
          : "border-border bg-gradient-to-br from-cyan-bg via-white to-teal/10"
      } ${className}`}
    >
      {/* window chrome */}
      <div
        className={`flex items-center gap-1.5 border-b px-3 py-2 ${
          dark ? "border-white/10" : "border-border/60"
        }`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-orange/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-orange/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-teal/70" />
        <span
          className={`ml-2 truncate text-[10px] uppercase tracking-wider ${
            dark ? "text-white/50" : "text-muted-foreground"
          }`}
        >
          BrainWaves Tech · Neurofeedback Suite
        </span>
      </div>
      {/* image stage with gradient backdrop */}
      <div className={`relative ${aspectCls} w-full overflow-hidden`}>
        <div
          aria-hidden
          className={`absolute inset-0 ${
            dark
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(18,184,176,0.18),transparent_60%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(18,184,176,0.12),transparent_60%)]"
          }`}
        />
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="relative h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption
          className={`px-4 py-3 text-xs font-medium ${
            dark ? "border-t border-white/10 text-white/80" : "border-t border-border/60 text-navy"
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

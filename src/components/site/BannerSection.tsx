import { Link } from "@tanstack/react-router";

type Props = {
  src: string;
  alt: string;
  cta?: { to: string; label: string };
  rounded?: boolean;
};

/**
 * Full-bleed banner image section. Banners already contain logo + copy + CTAs
 * baked into the artwork, so we render them as edge-to-edge images with an
 * optional overlay CTA for navigation.
 */
export function BannerSection({ src, alt, cta, rounded = true }: Props) {
  return (
    <section className="bg-background py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div
          className={`relative overflow-hidden ${
            rounded ? "rounded-2xl md:rounded-3xl" : ""
          } shadow-brand`}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="block h-auto w-full object-cover"
          />
          {cta && (
            <Link
              to={cta.to}
              aria-label={cta.label}
              className="absolute inset-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}

import { Quote } from "lucide-react";

export function ImpactCallout({ quote, author }: { quote: string; author?: string }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="900"
      className="relative overflow-hidden rounded-3xl border border-teal/25 bg-navy px-6 py-10 text-white sm:px-10"
    >
      <Quote className="absolute -right-2 -top-2 h-24 w-24 text-teal/10" />
      <p className="relative font-display text-lg leading-relaxed sm:text-xl">{quote}</p>
      {author && (
        <p className="relative mt-5 text-sm font-semibold uppercase tracking-wider text-teal">
          {author}
        </p>
      )}
    </div>
  );
}

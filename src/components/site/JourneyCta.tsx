import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function JourneyCta() {
  return (
    <section className="bg-navy py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Start Your Neurofeedback Journey Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Whether you want to train your brain, add neurofeedback to your practice, or explore
          partnership — we&apos;d love to talk.
        </p>
        <div className="mt-8 flex flex-row items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-teal px-4 py-2.5 text-xs font-semibold text-navy transition hover:brightness-110 sm:px-6 sm:py-3 sm:text-sm"
          >
            Book Demo Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/practitioner"
            className="inline-flex items-center rounded-full border border-white/30 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 sm:px-6 sm:py-3 sm:text-sm"
          >
            Become a Practitioner
          </Link>
        </div>
      </div>
    </section>
  );
}

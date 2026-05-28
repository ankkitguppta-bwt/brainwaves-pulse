import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BannerSection } from "@/components/site/BannerSection";
import bannerAssessment from "@/assets/banners/banner-assessment.png";
import graph6 from "@/assets/docx/graph-6.jpeg";
import graph8 from "@/assets/docx/graph-8.jpeg";
import graph10 from "@/assets/docx/graph-10.jpeg";
import graph12 from "@/assets/docx/graph-12.jpeg";
import graph13 from "@/assets/docx/graph-13.jpeg";
import graph15 from "@/assets/docx/graph-15.jpeg";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Brainwave Assessment — Quantitative EEG Reports | BrainWaves Tech" },
      { name: "description", content: "Book a brainwave assessment. Get a professional, anonymised report covering attention, focus, calm, stress and more." },
      { property: "og:title", content: "Brainwave Assessment — BrainWaves Tech" },
      { property: "og:description", content: "Professional EEG-based brainwave reports interpreted by certified practitioners." },
      { property: "og:url", content: "/assessment" },
    ],
    links: [{ rel: "canonical", href: "/assessment" }],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const graphs = [graph6, graph8, graph10, graph12, graph13, graph15];
  return (
    <>
      <PageHero
        eyebrow="Brainwave Assessment"
        title="Understand your brain in detail"
        sub="A short, non-invasive session captures your live brain activity. Our certified practitioners translate it into an easy-to-understand report."
        cta={{ to: "/contact", label: "Request Assessment" }}
      />
      <BannerSection
        src={bannerAssessment}
        alt="Brainwave Assessment & Customized Sound Therapy"
        cta={{ to: "/contact", label: "Start your journey" }}
      />
      <section className="bg-gradient-soft py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-navy">Sample anonymised reports</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            All identifiable information has been blurred for privacy. Reports are interpreted by certified practitioners.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {graphs.map((g, i) => (
              <div key={i} className="privacy-blur overflow-hidden rounded-2xl border border-border bg-white">
                <img src={g} alt={`Anonymised brainwave report ${i + 1}`} className="h-56 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

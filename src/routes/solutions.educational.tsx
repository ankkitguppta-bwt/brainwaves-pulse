import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/solutions/educational")({
  head: () => ({ meta: [{ title: "For Educational Institutions — BrainWaves Tech" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="For Educational Institutions"
      title="Attention, focus and learning programmes for students"
      sections={[
        { title: "Problem", body: "Attention gaps and exam stress impact learning outcomes." },
        { title: "Outcome", body: "Measurable improvement in focus and calm across cohorts." },
        { title: "How", body: "In-campus neurofeedback labs and student assessment protocols." },
      ]}
    />
  ),
});

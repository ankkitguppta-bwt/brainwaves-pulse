import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — BrainWaves Tech" },
      { name: "description", content: "Neurofeedback and brainwave solutions for psychologists, schools, corporates, rehab and healthcare." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Solutions"
      title="Neurofeedback Solutions for Every Practice"
      sections={[
        { title: "Psychologists", body: "Assessment, session tools and reporting for clinical practice." },
        { title: "Educational Institutions", body: "Attention and focus programmes for students." },
        { title: "Corporates", body: "Stress, focus and performance programmes for teams." },
        { title: "Rehab Centres", body: "Complementary neurofeedback for cognitive rehabilitation." },
        { title: "Healthcare", body: "Data-driven brainwave insight for wellness clinics." },
      ]}
    />
  ),
});

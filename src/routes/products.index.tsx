import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — BrainWaves Tech" },
      { name: "description", content: "Explore the BrainWaves Tech product suite: EEG headband, software platform, sound therapy, and accessories." },
      { property: "og:title", content: "Products — BrainWaves Tech" },
      { property: "og:description", content: "The complete neurofeedback product ecosystem." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Products"
      title="Our Neurofeedback Product Ecosystem"
      sections={[
        { title: "EEG Headband", body: "Comfortable dry-sensor headband engineered for clinical-grade EEG capture. Details coming soon." },
        { title: "Software Platform", body: "Live brainwave dashboard, session recording and cloud reporting for practitioners." },
        { title: "Sound Therapy", body: "Personalised neuro-acoustic therapy library tuned to each user's brainwave profile." },
        { title: "Accessories", body: "Replacement sensors, cables, cases and add-ons." },
      ]}
    />
  ),
});

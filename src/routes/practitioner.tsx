import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/practitioner")({
  head: () => ({
    meta: [
      { title: "Become a Certified Neurofeedback Practitioner — BrainWaves Tech" },
      { name: "description", content: "Hands-on training, certification and ongoing support to practise neurofeedback professionally in India." },
      { property: "og:title", content: "Become a Certified Neurofeedback Practitioner" },
      { property: "og:description", content: "Training, certification and 3 months of handholding support." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Become a Practitioner"
      title="Certified Neurofeedback Practitioner Programme"
      subtitle="Training, certification and the six-pillar ecosystem — full page ships in Phase 9."
      ctaLabel="Apply for Training"
      sections={[
        { title: "7 Days Intensive Training", body: "Theory, hands-on sessions, report interpretation." },
        { title: "Hardware + Software Package", body: "Everything you need to begin practising immediately." },
        { title: "3 Months Handholding", body: "Live guidance from senior practitioners." },
        { title: "Certification", body: "Recognised Neurofeedback Practitioner certificate." },
        { title: "Ecosystem Access", body: "Continued access to updates and community." },
        { title: "Ongoing Support", body: "Technical and clinical support pathways." },
      ]}
    />
  ),
});

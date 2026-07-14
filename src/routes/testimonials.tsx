import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — BrainWaves Tech" },
      { name: "description", content: "Voices from psychologists, students, parents and wellness professionals using BrainWaves Tech." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Testimonials"
      title="Voices from our community"
      subtitle="Text wall and video grid land in Phase 9 once real content is provided."
      sections={[
        { title: "Practitioners", body: "Quotes from certified practitioners." },
        { title: "Students & Parents", body: "Outcomes from student assessment programmes." },
        { title: "Video Stories", body: "Video testimonials from the community." },
      ]}
    />
  ),
});

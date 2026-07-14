import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — BrainWaves Tech" },
      { name: "description", content: "Research, publications and evidence base behind BrainWaves Tech neurofeedback." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Research"
      title="Research & Evidence Base"
      sections={[
        { title: "Publications", body: "Selected research references." },
        { title: "Collaborations", body: "Academic and clinical partnerships." },
        { title: "Ongoing Studies", body: "Current research initiatives." },
      ]}
    />
  ),
});

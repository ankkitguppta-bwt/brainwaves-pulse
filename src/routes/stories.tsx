import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories, Media & Recognition — BrainWaves Tech" },
      { name: "description", content: "Case studies, press coverage and recognition for BrainWaves Tech." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Stories & Media"
      title="Case Studies, Media & Recognition"
      subtitle="Case-study layout with proper alignment and explanation ships in Phase 9."
      sections={[
        { title: "Media Coverage", body: "Press mentions and interviews." },
        { title: "Recognition", body: "Affiliations and awards." },
        { title: "Case Studies", body: "Practitioner and client outcomes." },
      ]}
    />
  ),
});

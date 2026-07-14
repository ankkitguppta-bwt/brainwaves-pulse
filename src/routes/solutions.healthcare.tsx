import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/solutions/healthcare")({
  head: () => ({ meta: [{ title: "For Healthcare — BrainWaves Tech" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="For Healthcare"
      title="Add measurable brainwave insight to wellness practice"
      sections={[
        { title: "Problem", body: "Wellness practice often lacks quantifiable neuro data." },
        { title: "Outcome", body: "Reports that patients and referrers can act on." },
        { title: "How", body: "Turnkey hardware, software and practitioner training." },
      ]}
    />
  ),
});

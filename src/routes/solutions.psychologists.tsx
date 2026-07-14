import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/solutions/psychologists")({
  head: () => ({ meta: [{ title: "For Psychologists — BrainWaves Tech" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="For Psychologists"
      title="Enhance clinical practice with objective brainwave data"
      sections={[
        { title: "Problem", body: "Traditional assessments rely heavily on self-report." },
        { title: "Outcome", body: "Add quantifiable EEG data to complement clinical judgement." },
        { title: "How", body: "In-clinic assessment, structured sessions, shareable reports." },
      ]}
    />
  ),
});

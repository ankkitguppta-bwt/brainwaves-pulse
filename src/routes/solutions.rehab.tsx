import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/solutions/rehab")({
  head: () => ({ meta: [{ title: "For Rehab Centres — BrainWaves Tech" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="For Rehab Centres"
      title="Complementary neurofeedback for cognitive rehabilitation"
      sections={[
        { title: "Problem", body: "Cognitive rehabilitation benefits from objective feedback loops." },
        { title: "Outcome", body: "Structured neurofeedback protocols tracked over time." },
        { title: "How", body: "Practitioner-led sessions supported by BrainWaves hardware + software." },
      ]}
    />
  ),
});

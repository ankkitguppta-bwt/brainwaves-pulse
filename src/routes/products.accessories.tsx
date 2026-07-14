import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/products/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — BrainWaves Tech" },
      { name: "description", content: "Replacement sensors, cables, cases and add-ons for BrainWaves hardware." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Accessories"
      title="Sensors, Cables & Add-ons"
      sections={[
        { title: "Replacement Sensors", body: "Dry EEG sensor packs for extended use." },
        { title: "Carrying Case", body: "Protective travel case for the headband kit." },
        { title: "Cables & Chargers", body: "Original spare cables and charging accessories." },
      ]}
    />
  ),
});

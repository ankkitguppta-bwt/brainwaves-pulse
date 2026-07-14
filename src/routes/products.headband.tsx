import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/products/headband")({
  head: () => ({
    meta: [
      { title: "Smart EEG Headband — BrainWaves Tech" },
      { name: "description", content: "Dry-sensor EEG headband engineered for real-time brainwave monitoring and neurofeedback." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="EEG Headband"
      title="Smart EEG Headband for Live Brainwave Capture"
      subtitle="Multi-angle renders, product tour and specs land here in Phase 9."
      sections={[
        { title: "Dry Sensors", body: "Clinical-grade signal quality without gel — comfortable for long sessions." },
        { title: "Wireless Sync", body: "Low-latency Bluetooth streaming to the BrainWaves software." },
        { title: "Long Battery", body: "Full-day sessions on a single charge." },
      ]}
    />
  ),
});

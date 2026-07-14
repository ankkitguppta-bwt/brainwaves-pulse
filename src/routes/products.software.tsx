import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/products/software")({
  head: () => ({
    meta: [
      { title: "Software Platform — BrainWaves Tech" },
      { name: "description", content: "Live neurofeedback dashboard, session recording, brainwave analysis and cloud reporting." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Software Platform"
      title="Live Neurofeedback Dashboard & Analysis Suite"
      subtitle="Animated product tour and game-based training screens land in Phase 9."
      sections={[
        { title: "Live Dashboard", body: "Real-time attention, calm and focus metrics with EEG waveform overlays." },
        { title: "Game-based Training", body: "The dolphin training game and future titles for reward-based sessions." },
        { title: "Cloud Reporting", body: "Session history, exports and shareable practitioner reports." },
      ]}
    />
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/products/sound-therapy")({
  head: () => ({
    meta: [
      { title: "Customized Sound Therapy — BrainWaves Tech" },
      { name: "description", content: "Personalised sound therapy tuned to your brainwave pattern for focus, calm and sleep." },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Sound Therapy"
      title="Customized Sound Therapy tuned to your Brainwave Pattern"
      sections={[
        { title: "Focus Frequencies", body: "Beta-range acoustic modulation for attention and study focus." },
        { title: "Calm & Sleep", body: "Alpha / theta / delta programmes for relaxation and restorative sleep." },
        { title: "Meditation", body: "Programmes designed to support deeper meditation states." },
      ]}
    />
  ),
});

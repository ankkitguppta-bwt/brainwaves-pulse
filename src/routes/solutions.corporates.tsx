import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const Route = createFileRoute("/solutions/corporates")({
  head: () => ({ meta: [{ title: "For Corporates — BrainWaves Tech" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="For Corporates"
      title="Team performance, stress reduction and peak focus"
      sections={[
        { title: "Problem", body: "Burnout and cognitive fatigue drag down team performance." },
        { title: "Outcome", body: "Data-backed wellness with measurable stress and focus outcomes." },
        { title: "How", body: "Onsite assessment days, programme design, longitudinal reporting." },
      ]}
    />
  ),
});

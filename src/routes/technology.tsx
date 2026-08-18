import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/technology")({
  component: TechnologyLayout,
});

function TechnologyLayout() {
  return <Outlet />;
}

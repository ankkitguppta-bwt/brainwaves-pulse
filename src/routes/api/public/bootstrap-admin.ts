import { createFileRoute } from "@tanstack/react-router";

// Account provisioning is intentionally disabled. Existing accounts and roles
// remain unchanged; new administrators must not be created through the app.
export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify({ error: "Admin account creation is disabled." }), {
          status: 410,
          headers: { "content-type": "application/json" },
        }),
    },
  },
});

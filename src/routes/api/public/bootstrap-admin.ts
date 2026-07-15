import { createFileRoute } from "@tanstack/react-router";

const ADMIN_EMAIL = "admin@brainwavestech.com";
const ADMIN_PASSWORD = "admin@btw.951";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Check if user already exists
        const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
        if (listErr) {
          return new Response(JSON.stringify({ error: listErr.message }), { status: 500 });
        }
        const existing = list.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);

        let userId: string;
        if (existing) {
          userId = existing.id;
          // Ensure password is set to the canonical value
          await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: ADMIN_PASSWORD,
            email_confirm: true,
          });
        } else {
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            email_confirm: true,
          });
          if (error || !data.user) {
            return new Response(JSON.stringify({ error: error?.message ?? "create failed" }), { status: 500 });
          }
          userId = data.user.id;
        }

        // Ensure admin role
        await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });

        return new Response(JSON.stringify({ ok: true, email: ADMIN_EMAIL }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const schema = z.object({ email: z.string().trim().email().max(320) });

function response(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return response({ error: "Invalid JSON" }, 400);
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) return response({ error: "Enter a valid email address." }, 400);

        const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        if (!url || !key) return response({ error: "Newsletter service is unavailable." }, 503);
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data, error } = await supabase.rpc("subscribe_newsletter", {
          p_email: parsed.data.email.toLowerCase(),
        });
        if (error) {
          console.error("newsletter subscription failed", error);
          return response({ error: "Could not subscribe right now. Please try again." }, 500);
        }
        return response({ status: data });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(50).optional().default(""),
  interest: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
});

export const Route = createFileRoute("/api/public/enquiries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
        }
        const parsed = enquirySchema.safeParse(body);
        if (!parsed.success) {
          return new Response(JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }), { status: 400 });
        }
        const url = process.env.SUPABASE_URL!;
        const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });
        const { error } = await supabase.from("contact_enquiries").insert({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || null,
          interest: parsed.data.interest || null,
          message: parsed.data.message || null,
        });
        if (error) {
          console.error("enquiry insert failed", error);
          return new Response(JSON.stringify({ error: "Could not save enquiry" }), { status: 500 });
        }
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const tokenSchema = z.string().uuid();

function page(title: string, message: string, status = 200) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | BrainWaves Tech</title></head><body style="margin:0;background:#071d33;color:#fff;font-family:Arial,sans-serif"><main style="max-width:560px;margin:15vh auto;padding:40px;text-align:center"><h1 style="color:#2dd4bf">${title}</h1><p style="line-height:1.6;color:#d8e2eb">${message}</p><a href="/" style="color:#2dd4bf">Return to BrainWaves Tech</a></main></body></html>`,
    {
      status,
      headers: { "content-type": "text/html; charset=utf-8" },
    },
  );
}

export const Route = createFileRoute("/api/public/unsubscribe")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const token = tokenSchema.safeParse(new URL(request.url).searchParams.get("token"));
        if (!token.success)
          return page("Invalid unsubscribe link", "This link is invalid or incomplete.", 400);
        const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        if (!url || !key) return page("Service unavailable", "Please try again later.", 503);
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data, error } = await supabase.rpc("unsubscribe_newsletter", {
          p_token: token.data,
        });
        if (error) {
          console.error("newsletter unsubscribe failed", error);
          return page("Service unavailable", "Please try again later.", 503);
        }
        if (data === "unsubscribed")
          return page(
            "You have been unsubscribed",
            "You will no longer receive BrainWaves Tech blog notifications.",
          );
        if (data === "already_unsubscribed")
          return page("You are already unsubscribed", "No further action is needed.");
        return page("Invalid unsubscribe link", "This link is invalid or has expired.", 404);
      },
    },
  },
});

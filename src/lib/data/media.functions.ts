import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/lib/data/admin.functions";

const BUCKET = "content-media";
// 10 years — effectively permanent
const SIGNED_URL_EXPIRES = 60 * 60 * 24 * 365 * 10;

const uploadSchema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().min(1).max(200),
  // base64 (no data: prefix)
  base64: z.string().min(1),
  folder: z.string().max(100).optional().default("uploads"),
});

function safeName(name: string) {
  const dot = name.lastIndexOf(".");
  const base = (dot >= 0 ? name.slice(0, dot) : name).toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "file";
  const ext = dot >= 0 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, "") : "";
  return `${base}${ext}`;
}

export const uploadMedia = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: z.infer<typeof uploadSchema>) => uploadSchema.parse(d))
  .handler(async ({ data, context }) => {
    const supabase = (context as any).supabase;
    const path = `${data.folder}/${Date.now()}-${safeName(data.filename)}`;
    const bytes = Uint8Array.from(atob(data.base64), (c) => c.charCodeAt(0));
    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (upErr) throw new Error(upErr.message);
    const { data: signed, error: sErr } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, SIGNED_URL_EXPIRES);
    if (sErr || !signed) throw new Error(sErr?.message ?? "Sign URL failed");
    return { url: signed.signedUrl, path };
  });

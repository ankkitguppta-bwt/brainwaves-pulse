import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPost, upsertPost } from "@/lib/data/admin.functions";
import { DraftEditor } from "@/components/admin/DraftEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { EditorSkeleton } from "@/components/admin/AdminSkeleton";


export const Route = createFileRoute("/_authenticated/admin/blog/$id")({
  head: () => ({ meta: [{ title: "Edit Post — Admin" }, { name: "robots", content: "noindex" }] }),
  component: PostEditor,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function PostEditor() {
  const { id } = useParams({ from: "/_authenticated/admin/blog/$id" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = id === "new";
  const fetchPost = useServerFn(getPost);
  const save = useServerFn(upsertPost);

  const q = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost({ data: { id } }),
    enabled: !isNew,
  });

  const [form, setForm] = useState<any>({
    slug: "", title: "", excerpt: "", cover_image_url: "",
    content_html: "", content_json: null, meta_title: "", meta_description: "", status: "draft",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (q.data) setForm(q.data); }, [q.data]);

  async function onSave(publish: boolean) {
    setBusy(true); setError(null);
    try {
      // Slug is always derived from title on save; server ensures uniqueness.
      const derivedSlug = slugify(form.title || "untitled") || "untitled";
      const payload: any = {
        ...form,
        slug: isNew ? derivedSlug : (form.slug || derivedSlug),
        status: publish ? "published" : form.status,
      };
      if (isNew) delete payload.id;
      const saved = await save({ data: payload });
      await qc.invalidateQueries({ queryKey: ["posts", "all"] });
      if (isNew) navigate({ to: "/admin/blog/$id", params: { id: saved.id } });
      else setForm(saved);
    } catch (err: any) {
      setError(err.message ?? "Save failed");
    } finally { setBusy(false); }
  }

  if (!isNew && q.isLoading) return <EditorSkeleton />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy">{isNew ? "New Post" : "Edit Post"}</h1>
        {form.slug && !isNew && (
          <p className="text-xs text-muted-foreground">URL: /blog/{form.slug}</p>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-lg font-semibold" />
            <p className="mt-1 text-[11px] text-muted-foreground">
              Slug auto-generated from title on save (kept unique automatically).
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</label>
            <div className="mt-1">
              <DraftEditor
                value={form.content_html}
                onChange={(html) => setForm({ ...form, content_html: html })}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="mb-3 font-display font-semibold text-navy">Publishing</p>
            <div className="flex flex-col gap-2">
              <button disabled={busy} onClick={() => onSave(false)}
                className="rounded-full border border-input px-4 py-2 text-sm hover:bg-secondary">
                Save as draft
              </button>
              <button disabled={busy} onClick={() => onSave(true)}
                className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-soft">
                {form.status === "published" ? "Update published" : "Publish"}
              </button>
              <p className="text-xs text-muted-foreground">Current: {form.status}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover image</label>
              <div className="mt-1">
                <ImageUpload
                  value={form.cover_image_url}
                  onChange={(url) => setForm({ ...form, cover_image_url: url })}
                  aspect="aspect-video"
                  aspectLabel="16:9 (1600×900)"
                  folder="blog-covers"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</label>
              <textarea rows={3} value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <p className="font-display font-semibold text-navy">SEO</p>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meta title</label>
              <input value={form.meta_title ?? ""} onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Meta description</label>
              <textarea rows={2} value={form.meta_description ?? ""} onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" />
            </div>
          </div>

          {error && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        </aside>
      </div>
    </div>
  );
}

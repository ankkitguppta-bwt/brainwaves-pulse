import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { listAllPosts, deletePost } from "@/lib/data/admin.functions";
import { TableSkeleton } from "@/components/admin/AdminSkeleton";
import { useConfirm } from "@/components/admin/ConfirmDialog";


export const Route = createFileRoute("/_authenticated/admin/blog/")({
  head: () => ({ meta: [{ title: "Blog — Admin" }, { name: "robots", content: "noindex" }] }),
  component: BlogListPage,
});

function BlogListPage() {
  const qc = useQueryClient();
  const list = useServerFn(listAllPosts);
  const del = useServerFn(deletePost);
  const q = useQuery({ queryKey: ["posts", "all"], queryFn: () => list() });
  const { confirm, dialog } = useConfirm();
  const [actionError, setActionError] = useState<{ message: string; retry: () => void } | null>(null);

  async function doDelete(id: string) {
    setActionError(null);
    const toastId = toast.loading("Deleting post…");
    try {
      await del({ data: { id } });
      await qc.invalidateQueries({ queryKey: ["posts", "all"] });
      toast.success("Post deleted", { id: toastId });
    } catch (err: any) {
      const message = err?.message ?? "Delete failed. Please try again.";
      setActionError({ message, retry: () => void doDelete(id) });
      toast.error("Delete failed", { id: toastId, description: message, action: { label: "Retry", onClick: () => void doDelete(id) } });
    }
  }

  async function confirmDelete(id: string) {
    const ok = await confirm({
      title: "Delete this post?",
      description: "The blog post will be permanently deleted and removed from your site.",
      confirmLabel: "Delete",
    });
    if (ok) await doDelete(id);
  }


  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy">Blog Posts</h1>
        <Link to="/admin/blog/$id" params={{ id: "new" }}
          className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-soft">
          + New Post
        </Link>
      </div>
      {actionError && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{actionError.message}</span>
          <div className="flex gap-2">
            <button onClick={actionError.retry} className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700">Retry</button>
            <button onClick={() => setActionError(null)} className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold hover:bg-red-100">Dismiss</button>
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr><th className="px-4 py-2">Title</th><th className="px-4 py-2">Slug</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Updated</th><th className="px-4 py-2">Actions</th></tr>
          </thead>
          <tbody>
            {q.isLoading && <TableSkeleton columns={5} />}
            {q.data?.map((p: any) => (

              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{p.title}</td>
                <td className="px-4 py-2 text-muted-foreground">{p.slug}</td>
                <td className="px-4 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-muted-foreground">{new Date(p.updated_at).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <Link to="/admin/blog/$id" params={{ id: p.id }} aria-label="Edit" title="Edit" className="mr-3 inline-flex items-center text-navy hover:opacity-70">
                    <Pencil size={16} />
                  </Link>
                  {p.status === "published" && (
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="mr-3 text-sm text-slate-500 hover:underline">View</Link>
                  )}
                  <button onClick={() => void confirmDelete(p.id)}
                    aria-label="Delete" title="Delete" className="inline-flex items-center text-red-600 hover:opacity-70">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {q.data && q.data.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">No posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {dialog}
    </div>
  );
}

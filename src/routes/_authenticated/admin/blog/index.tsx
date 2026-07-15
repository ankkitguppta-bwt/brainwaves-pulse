import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAllPosts, deletePost } from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/blog/")({
  head: () => ({ meta: [{ title: "Blog — Admin" }, { name: "robots", content: "noindex" }] }),
  component: BlogListPage,
});

function BlogListPage() {
  const qc = useQueryClient();
  const list = useServerFn(listAllPosts);
  const del = useServerFn(deletePost);
  const q = useQuery({ queryKey: ["posts", "all"], queryFn: () => list() });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-navy">Blog Posts</h1>
        <Link to="/admin/blog/$id" params={{ id: "new" }}
          className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-soft">
          + New Post
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr><th className="px-4 py-2">Title</th><th className="px-4 py-2">Slug</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Updated</th><th className="px-4 py-2">Actions</th></tr>
          </thead>
          <tbody>
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
                  <Link to="/admin/blog/$id" params={{ id: p.id }} className="mr-3 text-navy hover:underline">Edit</Link>
                  {p.status === "published" && (
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="mr-3 text-slate-500 hover:underline">View</Link>
                  )}
                  <button onClick={async () => { if (confirm("Delete post?")) { await del({ data: { id: p.id } }); qc.invalidateQueries({ queryKey: ["posts", "all"] }); } }}
                    className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {q.data && q.data.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">No posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

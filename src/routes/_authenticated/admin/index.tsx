import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listEnquiries, listAllPosts, listAllPeople, listAllTestimonials,
  listAllCaseStudies, listAllMedia,
} from "@/lib/data/admin.functions";
import { StatCardsSkeleton, TableSkeleton } from "@/components/admin/AdminSkeleton";


export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: DashboardPage,
});

function StatCard({ label, value, sub, to }: { label: string; value: number | string; sub?: string; to: string }) {
  return (
    <Link to={to} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-navy">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </Link>
  );
}

function DashboardPage() {
  const fEnq = useServerFn(listEnquiries);
  const fPosts = useServerFn(listAllPosts);
  const fPeople = useServerFn(listAllPeople);
  const fTest = useServerFn(listAllTestimonials);
  const fCS = useServerFn(listAllCaseStudies);
  const fMedia = useServerFn(listAllMedia);
  const enq = useQuery({ queryKey: ["enquiries"], queryFn: () => fEnq() });
  const posts = useQuery({ queryKey: ["posts", "all"], queryFn: () => fPosts() });
  const people = useQuery({ queryKey: ["people", "all"], queryFn: () => fPeople() });
  const tests = useQuery({ queryKey: ["testimonials", "all"], queryFn: () => fTest() });
  const cs = useQuery({ queryKey: ["case_studies", "all"], queryFn: () => fCS() });
  const media = useQuery({ queryKey: ["media", "all"], queryFn: () => fMedia() });

  const enqTotal = enq.data?.length ?? 0;
  const unread = enq.data?.filter((e: any) => !e.is_read).length ?? 0;
  const published = posts.data?.filter((p: any) => p.status === "published").length ?? 0;
  const drafts = (posts.data?.length ?? 0) - published;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Enquiries" value={enqTotal} sub={`${unread} unread`} to="/admin/enquiries" />
        <StatCard label="Blog posts" value={posts.data?.length ?? 0} sub={`${published} live · ${drafts} drafts`} to="/admin/blog" />
        <StatCard label="Testimonials" value={tests.data?.length ?? 0} to="/admin/testimonials" />
        <StatCard label="People" value={people.data?.length ?? 0} to="/admin/people" />
        <StatCard label="Case studies" value={cs.data?.length ?? 0} to="/admin/case-studies" />
        <StatCard label="Media / recognition" value={media.data?.length ?? 0} to="/admin/media" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Latest enquiries</h2>
            <Link to="/admin/enquiries" className="text-xs text-navy hover:underline">View all</Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-2">When</th><th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Interest</th>
                </tr>
              </thead>
              <tbody>
                {(enq.data ?? []).slice(0, 6).map((e: any) => (
                  <tr key={e.id} className="border-t border-slate-100">
                    <td className="px-4 py-2 text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2 font-medium">{e.name}</td>
                    <td className="px-4 py-2">{e.interest ?? "—"}</td>
                  </tr>
                ))}
                {enq.data && enq.data.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">No enquiries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">Recent posts</h2>
            <Link to="/admin/blog" className="text-xs text-navy hover:underline">Manage blog</Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-2">Title</th><th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Updated</th>
                </tr>
              </thead>
              <tbody>
                {(posts.data ?? []).slice(0, 6).map((p: any) => (
                  <tr key={p.id} className="border-t border-slate-100">
                    <td className="px-4 py-2 font-medium">
                      <Link to="/admin/blog/$id" params={{ id: p.id }} className="hover:underline">{p.title}</Link>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{new Date(p.updated_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {posts.data && posts.data.length === 0 && (
                  <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">No posts yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

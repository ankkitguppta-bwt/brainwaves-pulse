import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listEnquiries, listAllPosts, listAllPeople, listAllTestimonials,
} from "@/lib/data/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: DashboardPage,
});

function StatCard({ label, value, to }: { label: string; value: number | string; to: string }) {
  return (
    <Link to={to} className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-navy">{value}</p>
    </Link>
  );
}

function DashboardPage() {
  const fEnq = useServerFn(listEnquiries);
  const fPosts = useServerFn(listAllPosts);
  const fPeople = useServerFn(listAllPeople);
  const fTest = useServerFn(listAllTestimonials);
  const enq = useQuery({ queryKey: ["enquiries"], queryFn: () => fEnq() });
  const posts = useQuery({ queryKey: ["posts", "all"], queryFn: () => fPosts() });
  const people = useQuery({ queryKey: ["people", "all"], queryFn: () => fPeople() });
  const tests = useQuery({ queryKey: ["testimonials", "all"], queryFn: () => fTest() });

  const unread = enq.data?.filter((e: any) => !e.is_read).length ?? 0;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-navy">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Unread enquiries" value={unread} to="/admin/enquiries" />
        <StatCard label="Blog posts" value={posts.data?.length ?? 0} to="/admin/blog" />
        <StatCard label="People" value={people.data?.length ?? 0} to="/admin/people" />
        <StatCard label="Testimonials" value={tests.data?.length ?? 0} to="/admin/testimonials" />
      </div>

      <h2 className="mt-10 font-display text-lg font-bold text-navy">Latest enquiries</h2>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-2">When</th><th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th><th className="px-4 py-2">Interest</th>
            </tr>
          </thead>
          <tbody>
            {(enq.data ?? []).slice(0, 5).map((e: any) => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="px-4 py-2 text-muted-foreground">{new Date(e.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 font-medium">{e.name}</td>
                <td className="px-4 py-2">{e.email}</td>
                <td className="px-4 py-2">{e.interest ?? "—"}</td>
              </tr>
            ))}
            {enq.data && enq.data.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">No enquiries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

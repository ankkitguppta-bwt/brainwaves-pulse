import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    const { data: hasAdmin } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });
    if (!hasAdmin) throw redirect({ to: "/" });
    return { user: data.user };
  },
  component: AdminShell,
});

const links = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/enquiries", label: "Enquiries" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/people", label: "People" },
  { to: "/admin/case-studies", label: "Case Studies" },
  { to: "/admin/media", label: "Media & Recognition" },
] as const;

function AdminShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link to="/admin" className="font-display text-lg font-bold text-navy">Admin</Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-navy">View site</Link>
            <button onClick={signOut} className="rounded-full border border-input px-4 py-1.5 text-sm hover:bg-secondary">
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 lg:px-8">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/admin" && pathname.startsWith(l.to));
            return (
              <Link key={l.to} to={l.to}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  active ? "bg-navy text-white" : "text-slate-700 hover:bg-slate-100"
                }`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

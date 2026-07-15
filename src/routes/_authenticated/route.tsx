import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Inbox, FileText, MessageSquareQuote, Users,
  BookOpen, Newspaper, LogOut, ExternalLink, Menu, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/brand/logo-dark.png.asset.json";

let authCache: { userId: string; isAdmin: boolean } | null = null;

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    if (authCache?.isAdmin) return { userId: authCache.userId };
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      authCache = null;
      throw redirect({ to: "/auth" });
    }
    const { data: hasAdmin } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });
    if (!hasAdmin) {
      authCache = null;
      throw redirect({ to: "/" });
    }
    authCache = { userId: data.user.id, isAdmin: true };
    return { userId: data.user.id };
  },
  component: AdminShell,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/people", label: "People", icon: Users },
  { to: "/admin/case-studies", label: "Case Studies", icon: BookOpen },
  { to: "/admin/media", label: "Media", icon: Newspaper },
];

function AdminShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  async function signOut() {
    authCache = null;
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  const active = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-slate-950 text-slate-200 transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/admin" className="block">
            <img src={logoAsset.url} alt="Brainwaves" className="h-9 w-auto" />
          </Link>
          <button className="lg:hidden text-slate-300" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-3">
          <a
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800/60 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            View site
          </a>
          <button
            onClick={signOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-800/60 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <button
          className="fixed left-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-lg bg-white text-slate-700 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <main className="flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

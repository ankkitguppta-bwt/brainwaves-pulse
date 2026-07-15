import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — BrainWaves Tech" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await router.invalidate();
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass-card rounded-2xl p-8">
        <h1 className="font-display text-2xl font-bold text-navy">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to manage site content.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm"
            />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button disabled={busy}
            className="w-full rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60">
            {busy ? "Please wait…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

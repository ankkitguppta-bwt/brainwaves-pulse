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
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // Supabase otherwise falls back to the dashboard's Site URL, which may be an old local address.
            emailRedirectTo: `${window.location.origin}/auth`,
          },
        });
        if (error) throw error;
        if (!data.session) {
          setNotice(
            "Account created. Check your email to confirm it, then sign in — if this is the first account ever created here, it will automatically get admin access.",
          );
          setBusy(false);
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await router.invalidate();
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError(null);
    setNotice(null);
  }

  async function resendConfirmation() {
    setError(null);
    setNotice(null);
    setResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      if (error) throw error;
      setNotice("A fresh confirmation link has been sent. Use only the newest email link.");
    } catch (err: any) {
      setError(err.message ?? "Could not resend the confirmation email.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md glass-card rounded-2xl p-8">
        <h1 className="font-display text-2xl font-bold text-navy">
          {mode === "signin" ? "Admin sign in" : "Create admin account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to manage site content."
            : "Only the very first account ever created here becomes admin — if one already exists, this new account will not get admin access."}
        </p>
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
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={mode === "signup" ? 6 : undefined}
              className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm"
            />
          </div>
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          {notice && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>}
          <button disabled={busy}
            className="w-full rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        {mode === "signup" && (
          <button
            type="button"
            disabled={!email || resending}
            onClick={resendConfirmation}
            className="mt-3 w-full text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resending ? "Sending confirmation email…" : "Resend confirmation email"}
          </button>
        )}
        <button
          type="button"
          onClick={toggleMode}
          className="mt-4 w-full text-center text-xs font-medium text-muted-foreground underline-offset-2 hover:text-navy hover:underline"
        >
          {mode === "signin"
            ? "Need to create the first admin account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const legalLinks = [
  "Disclaimer",
  "Terms & Conditions",
  "Privacy Policy",
  "Refund & Return Policy",
  "Shipping Policy",
];

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/public/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          phone: "",
          interest: "Newsletter Subscription",
          message: "Subscribed via footer newsletter",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Subscribe failed");
      }
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 lg:px-8">
      <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
        Stop Guessing, Start Measuring
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-white/65">
        Subscribe for exclusive monthly blogs, data updates, and neuroscience-backed corporate welfare models.
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your professional email"
          aria-label="Email address"
          className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/45 transition focus:border-teal focus:outline-none sm:max-w-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-md bg-teal px-6 text-sm font-semibold text-navy transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "sending" ? "Subscribing…" : "Subscribe Now"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm font-medium text-emerald-300">
          You&apos;re subscribed — welcome to the BrainWaves community.
        </p>
      )}
      {status === "error" && <p className="mt-3 text-sm font-medium text-red-300">{errorMsg}</p>}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <NewsletterBand />

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 lg:px-8">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-display text-2xl font-extrabold tracking-tight">
                <span className="text-orange">Brain</span>
                <span className="text-white">Waves</span>
              </span>
              <span className="font-display text-sm font-semibold text-teal">Tech</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Advanced neurofeedback systems built to connect, quantify, explore — transforming raw
              biological data into empirical, real-time performance blueprints for enterprises,
              academic networks, and clinical practices.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-teal hover:text-navy"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal &amp; Compliance
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {legalLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="transition hover:text-teal">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Corporate Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <span className="font-semibold text-white">Office:</span> A-268, New Minal Residency,
                Near Gate No. 4, In Front of D-Mart, Ayodhya Bypass Road, Bhopal, M.P. - 462023
              </li>
              <li>
                <span className="font-semibold text-white">Inquiries: </span>
                <a href="mailto:contact@brainwavestech.com" className="text-teal hover:underline">
                  contact@brainwavestech.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Contact:</span> +91 98930 64372
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/55 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} BrainWaves Tech. All rights reserved.</p>
          <p>Neurofeedback · Brainwave Analysis · Sound Therapy · Practitioner Training</p>
        </div>
      </div>
    </footer>
  );
}

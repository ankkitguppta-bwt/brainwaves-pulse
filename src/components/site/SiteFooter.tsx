import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import brandLogo from "@/assets/brand/brainwaves-logo.png";
import { BrainwaveBackdrop } from "@/components/site/BrainwaveBackdrop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LegalPolicyContent } from "@/components/site/LegalPolicyContent";

const legalLinks = [
  "Disclaimer",
  "Terms & Conditions",
  "Privacy Policy",
  "Refund & Return Policy",
  "Shipping Policy",
];

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Subscribe failed");
      }
      const body = await res.json();
      if (body.status === "already_subscribed") setStatus("already");
      else {
        setStatus("success");
        setEmail("");
      }
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Subscribe failed");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-14 lg:px-8">
      <div
        data-aos="fade-up"
        className="glass-card-dark relative isolate overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
      >
        <BrainwaveBackdrop className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-25" />

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
              Stop Guessing, Start Measuring
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
              Subscribe for exclusive monthly blogs, data updates, and neuroscience-backed
              corporate welfare models.
            </p>
          </div>

          <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="relative w-full sm:max-w-sm">
                <Mail
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email"
                  aria-label="Email address"
                  className="w-full rounded-full border border-white/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/45 transition focus:border-teal focus:bg-white/10 focus:shadow-brand focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex min-h-[46px] shrink-0 items-center justify-center gap-1.5 rounded-full bg-teal px-6 text-sm font-semibold text-navy shadow-brand transition hover:scale-[1.03] hover:brightness-110 disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Subscribing…" : "Subscribe Now"}
                {status !== "sending" && (
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
            {status === "success" && (
              <p className="mt-2 text-sm font-medium text-emerald-300">
                You&apos;re subscribed! Welcome to the BrainWaves community.
              </p>
            )}
            {status === "already" && (
              <p className="mt-2 text-sm font-medium text-emerald-300">
                This email is already subscribed to BrainWaves updates.
              </p>
            )}
            {status === "error" && (
              <p className="mt-2 text-sm font-medium text-red-300">{errorMsg}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [openLegal, setOpenLegal] = useState<string | null>(null);
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <NewsletterBand />

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 lg:px-8">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link to="/" className="inline-flex rounded-lg bg-white px-3 py-2">
              <img
                src={brandLogo}
                alt="BrainWaves Tech"
                width={1385}
                height={389}
                className="h-10 w-auto"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Advanced neurofeedback systems built to connect, quantify, and explore, transforming raw
              biological data into empirical, real-time performance blueprints for enterprises,
              academic networks, and clinical practices.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                {
                  Icon: Facebook,
                  label: "Facebook",
                  href: "https://www.facebook.com/people/Brain-Waves-Tech/100084467359447/?rdid=cL4DfN8YkjEZGeJU&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14D7AmrV3B%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio",
                },
                {
                  Icon: Instagram,
                  label: "Instagram",
                  href: "https://www.instagram.com/brain_waves_tech",
                },
                {
                  Icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/brain-waves-tech",
                },
                {
                  Icon: Youtube,
                  label: "YouTube",
                  href: "https://www.youtube.com/@brainwavestech",
                },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-teal hover:text-navy"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal &amp; Compliance
            </h3>
            <ul className="mt-5 space-y-3.5">
              {legalLinks.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => setOpenLegal(l)}
                    className="text-left text-sm font-normal leading-normal text-white/65 transition hover:text-teal"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Corporate Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm font-normal leading-normal text-white/65">
              <li>
                <span className="font-semibold text-white">Office:</span> A-268, New Minal
                Residency, Near Gate No. 4, In Front of D-Mart, Ayodhya Bypass Road, Bhopal, M.P. -
                462023
              </li>
              <li>
                <span className="font-semibold text-white">Inquiries: </span>
                <a
                  href="mailto:contact@brainwavestech.com"
                  className="text-sm text-teal hover:underline"
                >
                  contact@brainwavestech.com
                </a>
              </li>
              <li>
                <span className="font-semibold text-white">Contact:</span> +91 97133 37557
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
      <Dialog open={!!openLegal} onOpenChange={(open) => !open && setOpenLegal(null)}>
        <DialogContent className="max-h-[88svh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto p-5 sm:p-7">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-navy">{openLegal}</DialogTitle>
            <DialogDescription className="sr-only">
              Full {openLegal} for Brain Waves Tech Pvt Ltd.
            </DialogDescription>
          </DialogHeader>
          {openLegal && <LegalPolicyContent title={openLegal} />}
        </DialogContent>
      </Dialog>
    </footer>
  );
}

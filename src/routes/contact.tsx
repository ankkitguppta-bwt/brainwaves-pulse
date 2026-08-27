import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { submitToWeb3Forms } from "@/lib/web3forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BrainWaves Tech — Book a Demo or Talk to an Advisor" },
      { name: "description", content: "Book a free demo, request an assessment or talk to a program advisor. WhatsApp +91 98930 64372." },
      { property: "og:title", content: "Contact BrainWaves Tech" },
      { property: "og:description", content: "Book a free demo or talk to an advisor." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [highlightTarget, setHighlightTarget] = useState<"booking" | "message" | null>(null);
  const bookingCardRef = useRef<HTMLDivElement | null>(null);
  const messageFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("highlight");
    if (param !== "booking" && param !== "message") return;
    setHighlightTarget(param);
    const targetRef = param === "booking" ? bookingCardRef : messageFormRef;
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = window.setTimeout(() => setHighlightTarget(null), 8000);
    return () => window.clearTimeout(timer);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending"); setErrorMsg(null);
    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      interest: String(fd.get("interest") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    fd.append("subject", "New Contact Form Submission — BrainWaves Tech Website");
    fd.append("from_name", "BrainWaves Tech Website");
    try {
      await submitToWeb3Forms(fd);
      setStatus("sent");
      formEl.reset();
      // Best-effort: also keep a record in the internal admin dashboard.
      fetch("/api/public/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        sub="Book a demo, request an assessment or apply for the practitioner programme. We'd love to hear from you."
      />
      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Compact contact info row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="tel:+919713337557"
              className="glass-card flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <Phone className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy">Phone / WhatsApp</p>
                <p className="truncate text-sm text-muted-foreground">+91 97133 37557</p>
              </div>
            </a>

            <a
              href="mailto:contact@brainwavestech.com"
              className="glass-card flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <Mail className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy">Email</p>
                <p className="truncate text-sm text-muted-foreground">contact@brainwavestech.com</p>
              </div>
            </a>

            <div className="glass-card flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:shadow-lg">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-navy">Social Media</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <a
                    href="https://www.facebook.com/people/Brain-Waves-Tech/100084467359447/?rdid=cL4DfN8YkjEZGeJU&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14D7AmrV3B%2F%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1877F2]/10 text-[#1877F2] transition-all hover:scale-110 hover:bg-[#1877F2] hover:text-white"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.youtube.com/@brainwavestech"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF0000]/10 text-[#FF0000] transition-all hover:scale-110 hover:bg-[#FF0000] hover:text-white"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/brain_waves_tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4405F]/10 text-[#E4405F] transition-all hover:scale-110 hover:bg-[#E4405F] hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/brain-waves-tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] transition-all hover:scale-110 hover:bg-[#0A66C2] hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919893064372"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10 p-1.5">
                <img
                  src="/whatsapp-icon-logo-svgrepo-com.svg"
                  alt="WhatsApp"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-navy">WhatsApp</p>
                <p className="truncate text-sm text-muted-foreground">Chat with us</p>
              </div>
            </a>
          </div>

          {/* Form + Booking side by side */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <form
              ref={messageFormRef}
              onSubmit={onSubmit}
              onClick={() => setHighlightTarget(null)}
              className={`glass-card rounded-2xl p-6 transition-colors duration-500 lg:col-span-7 ${
                highlightTarget === "message" ? "highlight-pulse" : ""
              }`}
            >
              <h2 className="font-display text-xl font-bold text-navy">Send a message</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone / WhatsApp" name="phone" className="sm:col-span-2" />
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interest</label>
                  <select name="interest" className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm">
                    {["Book Free Demo", "Request Brainwave Assessment", "Practitioner Training", "Hardware & Software", "Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                  <textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm" />
                </div>
                {status === "sent" && (
                  <p className="sm:col-span-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                    Thanks! We'll get back to you shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>
                )}
                <button
                  disabled={status === "sending"}
                  className="sm:col-span-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
            </form>

            <div
              ref={bookingCardRef}
              onClick={() => setHighlightTarget(null)}
              className={`glass-card overflow-hidden rounded-2xl p-4 transition-colors duration-500 lg:col-span-5 ${
                highlightTarget === "booking" ? "highlight-pulse" : ""
              }`}
            >
              <div className="px-2">
                <h2 className="font-display text-xl font-bold text-navy">Book a meeting</h2>
                <p className="text-sm text-muted-foreground">Pick a time that works and schedule directly via Cal.com.</p>
              </div>
              <iframe
                src="https://cal.com/brainwaves-tech?theme=light"
                title="Schedule a meeting with BrainWaves Tech"
                className="mt-3 h-[520px] w-full rounded-xl border-0 bg-white"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  className = "",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm"
      />
    </div>
  );
}

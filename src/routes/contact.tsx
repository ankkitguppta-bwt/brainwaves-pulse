import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Phone, Mail, MapPin } from "lucide-react";
import whatsappIcon from "@/assets/whatsapp.svg.asset.json";

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
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        sub="Book a demo, request an assessment or apply for the practitioner programme — we'd love to hear from you."
      />
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Compact contact info row */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard icon={Phone} title="Phone / WhatsApp" lines={["+91 98930 64372", "+91 92440 24033"]} />
            <InfoCard icon={Mail} title="Email" lines={["hello@brainwavestech.com"]} />
            <InfoCard icon={MapPin} title="Website" lines={["www.brainwavestech.com"]} />
            <a
              href="https://wa.me/919893064372"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 rounded-2xl p-4 transition hover:shadow-lg"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15">
                <img src={whatsappIcon.url} alt="" className="h-5 w-5" />
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
              action={`mailto:hello@brainwavestech.com`}
              method="post"
              encType="text/plain"
              className="glass-card rounded-2xl p-6 lg:col-span-7"
            >
              <h2 className="font-display text-xl font-bold text-navy">Send a message</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
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
                <button className="sm:col-span-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy-soft">
                  Send Message
                </button>
              </div>
            </form>

            <div className="glass-card overflow-hidden rounded-2xl p-4 lg:col-span-5">
              <div className="px-2">
                <h2 className="font-display text-xl font-bold text-navy">Book a meeting</h2>
                <p className="text-sm text-muted-foreground">Pick a time that works — schedule directly via Cal.com.</p>
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

function Field({ label, name, type = "text", className = "" }: { label: string; name: string; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input name={name} type={type} className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm" />
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="glass-card flex items-center gap-3 rounded-2xl p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-navy">{title}</p>
        {lines.map((l) => (
          <p key={l} className="truncate text-sm text-muted-foreground">{l}</p>
        ))}
      </div>
    </div>
  );
}

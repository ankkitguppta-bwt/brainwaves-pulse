import { createFileRoute } from "@tanstack/react-router";
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
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <form
            action={`mailto:hello@brainwavestech.com`}
            method="post"
            encType="text/plain"
            className="glass-card rounded-2xl p-6"
          >
            <h2 className="font-display text-xl font-bold text-navy">Send a message</h2>
            <div className="mt-5 grid gap-4">
              <Field label="Name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone / WhatsApp" name="phone" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interest</label>
                <select name="interest" className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm">
                  {["Book Free Demo", "Request Brainwave Assessment", "Practitioner Training", "Hardware & Software", "Other"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea name="message" rows={4} className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm" />
              </div>
              <button className="rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white">Send Message</button>
            </div>
          </form>

          <div className="space-y-4">
            <InfoRow icon={Phone} title="Phone / WhatsApp" lines={["+91 98930 64372", "+91 92440 24033"]} />
            <InfoRow icon={Mail} title="Email" lines={["hello@brainwavestech.com"]} />
            <InfoRow icon={MapPin} title="Website" lines={["www.brainwavestech.com"]} />
            <a
              href="https://wa.me/919893064372"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              <img src={whatsappIcon.url} alt="" className="h-5 w-5" />
              Chat on WhatsApp
            </a>

            <div className="glass-card overflow-hidden rounded-2xl p-2">
              <h2 className="px-4 pt-3 font-display text-xl font-bold text-navy">Book a meeting</h2>
              <p className="px-4 pb-3 text-sm text-muted-foreground">Pick a time that works — schedule directly via Cal.com.</p>
              <iframe
                src="https://cal.com/brainwaves-tech"
                title="Schedule a meeting with BrainWaves Tech"
                className="h-[700px] w-full rounded-xl border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input name={name} type={type} className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm" />
    </div>
  );
}

function InfoRow({ icon: Icon, title, lines }: { icon: React.ComponentType<{ className?: string }>; title: string; lines: string[] }) {
  return (
    <div className="glass-card flex items-start gap-4 rounded-2xl p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-navy">{title}</p>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">{l}</p>
        ))}
      </div>
    </div>
  );
}

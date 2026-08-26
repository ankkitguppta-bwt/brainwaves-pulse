import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, BatteryCharging, Bluetooth, Clock3, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import headset from "@/assets/client/hardware/bwt-headset.png";
import technicalDataset from "@/assets/client/hardware/technical-dataset.pdf";
import licence1 from "@/assets/client/licences/HARDWARE LICENSE 1.png";
import licence2 from "@/assets/client/licences/HARDWARE LICENSE 2.png";
import licence3 from "@/assets/client/licences/HARDWARE LICENSE 3.png";
import licence4 from "@/assets/client/licences/HARDWARE LICENSE 4.png";

export const Route = createFileRoute("/products/headband")({
  head: () => ({
    meta: [
      { title: "BWT-2508 Neurofeedback Hardware | BrainWaves Tech" },
      {
        name: "description",
        content: "Dry-electrode neurofeedback hardware for real-time brainwave telemetry.",
      },
    ],
  }),
  component: HeadbandPage,
});

const features = [
  [
    "Advanced Dry Sensor Array",
    "No Gels. No Cleanup. Instant Contact.",
    "Three high-conductivity dry electrodes are positioned along the FP1 forehead axis to capture clean prefrontal signals. There are no wet EEG caps, no scalp abrasion, and no preparation time.",
  ],
  [
    "Ultra-Low Latency Telemetry",
    "Powered by Bluetooth 5.2 Connectivity.",
    "Transmit raw neural feedback to the BWT-1408 platform through stable, encrypted Bluetooth 5.2 Low Energy streaming, with no tethered cables or signal interruptions.",
  ],
  [
    "Intelligent Contact Quality Check",
    "Automated Impedance & Fit Verification.",
    "Before each recording, the BWT-2508 automatically verifies electrode grounding and fit. If a sensor loses contact, the software prompts instant realignment before the scan begins.",
  ],
  [
    "All-Day Endurance",
    "9-Hour Battery for High-Volume Sessions.",
    "The lightweight internal rechargeable battery delivers up to nine hours of continuous use, supporting back-to-back corporate, classroom, and clinical sessions from a single charge.",
  ],
];

const specs = [
  ["Model Designation", "BWT-2508"],
  ["Sensor Quantity", "3"],
  ["Sensor Technology", "Medical-Grade Dry Electrodes"],
  ["Anatomical Sensor Placement", "Fixed Position, FP1 Forehead Axis (Prefrontal Cortex)"],
  ["Setup Time", "2 minutes"],
  ["Wireless Protocol", "Bluetooth 5.2 Low Energy"],
  ["Power System", "Internal Rechargeable Battery"],
  ["Active Battery Runtime", "Up to 9 Hours"],
  ["Data Quality Rating", "High-Fidelity Signal-to-Noise Ratio (Good/Clinical Grade)"],
  ["Headband Design", "Ergonomic, Adjustable Fixed Position Strap"],
];

const certifications = [
  [
    "ISO 13485 Certified",
    "Compliant with international quality-management standards for medical devices.",
    licence2,
  ],
  [
    "CE Certified",
    "Meets European health, safety, and environmental protection standards.",
    licence1,
  ],
  [
    "ISO 9001:2015 Certified",
    "Built within a standardized quality-management system for consistent product and service delivery.",
    licence3,
  ],
  [
    "RoHS Compliant",
    "Free from restricted hazardous substances in accordance with RoHS requirements.",
    licence4,
  ],
] as const;

function HeadbandPage() {
  const [preview, setPreview] = useState<(typeof certifications)[number] | null>(null);
  return (
    <>
      <PageHero
        eyebrow="BWT-2508 Hardware"
        title={
          <>
            <span className="font-medium text-white/60">BWT-2508:</span>{" "}
            <span className="font-bold text-white">The Neurofeedback Hardware</span>
          </>
        }
        sub="Engineered with dry-electrode sensor technology, the BWT-2508 captures raw electrical micro-voltages from the prefrontal cortex in real time, with no conductive gels, scalp preparation, or messy cleanup."
      />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <img
            src={headset}
            alt="BWT-2508 neurofeedback headset"
            className="w-full rounded-3xl object-contain"
          />
          <div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: ShieldCheck,
                  label: "3 Precision Sensors",
                  sub: "Medical-grade dry electrodes, zero prep.",
                  color: "#14b8a6",
                },
                {
                  icon: Clock3,
                  label: "2-Minute Brainwave Reading",
                  sub: "A full scan captured in one short session.",
                  color: "#f97316",
                },
                {
                  icon: BatteryCharging,
                  label: "9 Hours Continuous Battery",
                  sub: "Full-day tracking on a single charge.",
                  color: "#a855f7",
                },
                {
                  icon: Bluetooth,
                  label: "Bluetooth 5.2 Wireless",
                  sub: "Stable, low-latency encrypted streaming.",
                  color: "#14b8a6",
                },
              ].map(({ icon: Icon, label, sub, color }, i) => (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
                  style={{ backgroundImage: `linear-gradient(135deg, #ffffff, ${color}0d)` }}
                >
                  <span className="absolute right-4 top-4 font-display text-xs font-bold text-navy/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}1a`, color }}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-sm font-semibold text-navy">{label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
              >
                Request a Demo
              </Link>
              <a
                href={technicalDataset}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-navy/20 px-5 py-3 text-sm font-semibold text-navy"
              >
                Download Technical Dataset
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">
            Designed for Portability. Built for Biometric Accuracy.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {features.map(([title, headline, body]) => (
              <article key={title} className="rounded-2xl border border-navy/10 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-teal">{title}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-navy">{headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-display text-3xl font-bold text-navy">Technical Specifications</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white">
            <table className="w-full text-left text-sm">
              <tbody>
                {specs.map(([label, value]) => (
                  <tr key={label} className="border-b border-navy/10 last:border-0">
                    <th className="w-2/5 bg-navy/[.03] px-4 py-3 font-semibold text-navy">
                      {label}
                    </th>
                    <td className="px-4 py-3 text-muted-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">
              Global certifications &amp; compliance
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy">
              Documented Standards for the BWT-2508
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The BWT-2508 is manufactured to internationally recognized medical-device, quality,
              safety, and environmental standards.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert) => {
              const [title, description, logo] = cert;
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setPreview(cert)}
                  className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-navy/10 bg-white p-6 text-center shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
                >
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal via-teal/60 to-teal/20" />
                  <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-navy/[.03] ring-1 ring-navy/5 transition-colors duration-300 group-hover:bg-teal/5 group-hover:ring-teal/20">
                    <img
                      src={logo}
                      alt={`${title} badge`}
                      loading="eager"
                      decoding="async"
                      className="h-24 w-24 object-contain"
                    />
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal text-navy shadow-sm">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="max-w-lg sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-navy">{preview?.[0]}</DialogTitle>
            <DialogDescription>{preview?.[1]}</DialogDescription>
          </DialogHeader>
          {preview && (
            <img
              src={preview[2]}
              alt={`${preview[0]} certificate`}
              className="mx-auto max-h-[65vh] w-auto rounded-xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            Bring Biometric Precision to Your Practice or Organization.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Get hands-on experience with the BWT-2508 Headset and see how a two-minute brainwave
            reading can transform your mental-wellness workflow.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/contact?highlight=message"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
            >
              Contact Sales Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

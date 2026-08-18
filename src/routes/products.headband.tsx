import { createFileRoute, Link } from "@tanstack/react-router";
import { BatteryCharging, Bluetooth, Clock3, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
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
    "Transmit raw neural feedback to the BWT-1408 platform through stable, encrypted Bluetooth 5.2 Low Energy streaming—without tethered cables or signal interruptions.",
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
  ],
  ["CE Certified", "Meets European health, safety, and environmental protection standards."],
  [
    "ISO 9001:2015 Certified",
    "Built within a standardized quality-management system for consistent product and service delivery.",
  ],
  [
    "RoHS Compliant",
    "Free from restricted hazardous substances in accordance with RoHS requirements.",
  ],
] as const;

function HeadbandPage() {
  return (
    <>
      <PageHero
        eyebrow="BWT-2508 Hardware"
        title="BWT-2508: The Neurofeedback Hardware"
        sub="Engineered with dry-electrode sensor technology, the BWT-2508 captures raw electrical micro-voltages from the prefrontal cortex in real time—without conductive gels, scalp preparation, or messy cleanup."
      />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <img
            src={headset}
            alt="BWT-2508 neurofeedback headset"
            className="w-full rounded-3xl object-contain"
          />
          <div>
            <div className="grid grid-cols-2 gap-3">
              {[
                [ShieldCheck, "3 Precision Sensors"],
                [Clock3, "2-Minute Brainwave Reading"],
                [BatteryCharging, "9 Hours Continuous Battery"],
                [Bluetooth, "Bluetooth 5.2 Wireless"],
              ].map(([Icon, label]) => (
                <div key={String(label)} className="rounded-2xl bg-white p-5 shadow-sm">
                  <Icon className="h-5 w-5 text-teal" />
                  <p className="mt-3 text-sm font-semibold text-navy">{String(label)}</p>
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
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[licence1, licence2, licence3, licence4].map((licence, index) => (
              <a
                key={licence}
                href={licence}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-navy/10 bg-background p-3 shadow-sm transition hover:-translate-y-1 hover:border-teal/50"
              >
                <img
                  src={licence}
                  alt={`BWT-2508 hardware licence ${index + 1}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover"
                />
                <p className="mt-3 text-center text-xs font-semibold text-navy">
                  {certifications[index][0]}
                </p>
              </a>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-navy/10 bg-background p-5">
                <h3 className="font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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
            <Link
              to="/contact"
              className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
            >
              Schedule a Call
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold"
            >
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

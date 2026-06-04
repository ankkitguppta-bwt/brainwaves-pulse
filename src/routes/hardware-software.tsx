import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BannerSection } from "@/components/site/BannerSection";
import { MockupFrame } from "@/components/site/MockupFrame";
import { CheckCircle2, Cpu, Bluetooth, Activity, Feather, Layers, ArrowRight } from "lucide-react";
import bannerHero from "@/assets/banners/banner-hero.png";
import hardware1 from "@/assets/docx/hardware-1.png";
import hardware2 from "@/assets/docx/hardware-2.jpeg";
import hardware3 from "@/assets/docx/hardware-3.jpeg";
import hardware4 from "@/assets/docx/hardware-4.jpeg";
import hardware5 from "@/assets/docx/hardware-5.jpeg";
import hardwareHead from "@/assets/docx/headband-realistic.jpg";
import game1 from "@/assets/docx/game-dolphin-1.jpeg";
import game2 from "@/assets/docx/game-dolphin-2.png";
import game3 from "@/assets/docx/game-dolphin-3.png";

export const Route = createFileRoute("/hardware-software")({
  head: () => ({
    meta: [
      { title: "Hardware & Software — Neurofeedback Ecosystem | BrainWaves Tech" },
      { name: "description", content: "EEG hardware, sensors, neurofeedback dashboard, brainwave monitoring, session recording, analysis and cloud reporting." },
      { property: "og:title", content: "Hardware & Software Ecosystem" },
      { property: "og:description", content: "A complete neurofeedback hardware and software package." },
      { property: "og:url", content: "/hardware-software" },
    ],
    links: [{ rel: "canonical", href: "/hardware-software" }],
  }),
  component: HwSwPage,
});

function HwSwPage() {
  const hwThumbs = [
    { src: hardware1, caption: "EEG sensors · medical-grade" },
    { src: hardware2, caption: "Headband fit · adjustable" },
    { src: hardware3, caption: "Bluetooth module · low-latency" },
    { src: hardware4, caption: "Charging dock · portable" },
    { src: hardware5, caption: "Carry case · clinic-ready" },
  ];
  const features = [
    { icon: Activity, t: "Research-grade" },
    { icon: Bluetooth, t: "Bluetooth Sync" },
    { icon: Feather, t: "Lightweight" },
    { icon: Layers, t: "Multi-channel" },
    { icon: Cpu, t: "Dry Sensors" },
  ];
  return (
    <>
      <PageHero
        eyebrow="Hardware & Software"
        title="A complete neurofeedback ecosystem"
        sub="Research-grade hardware paired with intuitive software for assessment, training and reporting."
      />
      <BannerSection
        src={bannerHero}
        alt="Smart EEG Headband & Live Brainwave Software"
        cta={{ to: "/contact", label: "Book a demo" }}
      />

      {/* ───── Hardware ───── */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                Hardware
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
                EEG hardware built for real clinical sessions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our neurofeedback headband captures clean, multi-band EEG signals with
                comfortable dry sensors. Designed for psychologists, schools and wellness
                clinics — light, portable, and ready out of the box.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {features.map((f) => (
                  <span key={f.t} className="inline-flex items-center gap-1.5 rounded-full bg-cyan-bg px-3 py-1.5 text-xs font-medium text-navy">
                    <f.icon className="h-3.5 w-3.5 text-teal" /> {f.t}
                  </span>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-navy">
                {[
                  "Captures Alpha, Beta, Theta, Delta and Gamma bands",
                  "6 months hardware warranty + technical support",
                  "Works seamlessly with our cloud dashboard",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {x}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy/90">
                Request a hardware demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <MockupFrame
              src={hardwareHead}
              alt="BrainWaves Tech EEG headband"
              caption="Smart EEG Headband · flagship device"
              tone="light"
              aspect="4/3"
            />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {hwThumbs.map((t) => (
              <MockupFrame key={t.caption} src={t.src} alt={t.caption} caption={t.caption} tone="light" aspect="4/3" />
            ))}
          </div>
        </div>
      </section>

      {/* ───── Software ───── */}
      <section className="relative overflow-hidden bg-navy py-16 text-white md:py-20">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-teal/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-orange/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <MockupFrame
              src={game1}
              alt="Interactive dolphin neurofeedback training game"
              caption="Live Session · Dolphin glides up as your focus rises"
              tone="dark"
              aspect="video"
              className="order-2 lg:order-1"
            />
            <div className="order-1 lg:order-2">
              <span className="inline-block rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                Software
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Interactive Neurofeedback Training Game
              </h2>
              <p className="mt-4 text-white/75">
                Our flagship dolphin training game turns EEG signals into a friendly,
                reward-based experience. As attention rises, the dolphin moves — making
                focus visible, measurable and genuinely fun for kids, students and adults.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "Real-time brainwave feedback loop",
                  "Reward-based positive reinforcement",
                  "Designed for kids, students and adults",
                  "Session recording & progress tracking",
                  "Cloud reporting & PDF exports",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" /> {x}
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div>
                  <p className="font-display text-2xl font-bold text-teal">200+</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/60">Sessions</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-orange">95%</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/60">Engagement</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-teal">Live</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/60">EEG Sync</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            <MockupFrame src={game2} alt="Focus mode screenshot" caption="Focus Mode · Real-time attention meter" tone="dark" aspect="video" />
            <MockupFrame src={game3} alt="Reward animation screenshot" caption="Reward Animation · Positive reinforcement loop" tone="dark" aspect="video" />
          </div>
        </div>
      </section>
    </>
  );
}

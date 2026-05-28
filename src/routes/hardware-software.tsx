import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hardware1 from "@/assets/docx/hardware-1.png";
import hardware2 from "@/assets/docx/hardware-2.jpeg";
import hardware3 from "@/assets/docx/hardware-3.jpeg";
import hardware4 from "@/assets/docx/hardware-4.jpeg";
import hardware5 from "@/assets/docx/hardware-5.jpeg";
import hardwareHead from "@/assets/docx/hardware-headband.jpg";
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
  const hw = [hardwareHead, hardware1, hardware2, hardware3, hardware4, hardware5];
  const sw = [game1, game2, game3];
  return (
    <>
      <PageHero
        eyebrow="Hardware & Software"
        title="A complete neurofeedback ecosystem"
        sub="Research-grade hardware paired with intuitive software for assessment, training and reporting."
      />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy">Hardware</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {hw.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-cyan-bg">
                <img src={img} alt={`Hardware ${i + 1}`} className="h-56 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gradient-soft py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy">Software — Interactive Neurofeedback Training Game</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {sw.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border bg-white">
                <img src={img} alt={`Software ${i + 1}`} className="h-56 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

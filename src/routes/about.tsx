import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import founder from "@/assets/docx/founder-ankit.jpg";
import teamFrancesco from "@/assets/docx/team-francesco.jpg";
import teamParas from "@/assets/docx/team-paras.jpeg";
import teamPaula from "@/assets/docx/team-paula.jpg";
import teamSushant from "@/assets/docx/team-sushant.jpg";
import teamRoopali from "@/assets/docx/team-roopali.jpg";
import teamRima from "@/assets/docx/team-rima.jpg";
import teamDomendra from "@/assets/docx/team-domendra.png";
import teamNitya from "@/assets/docx/team-nitya.jpeg";
import teamRajeev from "@/assets/docx/team-rajeev.jpg";
import teamAmruta from "@/assets/docx/team-amruta.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BrainWaves Tech — Founder, Team & Mission" },
      { name: "description", content: "Meet the founder, scientists, practitioners and advisors behind BrainWaves Tech — India's neurofeedback and brainwave analysis platform." },
      { property: "og:title", content: "About BrainWaves Tech" },
      { property: "og:description", content: "Our team of psychologists, researchers and technologists." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const lead = [
    { img: founder, n: "Dr. Ankit Gupta", r: "Founder & Director · Psychologist, Neurofeedback Practitioner, Brainwave Analyst, Sound Therapy Expert" },
    { img: teamFrancesco, n: "Francesco Garripoli", r: "CTO · International Neurofeedback & Consciousness Research Contributor" },
    { img: teamParas, n: "Dr. Paras Kaul", r: "Researcher, Neurofeedback · California" },
    { img: teamPaula, n: "Ms. Paula", r: "Ex VP, IBM · Wellness & Research Integration" },
  ];
  const team = [
    { img: teamSushant, n: "Dr. Sushant Myrosker", r: "Team" },
    { img: teamRoopali, n: "Dr. Roopali Bajaj", r: "Team" },
    { img: teamRima, n: "Rima Goyal", r: "Team" },
    { img: teamDomendra, n: "Dr. Domendra Singh Ganjir", r: "Team" },
    { img: teamNitya, n: "Nitya Gupta", r: "Team" },
    { img: teamRajeev, n: "Dr. Rajeev Agrawal", r: "Advisor" },
    { img: teamAmruta, n: "Amruta Singhwekar", r: "Advisor" },
  ];
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by scientists, practitioners and technologists"
        sub="We're on a mission to make neurofeedback and brainwave analysis accessible across India through robust technology, training and support."
      />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy">Leadership</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lead.map((p) => (
              <div key={p.n} className="glass-card overflow-hidden rounded-2xl">
                <img src={p.img} alt={p.n} className="h-56 w-full object-cover" />
                <div className="p-4">
                  <p className="font-display font-semibold text-navy">{p.n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.r}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-navy">Team & Advisors</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => (
              <div key={p.n} className="glass-card flex items-center gap-3 rounded-2xl p-4">
                <img src={p.img} alt={p.n} className="h-14 w-14 rounded-full object-cover ring-2 ring-teal/40" />
                <div>
                  <p className="text-sm font-semibold text-navy">{p.n}</p>
                  <p className="text-xs text-muted-foreground">{p.r}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

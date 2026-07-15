import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import founder from "@/assets/docx/founder-ankit.jpg";
import teamParas from "@/assets/docx/team-paras.jpeg";
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

// Local photo lookup by name so admins can leave image_url blank and still show existing photos.
const PHOTO_BY_NAME: Record<string, string> = {
  "Dr. Ankit Gupta": founder,
  "Dr. Paras Kaul": teamParas,
  "Dr. Sushant Myrosker": teamSushant,
  "Dr. Roopali Bajaj": teamRoopali,
  "Rima Goyal": teamRima,
  "Dr. Domendra Singh Ganjir": teamDomendra,
  "Nitya Gupta": teamNitya,
  "Dr. Rajeev Agrawal": teamRajeev,
  "Amruta Singhwekar": teamAmruta,
};

function photoFor(p: { name: string; image_url: string | null }): string | null {
  return p.image_url || PHOTO_BY_NAME[p.name] || null;
}

function AboutPage() {
  const q = useQuery({
    queryKey: ["people", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("people").select("*").order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const lead = (q.data ?? []).filter((p) => p.category === "leadership");
  const team = (q.data ?? []).filter((p) => p.category !== "leadership");

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
            {lead.map((p) => {
              const img = photoFor(p);
              return (
                <div key={p.id} className="glass-card overflow-hidden rounded-2xl">
                  {img && <img src={img} alt={p.name} className="h-56 w-full object-cover" />}
                  <div className="p-4">
                    <p className="font-display font-semibold text-navy">{p.name}</p>
                    {p.role && <p className="mt-1 text-xs text-muted-foreground">{p.role}</p>}
                    {p.description && <p className="mt-2 text-xs text-muted-foreground">{p.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-navy">Team & Advisors</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => {
              const img = photoFor(p);
              return (
                <div key={p.id} className="glass-card flex items-center gap-3 rounded-2xl p-4">
                  {img ? (
                    <img src={img} alt={p.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-teal/40" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/20 text-navy font-bold">
                      {p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-navy">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.role ?? (p.category === "advisor" ? "Advisor" : "Team")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/site/PageHero";
import { ImpactCallout } from "@/components/site/ImpactCallout";
import { JourneyCta } from "@/components/site/JourneyCta";
import { supabase } from "@/integrations/supabase/client";
import founder from "@/assets/docx/founder-ankit.jpg";
import teamParas from "@/assets/docx/team-paras.jpeg";
import teamNitya from "@/assets/docx/team-nitya.jpeg";
import teamAmruta from "@/assets/docx/team-amruta.jpg";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team — BrainWaves Tech Leadership & Advisors" },
      {
        name: "description",
        content:
          "Clinical psychology, BCI engineering, product architecture and enterprise growth — the leadership team and global board of advisors behind BrainWaves Tech.",
      },
      { property: "og:title", content: "Meet the Team — BrainWaves Tech" },
      {
        property: "og:description",
        content:
          "Pioneered by leading mental health professionals. Backed by decades of global innovation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

const PHOTO_BY_NAME: Record<string, string> = {
  "Dr. Ankit Gupta": founder,
  "Mrs. Nitya Gupta": teamNitya,
  "Dr. Paras Kaul": teamParas,
  "Amruta Singhwekar": teamAmruta,
};

type Person = {
  id: string;
  name: string;
  role: string | null;
  description: string | null;
  image_url: string | null;
  category: string;
};

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

function splitBio(description: string | null) {
  const text = description ?? "";
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const credLine = lines.find((l) => l.toLowerCase().startsWith("credentials:"));
  const credentials = credLine ? credLine.replace(/^credentials:\s*/i, "") : null;
  const profile = lines.filter((l) => l !== credLine).join("\n\n");
  return { credentials, profile };
}

function PersonCard({ p, kind }: { p: Person; kind: "leadership" | "advisor" }) {
  const img = p.image_url || PHOTO_BY_NAME[p.name] || null;
  const { credentials, profile } = splitBio(p.description);
  return (
    <article
      data-aos="fade-up"
      data-aos-duration="900"
      className="glass-card flex h-full flex-col rounded-3xl bg-white p-6"
    >
      <div className="flex items-center gap-4">
        {img ? (
          <img
            src={img}
            alt={p.name}
            className="h-16 w-16 shrink-0 rounded-2xl object-cover ring-2 ring-teal/40"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal/15 font-display text-lg font-bold text-navy ring-2 ring-teal/40">
            {initials(p.name)}
          </div>
        )}
        <div>
          <h3 className="font-display text-lg font-bold text-navy">{p.name}</h3>
          {p.role && (
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-orange">
              {kind === "advisor" ? "Advisory Role: " : ""}
              {p.role}
            </p>
          )}
        </div>
      </div>

      {credentials && (
        <p className="mt-4 rounded-xl bg-navy/[0.04] px-4 py-3 text-xs leading-relaxed text-navy">
          <span className="font-semibold">Credentials:</span> {credentials}
        </p>
      )}
      {profile && (
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {profile}
        </p>
      )}
    </article>
  );
}

function SkeletonCard() {
  return <div className="h-64 animate-pulse rounded-3xl bg-white/70" />;
}

function TeamPage() {
  const q = useQuery({
    queryKey: ["people", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("people").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as Person[];
    },
  });

  const people = q.data ?? [];
  const leadership = people.filter((p) => p.category === "leadership");
  const advisors = people.filter((p) => p.category !== "leadership");

  return (
    <>
      <PageHero
        eyebrow="Meet the Team"
        title="Pioneered by Leading Mental Health Professionals. Backed by Decades of Global Innovation"
        sub="Our leadership bridges deep clinical psychology, brain-computer interface (BCI) engineering, digital product architecture, and enterprise growth strategies. Together with our global advisory network, we are transforming qualitative mental health analysis into an empirical, data-driven science."
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-navy">Leadership Team</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {q.isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : leadership.map((p) => <PersonCard key={p.id} p={p} kind="leadership" />)}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-navy">Board of Advisors</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {q.isLoading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : advisors.map((p) => <PersonCard key={p.id} p={p} kind="advisor" />)}
          </div>

          <div className="mt-16">
            <ImpactCallout quote="Our strength lies in bridging neuroscience, scalable technology, and strategic growth. We converge patented neurofeedback technology, mental health, and enterprise systems to transform how wellness practitioners and corporate leaders optimize performance." />
          </div>
        </div>
      </section>

      <JourneyCta />
    </>
  );
}

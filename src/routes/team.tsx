import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { ImpactCallout } from "@/components/site/ImpactCallout";
import { JourneyCta } from "@/components/site/JourneyCta";
import { TeamPaintBrushCanvas } from "@/components/site/TeamPaintBrushCanvas";
import { supabase } from "@/integrations/supabase/client";
import ankitAsset from "@/assets/client/team/ANKIT.png";
import nityaAsset from "@/assets/client/team/NITYA.png";
import swapnilAsset from "@/assets/client/team/SWAPNIL.png";
import vikasAsset from "@/assets/client/team/VIKAS.png";
import francescoAsset from "@/assets/client/team/FRANCESCO.png";
import parasAsset from "@/assets/client/team/PARAS.png";
import amrutaAsset from "@/assets/client/team/AMRUTA.png";
import { canonicalUrl } from "@/lib/site-seo";

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
    links: [{ rel: "canonical", href: canonicalUrl("/team") }],
  }),
  component: TeamPage,
});

const PHOTO_BY_NAME: Record<string, string> = {
  "Dr. Ankit Gupta": ankitAsset,
  "Mrs. Nitya Gupta": nityaAsset,
  "Swapnil Prabhat": swapnilAsset,
  "Mr. Vikas Patel": vikasAsset,
  "Francesco Garripoli": francescoAsset,
  "Dr. Paras Kaul": parasAsset,
  "Amruta Singhwekar": amrutaAsset,
};

type Person = {
  id: string;
  name: string;
  role: string | null;
  description: string | null;
  image_url: string | null;
  category: string;
};

const fallbackPeople: Person[] = [
  {
    id: "ankit",
    name: "Dr. Ankit Gupta",
    role: "Founder & Chief Executive Officer (CEO)",
    category: "leadership",
    image_url: null,
    description:
      "Credentials: RCI-Registered Psychologist | Triple Master’s Degree: Clinical Psychology, Organizational & Employee Psychology, and Production Engineering | Honorary Ph.D. | Mechanical Engineer\n\nWith over 12 years of domain experience and more than 20,000 hours of counselling and brainwave analysis, Dr. Gupta has personally helped over 11,000 individual clients. After identifying the limitations of qualitative questionnaires and physical B2C clinic scalability (The Brain Seeders), he engineered Brain Waves Tech’s patented B2B analytic model to deliver objective, real-time brainwave analytics without human intervention bias.",
  },
  {
    id: "nitya",
    name: "Mrs. Nitya Gupta",
    role: "Co-Founder & Chief Marketing Officer (CMO)",
    category: "leadership",
    image_url: null,
    description:
      "Serving as a strong foundational pillar in Brain Waves Tech’s growth, Mrs. Nitya Gupta guides strategic frameworks, brand positioning, and B2B partner engagement with over 7 years of experience. She oversees long-term marketing initiatives to integrate neurofeedback solutions across educational institutes, enterprise corporate setups, and healthcare verticals.",
  },
  {
    id: "swapnil",
    name: "Swapnil Prabhat",
    role: "Technical Product and Marketing Manager",
    category: "leadership",
    image_url: null,
    description:
      "A computer science engineer specializing in AI/ML with over three years of ground-level experience in mental health, Gen-Z engagement, and social initiative leadership. Having led community organizations, scaled outreach to over 1,000+ individuals, and advised early-stage startups in mental health and research, he bridges technical innovation with commercial growth. At the intersection of deep-tech and market strategy, he drives B2B sales expansion, product positioning, and market adoption.",
  },
  {
    id: "vikas",
    name: "Mr. Vikas Patel",
    role: "Chief Technology & Web Infrastructure Manager",
    category: "leadership",
    image_url: null,
    description:
      "Founder of Jeevijay Technologies Pvt. Ltd., Vikas is a tech builder and strategist specializing in AI-powered SaaS platforms, business automation, and digital transformation. Since 2018, he has architected scalable software systems that help businesses grow smarter, expanding operations across major tech hubs. Leveraging his experience delivering enterprise solutions for organizations like Aditya Birla Group, Jio, TCS, and Tata, he drives scalable web infrastructure, secure digital processes, and high-impact technology execution.",
  },
  {
    id: "francesco",
    name: "Francesco Garripoli",
    role: "Chief Technology Advisor & Global Technology Partner",
    category: "advisor",
    image_url: null,
    description:
      "Credentials: CTO\n\nA pioneer at the intersection of neuroscience, software design, and digital health technology. Francesco brings decades of innovation as a tech founder, U.S. patent holder in real-time brainwave monitoring systems, and software designer. Former President of the mid-Atlantic ACM/SIGGRAPH and founder of early data-visualization studios, he went on to build enterprise healthcare software for institutions like Mount Sinai Hospital and Canada’s Ministry of Health. As Founder of WujiTech, Chairman of the Qigong Institute, and an Emmy Award-winning producer, his work bridges cutting-edge signal processing algorithms with global health wellness platforms.",
  },
  {
    id: "paras",
    name: "Dr. Paras Kaul",
    role: "Senior Neurofeedback & BCI Research Advisor",
    category: "advisor",
    image_url: null,
    description:
      "Credentials: California-based Neurofeedback Researcher & BCI Specialist\n\nAn internationally recognized neurofeedback researcher, BCI pioneer, and author who has been working with real-time brainwave interfaces since 1992. A former university professor and researcher at organizations like MindSpec, Inc. (focusing on neurodevelopmental disorders), her work bridges neurofeedback data analysis with cognitive performance and integrative wellness modalities. She has published peer-reviewed research on brainwave learning, presented at major global forums, including the Dana Center Museum of Science in London, and serves on the board of ACM SIGGRAPH DC and the National Qigong Association.",
  },
  {
    id: "amruta",
    name: "Amruta Singhwekar",
    role: "Principal Financial & Strategic Growth Advisor",
    category: "advisor",
    image_url: null,
    description:
      "Credentials: Serial Entrepreneur\n\nCo-Founder of ezeseed and Founder Director at Anaadi Ventures, Amruta is a seasoned finance strategist, startup investor, and capital allocation expert holding an M.S. in Global Finance from Fordham Gabelli School of Business. With a strong track record across venture incubation (VASPL Initiatives), banking operations (ICICI Bank), and tech consulting (Tech Mahindra), she specializes in building disciplined governance frameworks and structured capital strategies. Her expertise guides institutional financial planning, risk calibration, and sustainable monetization models for enterprise scaling.",
  },
];

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");
}

function splitBio(description: string | null, name?: string) {
  const text = description ?? "";
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const credLine = lines.find((l) => l.toLowerCase().startsWith("credentials:"));
  let credentials = credLine ? credLine.replace(/^credentials:\s*/i, "") : null;

  if (!credentials && name === "Dr. Ankit Gupta") {
    credentials =
      "RCI-Registered Psychologist | Triple Master’s Degree: Clinical Psychology, Organizational & Employee Psychology, and Production Engineering | Honorary Ph.D. | Mechanical Engineer";
  }

  const profile = lines.filter((l) => l !== credLine).join("\n\n");
  return { credentials, profile };
}

function PersonCard({
  p,
  kind,
  index,
  isVisible,
  shouldAnimate,
}: {
  p: Person;
  kind: "leadership" | "advisor";
  index: number;
  isVisible: boolean;
  shouldAnimate: boolean;
}) {
  const img = PHOTO_BY_NAME[p.name] || p.image_url || null;
  const { credentials, profile } = splitBio(p.description, p.name);
  const isLeft = index % 2 === 0;
  return (
    <article
      data-person-id={p.id}
      className={`group relative grid gap-5 lg:items-center lg:gap-10 ${
        isLeft
          ? "lg:grid-cols-[minmax(13rem,0.66fr)_minmax(0,1.34fr)]"
          : "lg:grid-cols-[minmax(0,1.34fr)_minmax(13rem,0.66fr)]"
      }`}
    >
      <div
        data-person-photo
        className={`relative mx-auto w-full max-w-[18rem] transition-all duration-700 motion-reduce:translate-x-0 motion-reduce:opacity-100 ${
          !shouldAnimate || isVisible
            ? "translate-y-0 opacity-100"
            : `${isLeft ? "-translate-x-6" : "translate-x-6"} translate-y-4 opacity-0`
        } ${isLeft ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-teal/30 via-transparent to-orange/20 blur-xl" />
        {shouldAnimate && isVisible && <span aria-hidden className="team-portrait-pulse absolute -inset-2 rounded-[1.9rem] border border-teal/35" />}
        {img ? (
          <img
            src={img}
            alt={`${p.name}, ${p.role ?? kind}`}
            className={`relative aspect-[4/5] w-full rounded-[1.75rem] border border-white/80 object-cover shadow-[0_28px_55px_-24px_rgba(15,23,42,0.55)] ${
              shouldAnimate && isVisible ? "team-portrait-float" : ""
            }`}
          />
        ) : (
          <div className="relative flex aspect-[4/5] items-center justify-center rounded-[1.75rem] border border-teal/20 bg-teal/10 font-display text-4xl font-bold text-navy shadow-[0_28px_55px_-24px_rgba(15,23,42,0.55)]">
            {initials(p.name)}
          </div>
        )}
      </div>

      <div
        className={`relative rounded-3xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_-22px_rgba(15,23,42,0.45)] sm:p-7 ${
          !shouldAnimate || isVisible
            ? "translate-y-0 opacity-100"
            : `${isLeft ? "translate-x-6" : "-translate-x-6"} translate-y-4 opacity-0`
        } motion-reduce:translate-x-0 motion-reduce:opacity-100 ${isLeft ? "lg:order-2" : "lg:order-1"}`}
      >
        <span className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-teal via-teal/50 to-transparent" />
        <div>
          <h3 className="font-display text-xl font-bold text-navy">{p.name}</h3>
          {p.role && (
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-orange sm:text-[11px]">
              {kind === "advisor" ? "Advisory Role: " : ""}
              {p.role}
            </p>
          )}
          {credentials && (
            <div className="mt-3 flex flex-wrap gap-2">
              {credentials.split("|").map((cred, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-lg border border-teal/20 bg-teal/5 px-2.5 py-1 text-xs font-semibold text-teal"
                >
                  {cred.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 h-px bg-navy/5" />

        {img ? (
          <span className="sr-only">Profile photo displayed alongside this biography.</span>
        ) : null}
        {profile && (
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {profile}
          </p>
        )}
      </div>
    </article>
  );
}

function SkeletonCard() {
  return <div className="h-64 animate-pulse rounded-3xl bg-white/70" />;
}

function TeamPage() {
  const storyRef = useRef<HTMLElement>(null);
  const [visiblePeople, setVisiblePeople] = useState<Set<string>>(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  const q = useQuery({
    queryKey: ["people", "public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("people").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as Person[];
    },
  });

  const people = q.data && q.data.length > 0 ? q.data : fallbackPeople;
  const leadership = useMemo(
    () => people.filter((p) => p.category === "leadership"),
    [people],
  );
  const advisors = useMemo(
    () => people.filter((p) => p.category !== "leadership"),
    [people],
  );
  const storyPeople = useMemo(() => [...leadership, ...advisors], [leadership, advisors]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    setAnimationsReady(true);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisiblePeople(new Set(storyPeople.map((person) => person.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisiblePeople((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            if (entry.isIntersecting) next.add(entry.target.getAttribute("data-person-id") ?? "");
          });
          return next;
        });
      },
      { threshold: 0.22 },
    );
    storyRef.current?.querySelectorAll<HTMLElement>("[data-person-id]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reducedMotion, storyPeople]);

  return (
    <>
      <PageHero
        eyebrow="Meet the Team"
        title={
          <>
            <span className="font-medium text-white/60">
              Pioneered by Leading Mental Health Professionals.
            </span>{" "}
            <span className="font-bold text-white">Backed by Decades of Global Innovation</span>
          </>
        }
        sub="Our leadership bridges deep clinical psychology, brain-computer interface (BCI) engineering, digital product architecture, and enterprise growth strategies. Together with our global advisory network, we are transforming qualitative mental health analysis into an empirical, data-driven science."
      />

      <section ref={storyRef} className="relative overflow-hidden bg-background py-16 lg:py-24">
        {/* Canvas Paint Brush Animation */}
        <TeamPaintBrushCanvas
          containerRef={storyRef}
          skipIndex={leadership.length - 1}
          reducedMotion={reducedMotion}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-8">
          <div className="relative space-y-16 lg:space-y-32">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Leadership Team</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                The people translating clinical insight and neural data into scalable wellbeing technology.
              </p>
            </div>

            {q.isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : storyPeople.map((person, index) => (
                  <div key={person.id}>
                    {index === leadership.length && (
                      <div className="pb-8 lg:pb-10">
                        <h2 className="font-display text-2xl font-bold text-navy">Board of Advisors</h2>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          Global expertise guiding the next chapter of neurofeedback innovation.
                        </p>
                      </div>
                    )}
                    <PersonCard
                      p={person}
                      kind={person.category === "leadership" ? "leadership" : "advisor"}
                      index={index}
                      isVisible={visiblePeople.has(person.id)}
                      shouldAnimate={animationsReady && !reducedMotion}
                    />
                  </div>
                ))}
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

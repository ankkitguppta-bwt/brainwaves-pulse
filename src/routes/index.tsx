import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  Brain,
  Headphones,
  GraduationCap,
  Sparkles,
  Waves,
  Gauge,
  Heart,
  Target,
  Users,
  School,
  UserCog,
  Briefcase,
  Trophy,
  Smile,
  Stethoscope,
  Baby,
  Building2,
  ArrowRight,
  CheckCircle2,
  Play,
  ShieldCheck,
} from "lucide-react";
import { BrainwaveBackdrop } from "@/components/site/BrainwaveBackdrop";
import heroVideo from "@/assets/video/hero-loop.mp4.asset.json";
import { CountUp } from "@/components/site/CountUp";
import { WaveModal, WAVES, type WaveInfo } from "@/components/site/WaveModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AOS from "aos";
import "aos/dist/aos.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrainWaves Tech — India's Advanced Neurofeedback & Brainwave Analysis Platform" },
      {
        name: "description",
        content:
          "Assess brain activity, understand cognitive patterns and deliver customized neurofeedback & sound therapy solutions.",
      },
      { property: "og:title", content: "India's Advanced Neurofeedback & Brainwave Analysis Platform" },
      {
        property: "og:description",
        content:
          "Empowering psychologists, counselors, educators and wellness professionals with neurofeedback technology, brainwave analysis and customized sound therapy.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const [activeWave, setActiveWave] = useState<WaveInfo | null>(null);
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
      anchorPlacement: "top-bottom",
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Hero />
      <StatsStrip />
      <EcosystemSection />
      <HowItWorks />
      <WhatIsNeurofeedback onSelect={setActiveWave} />
      <WhoBenefits />
      <VideoTestimonials />
      <FAQ />
      <FinalCTA />
      <WaveModal wave={activeWave} onChange={setActiveWave} onClose={() => setActiveWave(null)} />
    </>
  );
}

/* ───── Hero ───── */
function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-[100svh] w-full items-center overflow-hidden bg-navy text-white">
      <video
        src={heroVideo.url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
      <div className="relative mx-auto w-full max-w-4xl px-4 pb-16 pt-28 text-center sm:px-6 md:pb-20 md:pt-32 lg:px-8">
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-gradient-hero sm:text-5xl lg:text-6xl"
        >
          Connect. Quantify. Explore.
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mx-auto mt-5 max-w-2xl font-display text-base font-bold text-white sm:text-lg"
        >
          India’s advanced neurofeedback platform mapping <span className="font-accent font-semibold text-orange">real-time</span> cognitive data in 2 minutes.
        </p>
        <p
          data-aos="fade-up"
          data-aos-delay="250"
          className="mx-auto mt-4 max-w-3xl font-display text-sm font-medium leading-relaxed text-white/75 sm:text-base"
        >
          Move past qualitative <span className="font-accent font-semibold text-white">guesswork</span>. Our 14 precise cognitive parameters instantly help to figure out your brain waves data into a quantified performance blueprint. An evidence-based platform to assess, <span className="font-accent font-semibold text-white">track</span>, and improve focus, performance, and well-being—for individuals and organizations alike.
        </p>
        <div data-aos="fade-up" data-aos-delay="300" className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy shadow-brand transition hover:scale-[1.02]"
          >
            Book Demo Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/practitioner"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            Become a Practitioner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      {/* Fade to stats section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-navy/80 to-navy" />
    </section>
  );
}

/* ───── Stats strip ───── */
function StatsStrip() {
  const stats = [
    { end: 27, suffix: "+", l: "Certified Practitioners" },
    { end: 14, suffix: "+", l: "Years of Neurofeedback Research" },
    { end: 1.2, decimals: 1, suffix: " L+", l: "Brainwave Data Points" },
    { end: 92, suffix: "%+", l: "Reporting Accuracy" },
  ];
  return (
    <section
      className="relative pb-12 pt-0"
      style={{
        background:
          "linear-gradient(180deg, var(--navy) 0%, color-mix(in oklab, var(--navy) 80%, var(--teal)) 22%, color-mix(in oklab, var(--navy) 45%, #c9a84c 35%) 48%, color-mix(in oklab, white 60%, #f0d78c 40%) 78%, white 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div
          data-aos="fade-up"
          className="mx-auto w-full rounded-3xl border border-white/20 px-6 py-10 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 sm:px-10 md:w-[90%]"
          style={{ background: "color-mix(in oklab, var(--navy) 55%, transparent)" }}
        >
          <h2
            data-aos="fade-up"
            className="mx-auto max-w-4xl text-center font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em] sm:text-3xl lg:text-[2.5rem]"
          >
            <span className="text-gradient-red">Stop</span>{" "}
            <span className="text-gradient-stop">Guessing about mental wellness and cognitive performance.</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="120"
            className="mx-auto mt-5 max-w-3xl text-center font-display text-sm font-semibold leading-relaxed text-white/80 sm:text-base"
          >
            <span className="text-teal">Brain Waves Tech</span> uses an innovative USA patented technology, which
            quantifies state of mind in minutes with an accuracy of more than{" "}
            <span className="font-semibold text-[#3ddc84]">92%</span>
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.l} className="text-center" data-aos="fade-up" data-aos-delay={100 + i * 100}>
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  <CountUp end={s.end} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── One Patented Ecosystem ───── */
function EcosystemSection() {
  const pillars = [
    {
      key: "CONNECT",
      dot: "#f97316",
      points: [
        "Deploy Non-Invasive Dry Electrode Hardware.",
        "Establish Live, Zero-Delay Wireless Telemetry.",
        "Automated Sensor Grounding Verification.",
      ],
    },
    {
      key: "QUANTIFY",
      dot: "#14b8a6",
      points: [
        "Real-Time 0.5Hz Signal Translation.",
        "Eliminate Subjective Survey Bias.",
        "Chart 5 major brainwaves quantitatively.",
        "Chart 9 qualitative parameters in a quantitative way.",
      ],
    },
    {
      key: "EXPLORE",
      dot: "#a855f7",
      points: [
        "Isolate Hidden Operational Attrition Triggers.",
        "Deep-Dive Into Historical Neuro-Trends.",
        "Scale Targeted Performance Plan Solutions.",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            data-aos="fade-up"
            className="font-display text-2xl font-extrabold leading-tight tracking-[-0.01em] text-navy sm:text-3xl lg:text-[2.5rem]"
          >
            One Patented Ecosystem. <span className="text-gradient-brand">Zero Subjective Guesswork.</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="120"
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Move away from outdated checklists and biased self-reporting. Our integrated system bridges
            high-fidelity neuro-sensing hardware directly with cloud-based AI analytics, providing business
            leaders and clinicians with concrete cognitive telemetry.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pillars.map((p, i) => (
            <div
              key={p.key}
              data-aos="fade-up"
              data-aos-delay={100 + i * 140}
              className={i === 1 ? "lg:-mt-6" : i === 2 ? "lg:mt-4" : ""}
            >
              <div
                className="animate-float h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] sm:p-7"
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.dot }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-navy">{p.key}</span>
                </div>
                <ul className="mt-5 space-y-4">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                      <span
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                        style={{ borderColor: p.dot }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.dot }} />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ───── What is neurofeedback ───── */
function WhatIsNeurofeedback({ onSelect }: { onSelect: (w: WaveInfo) => void }) {
  const Card = ({ w }: { w: WaveInfo }) => (
    <button
      key={w.name}
      type="button"
      onClick={() => onSelect(w)}
      className="glass-card group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-5 text-left !shadow-none transition hover:-translate-y-0.5 hover:!shadow-none focus:outline-none focus:ring-2 focus:ring-teal"
    >
      <Waves className="relative h-6 w-6 text-white" />
      <h3 className="relative mt-3 font-display text-xl font-semibold text-navy">{w.name} Waves</h3>
      <p className="relative mt-1 text-xs font-medium" style={{ color: w.color }}>
        {w.range}
      </p>
      <p className="relative mt-3 text-sm text-muted-foreground">{w.desc}</p>
      <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy/70 group-hover:text-teal">
        Know more <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </button>
  );
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="What is Neurofeedback?"
          title="Train your brain. Optimise your mind."
          sub="Neurofeedback is a non-invasive brain-training technology that monitors and optimises brainwave activity in real time. Click any wave to explore."
        />
        {/* Mobile / tablet 2-col grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:hidden">
          {WAVES.map((w, i) => (
            <div
              key={w.name}
              data-aos="fade-up"
              data-aos-delay={i * 90}
              className={i === WAVES.length - 1 && WAVES.length % 2 === 1 ? "col-span-2 sm:col-span-1 sm:col-start-1 sm:mx-auto sm:w-1/2" : ""}
            >
              <Card w={w} />
            </div>
          ))}
        </div>
        {/* Desktop grid */}
        <div className="mt-12 hidden gap-5 lg:grid lg:grid-cols-5">
          {WAVES.map((w, i) => (
            <div key={w.name} data-aos="fade-up" data-aos-delay={i * 120}>
              <Card w={w} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ───── How it works ───── */
function HowItWorks() {
  const steps = [
    {
      icon: Activity,
      title: "Brainwave Assessment",
      desc: "Pure, real-time data capture. Zero subjective bias — a quick, non-invasive 2-minute capture using our patented technology.",
    },
    {
      icon: Gauge,
      title: "Detailed Analysis",
      desc: "Turning hidden neural patterns into clear, quantified parameters — the proprietary system filters and charts your cognitive matrix across 14 distinct parameters.",
    },
    {
      icon: Users,
      title: "Professional Interpretation",
      desc: "Translating algorithmic complexity into actionable institutional insights — certified network practitioners and enterprise dashboards translate automated metrics into a comprehensive cognitive health blueprint.",
    },
    {
      icon: Target,
      title: "Personalised Solutions",
      desc: "Custom care for your mind. After analyzing your brain data, your practitioner designs a tailored plan to balance your brain activity. With regular follow-ups and progress tracking, you can actually see your mental performance improve over time.",
    },
  ];
  const Step = ({ s, i }: { s: (typeof steps)[number]; i: number }) => (
    <div className="relative text-center">
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white shadow-brand">
        <s.icon className="h-7 w-7" />
        <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange text-xs font-bold text-navy">
          {i + 1}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-navy">{s.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
    </div>
  );
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="A Four-Stage Neuro-Wellness Journey"
          sub="From non-invasive sensor link to targeted cognitive alignment — a data-backed clinical protocol built for B2B environments and delivered by certified wellness practitioners."
        />
        {/* Mobile / tablet 2-col grid */}
        <div className="mt-10 grid grid-cols-2 gap-6 lg:hidden">
          {steps.map((s, i) => (
            <div
              key={s.title}
              data-aos="step-reveal"
              data-aos-delay={i * 120}
            >
              <Step s={s} i={i} />
            </div>
          ))}
        </div>
        {/* Desktop */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
          <ol className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-aos="step-reveal"
                data-aos-delay={i * 160}
              >
                <Step s={s} i={i} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}


/* ───── Who benefits ───── */
function WhoBenefits() {
  const audiences = [
    { i: Brain, t: "Psychologists" },
    { i: Heart, t: "Counselors" },
    { i: Stethoscope, t: "Therapists" },
    { i: School, t: "Schools" },
    { i: UserCog, t: "Teachers" },
    { i: GraduationCap, t: "Students" },
    { i: Building2, t: "Learning Centers" },
    { i: Sparkles, t: "Meditation Coaches" },
    { i: Activity, t: "Yoga Professionals" },
    { i: Users, t: "Wellness Consultants" },
    { i: Stethoscope, t: "Rehabilitation Pros" },
    { i: UserCog, t: "Occupational Therapists" },
    { i: Target, t: "Cognitive Trainers" },
    { i: Trophy, t: "Athletes" },
    { i: Briefcase, t: "Entrepreneurs" },
    { i: Baby, t: "Corporate Professionals" },
    { i: Users, t: "Individuals" },
    { i: Brain, t: "Researchers" },
    { i: ShieldCheck, t: "Defence" },
    { i: Building2, t: "Universities" },
    { i: GraduationCap, t: "Coaching Centers" },
    { i: Stethoscope, t: "Hospitals" },
    { i: Smile, t: "NGOs" },
    { i: Sparkles, t: "Wellness Coaches" },
  ];
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="Who can benefit" title="Built for professionals, accessible to everyone" />
        <div className="marquee-mask mt-12 space-y-4 !shadow-none" data-aos="fade-up" data-aos-delay="150">
          {[audiences.slice(0, Math.ceil(audiences.length / 2)), audiences.slice(Math.ceil(audiences.length / 2))].map(
            (row, idx) => (
              <div key={idx} className="marquee-track overflow-hidden">
                <div
                  className="flex w-max gap-3"
                  style={{ animation: `${idx % 2 === 0 ? "marquee-left" : "marquee-right"} 40s linear infinite` }}
                >
                  {[...row, ...row].map((a, i) => (
                    <div
                      key={`${a.t}-${i}`}
                      className="glass-card flex w-40 shrink-0 flex-col items-center gap-2 rounded-xl p-4 text-center !shadow-none"
                    >
                      <a.i className="h-6 w-6 text-teal" />
                      <p className="text-xs font-medium text-navy">{a.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ───── Video testimonials ───── */
type VideoT = { id: string; title: string; author: string; src: string; thumbnail?: string | null };
import { useQuery as useVideoQuery } from "@tanstack/react-query";
import { supabase as supabaseVT } from "@/integrations/supabase/client";
const FALLBACK_VIDEOS: VideoT[] = [
  { id: "f1", title: "Focus training results", author: "Dr. A. Sharma", src: heroVideo.url },
  { id: "f2", title: "Classroom neurofeedback", author: "Priya, Educator", src: heroVideo.url },
  { id: "f3", title: "Clinic transformation", author: "Dr. R. Menon", src: heroVideo.url },
];

function VideoTestimonials() {
  const [active, setActive] = useState<VideoT | null>(null);
  const q = useVideoQuery({
    queryKey: ["testimonials", "video-featured"],
    queryFn: async () => {
      const { data, error } = await supabaseVT
        .from("testimonials")
        .select("id, author, title, video_url, thumbnail_url, is_featured, sort_order")
        .eq("type", "video").order("sort_order");
      if (error) throw error;
      return (data ?? []).filter((v) => v.video_url);
    },
  });
  const dbItems: VideoT[] = (q.data ?? []).map((v: any) => ({
    id: v.id, title: v.title ?? v.author, author: v.author, src: v.video_url, thumbnail: v.thumbnail_url,
  }));
  const items = dbItems.length > 0 ? dbItems : FALLBACK_VIDEOS;
  const useCarousel = items.length > 3;

  const Card = ({ v }: { v: VideoT }) => (
    <button
      type="button"
      onClick={() => setActive(v)}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-gradient-hero text-left"
    >
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-lg transition group-hover:scale-110">
          <Play className="ml-0.5 h-6 w-6" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="text-sm font-semibold text-white">{v.title}</p>
        <p className="text-xs text-white/80">{v.author}</p>
      </div>
    </button>
  );

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Video Testimonials" title="Hear it from our community" />
          <Link
            to="/testimonials"
            className="hidden shrink-0 text-sm font-semibold text-navy hover:text-teal sm:inline-flex sm:items-center sm:gap-1"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {useCarousel ? (
          <Carousel opts={{ align: "start" }} className="mt-10" data-aos="fade-up">
            <CarouselContent className="-ml-4">
              {items.map((v: VideoT, i: number) => (
                <CarouselItem key={v.id} className="pl-4 sm:basis-1/2 lg:basis-1/3" data-aos="fade-up" data-aos-delay={i * 100}>
                  <Card v={v} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((v: VideoT, i: number) => (
              <div key={v.id} data-aos="fade-up" data-aos-delay={i * 100}>
                <Card v={v} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          <DialogHeader className="px-6 pt-5">
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogDescription>{active?.author}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {active && (
              <video
                key={active.id}
                src={active.src}
                controls
                autoPlay
                className="h-full w-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}


/* ───── FAQ ───── */
function FAQ() {
  const faqs: [string, string][] = [
    [
      "What is Neurofeedback?",
      "Neurofeedback is a non-invasive, evidence-informed brain-training technology that monitors live brainwave activity and provides real-time feedback to help train target states.",
    ],
    [
      "Is Neurofeedback safe?",
      "Yes. It is non-invasive and does not involve any electrical stimulation — it only reads brainwave signals through external sensors.",
    ],
    [
      "Who can use this technology?",
      "Psychologists, counselors, therapists, educators, wellness professionals, students, athletes and corporate professionals.",
    ],
    [
      "How long is the practitioner training?",
      "Our flagship practitioner programme is 7 days of intensive training with 3 months of handholding support.",
    ],
    [
      "Will I receive certification?",
      "Yes — successful candidates receive a Certified Neurofeedback Practitioner certificate.",
    ],
    ["Does the hardware come with warranty?", "Yes — 6 months hardware warranty is included with the package."],
  ];

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map(([q, a], i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-aos="fade-up"
              data-aos-delay={i * 70}
              className="mb-3 rounded-2xl bg-white px-5 !shadow-none"
            >
              <AccordionTrigger className="text-left text-base font-semibold text-navy hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ───── Final CTA ───── */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-navy py-12 sm:py-16 lg:py-20 text-white">
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-40" />
      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-5xl" data-aos="fade-up">
          Start Your <span className="text-gradient-brand">Neurofeedback Journey</span> Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75" data-aos="fade-up" data-aos-delay="120">
          Whether you want to train your brain, add neurofeedback to your practice, or explore partnership — we'd love
          to talk.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3" data-aos="fade-up" data-aos-delay="220">
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy shadow-brand"
          >
            Book Demo Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/practitioner"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur"
          >
            Become a Practitioner
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───── Section heading ───── */
function SectionHeading({
  eyebrow,
  title,
  sub,
  dark,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-teal" : "text-teal"}`} data-aos="fade-up">
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-navy"} ${eyebrow ? "mt-3" : ""}`} data-aos="fade-up" data-aos-delay="80">
        {title}
      </h2>
      {sub && <p className={`mx-auto mt-4 max-w-2xl ${dark ? "text-white/75" : "text-muted-foreground"}`} data-aos="fade-up" data-aos-delay="160">{sub}</p>}
    </div>
  );
}

// Keep CheckCircle2 import used to avoid unused-warning if reintroduced later.
export const _keepIcons = CheckCircle2;

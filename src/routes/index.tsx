import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Brain,
  Headphones,
  GraduationCap,
  Sparkles,
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
import { NeuralWaveBackdrop } from "@/components/site/NeuralWaveBackdrop";
import { HeroBackgroundVideo } from "@/components/site/HeroBackgroundVideo";
import { CountUp } from "@/components/site/CountUp";
import { BrainwaveBands } from "@/components/site/BrainwaveBands";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AOS from "aos";
import "aos/dist/aos.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrainWaves Tech: India's Advanced Neurofeedback & Brainwave Analysis Platform" },
      {
        name: "description",
        content:
          "Assess brain activity, understand cognitive patterns and deliver customized neurofeedback & sound therapy solutions.",
      },
      {
        property: "og:title",
        content: "India's Advanced Neurofeedback & Brainwave Analysis Platform",
      },
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
      <WhatIsNeurofeedback />
      <WhoBenefits />
      <VideoTestimonials />
      <FAQ />

      <FinalCTA />
    </>
  );
}

/* ───── Hero ───── */
function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-[100svh] w-full items-center overflow-hidden bg-navy text-white">
      <HeroBackgroundVideo />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,36,58,0.7)_4%,rgba(6,36,58,0.48)_52%,rgba(6,36,58,0.32)_100%)]" />
      <div className="relative mx-auto w-full max-w-5xl px-4 pb-20 pt-32 text-center sm:px-6 md:pb-24 md:pt-36 lg:pt-40 lg:px-8">
        <h1 className="relative font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both">
          Connect.{" "}
          <span className="relative bg-gradient-to-r from-teal via-teal to-emerald-300 bg-clip-text text-transparent [text-shadow:0_0_60px_rgba(20,184,166,0.55)]">
            Quantify.
          </span>{" "}
          Explore.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed tracking-wide text-white/70 sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          India’s advanced neurofeedback platform mapping{" "}
          <span className="font-accent bg-gradient-to-r from-orange to-amber-300 bg-clip-text font-semibold italic text-transparent [text-shadow:0_0_40px_rgba(249,115,22,0.45)]">
            real-time
          </span>{" "}
          cognitive data in 2 minutes.
        </p>
        <div className="mt-9 flex flex-row flex-nowrap justify-center gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
          <a
            href="/contact?highlight=booking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-navy shadow-brand transition hover:scale-[1.03] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-h-[52px] sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
          >
            Book Demo Now <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <Link
            to="/practitioner"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-[1.03] hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-h-[52px] sm:gap-2 sm:px-7 sm:py-3.5 sm:text-base"
          >
            Become a Practitioner <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
      {/* Fade to stats section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-navy/60 to-navy"
      />
    </section>
  );
}

/* ───── Stats strip ───── */
function StatsStrip() {
  const stats = [
    { end: 1.2, decimals: 1, suffix: " L+", l: "Brainwave Data Points" },
    { end: 14, suffix: "+", l: "Years of Neurofeedback Research" },
    { end: 12000, suffix: "+", l: "Benefitted customers" },
    { end: 27, suffix: "+", l: "Certified Practitioners" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#041a2e] via-navy to-[#041a2e] py-20 sm:py-28 lg:py-32">
      <NeuralWaveBackdrop />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ── Editorial Split: Left text + Right metric ── */}
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column — Headline */}
          <div className="lg:col-span-7" data-aos="fade-right">
            <h2 className="font-accent text-4xl font-semibold not-italic leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl lg:text-[3.5rem]">
              <span className="relative mr-1 inline-block translate-y-[-2px] rounded-xl bg-gradient-to-r from-orange via-amber-400 to-orange px-3 py-0.5 font-display text-[0.8em] font-extrabold not-italic text-navy shadow-lg shadow-orange/25">
                STOP
              </span>{" "}
              guessing about{" "}
              <span className="relative">
                mental wellness
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-teal to-cyan-400 opacity-60" />
              </span>{" "}
              and cognitive performance.
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="80"
              className="mt-7 max-w-xl text-[15px] font-normal leading-relaxed text-slate-300/90 sm:text-base lg:text-lg"
            >
              <span className="font-semibold text-white">Brain Waves Tech</span> deploys{" "}
              <span className="font-medium text-teal">USA-patented EEG telemetry</span> to quantify
              your state of mind in just 2 minutes — with verified accuracy exceeding{" "}
              <span className="font-display text-lg font-extrabold text-teal sm:text-xl">92%</span>.
            </p>
          </div>

          {/* Right Column — Highlighted Precision Metric */}
          <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay="120">
            <div className="relative overflow-hidden rounded-3xl border border-teal/25 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              {/* Glow accents */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-orange/15 blur-3xl" />

              <div className="relative text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Analytical Accuracy
                </p>
                <p className="mt-3 font-display text-7xl font-extrabold tracking-tight text-white sm:text-8xl">
                  92<span className="text-teal">%</span><span className="text-3xl text-teal sm:text-4xl">+</span>
                </p>
                <p className="mt-2 text-sm font-medium text-slate-400">
                  Verified via peer-reviewed analysis
                </p>

                {/* Micro specs */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-center">
                    <p className="font-display text-xl font-bold text-white">2 min</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-teal">Scan time</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-center">
                    <p className="font-display text-xl font-bold text-white">5 bands</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-orange">EEG analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="relative mt-14 sm:mt-20" data-aos="fade-up" data-aos-delay="160">
          <div className="absolute -inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-teal/25 to-transparent" />
          <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className="relative text-center"
                data-aos="fade-up"
                data-aos-delay={180 + i * 60}
              >
                {/* Vertical divider */}
                {i > 0 && (
                  <span className="pointer-events-none absolute -left-px top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/10 sm:block" />
                )}
                <p className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  <CountUp end={s.end} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 sm:text-xs">
                  {s.l}
                </p>
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
        "Record Raw Brain waves In 2 Minutes.",
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
        "Analyze Hidden Operational Attrition Triggers.",
        "Deep-Dive into Historical Neuro-Trends.",
        "Scale Targeted Performance Plan Solutions.",
        "Smart Solutions Personalized for Every Requirement.",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            data-aos="fade-up"
            className="font-display text-2xl font-extrabold leading-tight tracking-[-0.01em] text-navy sm:text-3xl lg:text-[2.5rem]"
          >
            One Patented Ecosystem. <span className="text-teal">Zero</span> Subjective
            Guesswork.
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="120"
            className="mx-auto mt-4 max-w-2xl [text-wrap:balance] text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Move away from outdated checklists and biased self-reporting. Our integrated system
            bridges high-fidelity neuro-sensing hardware directly with cloud-based AI analytics,
            providing business leaders and clinicians with concrete cognitive telemetry.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pillars.map((p, i) => (
            <div key={p.key} data-aos="fade-up" data-aos-delay={100 + i * 140} className="flex">
              <div
                className="animate-float flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] sm:p-7"
                style={{ animationDelay: `${i * 0.9}s` }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.dot }} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-navy">
                    {p.key}
                  </span>
                </div>
                <ul className="mt-5 flex flex-1 flex-col justify-between gap-4">
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
function WhatIsNeurofeedback() {
  return (
    <section className="relative overflow-hidden bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="What is Neurofeedback?"
          title="Quantify Cognitive Capital. Eliminate Structural Burnout."
        />
        <p
          className="mx-auto mt-4 max-w-xl [text-wrap:balance] text-center text-base leading-relaxed text-muted-foreground"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          A <span className="font-semibold text-teal">non-invasive</span>, data-driven technology
          that safely maps and analyses your brainwave frequencies in{" "}
          <span className="font-semibold text-orange">real time</span>.
        </p>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="mb-5 flex items-center justify-center gap-3 text-center">
            <span className="h-px w-8 bg-teal/40" />
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy/55">What it enables</p>
            <span className="h-px w-8 bg-teal/40" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Activity,
              color: "#14b8a6",
              bg: "bg-teal/10",
              title: "Real-Time Brain Mapping",
              desc: "Captures live brainwave activity with zero subjective guesswork.",
            },
            {
              icon: Gauge,
              color: "#f97316",
              bg: "bg-orange/10",
              title: "Tracks Focus & Stress",
              desc: "Reads the conscious and subconscious signals behind emotional stability.",
            },
            {
              icon: Target,
              color: "#a855f7",
              bg: "bg-[#a855f7]/10",
              title: "Predicts Performance",
              desc: "An empirical tool to forecast outcomes and eliminate attrition.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={200 + i * 120}
              className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)]"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.bg}`}
                style={{ color: item.color }}
              >
                <item.icon className="h-5 w-5" />
              </span>
              <span className="mt-3 font-display text-sm font-semibold text-navy">
                {item.title}
              </span>
              <span className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {item.desc}
              </span>
            </div>
          ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-6xl border-t border-navy/10 pt-12 sm:mt-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">The science</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">The 5 brainwave types.</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Select a frequency range to explore the measured patterns behind each brainwave state.</p>
          </div>
          <div className="mt-8 rounded-3xl border border-navy/5 bg-white/60 p-4 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.4)] sm:p-6">
            <BrainwaveBands />
          </div>
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
      desc: "Pure, real-time data capture with zero subjective bias. A quick, non-invasive, 2 minutes scan using our patented neurofeedback technology.",
    },
    {
      icon: Gauge,
      title: "Detailed Analysis",
      desc: "Turning raw neural patterns into clear metrics, our patented algorithm charts your live cognitive matrix across 14 distinct parameters.",
    },
    {
      icon: Users,
      title: "Professional Interpretation",
      desc: "Translating algorithmic output into actionable care certified network practitioners deliver a signed, detailed report, with enterprise-grade quantitative blueprint.",
    },
    {
      icon: Target,
      title: "Personalised Solutions",
      desc: "Deploying targeted care for your mind. Your practitioner designs custom solutions and related protocols with multi-session progress tracking.",
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
      <p className="mt-1 [text-wrap:balance] text-sm text-muted-foreground">{s.desc}</p>
    </div>
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const revealStyle = (i: number) =>
    revealed
      ? ({ animationDelay: `${i * 500}ms` } as React.CSSProperties)
      : ({ opacity: 0 } as React.CSSProperties);

  return (
    <section ref={sectionRef} className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          title="A Four-Stage Neuro-Wellness Journey"
          sub="From non-invasive technology to quantitative data output, a data-backed clinical protocol built for B2B environments and delivered by certified wellness practitioners."
        />
        {/* Mobile / tablet 2-col grid */}
        <div className="mt-10 grid grid-cols-2 gap-6 lg:hidden">
          {steps.map((s, i) => (
            <div key={s.title} className={revealed ? "animate-step-in" : ""} style={revealStyle(i)}>
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
                className={revealed ? "animate-step-in" : ""}
                style={revealStyle(i)}
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
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading title="Built for professionals. Scaled for visionary organizations. Accessible to everyone." />
        <div
          className="marquee-mask mt-12 space-y-4 !shadow-none"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {[
            audiences.slice(0, Math.ceil(audiences.length / 2)),
            audiences.slice(Math.ceil(audiences.length / 2)),
          ].map((row, idx) => (
            <div key={idx} className="marquee-track overflow-hidden">
              <div
                className="flex w-max gap-3"
                style={{
                  animation: `${idx % 2 === 0 ? "marquee-left" : "marquee-right"} 40s linear infinite`,
                }}
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
          ))}
        </div>
      </div>
    </section>
  );
}
/* ───── Video testimonials ───── */
type VideoT = { id: string; title: string; author: string; src: string; thumbnail?: string | null };
import { useQuery as useVideoQuery } from "@tanstack/react-query";
import { supabase as supabaseVT } from "@/integrations/supabase/client";
import { clientTestimonialVideos } from "@/lib/client-testimonials";
function VideoTestimonials() {
  const [active, setActive] = useState<VideoT | null>(null);
  const q = useVideoQuery({
    queryKey: ["testimonials", "video-featured"],
    queryFn: async () => {
      const { data, error } = await supabaseVT
        .from("testimonials")
        .select("id, author, title, video_url, thumbnail_url, is_featured, sort_order")
        .eq("type", "video")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).filter((v) => v.video_url);
    },
  });
  const dbItems: VideoT[] = (q.data ?? []).flatMap((v) =>
    v.video_url
      ? [
        {
          id: v.id,
          title: v.title ?? v.author,
          author: v.author,
          src: v.video_url,
          thumbnail: v.thumbnail_url,
        },
      ]
      : [],
  );
  const items =
    dbItems.length > 0
      ? dbItems
      : clientTestimonialVideos.map((v) => ({
        id: v.id,
        title: v.title,
        author: v.author,
        src: v.video_url,
      }));
  const Card = ({ v }: { v: VideoT }) => (
    <button
      type="button"
      onClick={() => setActive(v)}
      className="group relative block aspect-[4/5] w-[260px] shrink-0 overflow-hidden rounded-2xl text-left sm:w-[300px] lg:w-[340px]"
    >
      {/* dark teal gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a4a4a 0%, #083535 25%, var(--navy) 60%, #051b2b 100%)",
        }}
      />
      {/* animated wave lines */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 400 500"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(18,184,176,0)" />
            <stop offset="50%" stopColor="rgba(18,184,176,0.5)" />
            <stop offset="100%" stopColor="rgba(18,184,176,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d="M-50,120 Q50,80 150,120 T350,120 T550,120 M-50,180 Q50,140 150,180 T350,180 T550,180 M-50,240 Q50,200 150,240 T350,240 T550,240 M-50,300 Q50,260 150,300 T350,300 T550,300"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth={1.2}
            style={{
              transform: `translateY(${i * 40}px)`,
              animation: `wave-drift ${18 + i * 3}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </svg>
      {v.thumbnail ? (
        <img
          src={v.thumbnail}
          alt={v.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          src={v.src}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-navy shadow-xl transition duration-300 group-hover:scale-110 group-hover:shadow-2xl">
          <Play className="ml-0.5 h-7 w-7" />
        </span>
      </div>
    </button>
  );

  // duplicate the list so the horizontal loop is seamless
  const loop = [...items, ...items, ...items];

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
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
      </div>

      {items.length > 0 ? (
        <div
          data-aos="fade-up"
          className="marquee-mask marquee-pause-on-hover mt-10 overflow-hidden"
        >
          <div
            className="marquee-horizontal flex w-max gap-5 pl-4 will-change-transform lg:pl-8"
            style={
              { "--marquee-duration": `${Math.max(30, items.length * 10)}s` } as React.CSSProperties
            }
          >
            {loop.map((v, i) => (
              <Card key={`${v.id}-${i}`} v={v} />
            ))}
          </div>
        </div>
      ) : (
        <p className="mx-auto mt-8 max-w-7xl px-4 text-sm text-muted-foreground lg:px-8">
          Video testimonials will be available soon.
        </p>
      )}

      <div className="mx-auto max-w-7xl px-4 lg:px-8"></div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90svh] w-[calc(100%-1rem)] max-w-5xl overflow-hidden p-0 sm:w-[calc(100%-2rem)]">
          <DialogHeader className="px-6 pt-5">
            <DialogTitle>{active?.title}</DialogTitle>
            <DialogDescription>{active?.author}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full bg-black">
            {active && (
              <video
                key={active.id}
                src={active.src}
                poster={active.thumbnail ?? undefined}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="max-h-[78svh] h-full w-full object-contain"
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
      "What is Neurofeedback, and is it safe for our clients or employees?",
      "Neurofeedback is a non-invasive, drug-free brainwaves recording technique that measures live electrochemical activity. It is entirely safe; our dry-electrode headset acts purely as a receiver to read the brain's natural electrical signals. It does not emit or send any electrical currents into the body.",
    ],
    [
      "How long is the professional training, and do we receive certification?",
      "Yes, upon completion of the program, your practitioners or counselors will receive an official certification as a Brain Waves Analyst. We provide an interactive 7-day online training protocol, backed by 3 months of strategic hand-holding.",
    ],
    [
      "Who can utilize this technology within our target ecosystems?",
      "The platform is engineered with a lowest-common-denominator approach, making it easy for psychologists, university counselors, corporate HR heads, alternative therapists, and to run independently. It scales seamlessly across participants ranging from age 3 to 95.",
    ],
    [
      "Is the system a one-time investment or a subscription-based model?",
      "The procurement of your BWT-2508 Headset hardware and your comprehensive practitioner training are one-time investments. The advanced cloud-based software operates on a seamless annual subscription model.",
    ],
    [
      "Does the bio-sensing hardware come with a standard enterprise warranty?",
      "Yes, all hardware deliverables feature a dedicated 6 months manufacturing warranty (as per our return and refund policy) to safeguard your organization's deployment and ensure uninterrupted operational continuity.",
    ],
  ];

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map(([q, a], i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              data-aos="fade-in"
              data-aos-delay={i * 180}
              data-aos-duration="1200"
              data-aos-easing="ease-out"
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
        <p
          className="mx-auto mt-4 max-w-2xl [text-wrap:balance] text-white/75"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          Whether you want to train your brain, add neurofeedback to your practice, or explore
          partnership, we'd love to talk.
        </p>
        <div
          className="mt-8 flex flex-row flex-nowrap justify-center gap-2 sm:gap-3"
          data-aos="fade-up"
          data-aos-delay="220"
        >
          <a
            href="/contact?highlight=booking"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-xs font-semibold text-navy shadow-brand sm:min-h-[48px] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
          >
            Book Demo Now <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
          <Link
            to="/practitioner"
            className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur sm:min-h-[48px] sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
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
        <p
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-teal" : "text-teal"}`}
          data-aos="fade-up"
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-navy"} ${eyebrow ? "mt-3" : ""}`}
        data-aos="fade-up"
        data-aos-delay="80"
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mx-auto mt-4 max-w-2xl [text-wrap:balance] ${dark ? "text-white/75" : "text-muted-foreground"}`}
          data-aos="fade-up"
          data-aos-delay="160"
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// Keep CheckCircle2 import used to avoid unused-warning if reintroduced later.
export const _keepIcons = CheckCircle2;

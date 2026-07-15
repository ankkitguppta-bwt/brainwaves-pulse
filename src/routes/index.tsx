import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  return (
    <>
      <Hero />
      <StatsStrip />
      <WhatIsNeurofeedback onSelect={setActiveWave} />
      <HowItWorks />
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
        <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal">
          <Sparkles className="h-3.5 w-3.5" /> Neuro-tech made in India
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          India's Advanced <span className="text-gradient-brand">Neurofeedback &amp; Brainwave Analysis</span> Platform
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          Assess Brain Activity • Understand Cognitive Patterns • Deliver Customized Neurofeedback &amp; Sound Therapy
          Solutions
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy shadow-brand transition hover:scale-[1.02]"
          >
            Book Demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Request Assessment
          </Link>
        </div>
      </div>
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
    <section className="bg-white py-10">
      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="mx-auto w-full rounded-3xl bg-navy px-6 py-8 md:w-[80%]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
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

/* ───── What is neurofeedback ───── */
function WhatIsNeurofeedback({ onSelect }: { onSelect: (w: WaveInfo) => void }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="What is Neurofeedback?"
          title="Train your brain. Optimise your mind."
          sub="Neurofeedback is a non-invasive brain-training technology that monitors and optimises brainwave activity in real time. Click any wave to explore."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {WAVES.map((w) => (
            <button
              key={w.name}
              type="button"
              onClick={() => onSelect(w)}
              className="glass-card group relative overflow-hidden rounded-2xl p-5 text-left !shadow-none transition hover:-translate-y-0.5 hover:!shadow-none focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <Waves className="relative h-6 w-6" style={{ color: w.color }} />
              <h3 className="relative mt-3 font-display text-xl font-semibold text-navy">{w.name} Waves</h3>
              <p className="relative mt-1 text-xs font-medium" style={{ color: w.color }}>
                {w.range}
              </p>
              <p className="relative mt-3 text-sm text-muted-foreground">{w.desc}</p>
              <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy/70 group-hover:text-teal">
                Know more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
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
      desc: "Quick non-invasive EEG capture to record live brain activity.",
    },
    { icon: Gauge, title: "Detailed Analysis", desc: "Multi-band analysis across attention, calm, focus and more." },
    {
      icon: Brain,
      title: "Professional Interpretation",
      desc: "Certified practitioners translate signals into insight.",
    },
    {
      icon: Headphones,
      title: "Customized Sound Therapy",
      desc: "Personalised neuro-acoustic frequencies prescribed for you.",
    },
    {
      icon: Target,
      title: "Neurofeedback Training",
      desc: "Game-based feedback sessions to train target brain states.",
    },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="How it works" title="A five-step neuro-wellness journey" />
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent lg:block" />
          <ol className="grid gap-8 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="animate-step-in relative text-center"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-teal shadow-brand">
                  <s.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange text-xs font-bold text-navy">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="Who can benefit" title="Built for professionals, accessible to everyone" />
        <div className="marquee-mask mt-12 space-y-4 !shadow-none">
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

/* ───── Video testimonials placeholder ───── */
function VideoTestimonials() {
  return (
    <section className="bg-white py-20">
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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-hero">
              <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-lg">
                  <Play className="ml-0.5 h-6 w-6" />
                </span>
              </div>
              <p className="absolute bottom-3 left-3 text-xs text-white">Video testimonial {i} — placeholder</p>
            </div>
          ))}
        </div>
      </div>
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
  return (
    <section className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass-card mb-3 rounded-2xl border-0 px-5">
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
    <section className="relative overflow-hidden bg-navy py-20 text-white">
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-40" />
      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">
          Start Your <span className="text-gradient-brand">Neurofeedback Journey</span> Today
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">
          Whether you want to train your brain, add neurofeedback to your practice, or explore partnership — we'd love
          to talk.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy shadow-brand"
          >
            Book Demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/practitioner"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur"
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
  eyebrow: string;
  title: string;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-teal" : "text-teal"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-display text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {sub && <p className={`mx-auto mt-4 max-w-2xl ${dark ? "text-white/75" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

// Keep CheckCircle2 import used to avoid unused-warning if reintroduced later.
export const _keepIcons = CheckCircle2;

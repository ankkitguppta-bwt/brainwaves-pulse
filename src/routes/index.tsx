import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, Brain, Headphones, GraduationCap, Cpu, Cloud,
  ShieldCheck, Sparkles, Waves, Gauge, Moon, Heart, Target,
  Users, School, UserCog, Briefcase, Trophy, Smile, Stethoscope,
  Baby, Building2, ArrowRight, CheckCircle2, Play, ChevronDown,
} from "lucide-react";
import { BrainwaveBackdrop } from "@/components/site/BrainwaveBackdrop";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

import founder from "@/assets/docx/founder-ankit.jpg";
import hardwareHero from "@/assets/docx/hardware-headband.jpg";
import game1 from "@/assets/docx/game-dolphin-1.jpeg";
import game2 from "@/assets/docx/game-dolphin-2.png";
import game3 from "@/assets/docx/game-dolphin-3.png";
import graph6 from "@/assets/docx/graph-6.jpeg";
import graph8 from "@/assets/docx/graph-8.jpeg";
import graph10 from "@/assets/docx/graph-10.jpeg";
import graph12 from "@/assets/docx/graph-12.jpeg";
import accred1 from "@/assets/docx/accred-1.png";
import accred2 from "@/assets/docx/accred-2.jpeg";
import accred3 from "@/assets/docx/accred-3.jpeg";
import accred4 from "@/assets/docx/accred-4.jpeg";
import workshop68 from "@/assets/docx/workshop-68.jpeg";
import workshop72 from "@/assets/docx/workshop-72.jpeg";
import workshop75 from "@/assets/docx/workshop-75.jpeg";
import workshop78 from "@/assets/docx/workshop-78.jpeg";
import teamFrancesco from "@/assets/docx/team-francesco.jpg";
import teamParas from "@/assets/docx/team-paras.jpeg";
import teamPaula from "@/assets/docx/team-paula.jpg";
import teamRoopali from "@/assets/docx/team-roopali.jpg";
import teamSushant from "@/assets/docx/team-sushant.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrainWaves Tech — India's Advanced Neurofeedback & Brainwave Analysis Platform" },
      { name: "description", content: "Assess brain activity, understand cognitive patterns and deliver customized neurofeedback & sound therapy solutions. Hardware, software, training and certification." },
      { property: "og:title", content: "India's Advanced Neurofeedback & Brainwave Analysis Platform" },
      { property: "og:description", content: "Empowering psychologists, counselors, educators and wellness professionals with neurofeedback technology, brainwave analysis and customized sound therapy." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatIsNeurofeedback />
      <HowItWorks />
      <BrainwaveAnalysis />
      <SoundTherapy />
      <PractitionerSolution />
      <SoftwareExperience />
      <WhoBenefits />
      <TrainingCTA />
      <TrustMedia />
      <TeamPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

/* ───── Hero ───── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <BrainwaveBackdrop className="absolute inset-x-0 top-1/2 h-[60%] w-full -translate-y-1/2 opacity-70" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:py-24 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-teal">
            <Sparkles className="h-3.5 w-3.5" /> Neuro-tech made in India
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            India's Advanced{" "}
            <span className="text-gradient-brand">Neurofeedback &amp; Brainwave Analysis</span>{" "}
            Platform
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
            Assess Brain Activity • Understand Cognitive Patterns • Deliver Customized
            Neurofeedback &amp; Sound Therapy Solutions
          </p>
          <p className="mt-4 max-w-2xl text-sm text-white/65 sm:text-base">
            BrainWaves Tech empowers psychologists, counselors, wellness professionals, educators
            and healthcare practitioners with advanced neurofeedback technology, brainwave
            analysis and customized sound therapy solutions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy shadow-brand transition hover:scale-[1.02]">
              Book Free Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/training" className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-navy transition hover:scale-[1.02]">
              Become Certified Practitioner
            </Link>
            <Link to="/assessment" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Request Brainwave Assessment
            </Link>
          </div>

          {/* Founder card */}
          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-3 pr-5 backdrop-blur">
            <img src={founder} alt="Dr. Ankit Gupta" className="h-14 w-14 rounded-full object-cover ring-2 ring-teal/60" />
            <div className="text-left">
              <p className="text-sm font-semibold">Dr. Ankit Gupta</p>
              <p className="text-xs text-white/70">Founder · Neurofeedback Practitioner · Sound Therapy Expert</p>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-5">
          <div className="glass-card-dark relative rounded-3xl p-5 shadow-brand">
            <div className="flex items-center justify-between text-xs text-white/70">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal" /> Live EEG session</span>
              <span>Session 04 · 22 min</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { l: "Attention", v: "84%", c: "text-teal" },
                { l: "Calm", v: "71%", c: "text-orange" },
                { l: "Focus", v: "78%", c: "text-teal" },
              ].map((m) => (
                <div key={m.l} className="rounded-xl bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/60">{m.l}</p>
                  <p className={`mt-1 text-2xl font-semibold ${m.c}`}>{m.v}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-4 h-40 overflow-hidden rounded-xl bg-navy/60">
              <BrainwaveBackdrop className="absolute inset-0 h-full w-full" />
            </div>
            <div className="mt-3 grid grid-cols-5 gap-1">
              {["α", "β", "θ", "δ", "γ"].map((g, i) => (
                <div key={g} className="rounded-lg bg-white/5 py-2 text-center text-xs">
                  <p className="font-display text-base text-teal">{g}</p>
                  <p className="mt-0.5 text-[10px] text-white/60">{[42, 31, 18, 22, 9][i]}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className="animate-float absolute -bottom-6 -left-6 hidden h-28 w-28 overflow-hidden rounded-2xl border border-white/15 bg-navy shadow-brand md:block">
            <img src={hardwareHero} alt="EEG headband device" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Trust strip ───── */
function TrustStrip() {
  const items = [
    "Neurofeedback Technology",
    "Brainwave Analysis",
    "Customized Sound Therapy",
    "Practitioner Training",
    "Hardware + Software Ecosystem",
    "Professional Support",
    "NABS / FIP Affiliated",
  ];
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 py-5 lg:px-8">
        {items.map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-cyan-bg px-3 py-1.5 text-xs font-medium text-navy">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal" /> {t}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ───── What is neurofeedback ───── */
function WhatIsNeurofeedback() {
  const waves = [
    { name: "Alpha", desc: "Relaxed, calm awareness · meditation", range: "8–12 Hz", color: "from-teal/20 to-teal/0" },
    { name: "Beta", desc: "Focus, attention, active thinking", range: "13–30 Hz", color: "from-orange/20 to-orange/0" },
    { name: "Theta", desc: "Creativity, deep relaxation, learning", range: "4–8 Hz", color: "from-teal/20 to-teal/0" },
    { name: "Delta", desc: "Deep sleep, restoration, healing", range: "0.5–4 Hz", color: "from-orange/20 to-orange/0" },
    { name: "Gamma", desc: "Peak performance, cognitive binding", range: "30–100 Hz", color: "from-teal/20 to-teal/0" },
  ];
  return (
    <section className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="What is Neurofeedback?"
          title="Train your brain. Optimise your mind."
          sub="Neurofeedback is a non-invasive brain-training technology that monitors and optimises brainwave activity in real time. Brainwaves influence focus, attention, emotional balance, stress response, sleep quality and cognitive performance."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {waves.map((w) => (
            <div key={w.name} className={`glass-card relative overflow-hidden rounded-2xl p-5`}>
              <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${w.color}`} />
              <Waves className="relative h-6 w-6 text-teal" />
              <h3 className="relative mt-3 font-display text-xl font-semibold text-navy">{w.name} Waves</h3>
              <p className="relative mt-1 text-xs font-medium text-orange">{w.range}</p>
              <p className="relative mt-3 text-sm text-muted-foreground">{w.desc}</p>
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
    { icon: Activity, title: "Brainwave Assessment", desc: "Quick non-invasive EEG capture to record live brain activity." },
    { icon: Gauge, title: "Detailed Analysis", desc: "Multi-band analysis across attention, calm, focus and more." },
    { icon: Brain, title: "Professional Interpretation", desc: "Certified practitioners translate signals into insight." },
    { icon: Headphones, title: "Customized Sound Therapy", desc: "Personalised neuro-acoustic frequencies prescribed for you." },
    { icon: Target, title: "Neurofeedback Training", desc: "Game-based feedback sessions to train target brain states." },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="A five-step neuro-wellness journey"
          sub="From assessment to training — a guided, evidence-informed protocol delivered by certified practitioners."
        />
        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent lg:block" />
          <ol className="grid gap-8 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="relative text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-teal shadow-brand">
                  <s.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange text-xs font-bold text-navy">{i + 1}</span>
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

/* ───── Brainwave Analysis ───── */
function BrainwaveAnalysis() {
  const metrics = [
    "Attention", "Focus", "Mental Fatigue", "Relaxation", "Emotional Regulation",
    "Cognitive Activation", "Stress Response", "Sleep Pattern Indicators",
    "Meditation Readiness", "Peak Performance States",
  ];
  return (
    <section className="bg-navy py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            dark
            eyebrow="Advanced Brainwave Analysis"
            title="Quantified insight into the brain you can act on."
            sub="Visualise multiple cognitive and emotional indicators in real time. Every report is interpreted by certified practitioners for accuracy and clarity."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {metrics.map((m) => (
              <span key={m} className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal">{m}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[graph6, graph8, graph10, graph12].map((g, i) => (
            <div key={i} className="privacy-blur overflow-hidden rounded-xl border border-white/10 bg-white">
              <img src={g} alt={`Anonymised brainwave report ${i + 1}`} className="h-44 w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Sound Therapy ───── */
function SoundTherapy() {
  const benefits = [
    { icon: Heart, t: "Stress management support" },
    { icon: Target, t: "Better focus support" },
    { icon: Sparkles, t: "Relaxation support" },
    { icon: Smile, t: "Emotional balance support" },
    { icon: Moon, t: "Sleep support" },
    { icon: Brain, t: "Meditation enhancement" },
  ];
  return (
    <section className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="Customized Sound Therapy"
          title="Personalised sound therapy based on your brainwave pattern"
          sub="Sound therapy uses personalised frequencies, rhythmic modulation and neuro-acoustic principles to support relaxation, focus, balance and mental wellness."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.t} className="glass-card flex items-center gap-4 rounded-2xl p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <b.icon className="h-6 w-6" />
              </div>
              <p className="font-medium text-navy">{b.t}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-orange/30 bg-orange/5 p-4 text-center text-xs text-navy">
          <strong>Disclaimer:</strong> BrainWaves Tech solutions are designed for wellness, training, assessment and
          professional support. They are not a substitute for medical diagnosis or emergency treatment.
        </p>
      </div>
    </section>
  );
}

/* ───── Practitioner Solution ───── */
function PractitionerSolution() {
  const cards = [
    { icon: Cpu, t: "Hardware Package", d: "EEG device, sensors, connectivity support and installation assistance." },
    { icon: Cloud, t: "Software Subscription", d: "Neurofeedback dashboard, brainwave monitoring, session recording, analysis and cloud reporting." },
    { icon: ShieldCheck, t: "6 Months Hardware Warranty", d: "Comprehensive replacement & technical cover on the EEG hardware." },
    { icon: GraduationCap, t: "7 Days Intensive Training", d: "Neurofeedback basics, brainwave understanding, practical sessions, report interpretation." },
    { icon: Users, t: "3 Months Handholding Support", d: "Live guidance, technical assistance and session support from senior practitioners." },
    { icon: Trophy, t: "Certified Practitioner Training", d: "Become a recognised Neurofeedback Practitioner with formal certification." },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="Complete Practitioner Solution"
          title="Everything you need to deliver neurofeedback professionally"
          sub="One ecosystem covering hardware, software, training, certification and ongoing support."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.t} className="glass-card group rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-brand">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-navy text-white">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{c.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Software Experience ───── */
function SoftwareExperience() {
  const screens = [game1, game2, game3];
  const modes = ["Attention", "Joy", "Inner Calm", "Study Focus", "Stress Reduction", "Deep Meditation"];
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white">
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Software Experience"
          title="Interactive Neurofeedback Training Game"
          sub="Real-time brainwave tracking with game-based feedback that makes training engaging, measurable and effective."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-3 gap-3">
              {screens.map((s, i) => (
                <div key={i} className={`glass-card-dark overflow-hidden rounded-2xl ${i === 0 ? "col-span-3" : ""}`}>
                  <img src={s} alt="Neurofeedback training game" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <ul className="space-y-3 text-sm">
              {[
                "Real-time brainwave tracking",
                "Brainwave percentage display",
                "Game-based positive feedback",
                "Session recording & history",
                "Cloud reporting & exports",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-wider text-teal">Training modes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {modes.map((m) => (
                <span key={m} className="rounded-full bg-white/10 px-3 py-1 text-xs">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Who benefits ───── */
function WhoBenefits() {
  const audiences = [
    { i: Brain, t: "Psychologists" }, { i: Heart, t: "Counselors" }, { i: Stethoscope, t: "Therapists" },
    { i: School, t: "Schools" }, { i: UserCog, t: "Teachers" }, { i: GraduationCap, t: "Students" },
    { i: Building2, t: "Learning Centers" }, { i: Sparkles, t: "Meditation Coaches" },
    { i: Activity, t: "Yoga Professionals" }, { i: Users, t: "Wellness Consultants" },
    { i: Stethoscope, t: "Rehabilitation Pros" }, { i: UserCog, t: "Occupational Therapists" },
    { i: Target, t: "Cognitive Trainers" }, { i: Trophy, t: "Athletes" },
    { i: Briefcase, t: "Entrepreneurs" }, { i: Baby, t: "Corporate Professionals" },
  ];
  return (
    <section className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="Who can benefit" title="Built for professionals, accessible to everyone" />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {audiences.map((a) => (
            <div key={a.t} className="glass-card flex flex-col items-center gap-2 rounded-xl p-4 text-center">
              <a.i className="h-6 w-6 text-teal" />
              <p className="text-xs font-medium text-navy">{a.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Training CTA ───── */
function TrainingCTA() {
  const bullets = [
    "7 Days Intensive Training", "Practical Neurofeedback Sessions",
    "Brainwave Report Interpretation", "Hardware + Software Orientation",
    "3 Months Professional Support", "Certificate after completion",
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 text-white">
      <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-orange">
            Training & Certification
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            Become a Certified Neurofeedback Practitioner
          </h2>
          <p className="mt-4 text-white/75">
            Join a hands-on programme designed for psychologists, counselors and wellness
            professionals. Theory, practice, certification and mentorship — all in one.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/training" className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-navy">
              Apply for Training <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold backdrop-blur">
              Talk to Program Advisor
            </Link>
          </div>
        </div>
        <ul className="glass-card-dark grid grid-cols-1 gap-3 rounded-2xl p-6 sm:grid-cols-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───── Trust & Media ───── */
function TrustMedia() {
  const proofs = [
    { img: accred1, t: "NABS Affiliation" },
    { img: accred2, t: "Federation of Indian Psychology" },
    { img: accred3, t: "Media Recognition" },
    { img: accred4, t: "Industry Endorsements" },
    { img: workshop68, t: "Workshops" },
    { img: workshop72, t: "Training Cohorts" },
    { img: workshop75, t: "Practitioner Sessions" },
    { img: workshop78, t: "Awards & Recognition" },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="Trust, Media & Recognition"
          title="A growing credibility wall"
          sub="Recognised by leading associations, covered in media and trusted by practitioners across India."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {proofs.map((p) => (
            <figure key={p.t} className="glass-card overflow-hidden rounded-xl">
              <div className="h-40 overflow-hidden bg-cyan-bg">
                <img src={p.img} alt={p.t} className="h-full w-full object-cover transition hover:scale-105" />
              </div>
              <figcaption className="px-3 py-2 text-xs font-medium text-navy">{p.t}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Team preview ───── */
function TeamPreview() {
  const team = [
    { img: founder, n: "Dr. Ankit Gupta", r: "Founder & Director" },
    { img: teamFrancesco, n: "Francesco Garripoli", r: "CTO / Neurofeedback Research" },
    { img: teamParas, n: "Dr. Paras Kaul", r: "Researcher, Neurofeedback (CA)" },
    { img: teamPaula, n: "Ms. Paula", r: "Ex VP, IBM · Wellness & Research" },
    { img: teamSushant, n: "Dr. Sushant Myrosker", r: "Advisor" },
    { img: teamRoopali, n: "Dr. Roopali Bajaj", r: "Advisor" },
  ];
  return (
    <section className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="Meet the team" title="Scientists, practitioners & advisors" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p) => (
            <div key={p.n} className="glass-card flex items-center gap-4 rounded-2xl p-5">
              <img src={p.img} alt={p.n} className="h-16 w-16 rounded-full object-cover ring-2 ring-teal/40" />
              <div>
                <p className="font-display text-base font-semibold text-navy">{p.n}</p>
                <p className="text-xs text-muted-foreground">{p.r}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/about" className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white">
            View Full Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───── Testimonials ───── */
function Testimonials() {
  const items = [
    { cat: "Psychologist", q: "An exceptional addition to my clinical practice. The reports are precise and easy to share with clients.", n: "Practising Psychologist" },
    { cat: "Student", q: "My focus during exam prep has improved significantly after the sessions.", n: "Engineering Student" },
    { cat: "Parent", q: "We finally have data to understand and support our child's attention patterns.", n: "Parent" },
    { cat: "Wellness Expert", q: "Customised sound therapy paired with neurofeedback is a powerful combination.", n: "Wellness Coach" },
    { cat: "Healthcare", q: "The training programme is hands-on and clinically grounded.", n: "Healthcare Professional" },
  ];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="Voices from our community" />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <blockquote key={i} className="glass-card rounded-2xl p-6">
              <span className="rounded-full bg-teal/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal">{t.cat}</span>
              <p className="mt-4 text-sm leading-relaxed text-navy">"{t.q}"</p>
              <footer className="mt-4 text-xs font-medium text-muted-foreground">— {t.n}</footer>
            </blockquote>
          ))}
          {/* Video placeholder tiles */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-1">
            {[1, 2].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-hero">
                <BrainwaveBackdrop className="absolute inset-0 h-full w-full opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-lg">
                    <Play className="ml-0.5 h-5 w-5" />
                  </span>
                </div>
                <p className="absolute bottom-3 left-3 text-xs text-white">Video testimonial {i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── FAQ ───── */
function FAQ() {
  const faqs = [
    ["What is Neurofeedback?", "Neurofeedback is a non-invasive, evidence-informed brain-training technology that monitors live brainwave activity and provides real-time feedback to help train target states like attention, calm and focus."],
    ["Is Neurofeedback safe?", "Yes. It is non-invasive and does not involve any electrical stimulation — it only reads brainwave signals through external sensors."],
    ["Who can use this technology?", "Psychologists, counselors, therapists, educators, wellness professionals, students, athletes and corporate professionals — among others."],
    ["How long is the training?", "Our flagship practitioner programme is 7 days of intensive training with 3 months of handholding support after completion."],
    ["Will I receive certification?", "Yes — successful candidates receive a Certified Neurofeedback Practitioner certificate."],
    ["What is included in the software subscription?", "Neurofeedback dashboard, brainwave monitoring, session recording, data analysis and cloud reporting."],
    ["Does the hardware come with warranty?", "Yes — 6 months hardware warranty is included with the package."],
    ["How does customised sound therapy work?", "Personalised sound frequencies and rhythmic modulation are matched to the user's brainwave profile to support relaxation, focus, balance and wellness."],
    ["Is this useful for psychologists and counselors?", "Absolutely — it is widely used by mental-health professionals as a complementary, data-driven assessment and training tool."],
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
        <p className="mt-4 text-white/75">Whether you're a practitioner, professional or curious about your own brain — we'd love to talk.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy">Book Demo</Link>
          <Link to="/training" className="rounded-full bg-orange px-5 py-3 text-sm font-semibold text-navy">Become Practitioner</Link>
          <Link to="/contact" className="rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold backdrop-blur">Contact Us</Link>
          <Link to="/assessment" className="rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold backdrop-blur">Request Consultation</Link>
        </div>
      </div>
    </section>
  );
}

/* ───── Shared heading ───── */
function SectionHeading({ eyebrow, title, sub, dark }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${dark ? "bg-teal/15 text-teal" : "bg-navy/5 text-navy"}`}>{eyebrow}</span>
      <h2 className={`mt-4 font-display text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {sub && <p className={`mt-4 ${dark ? "text-white/70" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

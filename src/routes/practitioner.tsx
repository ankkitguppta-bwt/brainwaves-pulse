import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Building2,
  Check,
  CircleCheck,
  HeartHandshake,
  School,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/practitioner")({
  head: () => ({
    meta: [
      { title: "Accredited Neurofeedback Practitioner Certification | BrainWaves Tech" },
      {
        name: "description",
        content:
          "Build a modern clinical practice with a seven-day neurofeedback certification programme.",
      },
    ],
  }),
  component: PractitionerPage,
});
const benefits = [
  [
    "92%+ Diagnostic Accuracy Without Questionnaires",
    "Eliminate subjective survey bias and patient hesitation. Capture real-time prefrontal cortex micro-voltages without asking a single question.",
  ],
  [
    "2-Minute Scan vs. 50-Minute Interviews",
    "Reduce initial evaluation time from 50 minutes to 2 minutes, allowing you to serve more clients while providing instant, visual proof of their neural baseline.",
  ],
  [
    "15 Quantified Mind Parameters",
    "Deliver actionable, clinical-grade reports covering 5 core wave spectrum bands (Alpha, Beta, Theta, Delta, Gamma) and 10 metric indicators including Study Focus, Stress Reduction, Inner Calm, and Empathy.",
  ],
  [
    "Turn-Key Revenue Expansion",
    "Add high-margin services to your practice: non-invasive diagnostic scans, custom 60-day sound therapy protocols, and ongoing post-analysis tracking.",
  ],
] as const;
const practiceBenefits = [
  [
    "90% Faster Analytic Clarity",
    "Uncover anxiety, fatigue, and focus blocks from an objective baseline in two minutes.",
  ],
  [
    "Unshakable Client Trust",
    "Support observations with visual, quantitative evidence that improves understanding and retention.",
  ],
  [
    "High-Margin Revenue Streams",
    "Offer brainwave scans, analysis reports, customised sound therapy, and recurring progress packages.",
  ],
  [
    "Pre- and Post-Therapy Tracking",
    "Re-scan after 30, 60, or 90 days to demonstrate progress quantitatively.",
  ],
] as const;
const curriculum = [
  [
    "Fundamentals of EEG & Neuro-Frequency Spectrum",
    "Understand Delta, Theta, Alpha, Beta, and Gamma bands and their behavioural correlations.",
  ],
  [
    "Hardware Operation & Sensor Calibration",
    "Master FP1 placement, dry-electrode conductivity, grounding, and impedance troubleshooting.",
  ],
  [
    "Interpreting the 15-Parameter Decoding Engine",
    "Read live waveform spirals and ten qualitative performance gauges.",
  ],
  [
    "50+ Clinical Case Studies Analysis",
    "Review corporate burnout, student anxiety, ADHD markers, and severe fatigue profiles.",
  ],
  [
    "Generating & Delivering Brainwave Reports",
    "Translate all 15 parameters and population comparisons into empowering client conversations.",
  ],
  [
    "Practice Growth, Pricing & Client Retention",
    "Package baseline scans, consultations, sound therapy, and progress tracking.",
  ],
] as const;
const audiences = [
  [
    Stethoscope,
    "Clinical & Counselling Psychologists",
    "Upgrade intake speed and support observations with objective data.",
  ],
  [
    Sparkles,
    "Alternate Therapists & Healers",
    "Measure the outcomes of hypnotherapy, Reiki, NLP, Pranic healing, and related modalities.",
  ],
  [
    School,
    "School & Institutional Counsellors",
    "Support focus, learning, sleep quality, self-esteem, creativity, and study consistency.",
  ],
  [
    Building2,
    "Corporate Wellness Consultants",
    "Deliver measurable programmes for stress, retention, leadership, teamwork, and employee health.",
  ],
] as const;
const prices = [
  ["BWT-2508 Headset", "₹64,999 + GST"],
  ["BWT-1408 Software", "₹29,999 + GST"],
  ["NFP Certification", "₹51,000 + GST"],
] as const;
function PractitionerPage() {
  return (
    <>
      <PageHero
        eyebrow="Become a Practitioner"
        title="Build a Modern, Tech-Enabled Clinical Practice powered by Patented Brain-Computer Interface (BCI) Analytics"
        sub="Traditional mental health intake relies on subjective questionnaires, long diagnostic sittings, and patient trust barriers. By becoming a Certified Partner with Brain Waves Tech, you gain the complete ecosystem: patented AI software, medical-grade BCI hardware, and clinical certification, allowing you to identify root-cause mental stress in under 2 minutes with over 92% diagnostic accuracy."
      />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">
            Transform Your Practice. Eliminate Guesswork. Scale Your Revenue.
          </h2>
          <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">
            Build a complete, data-backed workflow for assessment, interpretation, intervention, and
            progress tracking.
          </p>
          <h3 className="mt-12 font-display text-2xl font-bold text-navy">
            Why Join Our Practitioner Network?
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {benefits.map(([title, body]) => (
              <article key={title} className="rounded-2xl bg-white p-6">
                <CircleCheck className="h-6 w-6 text-teal" />
                <h4 className="mt-4 font-display text-xl font-bold text-navy">{title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">
            NFP Certification
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy">
            Accredited Neurofeedback Practitioner Certification Programme
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Elevate your clinical practice, therapy practice, or wellness centre with an intensive
            seven-day programme focused on interpreting 15-parameter EEG maps and building
            data-driven transformation plans.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [BookOpen, "7-Day Interactive Online Training"],
              [Award, "50+ Real-World Case Study Reviews"],
              [HeartHandshake, "2 Months Dedicated Hand-Holding Support"],
              [Check, "NABS Recognised NFP Certification"],
            ].map(([Icon, label]) => (
              <div key={String(label)} className="rounded-2xl bg-secondary p-5">
                <Icon className="h-6 w-6 text-teal" />
                <p className="mt-3 font-semibold text-navy">{String(label)}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-16 font-display text-3xl font-bold text-navy">
            Bridge Subjective Counselling and Biometric Evidence.
          </h3>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {practiceBenefits.map(([title, body], i) => (
              <article key={title} className="rounded-2xl border border-navy/10 p-6">
                <span className="font-display text-2xl font-bold text-teal">0{i + 1}</span>
                <h4 className="mt-3 font-display text-xl font-bold text-navy">{title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <h3 className="mt-16 font-display text-3xl font-bold text-navy">
            The 7-Day Curriculum Breakdown
          </h3>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {curriculum.map(([title, body], i) => (
              <article key={title} className="rounded-2xl border border-navy/10 p-5">
                <p className="text-xs font-bold text-teal">MODULE {i + 1}</p>
                <h4 className="mt-2 font-semibold text-navy">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">Who Should Get Certified?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {audiences.map(([Icon, title, body]) => (
              <article key={String(title)} className="rounded-2xl bg-white p-6">
                <Icon className="h-6 w-6 text-teal" />
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{String(title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{String(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal">
              Price Breakdown Strategy
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy">
              The Master Practitioner Bundle Offer
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.15fr]">
            {" "}
            <div className="rounded-3xl border border-navy/10 p-7">
              <h3 className="font-display text-xl font-bold text-navy">Standalone Pricing</h3>
              <dl className="mt-5 divide-y divide-navy/10">
                {prices.map(([name, price]) => (
                  <div key={name} className="flex justify-between gap-4 py-4">
                    <dt className="text-muted-foreground">{name}</dt>
                    <dd className="font-semibold text-navy">{price}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-2 flex justify-between border-t-2 border-navy pt-4 font-bold text-navy">
                <span>Total Individual Cost</span>
                <span>₹1,45,998 + 18% GST</span>
              </div>
            </div>
            <div className="rounded-3xl bg-navy p-7 text-white">
              <BrainCircuit className="h-8 w-8 text-teal" />
              <h3 className="mt-5 font-display text-2xl font-bold">
                Bundle Package Price: ₹1,35,998 + 18% GST
              </h3>
              <p className="mt-2 font-semibold text-orange">Saves ₹10,000 instantly!</p>
              <ul className="mt-6 space-y-3 text-sm text-white/75">
                {[
                  "BWT 2508 Flagship Headset (Discounted)",
                  "Annual BWT Platform Software",
                  "Licensed NFP Certification",
                  "Bonus Marketing & Directory Suite",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-7 inline-flex rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
              >
                Discuss the Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold">
            Take the First Step Toward Becoming a Certified Practitioner.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Join 27+ certified professionals transforming how mental wellness is measured and
            supported.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-teal px-5 py-3 text-sm font-semibold text-navy"
            >
              Become a Certified Practitioner
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

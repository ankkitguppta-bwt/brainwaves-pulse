import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleCheck,
  HeartHandshake,
  Loader2,
  Mail,
  Phone,
  RefreshCcw,
  School,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { submitToWeb3Forms } from "@/lib/web3forms";

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
    "92%+ Analytical Accuracy Without Questionnaires",
    "Eliminate subjective survey bias and patient hesitation. Capture real-time prefrontal cortex micro-voltages without asking a single question.",
  ],
  [
    "2-Minute Scan vs. 50-Minute Interviews",
    "Reduce initial evaluation time from 50 minutes to 2 minutes, allowing you to serve more clients while providing instant, visual proof of their neural baseline.",
  ],
  [
    "14 Quantified Mind Parameters",
    "Deliver actionable, clinical-grade reports covering 5 core wave spectrum bands (Alpha, Beta, Theta, Delta, Gamma) and 9 metric indicators including Study Focus, Stress Reduction, Inner Calm, and Empathy.",
  ],
  [
    "Turn-Key Revenue Expansion",
    "Add high-margin services to your practice: non-invasive analytical scans, custom 60-day sound therapy protocols, and ongoing post-analysis tracking.",
  ],
] as const;
const practiceBenefits = [
  [
    Zap,
    "#14b8a6",
    "90% Faster Analytic Clarity",
    "Uncover anxiety, fatigue, and focus blocks from an objective baseline in two minutes.",
  ],
  [
    ShieldCheck,
    "#f97316",
    "Unshakable Client Trust",
    "Support observations with visual, quantitative evidence that improves understanding and retention.",
  ],
  [
    TrendingUp,
    "#a855f7",
    "High-Margin Revenue Streams",
    "Offer brainwave scans, analysis reports, customised sound therapy, and recurring progress packages.",
  ],
  [
    RefreshCcw,
    "#14b8a6",
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
    "Interpreting the 14-Parameter Decoding Engine",
    "Read live waveform spirals and nine qualitative performance gauges.",
  ],
  [
    "50+ Clinical Case Studies Analysis",
    "Review corporate burnout, student anxiety, ADHD markers, and severe fatigue profiles.",
  ],
  [
    "Generating & Delivering Brainwave Reports",
    "Translate all 14 parameters and population comparisons into empowering client conversations.",
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
const PRACTITIONER_CATEGORIES = [
  "Clinical & Counselling Psychologist",
  "Alternate Therapist & Healer (Hypnotherapist / Reiki Healer / NLP Practitioner / Pranic Healer)",
  "School & Institutional Counsellor",
  "Corporate Wellness Consultant",
  "Other",
] as const;

type PricingFormFields = {
  name: string;
  phone: string;
  email: string;
  profession: string;
  practitionerGoal: string;
};

const EMPTY_PRICING_FORM: PricingFormFields = {
  name: "",
  phone: "",
  email: "",
  profession: "",
  practitionerGoal: "",
};

function fieldRingClass(hasError: boolean) {
  return hasError
    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
    : "border-input focus:border-teal focus:ring-teal/15";
}

function TextField({
  id,
  label,
  icon: Icon,
  error,
  className,
  ...props
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
        <input
          id={id}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-3.5 text-sm text-navy transition-all duration-200 focus:outline-none focus:ring-4 ${fieldRingClass(!!error)}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  error,
  children,
  className,
  ...props
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <select
          id={id}
          className={`w-full appearance-none rounded-xl border bg-white py-3 pl-3.5 pr-9 text-sm text-navy transition-all duration-200 focus:outline-none focus:ring-4 ${fieldRingClass(!!error)}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function GetPricingDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fields, setFields] = useState<PricingFormFields>(EMPTY_PRICING_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof PricingFormFields, string>>>({});

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorMsg(null);
    setFields(EMPTY_PRICING_FORM);
    setFieldErrors({});
  }, [open]);

  useEffect(() => {
    if (status !== "sent") return;
    const timer = window.setTimeout(() => onOpenChange(false), 1500);
    return () => window.clearTimeout(timer);
  }, [status, onOpenChange]);

  function update<K extends keyof PricingFormFields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setFieldErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Partial<Record<keyof PricingFormFields, string>> {
    const errors: Partial<Record<keyof PricingFormFields, string>> = {};
    if (!fields.name.trim()) errors.name = "Name is required.";
    if (!fields.phone.trim()) errors.phone = "Phone number is required.";
    else if (!/^[0-9+()\-\s]{7,20}$/.test(fields.phone.trim()))
      errors.phone = "Enter a valid phone number.";
    if (!fields.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      errors.email = "Enter a valid email address.";
    if (!fields.profession) errors.profession = "Please select your profession.";
    if (!fields.practitionerGoal) errors.practitionerGoal = "Please select an option.";
    return errors;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setStatus("sending");
    setErrorMsg(null);
    const fd = new FormData();
    fd.append("name", fields.name);
    fd.append("phone", fields.phone);
    fd.append("email", fields.email);
    fd.append("profession", fields.profession);
    fd.append("wants_to_be_certified", fields.practitionerGoal);
    fd.append("subject", "New Practitioner Bundle Pricing Request — BrainWaves Tech Website");
    fd.append("from_name", "BrainWaves Tech Website");
    try {
      await submitToWeb3Forms(fd);
      setStatus("sent");
      // Best-effort: also keep a record in the internal admin dashboard.
      fetch("/api/public/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          interest: "Master Practitioner Bundle Pricing",
          message: `Profession: ${fields.profession}\nDo you want to be a Certified Neurofeedback Practitioner: ${fields.practitionerGoal}`,
        }),
      }).catch(() => {});
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-6 shadow-2xl sm:rounded-2xl">
        <DialogTitle className="font-display text-xl font-bold text-navy">
          Get Bundle Pricing
        </DialogTitle>
        {status !== "sent" && (
          <DialogDescription className="-mt-2 text-sm text-muted-foreground">
            Share your details and our team will send you the full pricing breakdown.
          </DialogDescription>
        )}
        {status === "sent" ? (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
              <CheckCircle2 className="h-8 w-8 text-teal" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Thanks! We&apos;ve received your details and will send over the pricing shortly.
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-6 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-navy transition hover:brightness-110"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-1 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="pricing-name"
                label="Name"
                icon={User}
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={fields.name}
                onChange={(e) => update("name", e.target.value)}
                error={fieldErrors.name}
              />
              <TextField
                id="pricing-phone"
                label="Phone Number"
                icon={Phone}
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                value={fields.phone}
                onChange={(e) => update("phone", e.target.value)}
                error={fieldErrors.phone}
              />
            </div>
            <TextField
              id="pricing-email"
              label="Email"
              icon={Mail}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={fields.email}
              onChange={(e) => update("email", e.target.value)}
              error={fieldErrors.email}
            />
            <SelectField
              id="pricing-profession"
              label="Profession"
              value={fields.profession}
              onChange={(e) => update("profession", e.target.value)}
              error={fieldErrors.profession}
            >
              <option value="">Select your profession</option>
              {PRACTITIONER_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectField>
            <SelectField
              id="pricing-goal"
              label="Do you want to be a Certified Neurofeedback Practitioner"
              value={fields.practitionerGoal}
              onChange={(e) => update("practitionerGoal", e.target.value)}
              error={fieldErrors.practitionerGoal}
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </SelectField>
            {status === "error" && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errorMsg}</p>
            )}
            <button
              disabled={status === "sending"}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-teal px-5 py-3.5 text-sm font-semibold text-navy shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-sm"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PractitionerPage() {
  const [pricingOpen, setPricingOpen] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Become a Practitioner"
        title={
          <>
            Build a Modern, Tech-Enabled Clinical Practice
            <span className="mt-3 block font-display text-xl font-medium leading-snug tracking-normal text-white/55 sm:text-2xl lg:text-[1.75rem]">
              Powered by patented Brain-Computer Interface (BCI) analytics
            </span>
          </>
        }
        sub="Traditional mental health intake relies on subjective questionnaires, long analytical sittings, and patient trust barriers. By becoming a Certified Partner with Brain Waves Tech, you gain the complete ecosystem: patented AI software, medical-grade BCI hardware, and clinical certification, allowing you to identify root-cause mental stress in just 2 minutes with over 92% analytical accuracy."
        subClassName="mx-auto mt-7 max-w-2xl text-base leading-[1.55] text-white/70"
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
              <article
                key={title}
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <CircleCheck className="h-5 w-5" />
                </span>
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
            seven-day programme focused on interpreting 14-parameter EEG maps and building
            data-driven transformation plans.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [BookOpen, "7-Day Interactive Online Training"],
              [Award, "50+ Real-World Case Study Reviews"],
              [HeartHandshake, "2 Months Dedicated Hand-Holding Support"],
              [Check, "NABS Recognised NFP Certification"],
            ].map(([Icon, label]) => (
              <div
                key={String(label)}
                className="group rounded-2xl border border-navy/5 bg-white p-5 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-3 font-semibold leading-snug text-navy">{String(label)}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-16 font-display text-3xl font-bold text-navy">
            Bridge Subjective Counselling and Biometric Evidence.
          </h3>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {practiceBenefits.map(([Icon, color, title, body]) => (
              <article
                key={title}
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}1a`, color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 font-display text-xl font-bold text-navy">{title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
          <h3 className="mt-16 font-display text-3xl font-bold text-navy">
            The 7-Day Curriculum Breakdown
          </h3>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {curriculum.map(([title, body]) => (
              <article
                key={title}
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <h4 className="font-display text-lg font-bold text-navy">{title}</h4>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
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
              <article
                key={String(title)}
                className="group rounded-2xl border border-navy/5 bg-white p-6 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-18px_rgba(15,23,42,0.42)]"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy">{String(title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{String(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy">
            Get Your Bundle Pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Get the BWT-2508 headset, BWT-1408 software, and NFP Certification bundled together at
            a lower cost than buying each piece separately.
          </p>
          <div className="mt-8 flex flex-col items-center rounded-3xl bg-navy px-8 py-10 text-white">
            <BrainCircuit className="h-8 w-8 text-teal" />
            <p className="mt-4 max-w-md text-sm text-white/75">
              Share a few details and our team will send you the full bundle price breakdown,
              along with any active savings.
            </p>
            <button
              type="button"
              onClick={() => setPricingOpen(true)}
              className="mt-6 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:brightness-110"
            >
              Get Bundle Pricing
            </button>
          </div>
        </div>
      </section>
      <GetPricingDialog open={pricingOpen} onOpenChange={setPricingOpen} />
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
          </div>
        </div>
      </section>
    </>
  );
}

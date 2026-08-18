import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Brain, Headphones, MonitorSmartphone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import headset from "@/assets/client/hardware/bwt-headset.png";
import software from "@/assets/client/software/Step 4.png";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products | BrainWaves Tech" },
      {
        name: "description",
        content: "Explore the complete BrainWaves Tech neurofeedback ecosystem.",
      },
    ],
  }),
  component: ProductsPage,
});

const products = [
  {
    to: "/products/headband",
    eyebrow: "BWT-2508",
    title: "Neurofeedback Hardware",
    body: "Dry-electrode brainwave sensing with three precision sensors, two-minute setup, Bluetooth 5.2, and all-day battery life.",
    image: headset,
    Icon: Brain,
  },
  {
    to: "/products/software",
    eyebrow: "BWT-1408",
    title: "Neurofeedback Software",
    body: "Patent-backed processing that converts raw EEG streams into five brainwave bands and ten qualitative gauges.",
    image: software,
    Icon: MonitorSmartphone,
  },
  {
    to: "/practitioner",
    eyebrow: "NFP Certification",
    title: "Practitioner Programme",
    body: "A seven-day programme covering EEG fundamentals, hardware operation, interpretation, reporting, and practice growth.",
    Icon: Award,
  },
  {
    to: "/products/sound-therapy",
    eyebrow: "Customised Solutions",
    title: "Personalised Sound Therapy",
    body: "A 60-day acoustic protocol engineered around an individual's measured brainwave baseline.",
    Icon: Headphones,
  },
] as const;

function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="One Integrated Neurofeedback Ecosystem"
        sub="Hardware, software, practitioner training, and personalised sound solutions designed to work together from assessment to measurable progress."
      />
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 lg:px-8">
          {products.map(({ to, eyebrow, title, body, Icon, ...item }) => (
            <article
              key={to}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm"
            >
              {"image" in item && item.image && (
                <div className="aspect-[16/8] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <Icon className="h-7 w-7 text-teal" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-teal">
                  {eyebrow}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-navy">{title}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{body}</p>
                <Link
                  to={to}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal hover:text-navy"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

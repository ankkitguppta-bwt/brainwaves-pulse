import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import brainMark from "@/assets/brand/brain-mark.png.asset.json";

type NavItem =
  | { label: string; to: string }
  | { label: string; children: { label: string; to: string; desc?: string }[] };

const nav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Products",
    children: [
      { label: "EEG Headband", to: "/products/headband", desc: "Smart wearable brain sensor" },
      { label: "Software Platform", to: "/products/software", desc: "Live neurofeedback dashboard" },
      { label: "Sound Therapy", to: "/products/sound-therapy", desc: "Personalised neuro-acoustics" },
      { label: "Accessories", to: "/products/accessories", desc: "Sensors, cables and add-ons" },
    ],
  },
  {
    label: "Technology",
    children: [
      { label: "EEG Hardware", to: "/technology" },
      { label: "Brainwave Analysis", to: "/technology" },
      { label: "AI Software", to: "/technology" },
      { label: "Neurofeedback", to: "/technology" },
      { label: "Sound Therapy", to: "/technology" },
    ],
  },
  { label: "Become a Practitioner", to: "/practitioner" },
  { label: "Blog", to: "/blog" },
  {
    label: "About Us",
    children: [
      { label: "Mission", to: "/about" },
      { label: "Research", to: "/research" },
      { label: "Team", to: "/about" },
      { label: "Media", to: "/stories" },
      { label: "Testimonials", to: "/testimonials" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

function Wordmark({ solid }: { solid: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <img src={brainMark.url} alt="" aria-hidden="true" className="h-8 w-auto sm:h-9 lg:h-10" />
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl ${
            solid ? "text-navy" : "text-white"
          }`}
        >
          BrainWaves
        </span>
        <span
          className={`text-[9px] font-semibold tracking-[0.42em] transition-colors duration-300 sm:text-[10px] ${
            solid ? "text-navy/70" : "text-white/70"
          }`}
        >
          TECH
        </span>
      </span>
    </span>
  );
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || hovered;

  return (
    <>
      <header
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-1/2 top-3 z-40 w-[calc(100%-1rem)] max-w-7xl -translate-x-1/2 rounded-2xl border shadow-lg backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:top-4 sm:w-[calc(100%-2rem)] ${
          solid ? "border-border bg-white" : "border-white/30 bg-white/25"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex h-10 shrink-0 items-center" aria-label="BrainWaves Tech home">
            <Wordmark solid={solid} />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            {nav.map((item) => {
              if ("to" in item) {
                const active = pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition xl:text-sm ${
                      solid ? "text-navy" : "text-white"
                    } ${active ? (solid ? "bg-secondary" : "bg-white/15") : solid ? "hover:bg-secondary" : "hover:bg-white/10"}`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const isOpen = openDrop === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDrop(item.label)}
                  onMouseLeave={() => setOpenDrop((c) => (c === item.label ? null : c))}
                >
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition xl:text-sm ${
                      solid
                        ? "text-navy/75 hover:bg-secondary hover:text-navy"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => setOpenDrop(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2">
                      <div className="overflow-hidden rounded-2xl border border-border bg-white">
                        <ul className="py-2">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link
                                to={c.to}
                                className="block px-4 py-2.5 transition hover:bg-secondary"
                                onClick={() => setOpenDrop(null)}
                              >
                                <p className="text-sm font-semibold text-black">{c.label}</p>
                                {c.desc && <p className="mt-0.5 text-xs text-muted-foreground">{c.desc}</p>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 lg:flex">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-teal px-4 py-2 text-sm font-semibold text-navy shadow-brand transition hover:scale-[1.03]"
            >
              Book Demo Now
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition lg:hidden ${
              solid ? "text-navy hover:bg-secondary" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-navy/55 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="ml-auto flex h-dvh w-full max-w-sm flex-col bg-white shadow-2xl sm:w-[88%]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-border px-5 pt-[env(safe-area-inset-top)]">
              <Link to="/" onClick={() => setOpen(false)} aria-label="BrainWaves Tech home">
                <Wordmark solid />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-navy transition hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 py-5">
              <ul className="flex flex-col gap-2">
                {nav.map((item) => {
                  if ("to" in item) {
                    const active = pathname === item.to;
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-[48px] items-center rounded-xl border px-4 py-3 text-base font-semibold transition ${
                            active
                              ? "border-teal/35 bg-secondary text-black"
                              : "border-border bg-white text-black hover:border-teal/35 hover:bg-secondary"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const expanded = mobileExpanded === item.label;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-base font-semibold text-black transition hover:bg-secondary"
                        onClick={() => setMobileExpanded(expanded ? null : item.label)}
                        aria-expanded={expanded}
                      >
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
                      </button>
                      {expanded && (
                        <ul className="mt-2 flex flex-col gap-1 border-l-2 border-teal/40 pl-3">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link
                                to={c.to}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-black/80 hover:bg-secondary hover:text-black"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="border-t border-border p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-navy px-4 py-3 text-base font-semibold text-white shadow-brand"
              >
                Book Demo Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

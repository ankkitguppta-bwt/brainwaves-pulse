import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logoLight from "@/assets/brand/logo-light.png";

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
    label: "Solutions",
    children: [
      { label: "Psychologists", to: "/solutions/psychologists" },
      { label: "Educational Institutions", to: "/solutions/educational" },
      { label: "Corporates", to: "/solutions/corporates" },
      { label: "Rehab Centres", to: "/solutions/rehab" },
      { label: "Healthcare", to: "/solutions/healthcare" },
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

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-border/60 bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="BrainWaves Tech home">
            <img
              src={logoLight}
              alt="BrainWaves Tech"
              className={`h-8 w-auto sm:h-9 lg:h-10 ${transparent ? "brightness-0 invert" : ""}`}
            />
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
                      active
                        ? transparent
                          ? "bg-white/15 text-white"
                          : "bg-secondary text-navy"
                        : transparent
                        ? "text-white/85 hover:bg-white/10"
                        : "text-foreground/70 hover:bg-secondary hover:text-navy"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }
              const open = openDrop === item.label;
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
                      transparent
                        ? "text-white/85 hover:bg-white/10"
                        : "text-foreground/70 hover:bg-secondary hover:text-navy"
                    }`}
                    onClick={() => setOpenDrop(open ? null : item.label)}
                    aria-expanded={open}
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2">
                      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-brand">
                        <ul className="py-2">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <Link
                                to={c.to}
                                className="block px-4 py-2.5 transition hover:bg-secondary"
                                onClick={() => setOpenDrop(null)}
                              >
                                <p className="text-sm font-semibold text-navy">{c.label}</p>
                                {c.desc && (
                                  <p className="mt-0.5 text-xs text-muted-foreground">{c.desc}</p>
                                )}
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
              Book Demo
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition lg:hidden ${
              transparent ? "text-white hover:bg-white/10" : "text-navy hover:bg-secondary"
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
                <img src={logoLight} alt="BrainWaves Tech" className="h-8 w-auto" />
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
                              ? "border-teal/35 bg-secondary text-navy"
                              : "border-border bg-white text-navy hover:border-teal/35 hover:bg-secondary"
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
                        className="flex min-h-[48px] w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-base font-semibold text-navy transition hover:bg-secondary"
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
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-navy/80 hover:bg-secondary hover:text-navy"
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
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

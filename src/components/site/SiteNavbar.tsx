import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoLight from "@/assets/brand/logo-light.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/technology", label: "Technology" },
  { to: "/assessment", label: "Assessment" },
  { to: "/sound-therapy", label: "Sound Therapy" },
  { to: "/training", label: "Training" },
  { to: "/hardware-software", label: "Hardware & Software" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close mobile sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="BrainWaves Tech home"
        >
          <img
            src={logoLight}
            alt="BrainWaves Tech"
            className="h-8 w-auto sm:h-9 lg:h-10"
          />
        </Link>

        {/* Desktop nav — visible from lg (1024px) */}
        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition xl:px-3 xl:text-sm ${
                  active
                    ? "bg-secondary text-navy"
                    : "text-foreground/70 hover:bg-secondary hover:text-navy"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA — only at xl+ to avoid crowding */}
        <div className="hidden shrink-0 xl:flex">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-brand transition hover:bg-navy-soft"
          >
            Book Free Demo
          </Link>
        </div>

        {/* Hamburger — visible below lg */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy transition hover:bg-secondary lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

    </header>
      {/* Mobile sheet is outside the blurred sticky header so it can cover the full viewport */}
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
                {links.map((l) => {
                  const active = pathname === l.to;
                  return (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-[48px] items-center rounded-xl border px-4 py-3 text-base font-semibold transition ${
                          active
                            ? "border-teal/35 bg-secondary text-navy"
                            : "border-border bg-white text-navy hover:border-teal/35 hover:bg-secondary"
                        }`}
                      >
                        {l.label}
                      </Link>
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
                Book Free Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="BrainWaves Tech home">
          <img src={logoLight} alt="BrainWaves Tech" className="h-9 w-auto md:h-10" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
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

        <div className="hidden items-center gap-2 xl:flex">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-brand transition hover:bg-navy-soft"
          >
            Book Free Demo
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="rounded-md p-2 text-navy xl:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-navy/40 backdrop-blur-sm xl:hidden" onClick={() => setOpen(false)}>
          <div
            className="ml-auto h-full w-[85%] max-w-sm bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <img src={logoLight} alt="BrainWaves Tech" className="h-8" />
              <button aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-6 w-6 text-navy" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-navy hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-navy px-4 py-3 text-sm font-semibold text-white"
              >
                Book Free Demo
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

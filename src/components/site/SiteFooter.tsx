import { Link } from "@tanstack/react-router";
import logoDarkAsset from "@/assets/brand/logo-dark.png.asset.json";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

const logoDark = logoDarkAsset.url;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <img src={logoDark} alt="BrainWaves Tech" className="h-14 w-auto rounded-md" />
          <p className="mt-4 text-sm text-white/70">
            India's advanced neurofeedback, brainwave analysis and customized sound therapy
            ecosystem for psychologists, educators and wellness professionals.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-teal hover:text-navy"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-teal">Products</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/products/headband" className="hover:text-teal">EEG Headband</Link></li>
            <li><Link to="/products/software" className="hover:text-teal">Software Platform</Link></li>
            <li><Link to="/products/sound-therapy" className="hover:text-teal">Sound Therapy</Link></li>
            <li><Link to="/products/accessories" className="hover:text-teal">Accessories</Link></li>
            <li><Link to="/technology" className="hover:text-teal">Technology</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-teal">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/practitioner" className="hover:text-teal">Become a Practitioner</Link></li>
            <li><Link to="/about" className="hover:text-teal">About Us</Link></li>
            <li><Link to="/stories" className="hover:text-teal">Stories & Media</Link></li>
            <li><Link to="/testimonials" className="hover:text-teal">Testimonials</Link></li>
            <li><Link to="/contact" className="hover:text-teal">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-teal">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-teal">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-teal" />
              <span>+91 98930 64372<br />+91 92440 24033</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-teal" />
              <a href="mailto:hello@brainwavestech.com" className="hover:text-teal">hello@brainwavestech.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-teal" />
              <span>India · www.brainwavestech.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} BrainWaves Tech. All rights reserved.</p>
          <p>Neurofeedback · Brainwave Analysis · Sound Therapy · Practitioner Training</p>
        </div>
      </div>
    </footer>
  );
}

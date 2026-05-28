# BrainWaves Tech — Website Build Plan

A premium, light-first neuro-tech site for BrainWaves Tech with deep navy futuristic accents, teal/cyan tech tones, and warm orange highlights. Built on the existing TanStack Start + Tailwind stack.

## Brand & design system

- Tokens added to `src/styles.css` (oklch equivalents):
  - `--navy` #06243A, `--teal` #12B8B0, `--orange` #F6A400, `--soft-cyan` #F3FBFC, white base
  - Gradients: navy→teal hero glow, teal→cyan card sheen, orange highlight
  - Glassmorphism utility (blurred white/cyan cards), soft shadow scale, rounded-2xl defaults
- Typography: clean modern sans (Inter + Space Grotesk display) via Google Fonts
- Reusable primitives: `Section`, `GlassCard`, `BrainwaveBackdrop` (animated SVG EEG lines), `GradientButton`, `StepConnector`, `LogoMark`, `WhatsAppFab`
- Light sections use the **light-background logo**; dark navy sections use the **dark-background logo**. Logos used as-is (no recolor/effects). Brain icon extracted as favicon + watermark.

## Assets

- Copy both logos to `src/assets/` (light + dark variants)
- Extract favicon (brain icon only) to `public/favicon.png`
- Extract all 122 images from the DOCX into `src/assets/docx/` and curate:
  - Founder portrait (Dr. Ankit Gupta) → hero founder card + About
  - Team headshots (Francesco, Paras, Paula, Sushant, Roopali, Rima, Domendra, Nitya, Rajeev, Amruta) → team grid
  - Hardware product shots → Hardware & Software section + dedicated page
  - Software/Dolphin Game screenshots → "Interactive Neurofeedback Training Game" carousel (renamed)
  - Brainwave graph screenshots → blurred/redacted (CSS blur overlay on any visible PII strips) for Brainwave Analysis section
  - NABS / FIP accreditation marks + workshop/group photos → Trust & Recognition wall
- A small curation script will rename the most-used images; the rest stay available for Gallery

## Routes (TanStack file-based, each with its own `head()` for SEO)

```
src/routes/
  __root.tsx              (sticky navbar + WhatsApp FAB + footer shell)
  index.tsx               (full homepage as specced)
  technology.tsx
  assessment.tsx          (Brainwave Assessment)
  sound-therapy.tsx
  training.tsx            (Practitioner certification)
  hardware-software.tsx
  about.tsx               (full team + story)
  gallery.tsx             (workshops, media, recognition)
  contact.tsx             (form + WhatsApp + phones)
  blog.tsx                (list shell, ready for posts)
```

Each route sets unique title/description/og:title/og:description. Leaf routes set `og:image` to their hero image. Sitemap + robots.txt added.

## Homepage sections (in order)

1. **Hero** — split layout: left navy panel with animated brainwave SVG + dashboard mockup card + small founder card (Dr. Ankit Gupta); right soft-cyan with headline, sub, 3 CTAs (Book Free Demo / Become Certified Practitioner / Request Brainwave Assessment)
2. **Trust strip** — 7 chips (Neurofeedback Tech, Brainwave Analysis, Sound Therapy, Practitioner Training, Hardware+Software Ecosystem, Professional Support, NABS/FIP)
3. **What is Neurofeedback** — intro + 5 wave cards (Alpha, Beta, Theta, Delta, Gamma) with mini animated wave SVGs
4. **How It Works** — 5-step horizontal flow with animated connector lines and icons
5. **Advanced Brainwave Analysis** — dashboard screenshot collage + 10 metric pills (Attention, Focus, Mental Fatigue, etc.); all PII blurred via overlay
6. **Customized Sound Therapy** — soothing gradient section, 6 benefit cards, disclaimer block
7. **Complete Practitioner Solution** — 6 premium glass cards (Hardware, Software, Warranty, Training, Support, Certification) with expanded details
8. **Software Experience** — dark futuristic carousel of screenshots; "Interactive Neurofeedback Training Game" feature list + 6 mode chips
9. **Who Can Benefit** — 16 audience cards with icons in responsive grid
10. **Training & Certification CTA** — strong conversion band with bullets + 2 CTAs
11. **Trust, Media & Recognition** — credibility wall (NABS, FIP, media logos, workshop photos, awards)
12. **Team preview** — 4–6 cards + "View Full Team" → /about
13. **Testimonials** — categorized cards + video-placeholder tiles
14. **FAQ** — accordion (shadcn `Accordion`) with all 9 questions
15. **Final CTA** — navy band with 4 buttons
16. **Footer** — link columns, contacts (+91 98930 64372, 92440 24033), socials, YouTube

## Global UI

- **Sticky white navbar**: light logo + 9 menu items, mobile sheet menu, "Book Demo" CTA
- **Floating WhatsApp button**: bottom-right, `https://wa.me/919893064372`, pulse animation
- **Footer**: navy background with dark logo, link columns, contact, social, legal

## Disclaimers & privacy

- Sound therapy disclaimer block placed in section 6 and on /sound-therapy
- All graph screenshots get a CSS-blurred strip over the top header area to hide any client names/emails/phones; visually styled as "anonymized sample"

## Technical

- Mobile-first, responsive
- Smooth scroll + intersection-observer fade/slide animations (Tailwind + `tw-animate-css`)
- SEO: per-route head, semantic HTML, single H1 per page, alt text, JSON-LD Organization on home
- Analytics-ready: placeholder GA script slot in `__root` (commented until ID provided)
- Lead capture form on /contact and inline on home final CTA (stores via simple `mailto:` for now; Lovable Cloud can be enabled later for real persistence)
- Blog route shell ready for future posts

## Out of scope (this pass)

- Real backend / form submissions (no Lovable Cloud yet — say the word and I'll enable it for lead capture + blog CMS)
- Real Google Analytics ID wiring (slot left)
- Payment / booking integration
- Authentication / practitioner portal

## Technical details

- Stack: TanStack Start, React 19, Tailwind v4 via `src/styles.css`, shadcn primitives (Accordion, Button, Card, Sheet, Carousel, Dialog, Form, Input, Textarea)
- New components live in `src/components/site/` (Navbar, Footer, WhatsAppFab, Hero, sections/*) and `src/components/ui/*` reused
- Image imports as ES6 modules from `src/assets/`
- No new npm packages required beyond what's installed; if Embla carousel isn't present I'll use the existing `carousel.tsx` shadcn wrapper

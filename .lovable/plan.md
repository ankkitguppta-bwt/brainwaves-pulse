## What I'll do

### 1. Add the 4 uploaded banners as full-width scroll sections
Copy the 4 ChatGPT banner PNGs into `src/assets/banners/`:
- `banner-hero.png` — "Smart EEG Headband & Live Brainwave Software"
- `banner-platform.png` — "India's Advanced Neurofeedback & Brainwave Analysis Platform"
- `banner-assessment.png` — "Brainwave Assessment & Customized Sound Therapy"
- `banner-training.png` — "Become a Certified Neurofeedback Practitioner"

Create a reusable `BannerSection.tsx` component (full-bleed, rounded on desktop, edge-to-edge on mobile, `object-cover` with proper aspect ratio, lazy-loaded, with subtle parallax/fade-in on scroll).

Place them on the homepage at strategic scroll positions:
- After Hero → `banner-platform.png` (trust/positioning)
- Before "Customized Sound Therapy" section → `banner-assessment.png`
- Before "Training" CTA section → `banner-training.png`
- Inside Hardware/Software section → `banner-hero.png`

Also reuse the matching banner at the top of the relevant inner routes (assessment, training, hardware-software) below the PageHero.

### 2. Scroll-to-top on every route change
Add a `ScrollToTop` effect in `__root.tsx` that listens to router location changes and calls `window.scrollTo({ top: 0, behavior: "instant" })`. Ensures every page opens from the top.

### 3. Fix navbar + hamburger across all breakpoints
Current navbar only switches to mobile at `xl` (1280px) — at 1018px viewport the desktop nav is cramped/broken. Refactor `SiteNavbar.tsx`:
- Hamburger visible below `lg` (1024px), full nav at `lg+`.
- At `lg`–`xl`: shrink nav link padding + font, hide "Book Free Demo" pill, keep links only.
- At `xl+`: show full nav + CTA button.
- Tighten logo height on mobile (`h-8`), align with hamburger vertical center.
- Mobile sheet: proper safe-area padding, scrollable nav list, larger tap targets (min 44px), close on route change.
- Fix sheet overlay to lock body scroll while open.

### 4. 100% mobile responsiveness pass
Audit and fix on `index.tsx` and all routes:
- Replace any fixed `px-8`/`gap-8` with responsive `px-4 sm:px-6 lg:px-8`.
- Hero split layout: stack on mobile, side-by-side from `md`.
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4` instead of fixed multi-col.
- Typography: clamp hero headings (`text-3xl sm:text-4xl md:text-5xl lg:text-6xl`).
- Cards: full-width on mobile, prevent horizontal overflow (`overflow-x-hidden` on body wrapper).
- WhatsApp FAB: ensure it doesn't overlap mobile CTAs (bottom-right with safe spacing).
- Footer: stack columns on mobile.
- Images: `max-w-full h-auto`, `loading="lazy"`.

### 5. Alignment cleanup
- Consistent section vertical rhythm (`py-16 md:py-24`).
- Centered max-width containers (`max-w-7xl mx-auto`).
- Card heights equalized with `flex flex-col h-full`.
- Buttons aligned with `inline-flex items-center justify-center`.

## Out of scope
- No new pages, no copy rewrites, no backend changes.
- No design system color changes.

## Files touched
- new: `src/assets/banners/*.png` (4 files), `src/components/site/BannerSection.tsx`, `src/components/site/ScrollToTop.tsx`
- edited: `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/assessment.tsx`, `src/routes/training.tsx`, `src/routes/hardware-software.tsx`, `src/components/site/SiteNavbar.tsx`, `src/components/site/SiteFooter.tsx`, `src/styles.css` (small responsive utilities if needed)

## 1. Hero section
- Register the uploaded `final_landing_page_loop.mp4` as a Lovable asset and point the hero `<video>` at it (replacing `hero-loop.mp4`).
- Change the sub-sub heading from `text-white/75` to full `text-white` (keep the accent spans as-is).

## 2. Global background
- Set the base `--background` token in `src/styles.css` to `#f0f0f0` (oklch equivalent) and replace the hardcoded `bg-white` section classes on the home page and shared sections with `bg-background` so the whole site reads as light grey. Cards/panels keep white surfaces for contrast.

## 3. "A Four-Stage Neuro-Wellness Journey" one-by-one reveal
- Re-verify the AOS `step-reveal` wiring (custom animation names need explicit `data-aos-duration`/`aos-animate` handling). Replace it with a reliable in-view stagger: an IntersectionObserver on the section that adds `animate-step-in` with per-card `animationDelay` (160ms increments), so cards appear one after another on both the mobile grid and desktop row. The existing fade/entry styling stays.

## 4. Footer redesign (per reference image)
Rebuild `src/components/site/SiteFooter.tsx` on the dark navy background as:
- Top band: "Stop Guessing, Start Measuring" + subscribe line, email input + teal "Subscribe Now" button (moves the newsletter into the footer; the separate newsletter section on the home page is removed to avoid duplication).
- Divider, then 3 columns:
  - Brand: "BrainWaves Tech" wordmark, the descriptive paragraph, circular social icons.
  - LEGAL & COMPLIANCE: Disclaimer, Terms & Conditions, Privacy Policy, Refund & Return Policy, Shipping Policy.
  - CORPORATE CONTACT: Office address (A-268, New Minal Residency, Near Gate No. 4, In Front of D-Mart, Ayodhya Bypass Road, Bhopal, M.P. - 462023), Inquiries: contact@brainwavestech.com, Contact: +91 98930 64372.
- Keep the existing copyright strip.

## 5. Video testimonials → horizontal carousel
- Replace the vertical multi-column marquee with a single horizontal auto-scrolling track (left-moving marquee, duplicated list for seamless loop), pausing on hover/touch, with the existing edge fade mask applied horizontally. Cards keep the current 4:5 poster style and open the same popup modal on click.

### Technical notes
- Files: `src/routes/index.tsx`, `src/components/site/SiteFooter.tsx`, `src/styles.css`, new `src/assets/video/*.asset.json`.
- Legal pages don't exist yet; footer legal links will point to placeholder anchors unless you want those routes created.

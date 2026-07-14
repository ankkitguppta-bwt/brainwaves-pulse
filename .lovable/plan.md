## Goal

Rework the site around the "homepage answers 4 questions" principle (What / Who / Why-trust / Next step). Move deep content into dedicated pages, restructure the navbar, and layer in the animations, videos, and integrations from both files.

**Asset policy:** placeholder copy + placeholder images/videos for every new page and section. You'll drop in real videos/media before the phase that needs them.

---

## Phase 1 — Navbar + Global Shell

New nav (replaces current 9-link menu):
`Home · Products · Solutions · Technology · Become a Practitioner · About Us · Book Demo`

- Sticky navbar, **transparent over hero → solid on scroll** (~80px), glass blur.
- Dropdowns:
  - **Products:** EEG Headband, Software Platform, Sound Therapy, Accessories
  - **Solutions:** Psychologists, Educational Institutions, Corporates, Rehab Centres, Healthcare
  - **Technology:** EEG Hardware, Brainwave Analysis, AI Software, Neurofeedback, Sound Therapy
  - **About:** Mission, Research, Team, Media, Testimonials, Contact
- Mobile drawer version of the same tree (accordion sub-menus).
- **Global logo-inspired loader** (animated brainwave through the BWT mark) shown on first paint + route transitions.

---

## Phase 2 — Create every destination route (placeholder layouts)

Stub every new page so nav links resolve and layout is visible. Each gets its own `head()` (title, description, og). Placeholder copy + placeholder imagery — real content lands in Phase 8.

New route files:
- `/products` + `/products/headband`, `/products/software`, `/products/sound-therapy`, `/products/accessories`
- `/solutions` + `/solutions/psychologists`, `/educational`, `/corporates`, `/rehab`, `/healthcare`
- `/practitioner` (merged Training + Certification + Ecosystem)
- `/stories` (media/recognition as case studies)
- `/testimonials` (text wall)
- `/research`
- Keep existing `/about`, `/contact`, `/technology`, `/gallery`

Delete or redirect the old `/assessment`, `/sound-therapy`, `/hardware-software`, `/training` routes into the new structure.

---

## Phase 3 — Homepage structural slim-down

Homepage becomes: Hero · Stats · What is Neurofeedback (intro card row) · How it Works · Who Can Benefit · Video Testimonials · FAQ · Final CTA · Footer.

Move existing homepage sections into their new homes:

| Section today | New home |
|---|---|
| Advanced Brainwave Analysis | Products → Software |
| Smart EEG Headband banner | Products → Headband |
| Software Experience / dolphin game | Products → Software |
| Customized Sound Therapy | Products → Sound Therapy |
| Complete Practitioner Solution | /practitioner |
| Become a Certified Practitioner banner | /practitioner |
| Training & Certification (remove "Talk to Program Advisor") | /practitioner |
| Trust, Media & Recognition | /stories (case-study layout) |
| Meet the Team | /about |
| Text testimonials | /testimonials |

Also: remove the image directly below the stats strip; fix old duplicate "Hardware & Software" label.

---

## Phase 4 — Homepage Hero + Stats

- Hero **background video** (I'll wire the `<video>` element + poster fallback; you drop in the file when ready). If no video by build time, fallback = **image carousel** of 3–4 stills.
- Two CTAs: **Book Demo**, **Request Assessment**.
- Stats moved below hero with **count-up on scroll**: 27+ Practitioners · 14+ Years Research · 1.2 L+ Data Points · 92%+ Accuracy. Remove tick-list chips.

**Pause point:** send the hero video (or confirm carousel-only) before I start this phase.

---

## Phase 5 — "What is Neurofeedback" interactive wave cards

Five cards (Alpha / Beta / Theta / Delta / Gamma). Hover or tap expands into a detailed modal with:
- **Animated SVG waveform** at the correct frequency
- Frequency · Benefits · Used-for content (placeholder copy per wave; you edit)

---

## Phase 6 — "How it Works" animated timeline

Replace 5 static cards with a **connected timeline** that draws its line, pulses each node, and animates the arrow forward as the user scrolls.

---

## Phase 7 — "Who Can Benefit" moving cards

Convert flat grid into two **auto-scrolling marquee rows** (opposite directions, pause on hover) of category cards: Psychologists, Hospitals, Schools, Athletes, Corporates, Researchers, Defence, Universities, Coaching Centers, Individuals, NGOs, Wellness Coaches…

---

## Phase 8 — Testimonials + FAQ on homepage

- Homepage keeps **only video testimonials** in an auto-sliding carousel with a "See all" link to `/testimonials`.
- FAQ = accordion with **smooth expand + fade-in on scroll**.

**Pause point:** send testimonial video files (or approve placeholder MP4s) before this phase.

---

## Phase 9 — Fill out destination pages

Replace Phase 2 placeholders with real layouts + placeholder copy per your notes:
- **Products** sub-pages — multi-angle device visuals (placeholder renders), animated product tour, spec blocks
- **Solutions** industry pages — problem → outcome → CTA template per audience
- **Technology** topic pages — flesh out EEG Hardware / Brainwave Analysis / AI Software / Neurofeedback / Sound Therapy
- **/practitioner** — merged Training + Certification + Ecosystem (6 pillars)
- **/stories** — media/recognition as case studies with proper alignment + explanation
- **/about** — team redesign (I'll propose 2–3 layout options in-page)
- **/testimonials** — full text wall + video grid

All copy = clearly-marked placeholder you can edit.

---

## Phase 10 — Integrations

- **Calendly** embed on Book Demo / Book a Call. (Needs your Calendly URL.)
- **Generative AI chatbot** via Lovable AI Gateway — floating widget, grounded on site content. Optional per your notes; ships last.

**Pause point:** Calendly link + go/no-go on chatbot.

---

## Phase 11 — SEO + Copywriting polish

Per-page meta titles/descriptions, OG tags, H1 hierarchy, alt text, footer copy rewrite, JSON-LD (Organization + Product).

---

## Out of scope (unless you ask)

- Backend / auth / payments
- Real team photos, real testimonial media (you supply)
- Final production copy (I ship marked placeholders)

---

## How I'll proceed

I'll ship **Phases 1 + 2 + 3 together** — pure structural plumbing, no animation risk — then pause before each media/animation/integration phase (4, 5, 6, 7, 8, 10) so you can drop in videos and confirm behavior.

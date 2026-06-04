## Scope
Walk through the docx page-by-page and apply every marked change to the live site. Group into 6 work blocks.

## 1. Navigation + Sticky Scroll Banner
- Fix duplicate label in `SiteNavbar.tsx`: "Hardware Hardware & Software" → single "Hardware & Software" entry (already single in code — verify menu order matches docx: Home, Technology, Assessment, Sound Therapy, Training, Hardware & Software, About, Gallery, Contact).
- Make the "Neuro-tech made in India" hero banner scroll in parallel: convert the homepage hero in `src/routes/index.tsx` to use a sticky/parallax behaviour (background image stays fixed `bg-fixed` or `position: sticky` while content scrolls past), so the banner travels with scroll on desktop and mobile.

## 2. Homepage (Page 1 + 2) — `src/routes/index.tsx`
- Update hero stats strip:
  - `500+ Certified Practitioners` → `27+ Certified Practitioners`
  - `10+ Years in Neurotechnology` → `14+ Years of Neurofeedback Research`
  - Add `1.2 Lakh+ Data Points` and `92%+ Accuracy` (replace the `Hardware + Software + Training` chip and "15,000+ Assessments")
- Tighten hero copy ("Matter change"): refine sub-headline to read more crisply (Assess · Understand · Deliver Customized Neurofeedback & Sound Therapy).
- Replace the right-side hero illustration + Page 2 "girl" photo with new realistic AI-generated photos (woman wearing EEG headband during a session, photoreal, warm clinic lighting). Generate two distinct images via `imagegen--generate_image` (premium tier for realism) into `src/assets/banners/hero-realistic.jpg` and `src/assets/banners/practitioner-realistic.jpg`.
- Founder card: keep Dr. Ankit Gupta.

## 3. Technology / How-it-Works (Page 3) — `src/routes/technology.tsx`
- Rewrite "What is neurofeedback" intro paragraph for clarity (per "Matter change").
- Keep 5-step flow but tighten copy.
- Replace the two analysis graph images on the right with new realistic-looking graph mockups: generate 2 images (modern EEG dashboard graphs with Alpha/Beta/Theta bands, soft UI, teal+navy palette) into `src/assets/docx/graph-realistic-1.jpg` and `graph-realistic-2.jpg`.

## 4. Assessment + Sound Therapy (Page 4) — `src/routes/assessment.tsx`, `src/routes/sound-therapy.tsx`
- Refine intro copy.
- Keep sound therapy disclaimer as-is (per user choice).
- Add the "ecosystem" 6-card grid (Hardware Package, Software Subscription, 6 Mo Warranty, 7 Days Intensive Training, 3 Mo Handholding, Certified Practitioner Training) — merge this content with the Training block (see §5) to avoid duplication: keep cards on `hardware-software.tsx`, link from `training.tsx`.

## 5. Hardware/Software + Training merge (Page 5–7) — `src/routes/hardware-software.tsx`, `src/routes/training.tsx`
- Fix dolphin game image cropping on Page 5: ensure left-side game image uses `object-contain` inside framed mockup (already partially done via `MockupFrame`; verify "training mode" shot is not clipped).
- Replace EEG headband product photo with new realistic AI image (`src/assets/docx/headband-realistic.jpg`).
- Add audiences (Page 6) to `training.tsx` audience grid: append **Individuals, Researchers, Defence, Universities, Coaching Centers, Hospitals** to existing list.
- Merge the duplicated "Become a Certified Practitioner" block on Page 6 into the single Training page flow on Page 7 — remove the duplicate block from `hardware-software.tsx` and replace with a single CTA section pointing to `/training`.
- Accreditations row (Page 7): rearrange existing `accred-*` images into a tidy responsive grid with proper captions (NABS, Federation of Indian Psychology, Media, Industry Endorsements, Workshops, Cohorts, Practitioner Sessions, Awards) — no new generated images, reuse `src/assets/docx/accred-1..7`.

## 6. Team + Testimonials (Page 7–8) — `src/routes/about.tsx`, `src/routes/index.tsx`
- Team: keep only the 6 names listed in docx (Dr. Ankit Gupta, Francesco Garripoli, Dr. Paras Kaul, Ms. Paula, Dr. Sushant Myrosker, Dr. Roopali Bajaj) using existing `team-*` photos already present. Add a `// TODO: confirm names/photos` comment since user didn't supply the prior word file — current photos used as best-match; user can correct later.
- Testimonials section: rebuild on homepage with 5 text-photo cards (Psychologist, Student, Parent, Wellness Coach, Healthcare Professional) + 2 video placeholder cards (showing play icon + "Video coming soon"). Add a small admin-friendly note in the source comment that photos/videos will be dropped in later from WhatsApp.

## Images to generate (premium realistic)
1. `src/assets/banners/hero-realistic.jpg` — Woman wearing modern EEG headband, soft lab lighting, looking at neurofeedback screen, photoreal, 1536x1024.
2. `src/assets/banners/practitioner-realistic.jpg` — Indian female practitioner working with client on neurofeedback, warm clinic, photoreal.
3. `src/assets/docx/graph-realistic-1.jpg` — Clean EEG line-chart dashboard mockup, teal/navy palette.
4. `src/assets/docx/graph-realistic-2.jpg` — Brainwave band breakdown bars (Alpha/Beta/Theta/Gamma), modern UI.
5. `src/assets/docx/headband-realistic.jpg` — Photoreal product render of a sleek EEG headband on neutral backdrop.

## Out of scope
- Backend, auth, payments.
- New routes.
- Real testimonial content / WhatsApp video ingest (user will supply later).
- Final team name/photo verification (user hasn't shared reference file).

## Files to edit
- `src/components/site/SiteNavbar.tsx` (verify nav)
- `src/routes/index.tsx` (hero, sticky banner, stats, testimonials, team trim)
- `src/routes/technology.tsx` (copy, graphs)
- `src/routes/assessment.tsx`, `src/routes/sound-therapy.tsx` (copy)
- `src/routes/hardware-software.tsx` (headband image, accreditations grid, dedupe training CTA, dolphin crop)
- `src/routes/training.tsx` (add audiences, single training flow)
- `src/routes/about.tsx` (team list trim)

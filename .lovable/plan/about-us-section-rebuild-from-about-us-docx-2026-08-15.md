# About Us section rebuild (from ABOUT_US.docx)

## 0. Pre-existing build fix
`src/routes/blog.$slug.tsx` currently fails typecheck: `Route.useLoaderData()` is typed as possibly undefined (10 errors). Add an early `if (!post) return null;` guard in `PostPage` before the hooks/markup use it. Unrelated to the About work, but blocks the build.


Three separate pages, all copy taken verbatim from the document.

## 1. `/about` — Our Mission
- Hero banner with the quote: "Transformating Mental Healthcare: Where Advanced Neuroscience Meets Human Potential" plus the intro paragraph on eliminating guesswork.
- Three numbered story blocks:
  1. The Origin — The Blueprint (2013, NSDC mentoring) and The Realization (patented neurofeedback + customised soundtrack).
  2. The Scalable B2B Mandate — The Transition (12,000+ served, The Brain Seeder limits) and The Mission Scale (B2B framework).
  3. The 3-Year Strategic Horizon — Targeted Reach and Our Goal (1,000+ practitioners, 500+ enterprise ecosystems).
- Key Impact callout box with the Dr. Gupta quote ("What people say can be influenced by perception…").
- Footer CTA band: "Start Your Neurofeedback Journey Today" + Book Demo Now / Become a Practitioner buttons.

## 2. `/team` — Meet the Team (new route)
- Title: "Pioneered by Leading Mental Health Professionals. Backed by Decades of Global Innovation" + intro paragraph.
- Leadership Team cards (photo or initials, name, designation, credentials, professional profile): Dr. Ankit Gupta, Mrs. Nitya Gupta, Swapnil Prabhat, Mr. Vikas Patel.
- Board of Advisors cards (advisory role, credentials, advisory scope): Francesco Garripoli, Dr. Paras Kaul, Amruta Singhwekar.
- Key Impact callout box ("Our strength lies in bridging neuroscience…").
- Same footer CTA band.
- Team data comes from the database so it stays editable in the admin panel. A migration replaces the current roster with exactly these 7 people (correct categories, designations, full bios, sort order). Existing photos for Dr. Ankit Gupta, Nitya Gupta, Dr. Paras Kaul and Amruta Singhwekar are reused; Swapnil Prabhat, Mr. Vikas Patel and Francesco Garripoli render styled initials avatars until photos are uploaded via the admin panel.
- Navbar "Meet the Team" points to `/team` (currently it duplicates `/about`).

## 3. `/research` — Scientific Research (replaces the placeholder)
- Title: "Grounded in Data. Backed by 120,000+ Neural Data Points." + intro paragraph.
- Section 1: Massive Data Architecture & Algorithmic Benchmarking — The Scale, The Accuracy (>92%), Zero Human Bias, shown as three stat/feature cards.
- Section 2: Comprehensive 15-Parameter Neural Mapping — 5 frequency bands (Delta, Theta, Alpha, Beta, Gamma with their descriptions) plus the 10 proprietary metric indicators as chips.
- Section 3: Patented BCI Signal Technology & Global IP Rights — U.S. patented engine, exclusive regional rights, safe receiver architecture.
- Published Research Papers: three cards for BWT_Research_01/02/03 showing document title, authors, category and abstract. No download buttons (PDFs not supplied yet).
- Same footer CTA band.

## Technical notes
- New files: `src/routes/team.tsx`, `src/components/site/JourneyCta.tsx` (shared footer CTA band), `src/components/site/ImpactCallout.tsx`.
- Edited: `src/routes/about.tsx` (mission content, team markup removed), `src/routes/research.tsx` (full page replacing `PlaceholderPage`), `src/components/site/SiteNavbar.tsx` (Meet the Team → `/team`).
- One migration on the `people` table: delete rows not in the doc, upsert the 7 doc entries with full descriptions. No schema/RLS changes.
- Each route gets its own `head()` with unique title, description, og:title, og:description.
- Styling reuses existing tokens (navy/teal/orange, `glass-card`, `font-display`) and the AOS fade animations already used elsewhere, so the new pages match the rest of the site.

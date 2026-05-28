## Goal
Fix cropped software/hardware screenshots (dolphin game, EEG software) showing white space, and make mockup sections more visually rich and attractive with added content.

## Problems identified
- In `hardware-software.tsx`, images use `h-56 w-full object-cover` which crops screenshots (especially dolphin game frames with white backgrounds) — losing key content.
- Software/mockup sections feel flat: plain grid of images on a white card, no captions, no visual framing, no supporting content.
- Same issue likely on homepage `SoftwareExperience` section.

## Changes

### 1. Fix image cropping (hardware-software.tsx + index.tsx SoftwareExperience)
- Replace `object-cover` with `object-contain` for software screenshots (dolphin/game/UI shots) so nothing is clipped.
- Wrap each screenshot in a device-style frame: subtle gradient background (navy → teal tint), inner padding, rounded-2xl, soft shadow, thin border. This removes the "white blank" feeling by giving the image a colored canvas behind it.
- For hardware photos (real product shots), keep `object-cover` but increase height on desktop (`h-64 md:h-72`) and add hover zoom.
- Use `aspect-video` or `aspect-[4/3]` containers so layout stays consistent while image fits fully.

### 2. Enrich the Software section on `hardware-software.tsx`
- Add a 2-column intro: left = heading + descriptive copy about the dolphin neurofeedback game (how focus controls the dolphin, reward-based training, real-time EEG mapping), bullet list of features (Real-time feedback, Reward-based learning, Engaging for kids & adults, Session recording, Progress tracking). Right = featured large screenshot in framed mockup.
- Below: 3 framed thumbnails of remaining game shots with captions ("Focus Mode", "Reward Animation", "Session Dashboard").
- Add a stats strip (e.g., "200+ Sessions Delivered • 95% Engagement • Live EEG Sync").

### 3. Enrich the Hardware section
- Add intro paragraph + feature pills (Dry sensors, Bluetooth, Research-grade, Lightweight, Multi-channel).
- Featured large hero image (headband) on left, 4 thumbnails grid on right (asymmetric layout) instead of uniform grid.
- Add caption under each thumbnail.

### 4. Homepage SoftwareExperience section
- Apply same framed-mockup treatment (gradient backdrop, object-contain, captions) so software screenshots aren't cropped on the homepage either.
- Add a small "What you see" caption strip per screenshot.

### 5. Visual polish
- Add subtle `BrainwaveBackdrop` accent behind software section.
- Floating teal/orange glow blobs behind featured mockup for depth.
- Hover lift on cards (`transition hover:-translate-y-1 hover:shadow-xl`).

## Out of scope
- No new routes, no design-system color changes, no backend.
- No new AI-generated images — work with existing assets in `src/assets/docx/`.

## Files to edit
- `src/routes/hardware-software.tsx` — restructure Hardware + Software sections with framed mockups, intro copy, feature lists, stats.
- `src/routes/index.tsx` — update `SoftwareExperience` block: framed mockups with `object-contain`, captions, gradient backdrop.
- (Optional small util) inline a `MockupFrame` helper component at top of each file, or create `src/components/site/MockupFrame.tsx` for reuse.

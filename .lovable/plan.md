## Live 3D Brainwave Section (replaces current "What is Neurofeedback?" cards)

### What it becomes

A dark, full-width section on the home page where each of the five bands is a **row** rendered as real, live 3D geometry (not video). Hovering a row expands it into a detailed panel with the wave animating larger, plus frequency / definition / "what it measures". Moving away (or scrolling past) collapses it back to the minimal hook state automatically.

```text
What is neurofeedback?
Quantify Cognitive Capital. Eliminate Structural Burnout.
[intro paragraph]

┌──────────────────────────────────────────────┐
│ ALPHA   8–12 Hz    ~~~live 3D ribbon~~~      │  ← minimal: name + hook line
│ "The ultimate state of effortless…"          │
├──────────────────────────────────────────────┤
│ BETA …                                       │
└──────────────────────────────────────────────┘

on hover →  row grows (190px → ~420px), wave amplitude/glow rises,
            body text + Frequency + What it Measures fade/slide in
```

### How the live demo + hover works (technical)

- Install `three`. Port the uploaded `BrainwaveBands.jsx` to `src/components/site/BrainwaveBands.tsx` (typed, same shaders/curve maths unchanged).
- **One WebGL canvas, fixed behind the section**, drawing each band into its own row via `renderer.setScissor` + `setViewport` computed from each row div's `getBoundingClientRect()`. That is the uploaded file's existing approach — it keeps five animated ribbons at one draw loop instead of five canvases.
- **Live**: a single `requestAnimationFrame` loop advances `uTime`; each band has its own `freq / speed / amp / twist` uniforms so delta rolls slowly and gamma ripples fast.
- **Hover**: `onPointerEnter`/`onPointerLeave` on the row sets `activeBand` state. The row's height animates via CSS grid-rows/max-height transition; the renderer reads the new rect each frame, so the ribbon naturally scales into the taller viewport. In parallel, uniforms `uAmp`, `uOpacity` and coil/bubble opacity lerp toward "focused" values (~1.35× amplitude, brighter) with easing in the RAF loop — no jump.
- **Content animation**: expanded body uses staggered fade/translate (existing `data-aos`-free CSS transitions with per-child delays), so wave → definition → frequency → measures appear in sequence.
- **Auto-collapse on scroll**: an `IntersectionObserver`/scroll listener clears `activeBand` once the section leaves the comfortable viewport band, and the row returns to minimal state. Touch devices: tap toggles expansion (only one open at a time); on <768px rows are shorter and the expanded content stacks below the wave.
- **Perf/safety**: pause the RAF when the section is off-screen or the tab is hidden; respect `prefers-reduced-motion` (static frame, no loop); if WebGL is unavailable, fall back to the existing SVG waveform so the section never renders blank.

### Copy (exact, per your spec)

Heading `What is Neurofeedback?` → title `Quantify Cognitive Capital. Eliminate Structural Burnout.` → the intro paragraph.

Per band, minimal hook + expanded body/Frequency/What it Measures for Alpha, Beta, Gamma, Delta, Theta exactly as written in your message. Band order in the section: Alpha, Beta, Gamma, Delta, Theta (the order you listed).

### Files

1. `src/components/site/BrainwaveBands.tsx` — new, ported 3D renderer + row layout + hover/expand logic.
2. `src/components/site/brainwave-content.ts` — new, the five bands' copy (hook, definition, frequency, measures) and visual params in one place.
3. `src/routes/index.tsx` — replace the `WhatIsNeurofeedback` card grid with the new section; keep its position (after the Four-Stage journey).
4. `src/styles.css` — a few transition/stagger utilities for the expand animation.
5. `package.json` — add `three` + `@types/three`.

### Notes

- The existing `WaveModal` "Know more" dialog is no longer reachable from the home page after this change. I'll leave the component in place (still used by the wave list elsewhere) unless you want it removed.
- No backend, routing, or data changes.

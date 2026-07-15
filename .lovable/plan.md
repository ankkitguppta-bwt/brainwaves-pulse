## Add BrainWaves logo loader that shows until the app is ready

### What to build

A CSS-only loader that animates the dark logo (reveal sweep + shine + breathe) as a fullscreen overlay, mounted at the root layout so it covers the initial paint of every route, then fades out once the app has hydrated and fonts are ready.

### Files

1. **`src/components/site/BrainWavesLoader.tsx`** (new)
   - Port the provided JSX to TSX with correct markup (the pasted snippet had empty JSX in the render tree — I'll reconstruct: outer `div.brainwaves-loader`, inner `div.brainwaves-loader__logo` containing base `<img>`, `div.brainwaves-loader__reveal` with foreground `<img>`, and `div.brainwaves-loader__shine`, followed by label `<span>`).
   - Props: `size?`, `fullscreen?` (default true), `label?` (default "Loading").
   - Source the logo from the existing `src/assets/brand/logo-dark.png.asset.json` CDN URL — no need to place a file in `public/`.
   - Set `--loader-width` inline from `size`.

2. **`src/components/site/BrainWavesLoader.css`** (new)
   - Exact CSS from the spec.

3. **`src/routes/__root.tsx`** (edit `RootComponent`)
   - Add a `useState(true)` `showLoader` + `useEffect` that hides the loader once `document.readyState === 'complete'` and `document.fonts.ready` resolves (with a small min-display of ~400ms to avoid flash, and a hard 4s safety timeout).
   - Render `<BrainWavesLoader />` above the tree with a fade-out class when hiding; unmount after transition.
   - Skip rendering on the server (guard with a mounted flag) so SSR HTML is unchanged; the loader only appears during client hydration/first paint.

### Technical notes

- CSS-only animations; no framer-motion or JS RAF loops.
- `prefers-reduced-motion` handled by the provided CSS block.
- Loader is a client-only overlay (`position: fixed; z-index: 9999`) so it sits above navbar/footer without affecting layout or SSR markup.
- No changes to routing, data loading, or business logic.

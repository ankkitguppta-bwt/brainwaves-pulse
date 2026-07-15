# Admin panel polish + editor upgrade

## 1. Hide public chrome on admin/auth routes
`src/routes/__root.tsx` always renders `SiteNavbar`, `SiteFooter`, `WhatsAppFab`, and a `pt-16` wrapper — that's why the admin dashboard shows the public navbar/footer.

- In `RootComponent`, read the current pathname (`useRouterState`) and, when it starts with `/admin`, `/_authenticated`, or `/auth`, render `<Outlet />` alone (no navbar, footer, WhatsApp FAB, or `pt-16` padding).
- Public routes keep the existing shell unchanged.

## 2. Sidebar must not remount on tab change
Root cause: `_authenticated/route.tsx` uses `ssr: false` + `beforeLoad` that calls `supabase.auth.getUser()` and `has_role` on every navigation. Every child click re-runs the gate, the layout unmounts briefly, and the sidebar flashes/rebuilds.

Fix:
- Move the auth+role check to a one-time client check inside the layout component (or cache the result in `Route.useRouteContext` via a memoized promise), and drop `beforeLoad` from firing on every navigation. Concretely: perform the check once, store `{user, isAdmin}` in React state / a small in-module cache keyed by user id, and render `<Outlet />` immediately on subsequent nav.
- Ensure the sidebar element is stable (same component instance) across children — layout body already wraps `<Outlet />`, so once the gate stops re-blocking, TanStack keeps the layout mounted and only swaps the outlet.

## 3. Redesign admin header + sidebar branding
- Remove the entire top header row (Admin label, search pill, bell, avatar). Main content becomes full-height with just the outlet + page title from each page.
- Replace the "B" avatar + "Brainwaves" text in the sidebar with `src/assets/brand/logo-dark.png` (imported), sized ~ h-8, linking to `/admin`.
- Remove drop shadows from all admin cards: strip `shadow`, `hover:shadow-lg`, and `shadow-*` from `StatCard`, `CrudManager` cards, blog editor aside panels, tables, sticky header (now removed), etc. Keep borders only.

## 4. Make dashboard fully dynamic
Assumption based on your point 2: the dashboard currently shows only 4 stat cards + latest 5 enquiries. I'll extend it to be a real overview populated entirely from the DB:
- Add counts for Case Studies, Media, Published vs Draft posts, Unread vs Total enquiries — all from server fns already in `admin.functions.ts` (add small aggregate fns if missing).
- "Latest enquiries" table already dynamic; also add "Recent posts" and "Recent testimonials" lists pulled from DB.
- Remove any hardcoded copy left in the shell (e.g. static "Admin" chip, fallback strings).

If you meant something more specific by "remove static data" (e.g. fallback hardcoded testimonials/team on the public pages when DB is empty), tell me and I'll extend the scope.

## 5. Blog editor upgrades (`/_authenticated/admin/blog/$id`)
- **Auto-generated unique slug**: slug field becomes read-only (or hidden), derived from title via `slugify()`. On save, the server fn ensures uniqueness by appending `-2`, `-3`, … if a collision exists (checked against `blog_posts.slug`). Users can still override with an "Edit slug" toggle if useful — confirm below.
- **Cover image aspect ratio**: display "Recommended 16:9 (1600×900)" helper text; preview box is rendered at 16:9 (`aspect-video`) with `object-cover`.
- **Image inputs everywhere → file upload**, no URL prompts:
  - Cover image (blog), Person photo, Testimonial thumbnail, Case study image, Media logo/screenshot, RTE inline images.
  - Uploads go to the existing private `content-media` Supabase Storage bucket via a new `uploadMedia` server fn (admin-only, using `requireSupabaseAuth` + `has_role('admin')`). The bucket becomes public-read (or we return signed URLs) — see question below.
  - Replace every `<input type="text" placeholder="…URL">` for images with a drop/click `ImageUpload` component that shows a live preview and stores the resulting public URL in the same DB column (no schema change).
- **Rich text editor swap**: replace TipTap with **react-draft-wysiwyg** (`react-draft-wysiwyg` + `draft-js` + `draftjs-to-html` + `html-to-draftjs`). Store HTML in `content_html`; convert on load/save. Its inline image button will use the same `uploadMedia` server fn instead of the default URL prompt.

## Files touched
- Edit: `src/routes/__root.tsx`, `src/routes/_authenticated/route.tsx`, `src/routes/_authenticated/admin/index.tsx`, `src/routes/_authenticated/admin/blog/$id.tsx`, `src/routes/_authenticated/admin/blog/index.tsx`, `src/routes/_authenticated/admin/{people,testimonials,case-studies,media,enquiries}.tsx`, `src/components/admin/CrudManager.tsx`, `src/lib/data/admin.functions.ts`.
- Create: `src/components/admin/ImageUpload.tsx`, `src/components/admin/DraftEditor.tsx` (react-draft-wysiwyg wrapper), `uploadMedia` server fn.
- Delete: `src/components/admin/RichTextEditor.tsx` (TipTap) after swap; remove `@tiptap/*` deps.

## Open questions
1. **"Remove the static data, make it dynamic"** — do you mean (a) enrich the dashboard with more DB-driven widgets (my current plan), (b) remove the hardcoded fallbacks on public pages so DB is the single source of truth, or (c) something else?
2. **Storage bucket**: make `content-media` public-read so uploaded images render directly via `https://…/storage/v1/object/public/…`? (Simpler + faster than signed URLs.)
3. **Slug override**: hide the slug field entirely, or keep it visible read-only with an "Edit slug" toggle for SEO tweaks?

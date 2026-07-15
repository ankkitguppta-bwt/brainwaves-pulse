# Admin Panel + Blog — Implementation Plan

## Overview

Build a password-protected `/admin` panel to manage all site content (currently hardcoded), add a public blog with rich-text posts, and persist contact form enquiries. Existing content will be migrated into the database as seed data so nothing visually changes on day one.

## Stack additions

- **Lovable Cloud** — database, auth (email/password), file storage (images for people & blog covers).
- **Role-based access** — `user_roles` table + `has_role()` security-definer function. Admin route + all write operations gated to `admin` role.
- **Rich text editor** — TipTap (React) for blog authoring; sanitized HTML rendered on public blog pages.

## Database schema

Tables (all with RLS + explicit GRANTs):

1. `people` — leaders / team / advisors. Columns: `id, category (enum: leadership|team|advisor), name, role, description, image_url, sort_order, created_at`.
2. `testimonials` — Columns: `id, type (enum: text|video), author, title, quote (text), video_url, thumbnail_url, sort_order, is_featured, created_at`.
3. `blog_posts` — Columns: `id, slug (unique), title, excerpt, cover_image_url, content_html, content_json, meta_title, meta_description, status (draft|published), published_at, created_at, updated_at, author_id`.
4. `case_studies` — Columns: `id, title, summary, body_html, image_url, sort_order, published, created_at`.
5. `media_recognition` — Columns: `id, kind (media|recognition), title, outlet, url, image_url, date, sort_order`.
6. `contact_enquiries` — Columns: `id, name, email, phone, interest, message, created_at, is_read`.
7. `user_roles` + `app_role` enum (`admin`) + `has_role()` function per standard pattern.

**RLS policies:**
- `people`, `testimonials`, `blog_posts (status='published')`, `case_studies (published=true)`, `media_recognition` → public `SELECT` for `anon`.
- All write operations (`INSERT/UPDATE/DELETE`) → only `authenticated` users with `admin` role.
- `contact_enquiries` → public `INSERT` (anyone can submit), `SELECT/UPDATE` admin-only.
- `user_roles` → `SELECT` for authenticated (via `has_role`), no client writes.

**Storage bucket:** `content-media` (public) for people photos, blog covers, case-study images.

**Seed data:** migration inserts current hardcoded people, testimonials, and (empty) placeholder rows so the site renders unchanged.

## Routes

**Public (new/updated):**
- `/blog` — list published posts (grid with cover, title, excerpt, date). Replaces current placeholder.
- `/blog/$slug` — post detail with SEO `head()` from `meta_title`/`meta_description`/`cover_image_url` and rendered sanitized HTML.
- `/testimonials` — real page (text + video, video cards open modal, carousel if >3). Replaces placeholder.
- `/auth` — email/password sign in (no public signup UI; admin accounts created manually or via first-user bootstrap).

**Public (data-driven, no visual change):**
- `/about` — loads leaders/team/advisors from DB.
- `/` — landing video testimonials load from DB.
- `/contact` — form POSTs to a public server route that inserts into `contact_enquiries` (and optionally emails admin — see below).

**Admin (all under `_authenticated/admin/`, gated by admin role check):**
- `/admin` — dashboard: counts + latest enquiries.
- `/admin/testimonials` — CRUD text + video testimonials.
- `/admin/people` — CRUD leaders/team/advisors (photo upload, category, sort).
- `/admin/blog` — list + create/edit posts using TipTap editor, slug generation, SEO fields, draft/publish toggle.
- `/admin/case-studies` — CRUD case studies.
- `/admin/media` — CRUD media coverage + recognition.
- `/admin/enquiries` — list contact form submissions, mark read.

Cal.com meetings intentionally deferred (per your answer).

## Auth & access

- Lovable Cloud email/password auth enabled.
- `_authenticated/admin/route.tsx` layout: verifies session AND `has_role(uid, 'admin')`; non-admins redirected to `/`.
- I'll ask you for the admin email during build; first run inserts an `admin` role row for that user after they sign up (via SQL migration referencing that email).

## Contact form email notification

Optional: uses Lovable's email capability (Resend integration) to email `hello@brainwavestech.com` when a new enquiry arrives. If you don't have Resend set up, I'll ship the DB-save part first and add email as a follow-up when you provide a Resend API key.

## Technical notes

- All DB reads use TanStack Query + loaders; writes via `createServerFn` with `requireSupabaseAuth` + admin role check.
- Public contact submit uses a `/api/public/enquiries` server route (rate-limited by simple length/format validation via Zod).
- Rich text: TipTap → stored as both JSON (for edit) and sanitized HTML (for render, via `sanitize-html`).
- Image uploads: direct-to-storage from admin forms, store returned public URL.
- SEO for blog: each `/blog/$slug` sets title, description, og:title, og:description, og:image (cover), canonical.

## Out of scope (call out for later)

- Cal.com meetings sync.
- Public user signup / comments.
- Multi-author blog roles beyond `admin`.
- Analytics dashboard beyond simple counts.

## Order of implementation

1. Enable Lovable Cloud + auth.
2. Create schema, RLS, storage bucket, seed data (single migration).
3. Migrate `/about`, landing testimonials, `/testimonials`, `/contact` to read/write DB (no visual regression).
4. Build `/auth` + `_authenticated/admin` layout with role guard.
5. Build admin CRUD screens (people → testimonials → case studies → media → enquiries).
6. Build blog: public `/blog` + `/blog/$slug`, then `/admin/blog` with TipTap.
7. Wire optional email notification if Resend key provided.

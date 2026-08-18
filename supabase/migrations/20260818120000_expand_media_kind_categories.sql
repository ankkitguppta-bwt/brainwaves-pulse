-- ================= MEDIA & RECOGNITION: expand categories =================
-- Adds the content categories from Docs/MEDIA.docx (explainer videos, media
-- coverage links, YouTube podcasts, and the three testimonial formats) to the
-- existing media_kind enum, plus a long-form `body` column for testimonial
-- quotes / video-podcast descriptions.

ALTER TYPE public.media_kind ADD VALUE IF NOT EXISTS 'explainer_video';
ALTER TYPE public.media_kind ADD VALUE IF NOT EXISTS 'youtube_podcast';
ALTER TYPE public.media_kind ADD VALUE IF NOT EXISTS 'video_testimonial';
ALTER TYPE public.media_kind ADD VALUE IF NOT EXISTS 'audio_testimonial';
ALTER TYPE public.media_kind ADD VALUE IF NOT EXISTS 'written_testimonial';

ALTER TABLE public.media_recognition ADD COLUMN IF NOT EXISTS body TEXT;

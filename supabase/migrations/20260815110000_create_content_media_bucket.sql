-- Required by the storage.objects policies created in the initial schema.
-- Keep this bucket private: the application returns signed URLs for uploads.
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-media', 'content-media', false)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public;

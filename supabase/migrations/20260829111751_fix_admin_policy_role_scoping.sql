-- Fix: migration 20260715101050 recreated these policies to reference
-- private.has_role(...) but dropped the "TO authenticated" role clause each
-- policy previously had. A CREATE POLICY with no role clause defaults to
-- PUBLIC (every role, including anon). Since private.has_role() has EXECUTE
-- revoked from PUBLIC (granted only to authenticated/service_role), any anon
-- request that has to evaluate one of these now-public policies fails with
-- "permission denied for function has_role" -- breaking every public read
-- (blog list, testimonials, people, media, case studies, etc.) that shares a
-- table with one of these admin-only policies.
--
-- This restores the original "TO authenticated" scoping so these policies
-- are only evaluated for signed-in requests again, while keeping the
-- private.has_role() reference introduced in 20260715101050.

DROP POLICY IF EXISTS "Users see own roles" ON public.user_roles;
CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "admin write people" ON public.people;
CREATE POLICY "admin write people" ON public.people
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write testimonials" ON public.testimonials;
CREATE POLICY "admin write testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read all posts" ON public.blog_posts;
CREATE POLICY "admin read all posts" ON public.blog_posts
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write posts" ON public.blog_posts;
CREATE POLICY "admin write posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read all cs" ON public.case_studies;
CREATE POLICY "admin read all cs" ON public.case_studies
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write cs" ON public.case_studies;
CREATE POLICY "admin write cs" ON public.case_studies
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write media" ON public.media_recognition;
CREATE POLICY "admin write media" ON public.media_recognition
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read enquiries" ON public.contact_enquiries;
CREATE POLICY "admin read enquiries" ON public.contact_enquiries
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin update enquiries" ON public.contact_enquiries;
CREATE POLICY "admin update enquiries" ON public.contact_enquiries
  FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin delete enquiries" ON public.contact_enquiries;
CREATE POLICY "admin delete enquiries" ON public.contact_enquiries
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin upload content-media" ON storage.objects;
CREATE POLICY "admin upload content-media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin update content-media" ON storage.objects;
CREATE POLICY "admin update content-media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin delete content-media" ON storage.objects;
CREATE POLICY "admin delete content-media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read content-media" ON storage.objects;
CREATE POLICY "admin read content-media" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

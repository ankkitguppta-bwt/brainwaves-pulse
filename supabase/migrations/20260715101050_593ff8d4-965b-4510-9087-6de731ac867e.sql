
-- Move has_role to a private schema not exposed by the Data API
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Recreate policies to reference private.has_role
DROP POLICY IF EXISTS "Users see own roles" ON public.user_roles;
CREATE POLICY "Users see own roles" ON public.user_roles
  FOR SELECT USING ((auth.uid() = user_id) OR private.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "admin write people" ON public.people;
CREATE POLICY "admin write people" ON public.people
  FOR ALL USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write testimonials" ON public.testimonials;
CREATE POLICY "admin write testimonials" ON public.testimonials
  FOR ALL USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read all posts" ON public.blog_posts;
CREATE POLICY "admin read all posts" ON public.blog_posts
  FOR SELECT USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write posts" ON public.blog_posts;
CREATE POLICY "admin write posts" ON public.blog_posts
  FOR ALL USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read all cs" ON public.case_studies;
CREATE POLICY "admin read all cs" ON public.case_studies
  FOR SELECT USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write cs" ON public.case_studies;
CREATE POLICY "admin write cs" ON public.case_studies
  FOR ALL USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin write media" ON public.media_recognition;
CREATE POLICY "admin write media" ON public.media_recognition
  FOR ALL USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read enquiries" ON public.contact_enquiries;
CREATE POLICY "admin read enquiries" ON public.contact_enquiries
  FOR SELECT USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin update enquiries" ON public.contact_enquiries;
CREATE POLICY "admin update enquiries" ON public.contact_enquiries
  FOR UPDATE USING (private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin delete enquiries" ON public.contact_enquiries;
CREATE POLICY "admin delete enquiries" ON public.contact_enquiries
  FOR DELETE USING (private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin upload content-media" ON storage.objects;
CREATE POLICY "admin upload content-media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin update content-media" ON storage.objects;
CREATE POLICY "admin update content-media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role))
  WITH CHECK (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin delete content-media" ON storage.objects;
CREATE POLICY "admin delete content-media" ON storage.objects
  FOR DELETE USING (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

DROP POLICY IF EXISTS "admin read content-media" ON storage.objects;
CREATE POLICY "admin read content-media" ON storage.objects
  FOR SELECT USING (bucket_id = 'content-media' AND private.has_role(auth.uid(),'admin'::app_role));

-- Remove public.has_role so signed-in users can no longer call it via the API
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

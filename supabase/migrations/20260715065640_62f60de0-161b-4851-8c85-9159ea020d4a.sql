
CREATE POLICY "admin upload content-media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'content-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update content-media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'content-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete content-media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'content-media' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin read content-media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'content-media' AND public.has_role(auth.uid(),'admin'));

CREATE TABLE public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE CHECK (
    email = lower(email)
    AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribe_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed'))
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.subscribers TO authenticated;
GRANT ALL ON public.subscribers TO service_role;

CREATE POLICY "admin read subscribers" ON public.subscribers FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.subscribe_newsletter(p_email TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_email TEXT := lower(trim(p_email));
  existing_status TEXT;
BEGIN
  IF normalized_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email address';
  END IF;

  SELECT status INTO existing_status FROM public.subscribers WHERE email = normalized_email FOR UPDATE;
  IF NOT FOUND THEN
    INSERT INTO public.subscribers (email) VALUES (normalized_email);
    RETURN 'subscribed';
  END IF;

  IF existing_status = 'active' THEN
    RETURN 'already_subscribed';
  END IF;

  UPDATE public.subscribers
  SET status = 'active', subscribed_at = now(), unsubscribe_token = gen_random_uuid()
  WHERE email = normalized_email;
  RETURN 'subscribed';
END;
$$;

CREATE OR REPLACE FUNCTION public.unsubscribe_newsletter(p_token UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_status TEXT;
BEGIN
  SELECT status INTO existing_status FROM public.subscribers WHERE unsubscribe_token = p_token FOR UPDATE;
  IF NOT FOUND THEN
    RETURN 'invalid';
  END IF;
  IF existing_status = 'unsubscribed' THEN
    RETURN 'already_unsubscribed';
  END IF;

  UPDATE public.subscribers SET status = 'unsubscribed' WHERE unsubscribe_token = p_token;
  RETURN 'unsubscribed';
END;
$$;

GRANT EXECUTE ON FUNCTION public.subscribe_newsletter(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.unsubscribe_newsletter(UUID) TO anon, authenticated;

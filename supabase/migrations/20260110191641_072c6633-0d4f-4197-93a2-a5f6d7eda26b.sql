-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Allow checking mobile number existence" ON public.profiles;

-- Create a secure function to check if mobile number exists (returns boolean only)
CREATE OR REPLACE FUNCTION public.check_mobile_exists(mobile text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE mobile_number = mobile
  );
$$;

-- Create a secure function to check if username exists (returns boolean only)
CREATE OR REPLACE FUNCTION public.check_username_exists(uname text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE username = uname
  );
$$;

-- Create a secure function to get user profile for login (only returns what's needed)
CREATE OR REPLACE FUNCTION public.get_profile_for_login(mobile text, pwd text)
RETURNS TABLE(id uuid, mobile_number text, preferred_language text, username text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.mobile_number, p.preferred_language, p.username
  FROM public.profiles p
  WHERE p.mobile_number = mobile AND p.password_hash = pwd;
END;
$$;

-- Create a secure function for OTP-based login
CREATE OR REPLACE FUNCTION public.get_profile_by_mobile(mobile text)
RETURNS TABLE(id uuid, mobile_number text, preferred_language text, username text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return profile if there's a verified OTP for this mobile
  IF EXISTS (
    SELECT 1 FROM public.otp_verifications 
    WHERE otp_verifications.mobile_number = mobile 
    AND verified = true 
    AND expires_at > now() - interval '10 minutes'
  ) THEN
    RETURN QUERY
    SELECT p.id, p.mobile_number, p.preferred_language, p.username
    FROM public.profiles p
    WHERE p.mobile_number = mobile;
  END IF;
END;
$$;
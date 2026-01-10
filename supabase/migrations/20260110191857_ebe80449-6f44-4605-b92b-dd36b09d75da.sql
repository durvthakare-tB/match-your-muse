-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Allow profile creation during signup" ON public.profiles;

-- Create a secure function to create profile only after OTP verification
CREATE OR REPLACE FUNCTION public.create_profile_with_otp(
  p_mobile_number text,
  p_username text,
  p_password_hash text,
  p_preferred_language text DEFAULT 'mr'
)
RETURNS TABLE(id uuid, mobile_number text, preferred_language text, username text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_profile_id uuid;
BEGIN
  -- Verify that there's a verified OTP for this mobile number within last 10 minutes
  IF NOT EXISTS (
    SELECT 1 FROM public.otp_verifications 
    WHERE otp_verifications.mobile_number = p_mobile_number 
    AND verified = true 
    AND created_at > now() - interval '10 minutes'
  ) THEN
    RAISE EXCEPTION 'OTP verification required';
  END IF;
  
  -- Check if mobile number already exists
  IF EXISTS (
    SELECT 1 FROM public.profiles WHERE profiles.mobile_number = p_mobile_number
  ) THEN
    RAISE EXCEPTION 'Mobile number already registered';
  END IF;
  
  -- Check if username already exists (if provided)
  IF p_username IS NOT NULL AND p_username != '' THEN
    IF EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.username = p_username
    ) THEN
      RAISE EXCEPTION 'Username already taken';
    END IF;
  END IF;
  
  -- Create the profile
  INSERT INTO public.profiles (mobile_number, username, password_hash, preferred_language)
  VALUES (p_mobile_number, NULLIF(p_username, ''), p_password_hash, p_preferred_language)
  RETURNING profiles.id INTO new_profile_id;
  
  -- Delete used OTP verifications for this mobile
  DELETE FROM public.otp_verifications 
  WHERE otp_verifications.mobile_number = p_mobile_number;
  
  -- Return the new profile
  RETURN QUERY
  SELECT p.id, p.mobile_number, p.preferred_language, p.username
  FROM public.profiles p
  WHERE p.id = new_profile_id;
END;
$$;
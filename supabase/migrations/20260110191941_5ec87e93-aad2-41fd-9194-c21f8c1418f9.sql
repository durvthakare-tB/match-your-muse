-- Drop the overly permissive policies on otp_verifications
DROP POLICY IF EXISTS "Allow OTP verification" ON public.otp_verifications;
DROP POLICY IF EXISTS "Allow OTP update" ON public.otp_verifications;
DROP POLICY IF EXISTS "Allow OTP creation" ON public.otp_verifications;

-- Create a secure function to create OTP (server-side only)
CREATE OR REPLACE FUNCTION public.create_otp(p_mobile_number text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  otp_code text;
BEGIN
  -- Generate 6-digit OTP
  otp_code := LPAD(FLOOR(RANDOM() * 1000000)::text, 6, '0');
  
  -- Delete any existing unverified OTPs for this mobile
  DELETE FROM public.otp_verifications 
  WHERE mobile_number = p_mobile_number AND verified = false;
  
  -- Insert new OTP
  INSERT INTO public.otp_verifications (mobile_number, otp_code, expires_at)
  VALUES (p_mobile_number, otp_code, now() + interval '5 minutes');
  
  -- Return OTP (in production, send via SMS instead of returning)
  RETURN otp_code;
END;
$$;

-- Create a secure function to verify OTP (server-side validation)
CREATE OR REPLACE FUNCTION public.verify_otp(p_mobile_number text, p_otp_code text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  otp_record_id uuid;
BEGIN
  -- Find matching unverified OTP that hasn't expired
  SELECT id INTO otp_record_id
  FROM public.otp_verifications
  WHERE mobile_number = p_mobile_number
    AND otp_code = p_otp_code
    AND verified = false
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF otp_record_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Mark OTP as verified
  UPDATE public.otp_verifications
  SET verified = true
  WHERE id = otp_record_id;
  
  RETURN true;
END;
$$;
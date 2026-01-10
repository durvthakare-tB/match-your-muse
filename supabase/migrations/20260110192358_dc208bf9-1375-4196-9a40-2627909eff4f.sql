-- Add restrictive policy that blocks all direct access
-- All OTP operations are handled through SECURITY DEFINER functions
CREATE POLICY "Block all direct access" ON public.otp_verifications
FOR ALL
TO public
USING (false)
WITH CHECK (false);
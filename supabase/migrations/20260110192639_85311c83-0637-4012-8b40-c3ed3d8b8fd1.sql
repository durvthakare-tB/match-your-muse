-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Block all direct access" ON public.otp_verifications;

-- Create separate policies for each operation that block direct client access
-- but allow SECURITY DEFINER functions to work

-- Block direct SELECT access (SECURITY DEFINER functions bypass RLS)
CREATE POLICY "No direct select" ON public.otp_verifications
FOR SELECT
TO anon, authenticated
USING (false);

-- Block direct INSERT access  
CREATE POLICY "No direct insert" ON public.otp_verifications
FOR INSERT
TO anon, authenticated
WITH CHECK (false);

-- Block direct UPDATE access
CREATE POLICY "No direct update" ON public.otp_verifications
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

-- Block direct DELETE access
CREATE POLICY "No direct delete" ON public.otp_verifications
FOR DELETE
TO anon, authenticated
USING (false);
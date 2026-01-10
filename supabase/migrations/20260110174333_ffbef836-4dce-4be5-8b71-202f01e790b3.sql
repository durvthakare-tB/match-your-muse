-- Create profiles table for storing user data with mobile number
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  mobile_number TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'mr',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Allow profile creation during signup" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

-- Allow checking if mobile number exists (for registration flow)
CREATE POLICY "Allow checking mobile number existence" 
ON public.profiles 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create OTP table for storing verification codes
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mobile_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on OTP table
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Allow inserting OTP records
CREATE POLICY "Allow OTP creation" 
ON public.otp_verifications 
FOR INSERT 
WITH CHECK (true);

-- Allow reading OTP records for verification
CREATE POLICY "Allow OTP verification" 
ON public.otp_verifications 
FOR SELECT 
USING (true);

-- Allow updating OTP records
CREATE POLICY "Allow OTP update" 
ON public.otp_verifications 
FOR UPDATE 
USING (true);

-- Create index for faster mobile number lookups
CREATE INDEX idx_profiles_mobile_number ON public.profiles(mobile_number);
CREATE INDEX idx_otp_mobile_number ON public.otp_verifications(mobile_number);
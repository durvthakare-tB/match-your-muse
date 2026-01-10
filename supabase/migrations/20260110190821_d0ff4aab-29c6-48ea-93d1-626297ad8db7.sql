-- Add username column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN username TEXT;

-- Add unique constraint on username (allowing nulls for existing users)
CREATE UNIQUE INDEX idx_profiles_username ON public.profiles(username) WHERE username IS NOT NULL;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Lock, ArrowRight, KeyRound, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "@/components/LanguageSelector";
import { supabase } from "@/integrations/supabase/client";

type AuthStep = 'mobile' | 'otp' | 'password' | 'set-password' | 'login';

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { isAuthenticated, login, setUser } = useAuth();

  const [step, setStep] = useState<AuthStep>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateMobile = (mobile: string): boolean => {
    return /^[0-9]{10}$/.test(mobile);
  };

  const validateUsername = (name: string): boolean => {
    return name.trim().length >= 3;
  };

  const handleSendOtp = async () => {
    if (!validateMobile(mobileNumber)) {
      toast({
        title: t('error'),
        description: t('invalidMobile'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id, password_hash')
        .eq('mobile_number', mobileNumber)
        .single();

      setIsExistingUser(!!existingUser);

      // Generate OTP (in production, use SMS service)
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);

      // Store OTP in database
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      await supabase.from('otp_verifications').insert({
        mobile_number: mobileNumber,
        otp_code: otpCode,
        expires_at: expiresAt.toISOString(),
      });

      toast({
        title: t('success'),
        description: `${t('otpSent')} (Demo OTP: ${otpCode})`,
      });

      setStep('otp');
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failedToSendOtp'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: t('error'),
        description: t('invalidOtp'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Verify OTP
      const { data: otpRecord } = await supabase
        .from('otp_verifications')
        .select('*')
        .eq('mobile_number', mobileNumber)
        .eq('otp_code', otp)
        .eq('verified', false)
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!otpRecord) {
        toast({
          title: t('error'),
          description: t('invalidOtp'),
          variant: "destructive",
        });
        return;
      }

      // Mark OTP as verified
      await supabase
        .from('otp_verifications')
        .update({ verified: true })
        .eq('id', otpRecord.id);

      toast({
        title: t('success'),
        description: t('otpVerified'),
      });

      if (isExistingUser) {
        // For existing user with OTP login, log them in
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('mobile_number', mobileNumber)
          .single();

        if (profile) {
          setUser({
            id: profile.id,
            mobile_number: profile.mobile_number,
            preferred_language: profile.preferred_language,
            username: profile.username,
          });
          localStorage.setItem('auth_user', JSON.stringify({
            id: profile.id,
            mobile_number: profile.mobile_number,
            preferred_language: profile.preferred_language,
            username: profile.username,
          }));
          navigate('/');
        }
      } else {
        // New user - ask to set password
        setStep('set-password');
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('invalidOtp'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async () => {
    if (!validateUsername(username)) {
      toast({
        title: t('error'),
        description: t('usernameMinLength'),
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('error'),
        description: t('passwordMinLength'),
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwordMismatch'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check again if user exists (race condition prevention)
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('mobile_number', mobileNumber)
        .single();

      if (existingUser) {
        toast({
          title: t('error'),
          description: t('mobileExists'),
          variant: "destructive",
        });
        setStep('mobile');
        return;
      }

      // Check if username already exists
      const { data: existingUsername } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username.trim())
        .single();

      if (existingUsername) {
        toast({
          title: t('error'),
          description: t('usernameExists'),
          variant: "destructive",
        });
        return;
      }

      // Create new user profile
      const { data: newProfile, error } = await supabase
        .from('profiles')
        .insert({
          mobile_number: mobileNumber,
          username: username.trim(),
          password_hash: password, // In production, hash this properly
          preferred_language: localStorage.getItem('preferred_language') || 'mr',
        })
        .select()
        .single();

      if (error) throw error;

      setUser({
        id: newProfile.id,
        mobile_number: newProfile.mobile_number,
        preferred_language: newProfile.preferred_language,
        username: newProfile.username,
      });
      localStorage.setItem('auth_user', JSON.stringify({
        id: newProfile.id,
        mobile_number: newProfile.mobile_number,
        preferred_language: newProfile.preferred_language,
        username: newProfile.username,
      }));

      toast({
        title: t('success'),
        description: t('registrationSuccess'),
      });

      navigate('/');
    } catch (error) {
      toast({
        title: t('error'),
        description: t('registrationFailed'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    if (!password) {
      toast({
        title: t('error'),
        description: t('enterPassword'),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const result = await login(mobileNumber, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      toast({
        title: t('error'),
        description: result.error || t('loginFailed'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md card-shadow">
        <CardHeader className="text-center pb-2">
          <div className="header-gradient w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            {step === 'set-password' ? t('register') : t('login')}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 sm:space-y-6">
          {/* Language Selector */}
          <div className="space-y-2">
            <Label className="text-sm sm:text-base">{t('selectLanguage')}</Label>
            <LanguageSelector variant="standalone" />
          </div>

          {/* Mobile Number Step */}
          {step === 'mobile' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm sm:text-base">{t('mobileNumber')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    placeholder={t('enterMobileNumber')}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10 h-11 sm:h-12 text-base"
                    maxLength={10}
                  />
                </div>
              </div>
              <Button
                className="w-full h-11 sm:h-12 text-base"
                onClick={handleSendOtp}
                disabled={isLoading || mobileNumber.length !== 10}
              >
                {isLoading ? t('loading') : t('sendOtp')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm sm:text-base">{t('enterOtp')}</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-lg tracking-widest h-11 sm:h-12"
                    maxLength={6}
                  />
                </div>
              </div>

              {isExistingUser && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-11 sm:h-12"
                    onClick={() => setStep('login')}
                  >
                    {t('loginWithPassword')}
                  </Button>
                </div>
              )}

              <Button
                className="w-full h-11 sm:h-12 text-base"
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? t('loading') : t('verifyOtp')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="ghost"
                className="w-full h-11 sm:h-12"
                onClick={() => {
                  setStep('mobile');
                  setOtp('');
                }}
              >
                {t('back')}
              </Button>
            </div>
          )}

          {/* Set Password Step (New User) */}
          {step === 'set-password' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm sm:text-base">{t('username')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder={t('enterUsername')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-11 sm:h-12 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('enterPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 sm:h-12 text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">{t('confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder={t('confirmPassword')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-11 sm:h-12 text-base"
                  />
                </div>
              </div>
              <Button
                className="w-full h-11 sm:h-12 text-base"
                onClick={handleSetPassword}
                disabled={isLoading}
              >
                {isLoading ? t('loading') : t('setPassword')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Login Step (Existing User) */}
          {step === 'login' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {t('mobileNumber')}: {mobileNumber}
              </p>
              <div className="space-y-2">
                <Label htmlFor="loginPassword" className="text-sm sm:text-base">{t('password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="loginPassword"
                    type="password"
                    placeholder={t('enterPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 sm:h-12 text-base"
                  />
                </div>
              </div>
              <Button
                className="w-full h-11 sm:h-12 text-base"
                onClick={handlePasswordLogin}
                disabled={isLoading}
              >
                {isLoading ? t('loading') : t('login')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 sm:h-12"
                onClick={() => {
                  setStep('mobile');
                  setPassword('');
                }}
              >
                {t('loginWithOtp')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
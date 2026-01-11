import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  userName?: string;
  location?: string;
}

const Header = ({ 
  userName, 
  location = "Maharashtra",
}: HeaderProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const displayName = userName || user?.username || user?.mobile_number?.slice(-4) || "User";

  return (
    <header className="header-gradient px-4 py-6 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <p className="text-xs text-primary-foreground/70 font-medium tracking-wide">{t('appName')}</p>
          <h1 className="text-2xl font-bold">{t('welcome')}, {displayName}!</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">{location}</p>
        </div>
        <LanguageSelector variant="header" />
      </div>
    </header>
  );
};

export default Header;

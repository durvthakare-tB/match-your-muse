import { Globe } from "lucide-react";

interface HeaderProps {
  userName?: string;
  location?: string;
  language?: string;
}

const Header = ({ 
  userName = "User", 
  location = "Maharashtra",
  language = "मराठी" 
}: HeaderProps) => {
  return (
    <header className="header-gradient px-4 py-6 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">स्वागत आहे, {userName}!</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">{location}</p>
        </div>
        <button className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-2 rounded-full transition-colors">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{language}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

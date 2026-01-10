import { Home, FileText, Scale, Wrench, AlertCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  icon: React.ElementType;
  labelKey: 'dashboard' | 'schemes' | 'legal' | 'services' | 'emergency' | 'profile';
  id: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, labelKey: "dashboard", id: "dashboard", path: "/" },
  { icon: FileText, labelKey: "schemes", id: "schemes", path: "/schemes" },
  { icon: Scale, labelKey: "legal", id: "legal", path: "/legal-help" },
  { icon: Wrench, labelKey: "services", id: "services", path: "/services" },
  { icon: AlertCircle, labelKey: "emergency", id: "emergency", path: "/emergency" },
  { icon: User, labelKey: "profile", id: "profile", path: "/profile" },
];

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleClick = (item: NavItem) => {
    if (onTabChange) {
      onTabChange(item.id);
    } else {
      navigate(item.path);
    }
  };

  const isActive = (item: NavItem) => {
    if (activeTab) return activeTab === item.id;
    return location.pathname === item.path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 safe-area-inset-bottom">
      <div className="container mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors min-w-0",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", active && "stroke-[2.5px]")} />
                <span className="text-[10px] font-medium truncate">{t(item.labelKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

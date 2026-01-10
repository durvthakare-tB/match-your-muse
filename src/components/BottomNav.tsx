import { Home, FileText, Scale, Wrench, AlertCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "डॅशबोर्ड", id: "dashboard", path: "/" },
  { icon: FileText, label: "योजना", id: "schemes", path: "/schemes" },
  { icon: Scale, label: "कायदेशीर मदत", id: "legal", path: "/legal-help" },
  { icon: Wrench, label: "स्थानिक सेवा", id: "services", path: "/services" },
  { icon: AlertCircle, label: "आणीबाणी", id: "emergency", path: "/emergency" },
  { icon: User, label: "प्रोफाइल", id: "profile", path: "/profile" },
];

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

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
                <span className="text-[10px] font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

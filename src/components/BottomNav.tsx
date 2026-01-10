import { Home, FileText, Scale, Wrench, AlertCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "डॅशबोर्ड", id: "dashboard" },
  { icon: FileText, label: "योजना", id: "schemes" },
  { icon: Scale, label: "कायदेशीर मदत", id: "legal" },
  { icon: Wrench, label: "स्थानिक सेवा", id: "services" },
  { icon: AlertCircle, label: "आणीबाणी", id: "emergency" },
  { icon: User, label: "प्रोफाइल", id: "profile" },
];

interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const BottomNav = ({ activeTab = "dashboard", onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-2 safe-area-inset-bottom">
      <div className="container mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors min-w-0",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
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

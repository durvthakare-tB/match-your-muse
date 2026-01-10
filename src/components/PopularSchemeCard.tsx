import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopularSchemeCardProps {
  icon: LucideIcon;
  title: string;
  category: string;
  iconColor?: string;
  onClick?: () => void;
}

const PopularSchemeCard = ({ 
  icon: Icon, 
  title, 
  category, 
  iconColor = "text-primary",
  onClick 
}: PopularSchemeCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 bg-card rounded-lg px-4 py-3 w-full",
        "hover:bg-muted transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
    >
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      <div className="text-left">
        <h4 className="font-semibold text-card-foreground text-sm">{title}</h4>
        <p className="text-muted-foreground text-xs">{category}</p>
      </div>
    </button>
  );
};

export default PopularSchemeCard;

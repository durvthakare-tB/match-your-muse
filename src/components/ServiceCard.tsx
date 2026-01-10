import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type AccentColor = "blue" | "orange" | "green" | "purple" | "red" | "teal" | "pink" | "indigo";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: AccentColor;
  onClick?: () => void;
}

const accentStyles: Record<AccentColor, { border: string; iconBg: string; iconColor: string }> = {
  blue: {
    border: "border-b-service-blue",
    iconBg: "bg-service-blue/10",
    iconColor: "text-service-blue",
  },
  orange: {
    border: "border-b-service-orange",
    iconBg: "bg-service-orange/10",
    iconColor: "text-service-orange",
  },
  green: {
    border: "border-b-service-green",
    iconBg: "bg-service-green/10",
    iconColor: "text-service-green",
  },
  purple: {
    border: "border-b-service-purple",
    iconBg: "bg-service-purple/10",
    iconColor: "text-service-purple",
  },
  red: {
    border: "border-b-service-red",
    iconBg: "bg-service-red/10",
    iconColor: "text-service-red",
  },
  teal: {
    border: "border-b-service-teal",
    iconBg: "bg-service-teal/10",
    iconColor: "text-service-teal",
  },
  pink: {
    border: "border-b-service-pink",
    iconBg: "bg-service-pink/10",
    iconColor: "text-service-pink",
  },
  indigo: {
    border: "border-b-service-indigo",
    iconBg: "bg-service-indigo/10",
    iconColor: "text-service-indigo",
  },
};

const ServiceCard = ({ icon: Icon, title, description, accentColor, onClick }: ServiceCardProps) => {
  const styles = accentStyles[accentColor];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full bg-card rounded-lg p-5 text-left card-shadow card-hover",
        "border-b-4",
        styles.border,
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      )}
    >
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4", styles.iconBg)}>
        <Icon className={cn("w-6 h-6", styles.iconColor)} />
      </div>
      <h3 className="font-semibold text-card-foreground text-base">{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </button>
  );
};

export default ServiceCard;

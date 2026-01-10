import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={cn("header-gradient px-4 py-6 text-primary-foreground", className)}>
      <div className="container mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">मागे जा</span>
        </button>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="text-primary-foreground/80 text-sm mt-1">{subtitle}</p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;

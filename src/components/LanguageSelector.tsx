import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/i18n/translations";

interface LanguageSelectorProps {
  variant?: 'header' | 'standalone';
}

const LanguageSelector = ({ variant = 'header' }: LanguageSelectorProps) => {
  const { language, setLanguage, languageNames } = useLanguage();

  if (variant === 'header') {
    return (
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-2 rounded-full border-0 text-primary-foreground w-auto">
          <Globe className="w-4 h-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger className="w-full">
        <Globe className="w-4 h-4 mr-2" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(languageNames) as Language[]).map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageNames[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;

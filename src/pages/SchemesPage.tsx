import { useState } from "react";
import { Search, Filter, ChevronRight, Home, Heart, GraduationCap, Tractor } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const SchemesPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", labelKey: "all" as const },
    { id: "agriculture", labelKey: "agriculture" as const },
    { id: "health", labelKey: "health" as const },
    { id: "education", labelKey: "education" as const },
    { id: "housing", labelKey: "housing" as const },
  ];

  const schemes = [
    {
      id: 1,
      title: "PM-KISAN",
      descriptionKey: "pmKisanDesc" as const,
      category: "agriculture",
      icon: Tractor,
      iconColor: "text-service-blue",
      bgColor: "bg-service-blue/10",
    },
    {
      id: 2,
      title: "MJPJAY",
      descriptionKey: "mjpjayDesc" as const,
      category: "health",
      icon: Heart,
      iconColor: "text-service-red",
      bgColor: "bg-service-red/10",
    },
    {
      id: 3,
      title: "Sukanya Samriddhi",
      descriptionKey: "sukanyaDesc" as const,
      category: "education",
      icon: GraduationCap,
      iconColor: "text-service-purple",
      bgColor: "bg-service-purple/10",
    },
    {
      id: 4,
      title: "PMAY-G",
      descriptionKey: "pmayDesc" as const,
      category: "housing",
      icon: Home,
      iconColor: "text-service-green",
      bgColor: "bg-service-green/10",
    },
    {
      id: 5,
      title: "Ayushman Bharat",
      descriptionKey: "ayushmanDesc" as const,
      category: "health",
      icon: Heart,
      iconColor: "text-service-red",
      bgColor: "bg-service-red/10",
    },
    {
      id: 6,
      title: "Farm Loan Waiver",
      descriptionKey: "farmLoanDesc" as const,
      category: "agriculture",
      icon: Tractor,
      iconColor: "text-service-blue",
      bgColor: "bg-service-blue/10",
    },
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t(scheme.descriptionKey).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={t('schemesTitle')} subtitle={t('schemesSubtitle')} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchSchemes')}
            className="w-full bg-card rounded-xl pl-12 pr-12 py-3 text-sm card-shadow focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {t(category.labelKey)}
            </button>
          ))}
        </div>

        {/* Schemes List */}
        <div className="space-y-3">
          {filteredSchemes.map((scheme) => (
            <button
              key={scheme.id}
              className="w-full bg-card rounded-xl p-4 card-shadow card-hover flex items-center gap-4 text-left"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${scheme.bgColor}`}>
                <scheme.icon className={`w-6 h-6 ${scheme.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{scheme.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{t(scheme.descriptionKey)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('noSchemesFound')}</p>
          </div>
        )}
      </main>

      <BottomNav activeTab="schemes" />
    </div>
  );
};

export default SchemesPage;

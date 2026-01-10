import { useState } from "react";
import { Search, Filter, ChevronRight, Home, Heart, GraduationCap, Tractor } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

const categories = [
  { id: "all", label: "सर्व" },
  { id: "agriculture", label: "शेती" },
  { id: "health", label: "आरोग्य" },
  { id: "education", label: "शिक्षण" },
  { id: "housing", label: "घरकुल" },
];

const schemes = [
  {
    id: 1,
    title: "PM-KISAN",
    description: "शेतकऱ्यांना वार्षिक ₹6,000 थेट मदत",
    category: "agriculture",
    icon: Tractor,
    iconColor: "text-service-blue",
    bgColor: "bg-service-blue/10",
  },
  {
    id: 2,
    title: "MJPJAY",
    description: "महात्मा ज्योतिबा फुले जन आरोग्य योजना",
    category: "health",
    icon: Heart,
    iconColor: "text-service-red",
    bgColor: "bg-service-red/10",
  },
  {
    id: 3,
    title: "सुकन्या समृद्धी योजना",
    description: "मुलींच्या शिक्षणासाठी बचत योजना",
    category: "education",
    icon: GraduationCap,
    iconColor: "text-service-purple",
    bgColor: "bg-service-purple/10",
  },
  {
    id: 4,
    title: "PMAY-G",
    description: "प्रधानमंत्री आवास योजना - ग्रामीण",
    category: "housing",
    icon: Home,
    iconColor: "text-service-green",
    bgColor: "bg-service-green/10",
  },
  {
    id: 5,
    title: "आयुष्मान भारत",
    description: "₹5 लाख पर्यंत मोफत उपचार",
    category: "health",
    icon: Heart,
    iconColor: "text-service-red",
    bgColor: "bg-service-red/10",
  },
  {
    id: 6,
    title: "शेतकरी कर्जमाफी",
    description: "महाराष्ट्र राज्य कर्जमाफी योजना",
    category: "agriculture",
    icon: Tractor,
    iconColor: "text-service-blue",
    bgColor: "bg-service-blue/10",
  },
];

const SchemesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || scheme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="सरकारी योजना" subtitle="तुमच्यासाठी उपलब्ध योजना शोधा" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="योजना शोधा..."
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
              {category.label}
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
                <p className="text-sm text-muted-foreground truncate">{scheme.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">कोणतीही योजना सापडली नाही</p>
          </div>
        )}
      </main>

      <BottomNav activeTab="schemes" />
    </div>
  );
};

export default SchemesPage;

import { useNavigate } from "react-router-dom";
import { 
  MessageCircle, 
  Mic, 
  FileText, 
  Wrench, 
  Scale, 
  ClipboardList, 
  AlertCircle, 
  User,
  Home,
  Heart,
  GraduationCap
} from "lucide-react";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import PopularSchemeCard from "@/components/PopularSchemeCard";
import BottomNav from "@/components/BottomNav";

const services = [
  {
    icon: MessageCircle,
    title: "चॅटबॉट",
    description: "AI चॅटबॉट सह बोला",
    accentColor: "blue" as const,
    path: "/chatbot",
  },
  {
    icon: Mic,
    title: "व्हॉइस सहाय्यक",
    description: "आवाज सहाय्यक",
    accentColor: "orange" as const,
    path: "/voice",
  },
  {
    icon: FileText,
    title: "योजना",
    description: "सरकारी योजना शोधा",
    accentColor: "green" as const,
    path: "/schemes",
  },
  {
    icon: Wrench,
    title: "स्थानिक सेवा",
    description: "स्थानिक सेवा प्रदाते",
    accentColor: "purple" as const,
    path: "/services",
  },
  {
    icon: Scale,
    title: "कायदेशीर मदत",
    description: "कायदेशीर हक्क आणि मदत",
    accentColor: "teal" as const,
    path: "/legal-help",
  },
  {
    icon: ClipboardList,
    title: "माझे अर्ज",
    description: "आपल्या अर्जाची स्थिती",
    accentColor: "indigo" as const,
    path: "/applications",
  },
  {
    icon: AlertCircle,
    title: "आणीबाणी सेवा",
    description: "आणीबाणी सेवा",
    accentColor: "red" as const,
    path: "/emergency",
  },
  {
    icon: User,
    title: "प्रोफाइल",
    description: "प्रोफाइल व्यवस्थापित करा",
    accentColor: "pink" as const,
    path: "/profile",
  },
];

const popularSchemes = [
  {
    icon: Home,
    title: "PM-KISAN",
    category: "शेतकरी",
    iconColor: "text-service-blue",
  },
  {
    icon: Heart,
    title: "MJPJAY",
    category: "आरोग्य",
    iconColor: "text-service-red",
  },
  {
    icon: GraduationCap,
    title: "सुकन्या समृद्धी",
    category: "शिक्षण",
    iconColor: "text-service-purple",
  },
  {
    icon: Home,
    title: "PMAY-G",
    category: "घरकुल",
    iconColor: "text-service-green",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleNavChange = (tabId: string) => {
    const routes: Record<string, string> = {
      dashboard: "/",
      schemes: "/schemes",
      legal: "/legal-help",
      services: "/services",
      emergency: "/emergency",
      profile: "/profile",
    };
    navigate(routes[tabId] || "/");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      {/* Services Grid */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              accentColor={service.accentColor}
              onClick={() => navigate(service.path)}
            />
          ))}
        </div>

        {/* Popular Schemes Section */}
        <section className="mt-8">
          <div className="bg-card rounded-xl p-5 card-shadow">
            <div className="popular-gradient h-2 rounded-full mb-6" />
            
            <h2 className="text-lg font-semibold text-card-foreground mb-4">
              लोकप्रिय योजना
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularSchemes.map((scheme) => (
                <PopularSchemeCard
                  key={scheme.title}
                  icon={scheme.icon}
                  title={scheme.title}
                  category={scheme.category}
                  iconColor={scheme.iconColor}
                  onClick={() => navigate("/schemes")}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomNav activeTab="dashboard" onTabChange={handleNavChange} />
    </div>
  );
};

export default Index;

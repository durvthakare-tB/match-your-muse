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
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      icon: MessageCircle,
      title: t('chatbot'),
      description: t('chatbotDesc'),
      accentColor: "blue" as const,
      path: "/chatbot",
    },
    {
      icon: Mic,
      title: t('voiceAssistant'),
      description: t('voiceAssistantDesc'),
      accentColor: "orange" as const,
      path: "/voice",
    },
    {
      icon: FileText,
      title: t('schemes'),
      description: t('schemesDesc'),
      accentColor: "green" as const,
      path: "/schemes",
    },
    {
      icon: Wrench,
      title: t('localServices'),
      description: t('localServicesDesc'),
      accentColor: "purple" as const,
      path: "/services",
    },
    {
      icon: Scale,
      title: t('legalHelp'),
      description: t('legalHelpDesc'),
      accentColor: "teal" as const,
      path: "/legal-help",
    },
    {
      icon: ClipboardList,
      title: t('myApplications'),
      description: t('myApplicationsDesc'),
      accentColor: "indigo" as const,
      path: "/applications",
    },
    {
      icon: AlertCircle,
      title: t('emergency'),
      description: t('emergencyDesc'),
      accentColor: "red" as const,
      path: "/emergency",
    },
    {
      icon: User,
      title: t('profile'),
      description: t('profileDesc'),
      accentColor: "pink" as const,
      path: "/profile",
    },
  ];

  const popularSchemes = [
    {
      icon: Home,
      title: "PM-KISAN",
      category: t('farmer'),
      iconColor: "text-service-blue",
    },
    {
      icon: Heart,
      title: "MJPJAY",
      category: t('health'),
      iconColor: "text-service-red",
    },
    {
      icon: GraduationCap,
      title: "सुकन्या समृद्धी",
      category: t('education'),
      iconColor: "text-service-purple",
    },
    {
      icon: Home,
      title: "PMAY-G",
      category: t('housing'),
      iconColor: "text-service-green",
    },
  ];

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
              key={service.path}
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
              {t('popularSchemes')}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularSchemes.map((scheme, index) => (
                <PopularSchemeCard
                  key={index}
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

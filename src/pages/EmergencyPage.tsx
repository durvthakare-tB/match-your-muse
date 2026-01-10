import { Phone, Ambulance, Flame, Shield, AlertTriangle, Heart } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const EmergencyPage = () => {
  const { t } = useLanguage();

  const emergencyNumbers = [
    {
      id: 1,
      name: t('police'),
      number: "100",
      icon: Shield,
      color: "bg-service-blue",
      description: t('policeDesc'),
    },
    {
      id: 2,
      name: t('ambulance'),
      number: "108",
      icon: Ambulance,
      color: "bg-service-red",
      description: t('ambulanceDesc'),
    },
    {
      id: 3,
      name: t('fire'),
      number: "101",
      icon: Flame,
      color: "bg-service-orange",
      description: t('fireDesc'),
    },
    {
      id: 4,
      name: t('womenHelpline'),
      number: "181",
      icon: Heart,
      color: "bg-service-pink",
      description: t('womenHelplineDesc'),
    },
    {
      id: 5,
      name: t('disasterManagement'),
      number: "1077",
      icon: AlertTriangle,
      color: "bg-service-purple",
      description: t('disasterManagementDesc'),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={t('emergencyTitle')} subtitle={t('emergencySubtitle')} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Emergency Alert */}
        <div className="bg-service-red/10 border border-service-red/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-service-red flex-shrink-0" />
            <div>
              <p className="font-medium text-service-red">{t('inEmergency')}</p>
              <p className="text-sm text-service-red/80">{t('stayCalm')}</p>
            </div>
          </div>
        </div>

        {/* Emergency Numbers Grid */}
        <div className="space-y-4">
          {emergencyNumbers.map((emergency) => (
            <a
              key={emergency.id}
              href={`tel:${emergency.number}`}
              className="block bg-card rounded-xl p-5 card-shadow card-hover"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${emergency.color} rounded-2xl flex items-center justify-center`}>
                  <emergency.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg">{emergency.name}</h3>
                  <p className="text-sm text-muted-foreground">{emergency.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{emergency.number}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{t('tap')}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Location Notice */}
        <div className="mt-6 bg-muted rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t('shareLocation')}
          </p>
        </div>
      </main>

      <BottomNav activeTab="emergency" />
    </div>
  );
};

export default EmergencyPage;

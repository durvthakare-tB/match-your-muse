import { MapPin, Phone, Star } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const LocalServicesPage = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 1,
      nameKey: "sunilElectricals" as const,
      categoryKey: "electrician" as const,
      rating: 4.8,
      distance: 0.5,
      phone: "+91 98765 43210",
      available: true,
    },
    {
      id: 2,
      nameKey: "rajuPlumber" as const,
      categoryKey: "plumber" as const,
      rating: 4.5,
      distance: 1.2,
      phone: "+91 87654 32109",
      available: true,
    },
    {
      id: 3,
      nameKey: "patilCarpenter" as const,
      categoryKey: "carpenter" as const,
      rating: 4.7,
      distance: 2.0,
      phone: "+91 76543 21098",
      available: false,
    },
    {
      id: 4,
      nameKey: "sharmaPainter" as const,
      categoryKey: "painter" as const,
      rating: 4.6,
      distance: 1.8,
      phone: "+91 65432 10987",
      available: true,
    },
    {
      id: 5,
      nameKey: "deshmukAcService" as const,
      categoryKey: "acRepair" as const,
      rating: 4.9,
      distance: 3.0,
      phone: "+91 54321 09876",
      available: true,
    },
  ];

  const categoryKeys = ["all", "electrician", "plumber", "carpenter", "painter", "acRepair"] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={t('localServicesTitle')} subtitle={t('localServicesSubtitle')} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categoryKeys.map((key, index) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {key === "all" ? t('all') : t(key)}
            </button>
          ))}
        </div>

        {/* Services List */}
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-card rounded-xl p-4 card-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{t(service.nameKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(service.categoryKey)}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.available 
                    ? "bg-service-green/10 text-service-green" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {service.available ? t('available') : t('busy')}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-service-orange fill-service-orange" />
                  <span>{service.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{service.distance} {t('km')}</span>
                </div>
              </div>

              <a
                href={`tel:${service.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{t('call')}</span>
              </a>
            </div>
          ))}
        </div>
      </main>

      <BottomNav activeTab="services" />
    </div>
  );
};

export default LocalServicesPage;

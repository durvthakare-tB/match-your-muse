import { ClipboardList, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

type ApplicationStatus = "pending" | "approved" | "rejected" | "processing";

const ApplicationsPage = () => {
  const { t } = useLanguage();

  const applications = [
    {
      id: "APP001",
      scheme: "PM-KISAN",
      date: "15 Dec 2025",
      status: "approved" as ApplicationStatus,
      messageKey: "approvedMsg" as const,
    },
    {
      id: "APP002",
      scheme: "PMAY-G",
      date: "10 Dec 2025",
      status: "processing" as ApplicationStatus,
      messageKey: "processingMsg" as const,
    },
    {
      id: "APP003",
      scheme: "Sukanya Samriddhi",
      date: "5 Dec 2025",
      status: "pending" as ApplicationStatus,
      messageKey: "pendingMsg" as const,
    },
    {
      id: "APP004",
      scheme: "Ayushman Bharat",
      date: "1 Dec 2025",
      status: "rejected" as ApplicationStatus,
      messageKey: "rejectedMsg" as const,
    },
  ];

  const statusConfig: Record<ApplicationStatus, { icon: typeof CheckCircle; color: string; bgColor: string; labelKey: "approved" | "pending" | "processing" | "rejected" }> = {
    approved: {
      icon: CheckCircle,
      color: "text-service-green",
      bgColor: "bg-service-green/10",
      labelKey: "approved",
    },
    pending: {
      icon: Clock,
      color: "text-service-orange",
      bgColor: "bg-service-orange/10",
      labelKey: "pending",
    },
    processing: {
      icon: AlertCircle,
      color: "text-service-blue",
      bgColor: "bg-service-blue/10",
      labelKey: "processing",
    },
    rejected: {
      icon: XCircle,
      color: "text-service-red",
      bgColor: "bg-service-red/10",
      labelKey: "rejected",
    },
  };

  const stats = [
    { labelKey: "total" as const, count: 4, color: "bg-primary" },
    { labelKey: "approved" as const, count: 1, color: "bg-service-green" },
    { labelKey: "processing" as const, count: 2, color: "bg-service-blue" },
    { labelKey: "rejected" as const, count: 1, color: "bg-service-red" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={t('applicationsTitle')} subtitle={t('applicationsSubtitle')} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="bg-card rounded-xl p-4 card-shadow text-center">
              <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold`}>
                {stat.count}
              </div>
              <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-3">
          {applications.map((app) => {
            const status = statusConfig[app.status];
            const StatusIcon = status.icon;
            
            return (
              <div key={app.id} className="bg-card rounded-xl p-4 card-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{app.scheme}</h3>
                    <p className="text-xs text-muted-foreground">#{app.id} • {app.date}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span>{t(status.labelKey)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{t(app.messageKey)}</p>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ApplicationsPage;

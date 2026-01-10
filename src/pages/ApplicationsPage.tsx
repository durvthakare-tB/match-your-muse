import { ClipboardList, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

type ApplicationStatus = "pending" | "approved" | "rejected" | "processing";

interface Application {
  id: string;
  scheme: string;
  date: string;
  status: ApplicationStatus;
  message: string;
}

const applications: Application[] = [
  {
    id: "APP001",
    scheme: "PM-KISAN",
    date: "15 डिसेंबर 2025",
    status: "approved",
    message: "अर्ज मंजूर झाला. पुढील हप्ता लवकरच जमा होईल.",
  },
  {
    id: "APP002",
    scheme: "PMAY-G",
    date: "10 डिसेंबर 2025",
    status: "processing",
    message: "कागदपत्रांची पडताळणी सुरू आहे.",
  },
  {
    id: "APP003",
    scheme: "सुकन्या समृद्धी",
    date: "5 डिसेंबर 2025",
    status: "pending",
    message: "अर्ज प्राप्त झाला. पुनरावलोकन प्रलंबित.",
  },
  {
    id: "APP004",
    scheme: "आयुष्मान भारत",
    date: "1 डिसेंबर 2025",
    status: "rejected",
    message: "पात्रता निकष पूर्ण नाहीत. कृपया पुन्हा अर्ज करा.",
  },
];

const statusConfig: Record<ApplicationStatus, { icon: typeof CheckCircle; color: string; bgColor: string; label: string }> = {
  approved: {
    icon: CheckCircle,
    color: "text-service-green",
    bgColor: "bg-service-green/10",
    label: "मंजूर",
  },
  pending: {
    icon: Clock,
    color: "text-service-orange",
    bgColor: "bg-service-orange/10",
    label: "प्रलंबित",
  },
  processing: {
    icon: AlertCircle,
    color: "text-service-blue",
    bgColor: "bg-service-blue/10",
    label: "प्रक्रियेत",
  },
  rejected: {
    icon: XCircle,
    color: "text-service-red",
    bgColor: "bg-service-red/10",
    label: "नाकारला",
  },
};

const ApplicationsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="माझे अर्ज" subtitle="अर्जांची स्थिती पहा" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "एकूण", count: 4, color: "bg-primary" },
            { label: "मंजूर", count: 1, color: "bg-service-green" },
            { label: "प्रक्रियेत", count: 2, color: "bg-service-blue" },
            { label: "नाकारले", count: 1, color: "bg-service-red" },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-4 card-shadow text-center">
              <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold`}>
                {stat.count}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
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
                    <span>{status.label}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{app.message}</p>
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

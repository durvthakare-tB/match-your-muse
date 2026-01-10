import { Phone, Ambulance, Flame, Shield, AlertTriangle, Heart } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

const emergencyNumbers = [
  {
    id: 1,
    name: "पोलीस",
    number: "100",
    icon: Shield,
    color: "bg-service-blue",
    description: "गुन्हे, चोरी, अपघात",
  },
  {
    id: 2,
    name: "रुग्णवाहिका",
    number: "108",
    icon: Ambulance,
    color: "bg-service-red",
    description: "वैद्यकीय आणीबाणी",
  },
  {
    id: 3,
    name: "अग्निशमन",
    number: "101",
    icon: Flame,
    color: "bg-service-orange",
    description: "आग, बचाव कार्य",
  },
  {
    id: 4,
    name: "महिला हेल्पलाइन",
    number: "181",
    icon: Heart,
    color: "bg-service-pink",
    description: "महिला सुरक्षा",
  },
  {
    id: 5,
    name: "आपत्ती व्यवस्थापन",
    number: "1077",
    icon: AlertTriangle,
    color: "bg-service-purple",
    description: "नैसर्गिक आपत्ती",
  },
];

const EmergencyPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="आणीबाणी सेवा" subtitle="तात्काळ मदतीसाठी कॉल करा" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Emergency Alert */}
        <div className="bg-service-red/10 border border-service-red/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-service-red flex-shrink-0" />
            <div>
              <p className="font-medium text-service-red">आणीबाणीच्या परिस्थितीत</p>
              <p className="text-sm text-service-red/80">शांत राहा आणि योग्य नंबरवर कॉल करा</p>
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
                    <span>टॅप करा</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Location Notice */}
        <div className="mt-6 bg-muted rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            कॉल करताना आपले स्थान सांगा जेणेकरून मदत लवकर पोहोचू शकेल
          </p>
        </div>
      </main>

      <BottomNav activeTab="emergency" />
    </div>
  );
};

export default EmergencyPage;

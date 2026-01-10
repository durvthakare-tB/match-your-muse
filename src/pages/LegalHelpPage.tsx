import { Scale, FileText, Phone, ChevronRight, Shield, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

const legalTopics = [
  {
    id: 1,
    title: "कामगार हक्क",
    description: "वेतन, कामाचे तास, सुट्ट्या आणि इतर हक्क",
    icon: Users,
    iconColor: "text-service-blue",
    bgColor: "bg-service-blue/10",
  },
  {
    id: 2,
    title: "महिला सुरक्षा",
    description: "कायदेशीर संरक्षण आणि तक्रार प्रक्रिया",
    icon: Shield,
    iconColor: "text-service-pink",
    bgColor: "bg-service-pink/10",
  },
  {
    id: 3,
    title: "जमीन विवाद",
    description: "मालमत्ता हक्क आणि कायदेशीर प्रक्रिया",
    icon: FileText,
    iconColor: "text-service-green",
    bgColor: "bg-service-green/10",
  },
  {
    id: 4,
    title: "ग्राहक संरक्षण",
    description: "ग्राहक हक्क आणि तक्रार निवारण",
    icon: Scale,
    iconColor: "text-service-purple",
    bgColor: "bg-service-purple/10",
  },
];

const helplines = [
  { name: "महिला हेल्पलाइन", number: "181", available: "24/7" },
  { name: "कायदेशीर सेवा प्राधिकरण", number: "15100", available: "24/7" },
  { name: "ग्राहक तक्रार", number: "1800-11-4000", available: "सोम-शुक्र" },
];

const LegalHelpPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="कायदेशीर मदत" subtitle="तुमचे हक्क जाणून घ्या" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Legal Topics */}
        <div className="space-y-3 mb-8">
          {legalTopics.map((topic) => (
            <button
              key={topic.id}
              className="w-full bg-card rounded-xl p-4 card-shadow card-hover flex items-center gap-4 text-left"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${topic.bgColor}`}>
                <topic.icon className={`w-6 h-6 ${topic.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Helplines */}
        <div className="bg-card rounded-xl p-5 card-shadow">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            हेल्पलाइन नंबर
          </h2>
          
          <div className="space-y-3">
            {helplines.map((helpline) => (
              <div
                key={helpline.number}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{helpline.name}</p>
                  <p className="text-xs text-muted-foreground">{helpline.available}</p>
                </div>
                <a
                  href={`tel:${helpline.number}`}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  {helpline.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav activeTab="legal" />
    </div>
  );
};

export default LegalHelpPage;

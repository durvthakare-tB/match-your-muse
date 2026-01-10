import { MapPin, Phone, Star, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

const services = [
  {
    id: 1,
    name: "सुनील इलेक्ट्रिकल्स",
    category: "इलेक्ट्रिशियन",
    rating: 4.8,
    distance: "0.5 किमी",
    phone: "+91 98765 43210",
    available: true,
  },
  {
    id: 2,
    name: "राजू प्लंबर",
    category: "प्लंबर",
    rating: 4.5,
    distance: "1.2 किमी",
    phone: "+91 87654 32109",
    available: true,
  },
  {
    id: 3,
    name: "पाटील कारपेंटर",
    category: "सुतार",
    rating: 4.7,
    distance: "2.0 किमी",
    phone: "+91 76543 21098",
    available: false,
  },
  {
    id: 4,
    name: "शर्मा पेंटर",
    category: "पेंटर",
    rating: 4.6,
    distance: "1.8 किमी",
    phone: "+91 65432 10987",
    available: true,
  },
  {
    id: 5,
    name: "देशमुख AC सर्विस",
    category: "AC दुरुस्ती",
    rating: 4.9,
    distance: "3.0 किमी",
    phone: "+91 54321 09876",
    available: true,
  },
];

const LocalServicesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="स्थानिक सेवा" subtitle="तुमच्या जवळचे सेवा प्रदाते" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {["सर्व", "इलेक्ट्रिशियन", "प्लंबर", "सुतार", "पेंटर", "AC दुरुस्ती"].map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-card text-muted-foreground hover:bg-muted transition-colors first:bg-primary first:text-primary-foreground"
            >
              {cat}
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
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.category}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.available 
                    ? "bg-service-green/10 text-service-green" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {service.available ? "उपलब्ध" : "व्यस्त"}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-service-orange fill-service-orange" />
                  <span>{service.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{service.distance}</span>
                </div>
              </div>

              <a
                href={`tel:${service.phone}`}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-lg py-3 font-medium hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>कॉल करा</span>
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

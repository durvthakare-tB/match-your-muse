import { User, Phone, MapPin, FileText, Settings, LogOut, ChevronRight, Edit2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

const profileData = {
  name: "राजेश पाटील",
  phone: "+91 98765 43210",
  location: "पुणे, महाराष्ट्र",
  aadhaar: "XXXX XXXX 4567",
  email: "rajesh.patil@email.com",
};

const menuItems = [
  { icon: FileText, label: "माझी कागदपत्रे", sublabel: "आधार, पॅन, इतर" },
  { icon: MapPin, label: "पत्ता बदला", sublabel: "सध्याचा पत्ता अपडेट करा" },
  { icon: Settings, label: "सेटिंग्स", sublabel: "भाषा, सूचना" },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="प्रोफाइल" subtitle="तुमची माहिती व्यवस्थापित करा" />
      
      <main className="container mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-card rounded-xl p-6 card-shadow mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{profileData.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {profileData.phone}
              </p>
            </div>
            <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors">
              <Edit2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">स्थान</span>
              <span className="text-sm font-medium text-foreground">{profileData.location}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">आधार</span>
              <span className="text-sm font-medium text-foreground">{profileData.aadhaar}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">ईमेल</span>
              <span className="text-sm font-medium text-foreground">{profileData.email}</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-xl card-shadow overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors text-left ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sublabel}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-service-red/10 text-service-red rounded-xl py-4 font-medium hover:bg-service-red/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>लॉग आउट</span>
        </button>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
};

export default ProfilePage;

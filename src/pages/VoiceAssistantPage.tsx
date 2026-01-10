import { useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const VoiceAssistantPage = () => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript(t('listening'));
    } else {
      setTranscript("");
    }
  };

  const exampleCommands = [
    t('whatIsPmKisan'),
    t('findNearbyHospital'),
    t('myApplicationStatus'),
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={t('voiceAssistantTitle')} subtitle={t('voiceAssistantSubtitle')} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-xl card-shadow p-8 text-center">
          {/* Voice Animation Area */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div
              className={`absolute inset-0 rounded-full bg-service-orange/20 ${
                isListening ? "animate-pulse" : ""
              }`}
            />
            <div
              className={`absolute inset-4 rounded-full bg-service-orange/30 ${
                isListening ? "animate-pulse delay-75" : ""
              }`}
            />
            <button
              onClick={toggleListening}
              className={`absolute inset-8 rounded-full flex items-center justify-center transition-colors ${
                isListening
                  ? "bg-service-red text-white"
                  : "bg-service-orange text-white"
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </button>
          </div>

          <p className="text-lg font-medium text-foreground mb-2">
            {isListening ? t('listening') : t('pressToSpeak')}
          </p>
          
          {transcript && (
            <div className="bg-muted rounded-lg p-4 mt-6 text-left">
              <p className="text-sm text-muted-foreground mb-1">{t('youSaid')}</p>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}

          {/* Quick Commands */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">
              {t('exampleCommands')}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {exampleCommands.map((command) => (
                <div
                  key={command}
                  className="flex items-center gap-2 bg-muted px-3 py-2 rounded-full text-sm"
                >
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <span>{command}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default VoiceAssistantPage;

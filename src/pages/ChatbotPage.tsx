import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "नमस्कार! मी तुमचा AI सहाय्यक आहे. मी तुम्हाला सरकारी योजना, सेवा आणि अर्ज प्रक्रियेबद्दल माहिती देऊ शकतो. तुम्हाला कशाबद्दल जाणून घ्यायचे आहे?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "धन्यवाद! मी तुमच्या प्रश्नावर काम करत आहे. कृपया थोडी प्रतीक्षा करा...",
        isBot: true,
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="AI चॅटबॉट" subtitle="तुमच्या प्रश्नांची उत्तरे मिळवा" />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-xl card-shadow overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isBot ? "" : "flex-row-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? "bg-service-blue/10" : "bg-service-green/10"
                  }`}
                >
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-service-blue" />
                  ) : (
                    <User className="w-4 h-4 text-service-green" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.isBot
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="तुमचा प्रश्न टाइप करा..."
                className="flex-1 bg-muted rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSend}
                className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ChatbotPage;

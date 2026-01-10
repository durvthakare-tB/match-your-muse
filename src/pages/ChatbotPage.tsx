import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAIChat } from "@/hooks/useAIChat";

const ChatbotPage = () => {
  const { t, language } = useLanguage();
  const { messages, isLoading, sendMessage } = useAIChat(language);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title={t('chatbotTitle')} subtitle={t('chatbotSubtitle')} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="bg-card rounded-xl card-shadow overflow-hidden">
          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-service-blue/10">
                  <Bot className="w-4 h-4 text-service-blue" />
                </div>
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted text-foreground">
                  <p className="text-sm">{t('chatbotWelcome')}</p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant" ? "bg-service-blue/10" : "bg-service-green/10"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-service-blue" />
                  ) : (
                    <User className="w-4 h-4 text-service-green" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-service-blue/10">
                  <Bot className="w-4 h-4 text-service-blue" />
                </div>
                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted text-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder={t('typeYourQuestion')}
                disabled={isLoading}
                className="flex-1 bg-muted rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
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

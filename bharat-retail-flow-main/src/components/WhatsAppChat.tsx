import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Phone, Video, MoreVertical, ArrowLeft, Package, AlertTriangle, TrendingUp, MapPin } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  type?: "text" | "alert" | "action";
  data?: any;
}

interface WhatsAppChatProps {
  onBack: () => void;
}

const WhatsAppChat = ({ onBack }: WhatsAppChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! Welcome to Bharat AI Store. I'm your digital assistant. How can I help you today?",
      sender: "bot",
      timestamp: "09:30",
      type: "text"
    },
    {
      id: "2",
      text: "📦 Stock Alert: Maggi Noodles (2 packets left)\n🔥 Trending: Increase demand detected (+25%)\n💡 Suggestion: Reorder 50 packets",
      sender: "bot",
      timestamp: "09:31",
      type: "alert",
      data: { product: "Maggi Noodles", stock: 2, trend: "+25%" }
    }
  ]);
  
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { text: "Check inventory", icon: Package },
    { text: "Stock alerts", icon: AlertTriangle },
    { text: "Sales trends", icon: TrendingUp },
    { text: "Delivery status", icon: MapPin }
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    if (input.includes("inventory") || input.includes("stock")) {
      return {
        id: Date.now().toString(),
        text: "📋 Current Inventory Status:\n\n✅ Maggi Noodles: 2 packets (Low Stock!)\n✅ Parle-G Biscuits: 45 packets\n✅ Tata Tea: 23 packets\n✅ Amul Milk: 15 packets\n\n🔴 Action Required: Maggi Noodles below threshold",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "action",
        data: { type: "inventory" }
      };
    } else if (input.includes("alert")) {
      return {
        id: Date.now().toString(),
        text: "🚨 Current Alerts:\n\n⚠️ Maggi Noodles: Critical stock (2 left)\n⚠️ Bread expires in 2 days (8 loaves)\n📈 Parle-G demand up 40% this week\n🚚 Delivery delayed: Order #1234\n\nWould you like me to auto-reorder low stock items?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "alert",
        data: { alertCount: 4 }
      };
    } else if (input.includes("trend") || input.includes("sales")) {
      return {
        id: Date.now().toString(),
        text: "📊 Sales Trends (Last 7 Days):\n\n📈 Top Performers:\n• Maggi Noodles +25%\n• Parle-G Biscuits +40%\n• Tata Tea +15%\n\n📉 Declining:\n• Cold Drinks -20%\n• Ice Cream -35%\n\n💡 Weather-based prediction: Hot weather expected, stock more cold drinks!",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "action",
        data: { type: "trends" }
      };
    } else if (input.includes("delivery") || input.includes("order")) {
      return {
        id: Date.now().toString(),
        text: "🚚 Delivery Updates:\n\n📦 Order #1234: Delayed (Weather)\n✅ Order #1235: Delivered\n🚛 Order #1236: In Transit (ETA: 2 hours)\n\n📍 Next delivery slot available: Tomorrow 10 AM\n\nWould you like to track a specific order?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "action",
        data: { type: "delivery" }
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "I understand you're asking about: \"" + userInput + "\"\n\nI can help you with:\n• Inventory management\n• Stock alerts\n• Sales trends\n• Delivery tracking\n• Reorder suggestions\n\nTry asking about any of these topics!",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };
    }
  };

  const handleQuickAction = (action: string) => {
    setInputText(action);
    handleSendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3 shadow-lg">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground hover:bg-primary-foreground/20">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">Bharat AI Assistant</h2>
              <p className="text-xs opacity-90">Online • Smart Inventory Manager</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
              <Card 
                className={`p-3 ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground ml-auto" 
                    : message.type === "alert"
                    ? "bg-warning/10 border-warning/30"
                    : message.type === "action"
                    ? "bg-secondary/10 border-secondary/30"
                    : "bg-card"
                }`}
              >
                {message.type === "alert" && (
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <Badge variant="outline" className="text-xs">Stock Alert</Badge>
                  </div>
                )}
                
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs ${
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp}
                  </span>
                  
                  {message.sender === "user" && (
                    <div className="text-primary-foreground/70">
                      <span className="text-xs">✓✓</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="p-3 bg-card">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <span className="text-xs text-muted-foreground">AI is typing...</span>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-background">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.text)}
                className="gap-2 h-8 text-xs"
              >
                <Icon className="h-3 w-3" />
                {action.text}
              </Button>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button variant="whatsapp" onClick={handleSendMessage} className="px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppChat;
import { useState } from "react";
import Navigation from "@/components/Navigation";
import HomePage from "@/components/HomePage";
import WhatsAppChat from "@/components/WhatsAppChat";
import Dashboard from "@/components/Dashboard";
import InventoryManager from "@/components/InventoryManager";
import RouteOptimizer from "@/components/RouteOptimizer";
import CreditScoring from "@/components/CreditScoring";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onViewChange={setCurrentView} />;
      case "chat":
        return <WhatsAppChat onBack={() => setCurrentView("home")} />;
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <InventoryManager />;
      case "routes":
        return <RouteOptimizer />;
      case "credit":
        return <CreditScoring />;
      default:
        return <HomePage onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      {renderCurrentView()}
    </div>
  );
};

export default Index;

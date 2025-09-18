import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Store, MessageSquare, BarChart3, Package, Route, CreditCard } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Store },
    { id: 'chat', label: 'WhatsApp Chat', icon: MessageSquare },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'routes', label: 'Routes', icon: Route },
    { id: 'credit', label: 'Credit Score', icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-40 px-6 py-4">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Bharat AI Store</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => onViewChange(item.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-20">
          <div className="flex flex-col gap-4 p-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsOpen(false);
                  }}
                  className="justify-start gap-3 h-12"
                  size="lg"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
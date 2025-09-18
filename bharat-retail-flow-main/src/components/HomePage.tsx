import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MessageSquare, BarChart3, Package, Route, CreditCard, Smartphone, Zap, Shield, Target } from "lucide-react";
import heroImage from "@/assets/kirana-store-hero.jpg";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";
import whatsappInterface from "@/assets/whatsapp-interface.jpg";

interface HomePageProps {
  onViewChange: (view: string) => void;
}

const HomePage = ({ onViewChange }: HomePageProps) => {
  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp-Style Interface",
      description: "Familiar chat interface for inventory updates, orders, and communication",
      color: "bg-primary-light text-primary"
    },
    {
      icon: BarChart3,
      title: "AI-Powered Analytics",
      description: "Demand forecasting, expiry alerts, and pricing intelligence",
      color: "bg-secondary-light text-secondary"
    },
    {
      icon: Package,
      title: "Smart Inventory",
      description: "Auto-tracking, reorder points, and expiry risk management",
      color: "bg-accent-light text-accent"
    },
    {
      icon: Route,
      title: "Route Optimization",
      description: "Efficient delivery planning and empty truck return solutions",
      color: "bg-success text-background"
    },
    {
      icon: CreditCard,
      title: "Credit Risk Assessment",
      description: "AI-based retailer verification and credit scoring",
      color: "bg-warning text-background"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Works on basic smartphones with low-data environments",
      color: "bg-muted text-muted-foreground"
    }
  ];

  const benefits = [
    { icon: Target, title: "85% Reduction", subtitle: "in stockouts" },
    { icon: Zap, title: "60% Faster", subtitle: "order processing" },
    { icon: Shield, title: "95% Accuracy", subtitle: "in demand prediction" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-light via-background to-secondary-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  🇮🇳 Made for India's Retail Ecosystem
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Bharat AI Store
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connecting Kirana stores, wholesalers, and logistics through intelligent AI and WhatsApp-like interfaces. 
                  Built for India's unique retail challenges.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => onViewChange('chat')}
                  className="gap-2"
                >
                  Try WhatsApp Interface <MessageSquare className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onViewChange('dashboard')}
                  className="gap-2"
                >
                  View Dashboard <ArrowRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Key Benefits */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="text-center">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{benefit.title}</div>
                      <div className="text-sm text-muted-foreground">{benefit.subtitle}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Modern Kirana Store"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Complete Retail Intelligence System
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From inventory management to delivery optimization, our AI-powered platform handles every aspect of modern retail operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the power of integrated retail intelligence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    WhatsApp-Style Communication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={whatsappInterface} 
                    alt="WhatsApp Interface"
                    className="rounded-lg w-full shadow-md"
                  />
                  <p className="text-muted-foreground mt-4">
                    Familiar interface for store owners to manage inventory, place orders, and receive alerts.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                    Intelligence Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={dashboardMockup} 
                    alt="Dashboard Analytics"
                    className="rounded-lg w-full shadow-md"
                  />
                  <p className="text-muted-foreground mt-4">
                    Real-time analytics, forecasting, and insights to optimize operations and reduce costs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => onViewChange('dashboard')}
              className="gap-2"
            >
              Explore Full Demo <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
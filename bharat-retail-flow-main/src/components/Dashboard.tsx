import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle, 
  DollarSign, 
  ShoppingCart,
  Route,
  Users,
  Clock,
  Target,
  Zap,
  BarChart3
} from "lucide-react";

const Dashboard = () => {
  const kpis = [
    {
      title: "Total Revenue",
      value: "₹2,45,680",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Orders Today",
      value: "147",
      change: "+8.3%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-primary"
    },
    {
      title: "Active Stores",
      value: "23",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "text-secondary"
    },
    {
      title: "Stock Alerts",
      value: "5",
      change: "-3",
      trend: "down",
      icon: AlertTriangle,
      color: "text-warning"
    }
  ];

  const demandForecast = [
    { product: "Maggi Noodles", current: 25, predicted: 45, confidence: 92, trend: "up" },
    { product: "Parle-G Biscuits", current: 67, predicted: 89, confidence: 87, trend: "up" },
    { product: "Tata Tea", current: 34, predicted: 28, confidence: 78, trend: "down" },
    { product: "Amul Milk", current: 89, predicted: 95, confidence: 94, trend: "up" },
    { product: "Sunsilk Shampoo", current: 12, predicted: 8, confidence: 82, trend: "down" }
  ];

  const expiryAlerts = [
    { product: "Fresh Bread", quantity: 8, daysLeft: 2, severity: "high" },
    { product: "Yogurt Cups", quantity: 15, daysLeft: 3, severity: "medium" },
    { product: "Banana (Kg)", quantity: 12, daysLeft: 4, severity: "medium" },
    { product: "Milk Packets", quantity: 6, daysLeft: 5, severity: "low" }
  ];

  const priceComparison = [
    { product: "Maggi Noodles", local: 12, online: 15, savings: 25 },
    { product: "Parle-G", local: 5, online: 6, savings: 20 },
    { product: "Tata Tea", local: 85, online: 92, savings: 8 },
    { product: "Amul Milk", local: 25, online: 28, savings: 12 }
  ];

  const routeOptimization = {
    totalOrders: 10,
    optimizedDistance: "45 km",
    timeSaved: "2.5 hours",
    fuelSaved: "₹340",
    efficiency: 85
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Intelligence Dashboard</h1>
            <p className="text-muted-foreground">Real-time insights for your retail network</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              Live Data
            </Badge>
            <Badge variant="outline">Last updated: 2 min ago</Badge>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                    <span className="text-sm text-success font-medium">{kpi.change}</span>
                    <span className="text-sm text-muted-foreground">from last week</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demand Forecasting */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Demand Forecast (Next 7 Days)
              </CardTitle>
              <CardDescription>
                AI-powered predictions for top 5 products across your network
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {demandForecast.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{item.product}</div>
                    <div className="flex items-center gap-2">
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {item.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Current: {item.current}</span>
                    <span className="font-medium">Predicted: {item.predicted}</span>
                  </div>
                  <Progress 
                    value={(item.predicted / 100) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Expiry Alerts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Expiry Risk Management
              </CardTitle>
              <CardDescription>
                Items approaching expiry dates across all stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {expiryAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="space-y-1">
                    <div className="font-medium">{alert.product}</div>
                    <div className="text-sm text-muted-foreground">
                      {alert.quantity} units • {alert.daysLeft} days left
                    </div>
                  </div>
                  <Badge 
                    variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "outline"}
                    className="capitalize"
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                <Package className="h-4 w-4 mr-2" />
                Auto-Generate Reorder List
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Price Comparison */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-secondary" />
                Local vs Online Price Comparison
              </CardTitle>
              <CardDescription>
                Top 10 products with competitive pricing analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {priceComparison.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <div className="font-medium">{item.product}</div>
                    <div className="text-sm text-muted-foreground">
                      Local: ₹{item.local} • Online: ₹{item.online}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-success">₹{item.savings} saved</div>
                    <div className="text-xs text-muted-foreground">{Math.round((item.savings/item.online)*100)}% less</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Route Optimization */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-accent" />
                Delivery Route Optimization
              </CardTitle>
              <CardDescription>
                Optimized routes for today's 10 orders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-light rounded-lg">
                  <div className="text-2xl font-bold text-primary">{routeOptimization.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-secondary-light rounded-lg">
                  <div className="text-2xl font-bold text-secondary">{routeOptimization.optimizedDistance}</div>
                  <div className="text-sm text-muted-foreground">Total Distance</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Time Saved</span>
                  <span className="text-sm text-success font-medium">{routeOptimization.timeSaved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fuel Cost Saved</span>
                  <span className="text-sm text-success font-medium">{routeOptimization.fuelSaved}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Route Efficiency</span>
                    <span className="text-sm font-medium">{routeOptimization.efficiency}%</span>
                  </div>
                  <Progress value={routeOptimization.efficiency} className="h-2" />
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Route className="h-4 w-4 mr-2" />
                View Route Map
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
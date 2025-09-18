import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Route, 
  MapPin, 
  Clock, 
  Fuel, 
  Truck, 
  Package,
  Zap,
  Target,
  BarChart3,
  Navigation,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface DeliveryOrder {
  id: string;
  storeId: string;
  storeName: string;
  address: string;
  items: number;
  priority: "high" | "medium" | "low";
  timeWindow: string;
  distance: number;
  estimatedTime: number;
  status: "pending" | "in-transit" | "delivered";
}

interface RouteData {
  id: string;
  driver: string;
  vehicle: string;
  orders: string[];
  totalDistance: number;
  totalTime: number;
  fuelCost: number;
  efficiency: number;
  status: "planned" | "active" | "completed";
}

const RouteOptimizer = () => {
  const { toast } = useToast();
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const orders: DeliveryOrder[] = [
    {
      id: "ORD001",
      storeId: "STR001",
      storeName: "Central Market Store",
      address: "Gandhi Road, Sector 14",
      items: 45,
      priority: "high",
      timeWindow: "09:00 - 11:00",
      distance: 2.5,
      estimatedTime: 15,
      status: "pending"
    },
    {
      id: "ORD002",
      storeId: "STR002",
      storeName: "Station Road Shop",
      address: "Near Railway Station",
      items: 32,
      priority: "high",
      timeWindow: "09:30 - 11:30",
      distance: 4.2,
      estimatedTime: 20,
      status: "pending"
    },
    {
      id: "ORD003",
      storeId: "STR003",
      storeName: "Mall Road Outlet",
      address: "Mall Road, Sector 17",
      items: 28,
      priority: "medium",
      timeWindow: "10:00 - 12:00",
      distance: 3.8,
      estimatedTime: 25,
      status: "in-transit"
    },
    {
      id: "ORD004",
      storeId: "STR004",
      storeName: "Sector 15 Store",
      address: "Main Market, Sector 15",
      items: 52,
      priority: "medium",
      timeWindow: "11:00 - 13:00",
      distance: 6.1,
      estimatedTime: 30,
      status: "pending"
    },
    {
      id: "ORD005",
      storeId: "STR005",
      storeName: "Gandhi Nagar Kirana",
      address: "Gandhi Nagar, Block A",
      items: 19,
      priority: "low",
      timeWindow: "14:00 - 16:00",
      distance: 5.5,
      estimatedTime: 35,
      status: "pending"
    }
  ];

  const optimizedRoutes: RouteData[] = [
    {
      id: "RT001",
      driver: "Rajesh Kumar",
      vehicle: "DL-01-AB-1234",
      orders: ["ORD001", "ORD003", "ORD005"],
      totalDistance: 12.5,
      totalTime: 2.5,
      fuelCost: 340,
      efficiency: 92,
      status: "active"
    },
    {
      id: "RT002",
      driver: "Suresh Singh",
      vehicle: "DL-01-CD-5678",
      orders: ["ORD002", "ORD004"],
      totalDistance: 8.7,
      totalTime: 1.8,
      fuelCost: 245,
      efficiency: 88,
      status: "planned"
    }
  ];

  const analytics = {
    totalOrders: orders.length,
    completedToday: 12,
    totalDistance: "125 km",
    fuelSaved: "₹1,250",
    timeSaved: "4.5 hours",
    avgEfficiency: 85,
    emptyMiles: 15
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "text-success";
      case "in-transit": return "text-secondary";
      case "pending": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const handleOptimizeRoutes = () => {
    toast({
      title: "Routes Optimized",
      description: "Generated optimal delivery routes saving 2.5 hours and ₹340 in fuel costs",
    });
  };

  const handleStartRoute = (routeId: string) => {
    toast({
      title: "Route Started",
      description: `Driver notified and GPS tracking activated for route ${routeId}`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Route Optimizer</h1>
            <p className="text-muted-foreground">AI-powered delivery route optimization for maximum efficiency</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              Real-time Tracking
            </Badge>
            <Badge variant="outline">{analytics.totalOrders} Active Orders</Badge>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Package className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{analytics.totalOrders}</div>
              <div className="text-xs text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-xl font-bold text-success">{analytics.completedToday}</div>
              <div className="text-xs text-muted-foreground">Completed Today</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Route className="h-6 w-6 text-secondary mx-auto mb-2" />
              <div className="text-xl font-bold text-secondary">{analytics.totalDistance}</div>
              <div className="text-xs text-muted-foreground">Total Distance</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Fuel className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-xl font-bold text-accent">{analytics.fuelSaved}</div>
              <div className="text-xs text-muted-foreground">Fuel Saved</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-xl font-bold text-warning">{analytics.timeSaved}</div>
              <div className="text-xs text-muted-foreground">Time Saved</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-primary">{analytics.avgEfficiency}%</div>
              <div className="text-xs text-muted-foreground">Avg Efficiency</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <div className="text-xl font-bold text-destructive">{analytics.emptyMiles}%</div>
              <div className="text-xs text-muted-foreground">Empty Miles</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="routes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="routes">Optimized Routes</TabsTrigger>
            <TabsTrigger value="orders">All Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Today's Optimized Routes</h2>
              <Button variant="hero" onClick={handleOptimizeRoutes} className="gap-2">
                <Navigation className="h-4 w-4" />
                Re-optimize Routes
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {optimizedRoutes.map((route) => {
                const routeOrders = orders.filter(order => route.orders.includes(order.id));
                
                return (
                  <Card key={route.id} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-primary" />
                          Route {route.id}
                        </div>
                        <Badge 
                          variant={route.status === "active" ? "default" : route.status === "completed" ? "secondary" : "outline"}
                          className="capitalize"
                        >
                          {route.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Driver: {route.driver} • Vehicle: {route.vehicle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Route Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-foreground">{route.totalDistance} km</div>
                          <div className="text-xs text-muted-foreground">Distance</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-foreground">{route.totalTime} hrs</div>
                          <div className="text-xs text-muted-foreground">Time</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-foreground">₹{route.fuelCost}</div>
                          <div className="text-xs text-muted-foreground">Fuel Cost</div>
                        </div>
                      </div>

                      {/* Efficiency */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Route Efficiency</span>
                          <span className="text-sm font-medium">{route.efficiency}%</span>
                        </div>
                        <Progress value={route.efficiency} className="h-2" />
                      </div>

                      {/* Orders in Route */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Delivery Stops ({routeOrders.length})</h4>
                        {routeOrders.map((order, index) => (
                          <div key={order.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{order.storeName}</div>
                              <div className="text-xs text-muted-foreground">{order.items} items • {order.timeWindow}</div>
                            </div>
                            <Badge variant={getPriorityColor(order.priority) as "destructive" | "secondary" | "outline"} className="text-xs">
                              {order.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {route.status === "planned" && (
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => handleStartRoute(route.id)}
                          >
                            Start Route
                          </Button>
                        )}
                        {route.status === "active" && (
                          <Button variant="secondary" className="flex-1">
                            Track Live
                          </Button>
                        )}
                        <Button variant="outline">
                          View Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">All Delivery Orders</h2>
              <Button variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Add New Order
              </Button>
            </div>

            {orders.map((order) => (
              <Card key={order.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold text-foreground">{order.storeName}</h3>
                          <p className="text-sm text-muted-foreground">{order.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{order.items}</div>
                        <div className="text-xs text-muted-foreground">Items</div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="text-center">
                        <div className="text-sm font-medium">{order.timeWindow}</div>
                        <div className="text-xs text-muted-foreground">Time Window</div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="text-center">
                        <div className="text-sm font-medium">{order.distance} km</div>
                        <div className="text-xs text-muted-foreground">{order.estimatedTime} min</div>
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <Badge variant={getPriorityColor(order.priority) as "destructive" | "secondary" | "outline"} className="capitalize">
                        {order.priority}
                      </Badge>
                    </div>

                    <div className="md:col-span-1">
                      <div className={`text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Route Performance
                  </CardTitle>
                  <CardDescription>Weekly optimization metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Distance Optimization</span>
                      <span className="text-sm text-success font-medium">-25%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Time Efficiency</span>
                      <span className="text-sm text-success font-medium">-30%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Fuel Savings</span>
                      <span className="text-sm text-success font-medium">-35%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">On-time Delivery</span>
                      <span className="text-sm text-success font-medium">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-secondary" />
                    Cost Analysis
                  </CardTitle>
                  <CardDescription>Monthly savings breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">₹12,450</div>
                      <div className="text-sm text-muted-foreground">Fuel Saved</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">45 hrs</div>
                      <div className="text-sm text-muted-foreground">Time Saved</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Driver Overtime Reduction</span>
                      <span className="text-sm font-medium text-success">₹5,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Vehicle Maintenance Savings</span>
                      <span className="text-sm font-medium text-success">₹3,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Customer Satisfaction Bonus</span>
                      <span className="text-sm font-medium text-success">₹2,100</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total Monthly Savings</span>
                        <span className="text-success">₹23,550</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RouteOptimizer;
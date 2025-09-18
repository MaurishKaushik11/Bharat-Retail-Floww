import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  AlertTriangle, 
  Plus, 
  Minus, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  price: number;
  expiryDate?: string;
  supplier: string;
  trend: "up" | "down" | "stable";
  demandScore: number;
}

const InventoryManager = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const inventoryData: InventoryItem[] = [
    {
      id: "1",
      name: "Maggi Noodles 2-min",
      category: "Instant Food",
      currentStock: 2,
      minThreshold: 10,
      maxCapacity: 100,
      price: 12,
      expiryDate: "2024-12-15",
      supplier: "Nestle",
      trend: "up",
      demandScore: 95
    },
    {
      id: "2",
      name: "Parle-G Biscuits",
      category: "Biscuits",
      currentStock: 45,
      minThreshold: 20,
      maxCapacity: 80,
      price: 5,
      expiryDate: "2024-11-30",
      supplier: "Parle",
      trend: "up",
      demandScore: 87
    },
    {
      id: "3",
      name: "Tata Tea Gold",
      category: "Beverages",
      currentStock: 23,
      minThreshold: 15,
      maxCapacity: 60,
      price: 85,
      expiryDate: "2025-06-20",
      supplier: "Tata",
      trend: "stable",
      demandScore: 72
    },
    {
      id: "4",
      name: "Amul Fresh Milk",
      category: "Dairy",
      currentStock: 15,
      minThreshold: 25,
      maxCapacity: 50,
      price: 25,
      expiryDate: "2024-09-25",
      supplier: "Amul",
      trend: "up",
      demandScore: 94
    },
    {
      id: "5",
      name: "Sunsilk Shampoo",
      category: "Personal Care",
      currentStock: 8,
      minThreshold: 12,
      maxCapacity: 40,
      price: 45,
      expiryDate: "2025-08-10",
      supplier: "Unilever",
      trend: "down",
      demandScore: 45
    }
  ];

  const stores = [
    { id: "all", name: "All Stores" },
    { id: "store1", name: "Central Market Store" },
    { id: "store2", name: "Gandhi Nagar Kirana" },
    { id: "store3", name: "Station Road Shop" },
    { id: "store4", name: "Mall Road Outlet" },
    { id: "store5", name: "Sector 15 Store" }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "instant", name: "Instant Food" },
    { id: "biscuits", name: "Biscuits" },
    { id: "beverages", name: "Beverages" },
    { id: "dairy", name: "Dairy" },
    { id: "personal", name: "Personal Care" }
  ];

  const getStockLevel = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxCapacity) * 100;
    if (item.currentStock <= item.minThreshold) return "critical";
    if (percentage <= 30) return "low";
    if (percentage <= 70) return "medium";
    return "high";
  };

  const getStockColor = (level: string) => {
    switch (level) {
      case "critical": return "text-destructive";
      case "low": return "text-warning";
      case "medium": return "text-secondary";
      case "high": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleStockUpdate = (itemId: string, change: number) => {
    toast({
      title: "Stock Updated",
      description: `Inventory ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)} units`,
    });
  };

  const handleAutoReorder = (item: InventoryItem) => {
    const reorderQuantity = item.maxCapacity - item.currentStock;
    toast({
      title: "Reorder Initiated",
      description: `Auto-ordering ${reorderQuantity} units of ${item.name} from ${item.supplier}`,
    });
  };

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const criticalItems = inventoryData.filter(item => getStockLevel(item) === "critical");
  const expiringItems = inventoryData.filter(item => {
    if (!item.expiryDate) return false;
    const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
    return daysUntilExpiry <= 7;
  });

  return (
    <div className="min-h-screen bg-background p-6 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Smart Inventory Manager</h1>
            <p className="text-muted-foreground">AI-powered inventory tracking with auto-reorder suggestions</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              Auto-Sync
            </Badge>
            <Badge variant="outline">{inventoryData.length} Products</Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div>
                  <div className="text-2xl font-bold text-destructive">{criticalItems.length}</div>
                  <div className="text-xs text-muted-foreground">Critical Stock</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-warning" />
                <div>
                  <div className="text-2xl font-bold text-warning">{expiringItems.length}</div>
                  <div className="text-xs text-muted-foreground">Expiring Soon</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-primary">{inventoryData.length}</div>
                  <div className="text-xs text-muted-foreground">Total Products</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-success" />
                <div>
                  <div className="text-2xl font-bold text-success">₹1,24,650</div>
                  <div className="text-xs text-muted-foreground">Inventory Value</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map(store => (
                    <SelectItem key={store.id} value={store.id}>{store.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">All Inventory</TabsTrigger>
            <TabsTrigger value="alerts">Alerts ({criticalItems.length + expiringItems.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            {filteredInventory.map((item) => {
              const stockLevel = getStockLevel(item);
              const stockPercentage = (item.currentStock / item.maxCapacity) * 100;
              const daysUntilExpiry = item.expiryDate ? getDaysUntilExpiry(item.expiryDate) : null;

              return (
                <Card key={item.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-4">
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h3 className="font-semibold text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category} • {item.supplier}</p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${getStockColor(stockLevel)}`}>
                              {item.currentStock}
                            </span>
                            <span className="text-sm text-muted-foreground">/ {item.maxCapacity}</span>
                          </div>
                          <Progress value={stockPercentage} className="h-2" />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                          {item.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : item.trend === "down" ? (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          ) : (
                            <div className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">Demand: {item.demandScore}%</span>
                        </div>
                        {daysUntilExpiry && daysUntilExpiry <= 7 && (
                          <Badge variant="outline" className="text-xs mt-1">
                            Expires in {daysUntilExpiry} days
                          </Badge>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <div className="text-lg font-bold text-foreground">₹{item.price}</div>
                        <div className="text-xs text-muted-foreground">per unit</div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleStockUpdate(item.id, -1)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleStockUpdate(item.id, 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          {stockLevel === "critical" && (
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() => handleAutoReorder(item)}
                              className="text-xs"
                            >
                              Auto Reorder
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            {criticalItems.length > 0 && (
              <Card className="border-0 shadow-lg border-l-4 border-l-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Stock Alerts
                  </CardTitle>
                  <CardDescription>Items below minimum threshold requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {criticalItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Only {item.currentStock} left (Min: {item.minThreshold})
                        </div>
                      </div>
                      <Button variant="destructive" onClick={() => handleAutoReorder(item)}>
                        Reorder Now
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {expiringItems.length > 0 && (
              <Card className="border-0 shadow-lg border-l-4 border-l-warning">
                <CardHeader>
                  <CardTitle className="text-warning flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Expiry Alerts
                  </CardTitle>
                  <CardDescription>Items expiring within 7 days</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expiringItems.map(item => {
                    const daysLeft = getDaysUntilExpiry(item.expiryDate!);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-warning/5 rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Expires in {daysLeft} days • {item.currentStock} units
                          </div>
                        </div>
                        <Badge variant="outline">
                          {daysLeft <= 2 ? "Urgent" : "Monitor"}
                        </Badge>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Based on demand score and sales velocity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inventoryData
                    .sort((a, b) => b.demandScore - a.demandScore)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.category}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{item.demandScore}% demand</Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Inventory Health</CardTitle>
                  <CardDescription>Overall status of your inventory</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Optimal Stock</span>
                      <span className="text-sm text-success">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Low Stock</span>
                      <span className="text-sm text-warning">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Critical Stock</span>
                      <span className="text-sm text-destructive">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
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

export default InventoryManager;
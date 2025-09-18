import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Search,
  User,
  Building,
  Phone,
  MapPin,
  DollarSign,
  Calendar,
  BarChart3
} from "lucide-react";

interface Retailer {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  address: string;
  creditScore: number;
  riskLevel: "low" | "medium" | "high";
  creditLimit: number;
  currentOutstanding: number;
  paymentHistory: number;
  businessAge: number;
  lastTransaction: string;
  totalTransactions: number;
  avgOrderValue: number;
  status: "active" | "pending" | "suspended";
}

const CreditScoring = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all");
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null);

  const retailers: Retailer[] = [
    {
      id: "RTL001",
      name: "Rajesh Kumar Sharma",
      businessName: "Central Market Store",
      phone: "+91 98765 43210",
      address: "Gandhi Road, Sector 14, Gurgaon",
      creditScore: 785,
      riskLevel: "low",
      creditLimit: 250000,
      currentOutstanding: 45000,
      paymentHistory: 96,
      businessAge: 8,
      lastTransaction: "2024-09-15",
      totalTransactions: 145,
      avgOrderValue: 15200,
      status: "active"
    },
    {
      id: "RTL002",
      name: "Sunita Devi",
      businessName: "Gandhi Nagar Kirana",
      phone: "+91 98765 43211",
      address: "Gandhi Nagar, Block A, Delhi",
      creditScore: 650,
      riskLevel: "medium",
      creditLimit: 150000,
      currentOutstanding: 85000,
      paymentHistory: 78,
      businessAge: 5,
      lastTransaction: "2024-09-12",
      totalTransactions: 89,
      avgOrderValue: 12800,
      status: "active"
    },
    {
      id: "RTL003",
      name: "Amit Singh",
      businessName: "Station Road Shop",
      phone: "+91 98765 43212",
      address: "Near Railway Station, Chandigarh",
      creditScore: 420,
      riskLevel: "high",
      creditLimit: 75000,
      currentOutstanding: 70000,
      paymentHistory: 45,
      businessAge: 2,
      lastTransaction: "2024-08-28",
      totalTransactions: 32,
      avgOrderValue: 8500,
      status: "pending"
    },
    {
      id: "RTL004",
      name: "Priya Gupta",
      businessName: "Mall Road Outlet",
      phone: "+91 98765 43213",
      address: "Mall Road, Sector 17, Chandigarh",
      creditScore: 720,
      riskLevel: "low",
      creditLimit: 200000,
      currentOutstanding: 32000,
      paymentHistory: 89,
      businessAge: 6,
      lastTransaction: "2024-09-16",
      totalTransactions: 112,
      avgOrderValue: 18300,
      status: "active"
    },
    {
      id: "RTL005",
      name: "Mohammed Khan",
      businessName: "Sector 15 Store",
      phone: "+91 98765 43214",
      address: "Main Market, Sector 15, Noida",
      creditScore: 580,
      riskLevel: "medium",
      creditLimit: 120000,
      currentOutstanding: 95000,
      paymentHistory: 67,
      businessAge: 4,
      lastTransaction: "2024-09-10",
      totalTransactions: 67,
      avgOrderValue: 11200,
      status: "active"
    }
  ];

  const portfolioStats = {
    totalRetailers: retailers.length,
    activeRetailers: retailers.filter(r => r.status === "active").length,
    totalCreditLimit: retailers.reduce((sum, r) => sum + r.creditLimit, 0),
    totalOutstanding: retailers.reduce((sum, r) => sum + r.currentOutstanding, 0),
    avgCreditScore: Math.round(retailers.reduce((sum, r) => sum + r.creditScore, 0) / retailers.length),
    lowRisk: retailers.filter(r => r.riskLevel === "low").length,
    mediumRisk: retailers.filter(r => r.riskLevel === "medium").length,
    highRisk: retailers.filter(r => r.riskLevel === "high").length
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-secondary";
    if (score >= 550) return "text-warning";
    return "text-destructive";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "outline";
      case "medium": return "secondary";
      case "high": return "destructive";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "outline";
      case "pending": return "secondary";
      case "suspended": return "destructive";
      default: return "outline";
    }
  };

  const calculateCreditUtilization = (outstanding: number, limit: number) => {
    return Math.round((outstanding / limit) * 100);
  };

  const handleApproveCredit = (retailerId: string, amount: number) => {
    toast({
      title: "Credit Approved",
      description: `₹${amount.toLocaleString()} credit limit approved for retailer ${retailerId}`,
    });
  };

  const handleRejectCredit = (retailerId: string) => {
    toast({
      title: "Credit Application Rejected",
      description: `Credit application for retailer ${retailerId} has been rejected`,
      variant: "destructive",
    });
  };

  const filteredRetailers = retailers.filter(retailer => {
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRiskLevel === "all" || retailer.riskLevel === selectedRiskLevel;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-background p-6 pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Credit Risk Assessment</h1>
            <p className="text-muted-foreground">AI-powered credit scoring and risk management for retailers</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Shield className="h-3 w-3" />
              AI Powered
            </Badge>
            <Badge variant="outline">{portfolioStats.totalRetailers} Retailers</Badge>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card className="border-0 shadow-lg col-span-2">
            <CardContent className="p-4 text-center">
              <User className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-primary">{portfolioStats.totalRetailers}</div>
              <div className="text-xs text-muted-foreground">Total Retailers</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg col-span-2">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-xl font-bold text-success">{portfolioStats.activeRetailers}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg col-span-2">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-secondary mx-auto mb-2" />
              <div className="text-lg font-bold text-secondary">₹{(portfolioStats.totalCreditLimit / 100000).toFixed(1)}L</div>
              <div className="text-xs text-muted-foreground">Credit Limit</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg col-span-2">
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-xl font-bold text-accent">{portfolioStats.avgCreditScore}</div>
              <div className="text-xs text-muted-foreground">Avg Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Portfolio Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <div className="text-2xl font-bold text-success">{portfolioStats.lowRisk}</div>
                <div className="text-sm text-muted-foreground">Low Risk</div>
                <div className="text-xs text-success">Safe to extend credit</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary">{portfolioStats.mediumRisk}</div>
                <div className="text-sm text-muted-foreground">Medium Risk</div>
                <div className="text-xs text-secondary">Requires monitoring</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <div className="text-2xl font-bold text-destructive">{portfolioStats.highRisk}</div>
                <div className="text-sm text-muted-foreground">High Risk</div>
                <div className="text-xs text-destructive">Credit restrictions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="retailers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="retailers">All Retailers</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="retailers" className="space-y-6">
            {/* Filters */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search retailers or business names..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Retailers List */}
            <div className="space-y-4">
              {filteredRetailers.map((retailer) => {
                const utilizationPercentage = calculateCreditUtilization(retailer.currentOutstanding, retailer.creditLimit);
                
                return (
                  <Card key={retailer.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        onClick={() => setSelectedRetailer(retailer)}>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-12 gap-4 items-center">
                        {/* Retailer Info */}
                        <div className="md:col-span-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Building className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{retailer.name}</h3>
                              <p className="text-sm text-muted-foreground">{retailer.businessName}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {retailer.address.split(',')[0]}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Credit Score */}
                        <div className="md:col-span-2 text-center">
                          <div className={`text-2xl font-bold ${getCreditScoreColor(retailer.creditScore)}`}>
                            {retailer.creditScore}
                          </div>
                          <div className="text-xs text-muted-foreground">Credit Score</div>
                          <Badge variant={getRiskColor(retailer.riskLevel) as "secondary" | "destructive" | "outline"} className="text-xs mt-1 capitalize">
                            {retailer.riskLevel} Risk
                          </Badge>
                        </div>

                        {/* Credit Utilization */}
                        <div className="md:col-span-3">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>₹{(retailer.currentOutstanding / 1000).toFixed(0)}K</span>
                              <span className="text-muted-foreground">₹{(retailer.creditLimit / 1000).toFixed(0)}K</span>
                            </div>
                            <Progress value={utilizationPercentage} className="h-2" />
                            <div className="text-xs text-muted-foreground text-center">
                              {utilizationPercentage}% utilized
                            </div>
                          </div>
                        </div>

                        {/* Payment History */}
                        <div className="md:col-span-2 text-center">
                          <div className="text-lg font-bold text-foreground">{retailer.paymentHistory}%</div>
                          <div className="text-xs text-muted-foreground">Payment History</div>
                          <div className="text-xs text-muted-foreground">{retailer.totalTransactions} transactions</div>
                        </div>

                        {/* Status */}
                        <div className="md:col-span-1 text-center">
                        <Badge variant={getStatusColor(retailer.status) as "secondary" | "destructive" | "outline"} className="capitalize">
                          {retailer.status}
                        </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Credit Applications Under Review</h3>
              <p className="text-muted-foreground mb-6">AI risk assessment in progress for new applicants</p>
              
              {retailers.filter(r => r.status === "pending").map(retailer => (
                <Card key={retailer.id} className="border-0 shadow-lg max-w-2xl mx-auto">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold">{retailer.name}</div>
                        <div className="text-sm text-muted-foreground">{retailer.businessName}</div>
                        <div className="text-sm">Requested: ₹{(retailer.creditLimit / 1000).toFixed(0)}K</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getCreditScoreColor(retailer.creditScore)}`}>
                          {retailer.creditScore}
                        </div>
                        <div className="text-xs text-muted-foreground">AI Score</div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleApproveCredit(retailer.id, retailer.creditLimit)}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRejectCredit(retailer.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Monthly credit performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Default Rate</span>
                      <span className="text-sm text-success font-medium">2.3%</span>
                    </div>
                    <Progress value={2.3} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Collection Efficiency</span>
                      <span className="text-sm text-success font-medium">94.7%</span>
                    </div>
                    <Progress value={94.7} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Credit Utilization</span>
                      <span className="text-sm text-secondary font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                  <CardDescription>AI model performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">96.8%</div>
                      <div className="text-sm text-muted-foreground">Model Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">1.2%</div>
                      <div className="text-sm text-muted-foreground">False Positive</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Early Warning Accuracy</span>
                      <span className="text-sm font-medium text-success">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Prediction Precision</span>
                      <span className="text-sm font-medium text-success">91%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Model Confidence</span>
                      <span className="text-sm font-medium text-success">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Retailer Detail Modal would go here */}
        {selectedRetailer && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Retailer Credit Profile</CardTitle>
                  <Button variant="ghost" onClick={() => setSelectedRetailer(null)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">{selectedRetailer.name}</h2>
                  <p className="text-muted-foreground">{selectedRetailer.businessName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className={`text-3xl font-bold ${getCreditScoreColor(selectedRetailer.creditScore)}`}>
                      {selectedRetailer.creditScore}
                    </div>
                    <div className="text-sm text-muted-foreground">Credit Score</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-3xl font-bold text-foreground">
                      {selectedRetailer.businessAge}Y
                    </div>
                    <div className="text-sm text-muted-foreground">Business Age</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Credit Limit</span>
                    <span className="font-medium">₹{selectedRetailer.creditLimit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outstanding Amount</span>
                    <span className="font-medium">₹{selectedRetailer.currentOutstanding.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment History</span>
                    <span className="font-medium">{selectedRetailer.paymentHistory}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Order Value</span>
                    <span className="font-medium">₹{selectedRetailer.avgOrderValue.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditScoring;
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  UserCheck,
  Plus,
  Save,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess } from "@/utils/toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [subscriptions, setSubscriptions] = useState({
    monthly: "499",
    quarterly: "1299",
    halfYearly: "2499",
    yearly: "4499"
  });

  const handleSaveSubscriptions = () => {
    showSuccess("Subscription plans updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <LayoutDashboard size={20} />, label: "Overview" },
            { icon: <Users size={20} />, label: "Users" },
            { icon: <BookOpen size={20} />, label: "Courses" },
            { icon: <CreditCard size={20} />, label: "Subscriptions" },
            { icon: <Bell size={20} />, label: "Notifications" },
            { icon: <Settings size={20} />, label: "Settings" },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.label ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search analytics, users..." className="pl-10 bg-gray-50 border-none" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === "Overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Total Revenue", value: "₹4,25,000", icon: <DollarSign />, color: "text-green-600", bg: "bg-green-50" },
                  { label: "Active Students", value: "12,450", icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "New Enrollments", value: "+142", icon: <TrendingUp />, color: "text-indigo-600", bg: "bg-indigo-50" },
                  { label: "Active Teachers", value: "86", icon: <UserCheck />, color: "text-orange-600", bg: "bg-orange-50" },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100"></div>
                            <div>
                              <div className="font-medium">Student Name {i + 1}</div>
                              <div className="text-xs text-gray-500">Class 10 • Science</div>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-indigo-600">₹2,499</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Server Load</span>
                          <span className="font-medium">24%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 w-[24%]"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Storage Used</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 w-[68%]"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "Subscriptions" && (
            <div className="max-w-4xl">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
                <p className="text-gray-500">Configure pricing and packages for your students.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Pricing Configuration</CardTitle>
                    <CardDescription>Set the base price for each subscription tier.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthly">Monthly Plan (₹)</Label>
                      <Input 
                        id="monthly" 
                        value={subscriptions.monthly} 
                        onChange={(e) => setSubscriptions({...subscriptions, monthly: e.target.value})}
                        placeholder="499" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quarterly">Quarterly Plan (₹)</Label>
                      <Input 
                        id="quarterly" 
                        value={subscriptions.quarterly} 
                        onChange={(e) => setSubscriptions({...subscriptions, quarterly: e.target.value})}
                        placeholder="1299" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="halfYearly">Half-Yearly Plan (₹)</Label>
                      <Input 
                        id="halfYearly" 
                        value={subscriptions.halfYearly} 
                        onChange={(e) => setSubscriptions({...subscriptions, halfYearly: e.target.value})}
                        placeholder="2499" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearly">Yearly Plan (₹)</Label>
                      <Input 
                        id="yearly" 
                        value={subscriptions.yearly} 
                        onChange={(e) => setSubscriptions({...subscriptions, yearly: e.target.value})}
                        placeholder="4499" 
                      />
                    </div>
                    <Button onClick={handleSaveSubscriptions} className="w-full bg-indigo-600 hover:bg-indigo-700">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Payment Gateway Status</CardTitle>
                    <CardDescription className="text-indigo-100">Connect your payment provider to start accepting payments.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">Razorpay</span>
                        <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-bold">PENDING SETUP</span>
                      </div>
                      <p className="text-sm text-indigo-100 mb-4">Requires API Key and Secret from your Razorpay dashboard.</p>
                      <Button variant="secondary" className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                        Configure Razorpay
                      </Button>
                    </div>

                    <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold">Stripe</span>
                        <span className="text-xs bg-gray-400 text-white px-2 py-0.5 rounded-full font-bold">DISABLED</span>
                      </div>
                      <p className="text-sm text-indigo-100 mb-4">International payments support.</p>
                      <Button variant="ghost" className="w-full text-white border border-white/20 hover:bg-white/10">
                        Enable Stripe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
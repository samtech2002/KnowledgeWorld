import React from 'react';
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
  UserCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminDashboard = () => {
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
            { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
            { icon: <Users size={20} />, label: "Users" },
            { icon: <BookOpen size={20} />, label: "Courses" },
            { icon: <CreditCard size={20} />, label: "Payments" },
            { icon: <Bell size={20} />, label: "Notifications" },
            { icon: <Settings size={20} />, label: "Settings" },
          ].map((item, i) => (
            <button 
              key={i} 
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                item.active ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
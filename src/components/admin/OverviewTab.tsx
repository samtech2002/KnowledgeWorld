"use client";

import React from 'react';
import { DollarSign, Users, TrendingUp, UserCheck, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OverviewTabProps {
  students: any[];
}

const OverviewTab = ({ students }: OverviewTabProps) => {
  const stats = [
    { label: "Total Revenue", value: "₹4,25,000", icon: <DollarSign />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Active Students", value: "12,450", icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "New Enrollments", value: "+142", icon: <TrendingUp />, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Active Teachers", value: "86", icon: <UserCheck />, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium">Real-time insights into your learning platform's performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>{stat.icon}</div>
                <Badge className="bg-green-100 text-green-700 border-none font-bold">+12%</Badge>
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-black">Recent Enrollments</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {students.slice(0, 4).map((student, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-violet-50/50 rounded-2xl transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black group-hover:scale-110 transition-transform">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-black text-gray-900">{student.name}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{student.plan} Plan</div>
                    </div>
                  </div>
                  <div className="text-lg font-black text-violet-600">₹{student.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-xl font-black">System Health</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-gray-600">Server Load</span>
                  <span className="text-violet-600">24%</span>
                </div>
                <div className="h-3 bg-violet-50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 w-[24%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold mb-3">
                  <span className="text-gray-600">Storage Used</span>
                  <span className="text-cyan-600">68%</span>
                </div>
                <div className="h-3 bg-violet-50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[68%] rounded-full"></div>
                </div>
              </div>
              <div className="p-6 bg-violet-50/50 rounded-[2rem] border border-violet-100">
                <div className="flex items-center gap-3 text-violet-600 font-black mb-2">
                  <CheckCircle2 size={20} />
                  Database Optimized
                </div>
                <p className="text-xs font-medium text-gray-500">Last optimization performed 2 hours ago. All indexes are healthy.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
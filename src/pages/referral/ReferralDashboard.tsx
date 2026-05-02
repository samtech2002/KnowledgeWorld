"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Link as LinkIcon, 
  Copy, 
  LogOut, 
  User, 
  Wallet,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";

const ReferralDashboard = () => {
  const navigate = useNavigate();
  const referralCode = "KWORLD2024";
  const referralLink = `https://knowledgeworld.in/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    showSuccess("Referral link copied to clipboard!");
  };

  const stats = [
    { label: "Total Earnings", value: "₹12,450", icon: <DollarSign />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Referrals", value: "48", icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Payout", value: "₹2,100", icon: <Wallet />, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Conversion Rate", value: "12.5%", icon: <TrendingUp />, color: "text-violet-600", bg: "bg-violet-50" },
  ];

  const recentReferrals = [
    { id: 1, name: "Amit Patel", course: "Quantum Mechanics", date: "2 hours ago", commission: "₹499", status: "Paid" },
    { id: 2, name: "Sneha Reddy", course: "CCC Mastery", date: "5 hours ago", commission: "₹340", status: "Pending" },
    { id: 3, name: "Vikram Singh", course: "Calculus Hero", date: "1 day ago", commission: "₹399", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg shadow-lg shadow-violet-200">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900">PARTNER PORTAL</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/referral/wallet')} className="font-bold text-violet-600">Wallet</Button>
          <Button variant="ghost" onClick={() => navigate('/referral/profile')} className="font-bold text-gray-500">Profile</Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/login')} className="text-gray-400 hover:text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black shadow-sm">
            P
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Partner Dashboard</h1>
            <p className="text-gray-500 font-medium">You earn 20% commission on every successful referral.</p>
          </div>
          <Card className="w-full md:w-auto border-none shadow-xl shadow-violet-100/50 rounded-2xl bg-white p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Your Referral Link</p>
                <code className="text-sm font-bold text-violet-600">{referralLink}</code>
              </div>
              <Button size="icon" variant="ghost" onClick={copyToClipboard} className="rounded-xl hover:bg-violet-50">
                <Copy className="h-4 w-4 text-violet-600" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm w-fit mb-6`}>{stat.icon}</div>
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <Card className="lg:col-span-2 border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden">
            <CardHeader className="p-8 border-b border-violet-50">
              <CardTitle className="text-xl font-black">Recent Referral Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-violet-50/30">
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Course</th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Commission</th>
                      <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-violet-50">
                    {recentReferrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-violet-50/20 transition-colors">
                        <td className="p-6">
                          <div className="font-black text-gray-900">{ref.name}</div>
                          <div className="text-xs font-bold text-gray-400">{ref.date}</div>
                        </td>
                        <td className="p-6 font-bold text-gray-600">{ref.course}</td>
                        <td className="p-6 font-black text-violet-600">{ref.commission}</td>
                        <td className="p-6">
                          <Badge className={`rounded-lg font-bold ${ref.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {ref.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-10">
            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <h3 className="text-xl font-black mb-4 relative z-10">Ready to Withdraw?</h3>
              <p className="text-violet-100 font-medium opacity-80 mb-8 relative z-10">You have ₹2,100 available for withdrawal to your bank account.</p>
              <Button onClick={() => navigate('/referral/wallet')} className="w-full bg-white text-violet-600 hover:bg-violet-50 font-black h-12 rounded-xl shadow-lg relative z-10">
                Go to Wallet <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-8">
              <h3 className="text-xl font-black text-gray-900 mb-6">Quick Tips</h3>
              <div className="space-y-6">
                {[
                  "Share your link on WhatsApp groups",
                  "Post your success stories on LinkedIn",
                  "Create a short video about KnowledgeWorld",
                ].map((tip, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-violet-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralDashboard;
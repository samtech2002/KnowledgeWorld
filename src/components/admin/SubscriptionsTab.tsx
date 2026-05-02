"use client";

import React from 'react';
import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface SubscriptionsTabProps {
  subscriptions: any;
  setSubscriptions: (subs: any) => void;
  onSave: () => void;
}

const SubscriptionsTab = ({ subscriptions, setSubscriptions, onSave }: SubscriptionsTabProps) => {
  return (
    <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-500 font-medium">Configure pricing and packages for your students.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-black">Pricing Configuration</CardTitle>
            <CardDescription className="font-medium">Set the base price for each subscription tier.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthly" className="font-bold ml-1">Monthly Plan (₹)</Label>
              <Input 
                id="monthly" 
                value={subscriptions.monthly} 
                onChange={(e) => setSubscriptions({...subscriptions, monthly: e.target.value})}
                className="h-12 rounded-xl border-violet-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quarterly" className="font-bold ml-1">Quarterly Plan (₹)</Label>
              <Input 
                id="quarterly" 
                value={subscriptions.quarterly} 
                onChange={(e) => setSubscriptions({...subscriptions, quarterly: e.target.value})}
                className="h-12 rounded-xl border-violet-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="halfYearly" className="font-bold ml-1">Half-Yearly Plan (₹)</Label>
              <Input 
                id="halfYearly" 
                value={subscriptions.halfYearly} 
                onChange={(e) => setSubscriptions({...subscriptions, halfYearly: e.target.value})}
                className="h-12 rounded-xl border-violet-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearly" className="font-bold ml-1">Yearly Plan (₹)</Label>
              <Input 
                id="yearly" 
                value={subscriptions.yearly} 
                onChange={(e) => setSubscriptions({...subscriptions, yearly: e.target.value})}
                className="h-12 rounded-xl border-violet-100"
              />
            </div>
            <Button onClick={onSave} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-xl shadow-violet-100 transition-all active:scale-[0.98]">
              <Save className="mr-2 h-5 w-5" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-2xl shadow-violet-200/50 rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <CardHeader className="p-8 relative z-10">
            <CardTitle className="text-xl font-black text-white">Payment Gateway Status</CardTitle>
            <CardDescription className="text-violet-100 font-medium">Connect your payment provider to start accepting payments.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8 relative z-10">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-lg">Razorpay</span>
                <Badge className="bg-yellow-400 text-yellow-900 border-none font-black px-3 py-1">PENDING SETUP</Badge>
              </div>
              <p className="text-sm text-violet-100 mb-6 font-medium">Requires API Key and Secret from your Razorpay dashboard.</p>
              <Button variant="secondary" className="w-full bg-white text-violet-600 hover:bg-violet-50 font-black h-12 rounded-xl">
                Configure Razorpay
              </Button>
            </div>

            <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-lg">Stripe</span>
                <Badge className="bg-white/20 text-white border-none font-black px-3 py-1">DISABLED</Badge>
              </div>
              <p className="text-sm text-violet-100 mb-6 font-medium">International payments support for global students.</p>
              <Button variant="ghost" className="w-full text-white border border-white/30 hover:bg-white/10 font-black h-12 rounded-xl">
                Enable Stripe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionsTab;
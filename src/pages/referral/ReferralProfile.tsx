"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";

const ReferralProfile = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      showSuccess("Profile updated successfully!");
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF] pb-20">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center gap-4 sticky top-0 z-50">
        <Button variant="ghost" size="icon" onClick={() => navigate('/referral')} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-black text-xl text-gray-900">Partner Profile</h1>
      </nav>

      <main className="max-w-4xl mx-auto p-8">
        <form onSubmit={handleSave} className="space-y-10">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-violet-600 text-4xl font-black shadow-xl overflow-hidden">
                P
              </div>
              <button type="button" className="absolute bottom-0 right-0 p-2 bg-violet-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="mt-6 text-2xl font-black text-gray-900">Prashant Sharma</h2>
            <p className="text-gray-500 font-medium">Referral Partner since Oct 2023</p>
            <Badge className="mt-2 bg-violet-50 text-violet-600 border-none font-black px-4 py-1">Gold Tier Partner</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <User className="h-5 w-5 text-violet-600" /> Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Full Name</Label>
                  <Input defaultValue="Prashant Sharma" className="h-12 rounded-xl border-violet-100" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Email Address</Label>
                  <Input type="email" defaultValue="prashant@example.com" className="h-12 rounded-xl border-violet-100" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Phone Number</Label>
                  <Input defaultValue="+91 98765 43210" className="h-12 rounded-xl border-violet-100" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-600" /> Address Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Street Address</Label>
                  <Textarea defaultValue="123, Knowledge Park, Sector 62" className="rounded-xl border-violet-100 min-h-[100px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700">City</Label>
                    <Input defaultValue="Noida" className="h-12 rounded-xl border-violet-100" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700">Pincode</Label>
                    <Input defaultValue="201301" className="h-12 rounded-xl border-violet-100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-50 rounded-2xl">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">KYC Verification</h3>
                  <p className="text-sm font-medium text-gray-500">Verified on Oct 15, 2023</p>
                </div>
              </div>
              <Badge className="bg-green-500 text-white border-none font-black px-4 py-1">VERIFIED</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">PAN Card</p>
                <p className="font-bold text-gray-700">ABCDE****F</p>
              </div>
              <div className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Aadhar Number</p>
                <p className="font-bold text-gray-700">**** **** 1234</p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => navigate('/referral')} className="rounded-xl font-bold">Cancel</Button>
            <Button type="submit" disabled={isSaving} className="bg-violet-600 hover:bg-violet-700 text-white font-black px-10 h-14 rounded-2xl shadow-xl shadow-violet-100">
              {isSaving ? "Saving..." : "Save Changes"} <Save className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReferralProfile;
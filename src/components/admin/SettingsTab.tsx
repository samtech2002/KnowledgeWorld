"use client";

import React, { useState } from 'react';
import { Save, Globe, Shield, Bell, Share2, Mail, Layout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/utils/toast";

const SettingsTab = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      showSuccess("Global settings updated successfully!");
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Platform Settings</h1>
          <p className="text-gray-500 font-medium">Configure global parameters and system behavior.</p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105"
        >
          <Save className="mr-2 h-5 w-5" /> {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-8">
        <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
          <TabsTrigger value="general" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Layout className="mr-2 h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="social" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Share2 className="mr-2 h-4 w-4" /> Social
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl font-black">Site Identity</CardTitle>
                <CardDescription>Basic information about your platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Platform Name</Label>
                  <Input defaultValue="KnowledgeWorld" className="h-12 rounded-xl border-violet-100" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Support Email</Label>
                  <Input defaultValue="support@knowledgeworld.in" className="h-12 rounded-xl border-violet-100" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Contact Number</Label>
                  <Input defaultValue="+91 8888000330" className="h-12 rounded-xl border-violet-100" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl font-black">System Status</CardTitle>
                <CardDescription>Control platform availability.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Globe className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Maintenance Mode</div>
                      <div className="text-xs text-gray-500">Disable public access to the site.</div>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Bell className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">New Registrations</div>
                      <div className="text-xs text-gray-500">Allow new students to sign up.</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-8">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl max-w-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">Authentication Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Mail className="h-4 w-4 text-violet-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Email Verification (OTP)</div>
                    <div className="text-xs text-gray-500">Require OTP for new account creation.</div>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Shield className="h-4 w-4 text-violet-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Two-Factor Auth (2FA)</div>
                    <div className="text-xs text-gray-500">Enable 2FA for Admin & Teacher logins.</div>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-8">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl max-w-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-bold ml-1">Facebook URL</Label>
                <Input placeholder="https://facebook.com/..." className="h-12 rounded-xl border-violet-100" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">Twitter URL</Label>
                <Input placeholder="https://twitter.com/..." className="h-12 rounded-xl border-violet-100" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">Instagram URL</Label>
                <Input placeholder="https://instagram.com/..." className="h-12 rounded-xl border-violet-100" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">YouTube Channel</Label>
                <Input placeholder="https://youtube.com/..." className="h-12 rounded-xl border-violet-100" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTab;
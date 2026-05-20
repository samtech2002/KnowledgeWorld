"use client";

import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Trash2, 
  Clock, 
  Users, 
  Megaphone, 
  FileText, 
  Settings2, 
  Mail, 
  Zap,
  Plus,
  Edit3,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess } from "@/utils/toast";

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Course Launch", message: "Quantum Mechanics Mastery is now live!", target: "All Students", date: "2 hours ago" },
    { id: 2, title: "System Maintenance", message: "Scheduled maintenance on Sunday at 2 AM.", target: "All Users", date: "1 day ago" },
  ]);

  const [templates, setTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to KnowledgeWorld!", type: "Email" },
    { id: 2, name: "Subscription Expiring", subject: "Your plan is about to expire", type: "Push" },
  ]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newNotif = {
      id: Date.now(),
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      target: formData.get('target') as string,
      date: "Just now"
    };
    setNotifications([newNotif, ...notifications]);
    (e.target as HTMLFormElement).reset();
    showSuccess("Announcement sent successfully!");
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    showSuccess("Notification removed.");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Communication Center</h1>
        <p className="text-gray-500 font-medium">Manage announcements, message templates, and automated system alerts.</p>
      </div>

      <Tabs defaultValue="announcements" className="space-y-8">
        <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
          <TabsTrigger value="announcements" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Megaphone className="mr-2 h-4 w-4" /> Announcements
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <FileText className="mr-2 h-4 w-4" /> Templates
          </TabsTrigger>
          <TabsTrigger value="automated" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Zap className="mr-2 h-4 w-4" /> Automated Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <Card className="lg:col-span-1 border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl h-fit">
              <CardHeader>
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Send className="h-5 w-5 text-violet-600" /> Create Announcement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSend} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-bold ml-1">Target Audience</Label>
                    <Select name="target" defaultValue="All Students">
                      <SelectTrigger className="h-12 rounded-xl border-violet-100">
                        <SelectValue placeholder="Select Audience" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-violet-50">
                        <SelectItem value="All Users">All Users</SelectItem>
                        <SelectItem value="All Students">All Students</SelectItem>
                        <SelectItem value="All Teachers">All Teachers</SelectItem>
                        <SelectItem value="Partners Only">Partners Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold ml-1">Title</Label>
                    <Input name="title" placeholder="Announcement Title" className="h-12 rounded-xl border-violet-100" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold ml-1">Message</Label>
                    <Textarea name="message" placeholder="Write your message here..." className="min-h-[120px] rounded-xl border-violet-100" required />
                  </div>
                  <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-lg shadow-violet-100">
                    Send Announcement <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Bell className="h-6 w-6 text-violet-600" /> Sent History
              </h2>
              {notifications.map((notif) => (
                <Card key={notif.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl group">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-violet-50 text-violet-600 border-none font-bold px-3 py-1">
                          {notif.target}
                        </Badge>
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {notif.date}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(notif.id)}
                        className="rounded-xl hover:bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">{notif.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{notif.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl group hover:scale-[1.02] transition-all">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-violet-50 rounded-2xl text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all">
                      {template.type === 'Email' ? <Mail size={24} /> : <Bell size={24} />}
                    </div>
                    <Badge variant="outline" className="border-violet-100 text-violet-600 font-bold">{template.type}</Badge>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm font-medium text-gray-400 mb-6 truncate">{template.subject}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 rounded-xl font-bold border-violet-100 text-violet-600">
                      <Edit3 size={14} className="mr-1.5" /> Edit
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-xl text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-2 border-dashed border-violet-100 rounded-[2rem] bg-transparent flex items-center justify-center p-8 cursor-pointer hover:bg-violet-50/30 transition-all group">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <Plus size={24} />
                </div>
                <span className="font-black text-violet-400">New Template</span>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automated">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl max-w-3xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">System Event Triggers</CardTitle>
              <CardDescription>Configure which events trigger automatic notifications to users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "New Enrollment", desc: "Send welcome email when a student joins a course.", icon: <Users size={18} /> },
                { title: "Subscription Expiry", desc: "Alert students 3 days before their plan expires.", icon: <Clock size={18} /> },
                { title: "Exam Results", desc: "Notify students immediately when exam scores are ready.", icon: <CheckCircle2 size={18} /> },
                { title: "New Course Alert", desc: "Notify all students when a new course is published.", icon: <Zap size={18} /> },
                { title: "Partner Payout", desc: "Notify partners when their withdrawal is processed.", icon: <Settings2 size={18} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-violet-50/50 rounded-2xl border border-violet-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-violet-600">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-black text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-500 font-medium">{item.desc}</div>
                    </div>
                  </div>
                  <Switch defaultChecked={i < 3} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsTab;
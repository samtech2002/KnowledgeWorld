"use client";

import React, { useState } from 'react';
import { Bell, Send, Trash2, Clock, Users, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
    showSuccess("Notification sent successfully!");
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
    showSuccess("Notification removed.");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Notifications & Announcements</h1>
        <p className="text-gray-500 font-medium">Send system-wide alerts and manage communication.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="lg:col-span-1 border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl h-fit">
          <CardHeader>
            <CardTitle className="text-xl font-black flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-violet-600" /> Create Announcement
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
    </div>
  );
};

export default NotificationsTab;
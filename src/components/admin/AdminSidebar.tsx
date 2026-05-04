"use client";

import React from 'react';
import { LayoutDashboard, Users, BookOpen, CreditCard, Bell, Settings, Handshake } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Overview" },
    { icon: <Users size={20} />, label: "Students" },
    { icon: <Handshake size={20} />, label: "Partners" },
    { icon: <BookOpen size={20} />, label: "Courses" },
    { icon: <CreditCard size={20} />, label: "Subscriptions" },
    { icon: <Bell size={20} />, label: "Notifications" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-violet-100 hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-8 flex items-center gap-3 border-b border-violet-50">
        <div className="p-2 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl shadow-lg shadow-violet-200">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <span className="font-black text-xl tracking-tighter text-gray-900">ADMIN PANEL</span>
      </div>
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item, i) => (
          <button 
            key={i} 
            onClick={() => setActiveTab(item.label)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
              activeTab === item.label 
              ? "bg-violet-600 text-white shadow-xl shadow-violet-200 scale-[1.02]" 
              : "text-gray-500 hover:bg-violet-50 hover:text-violet-600"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-6 border-t border-violet-50">
        <div className="bg-violet-50 rounded-2xl p-4">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-1">System Status</p>
          <div className="flex items-center gap-2 text-sm font-black text-gray-900">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            All Systems Operational
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
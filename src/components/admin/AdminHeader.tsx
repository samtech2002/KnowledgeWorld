"use client";

import React from 'react';
import { Search, Bell, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AdminHeader = ({ searchQuery, setSearchQuery }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-violet-100 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="relative w-96 group">
        <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
        <Input 
          placeholder="Search analytics, students, courses..." 
          className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl focus:ring-2 focus:ring-violet-500 font-medium" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-violet-50">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/login')} 
          className="text-gray-400 hover:text-red-500 rounded-xl transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 pl-6 border-l border-violet-100">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-black text-gray-900">Admin User</div>
            <div className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Super Admin</div>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-violet-600 font-black shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
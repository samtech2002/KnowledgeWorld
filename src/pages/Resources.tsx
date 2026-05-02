"use client";

import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  FileText, 
  Download, 
  Search, 
  BookOpen, 
  FileVideo, 
  FileCode,
  ChevronRight,
  Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";

const RESOURCES = [
  { id: 1, title: "Quantum Mechanics Formula Sheet", type: "PDF", subject: "Physics", size: "2.4 MB", downloads: "1.2k" },
  { id: 2, title: "Calculus Previous Year Papers", type: "PDF", subject: "Mathematics", size: "5.1 MB", downloads: "3.5k" },
  { id: 3, title: "Organic Chemistry Reaction Map", type: "Image", subject: "Chemistry", size: "1.8 MB", downloads: "850" },
  { id: 4, title: "Python Cheat Sheet for Beginners", type: "PDF", subject: "Coding", size: "1.2 MB", downloads: "5.2k" },
  { id: 5, title: "English Grammar Quick Guide", type: "PDF", subject: "English", size: "3.1 MB", downloads: "2.1k" },
  { id: 6, title: "CCC Exam Model Question Paper", type: "PDF", subject: "Computer", size: "4.5 MB", downloads: "10k+" },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDownload = (title: string) => {
    showSuccess(`Downloading ${title}...`);
  };

  const filteredResources = RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Resource <span className="text-gradient">Library</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Access premium study materials, notes, and previous year papers curated by experts.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-16 group">
          <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
          <Input 
            placeholder="Search for notes, papers, or subjects..." 
            className="pl-14 h-16 rounded-[2rem] border-none bg-white shadow-2xl shadow-violet-100/50 text-lg font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((res) => (
            <Card key={res.id} className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-violet-50 rounded-2xl text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all">
                    {res.subject === 'Coding' ? <FileCode size={24} /> : <FileText size={24} />}
                  </div>
                  <Badge className="bg-cyan-50 text-cyan-600 border-none font-bold px-3 py-1">
                    {res.type}
                  </Badge>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-1 group-hover:text-violet-600 transition-colors">
                  {res.title}
                </h3>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400 mb-8">
                  <span className="flex items-center gap-1.5"><BookOpen size={14} /> {res.subject}</span>
                  <span className="flex items-center gap-1.5"><Download size={14} /> {res.downloads}</span>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-violet-50">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{res.size}</span>
                  <Button 
                    onClick={() => handleDownload(res.title)}
                    className="bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white font-black rounded-xl transition-all"
                  >
                    Download <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-24 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm font-black uppercase tracking-widest text-violet-200">Premium Resource</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">JEE/NEET 10-Year Solved Papers</h2>
              <p className="text-violet-100 font-medium opacity-80 mb-8">
                Get the ultimate collection of previous year questions with detailed video solutions and step-by-step explanations.
              </p>
              <Button className="bg-white text-violet-600 hover:bg-violet-50 font-black px-8 h-14 rounded-2xl shadow-xl">
                Access Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="h-48 w-48 bg-white/10 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center border border-white/20">
              <FileVideo size={80} className="text-white/40" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
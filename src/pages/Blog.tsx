"use client";

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag,
  Newspaper,
  Globe,
  Film,
  Gavel,
  Sprout,
  CloudSun,
  UserRound,
  Trophy
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export const BLOG_CATEGORIES = [
  { id: "All", label: "All", icon: <Globe size={16} /> },
  { id: "News", label: "News", icon: <Newspaper size={16} /> },
  { id: "Current Affairs", label: "Current Affairs", icon: <Globe size={16} /> },
  { id: "Entertainment", label: "Entertainment", icon: <Film size={16} /> },
  { id: "Politics", label: "Politics", icon: <Gavel size={16} /> },
  { id: "Agri", label: "Agri", icon: <Sprout size={16} /> },
  { id: "Weather", label: "Weather", icon: <CloudSun size={16} /> },
  { id: "Women", label: "Women", icon: <UserRound size={16} /> },
  { id: "Sport", label: "Sport", icon: <Trophy size={16} /> },
];

export const MOCK_POSTS = [
  {
    id: 1,
    title: "New Agricultural Reforms in Maharashtra 2024",
    description: "The state government has announced a new set of reforms aimed at boosting organic farming and providing better credit facilities to small-scale farmers.",
    content: "Full content here...",
    category: "Agri",
    author: "Admin",
    date: "Oct 24, 2023",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    gallery: [],
    seoTitle: "Agri Reforms Maharashtra 2024",
    seoDesc: "Latest agricultural reforms in Maharashtra for 2024."
  },
  {
    id: 2,
    title: "India's Performance in Asian Games: A Detailed Analysis",
    description: "A comprehensive look at how Indian athletes performed across various disciplines and what it means for the upcoming Olympics.",
    content: "Full content here...",
    category: "Sport",
    author: "Moderator",
    date: "Oct 22, 2023",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
    gallery: [],
    seoTitle: "India Asian Games Analysis",
    seoDesc: "Detailed analysis of India's performance in Asian Games."
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = MOCK_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <SEO 
        title="KnowledgeWorld Blog - News, Current Affairs & More" 
        description="Stay updated with the latest news, current affairs, politics, and sports from KnowledgeWorld."
      />
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Knowledge <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Your daily dose of news, current affairs, and expert perspectives.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
            <Input 
              placeholder="Search articles..." 
              className="pl-12 h-12 rounded-2xl border-none bg-white shadow-xl shadow-violet-100/30 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${
                  selectedCategory === cat.id 
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105" 
                  : "bg-white text-gray-500 hover:bg-violet-50 hover:text-violet-600 border border-violet-50"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl hover:scale-[1.02] transition-all duration-500">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-md text-violet-600 font-bold border-none px-3 py-1 rounded-lg">
                    {post.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-8">
                <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-violet-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 font-medium line-clamp-3 mb-6">
                  {post.description}
                </p>
              </CardContent>
              
              <CardFooter className="p-8 pt-0">
                <Link to={`/blog/${post.id}`} className="w-full">
                  <Button className="w-full bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white font-black h-12 rounded-xl transition-all">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
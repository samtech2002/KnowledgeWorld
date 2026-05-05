"use client";

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  MessageSquare,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_POSTS } from "./Blog";

const BlogPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = MOCK_POSTS.find(p => p.id === Number(id)) || MOCK_POSTS[0];

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <SEO 
        title={post.seoTitle} 
        description={post.seoDesc}
      />
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-violet-600 font-bold mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Blog
        </Link>

        <article className="space-y-10">
          <div className="space-y-6">
            <Badge className="bg-violet-100 text-violet-600 font-bold border-none px-4 py-1 rounded-full">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 font-bold">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                  {post.author.charAt(0)}
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-5 w-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-5 w-5" />
                <span>12 Comments</span>
              </div>
            </div>
          </div>

          <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
            <p>{post.description}</p>
            <p>{post.content}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>

          {/* Image Gallery Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-violet-600" /> Image Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=400`} 
                    alt="Gallery" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-violet-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600">
                <Share2 className="mr-2 h-4 w-4" /> Share Article
              </Button>
            </div>
            <div className="flex gap-2">
              {["#Maharashtra", "#Agri", "#News"].map(tag => (
                <span key={tag} className="text-sm font-bold text-gray-400 hover:text-violet-600 cursor-pointer transition-colors">{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostDetails;
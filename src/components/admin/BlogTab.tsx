"use client";

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit3, Trash2, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import BlogEditor from "./BlogEditor";
import { MOCK_POSTS } from "@/pages/Blog";

const BlogTab = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSave = (post: any) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      setPosts([post, ...posts]);
    }
    setEditingPost(null);
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Blog Management</h1>
          <p className="text-gray-500 font-medium">Create and manage articles across all categories.</p>
        </div>
        <Button 
          onClick={() => { setEditingPost(null); setIsEditorOpen(true); }}
          className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" /> Create New Post
        </Button>
      </div>

      <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
        <div className="p-8 border-b border-violet-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search articles..." 
              className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-50/50">
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Article</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Author</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((post) => (
                <tr key={post.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={post.image} className="h-12 w-12 rounded-xl object-cover" alt="" />
                      <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors max-w-xs truncate">{post.title}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{post.category}</Badge>
                  </td>
                  <td className="p-6 font-bold text-gray-500">{post.author}</td>
                  <td className="p-6 font-bold text-gray-400">{post.date}</td>
                  <td className="p-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                          <MoreVertical className="h-5 w-5 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                        <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" /> View Post
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => { setEditingPost(post); setIsEditorOpen(true); }}
                          className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer"
                        >
                          <Edit3 className="mr-2 h-4 w-4" /> Edit Post
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(post.id)}
                          className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <BlogEditor 
        isOpen={isEditorOpen} 
        onClose={() => { setIsEditorOpen(false); setEditingPost(null); }} 
        onSave={handleSave}
        editingPost={editingPost}
      />
    </div>
  );
};

export default BlogTab;
"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Tag, 
  Newspaper,
  CheckCircle2,
  XCircle,
  Star
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import BlogEditor from "@/components/blog/BlogEditor";
import { MOCK_POSTS, BLOG_CATEGORIES } from "@/pages/Blog";
import { showSuccess } from "@/utils/toast";

const BlogTab = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [comments, setComments] = useState([
    { id: 1, author: "Amit P.", text: "Great article on Maharashtra reforms!", post: "New Agricultural Reforms...", date: "1 hour ago", status: "Pending" },
    { id: 2, author: "Siddharth S.", text: "Very helpful analysis of the games.", post: "India's Performance in Asian...", date: "3 hours ago", status: "Approved" },
  ]);

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
    showSuccess("Post deleted successfully.");
  };

  const handleApproveComment = (id: number) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    showSuccess("Comment approved!");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Content Hub</h1>
          <p className="text-gray-500 font-medium">Manage your blog articles, categories, and reader engagement.</p>
        </div>
        <Button 
          onClick={() => { setEditingPost(null); setIsEditorOpen(true); }}
          className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" /> Create New Post
        </Button>
      </div>

      <Tabs defaultValue="articles" className="space-y-8">
        <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
          <TabsTrigger value="articles" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Newspaper className="mr-2 h-4 w-4" /> Articles
          </TabsTrigger>
          <TabsTrigger value="categories" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Tag className="mr-2 h-4 w-4" /> Categories
          </TabsTrigger>
          <TabsTrigger value="comments" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <MessageSquare className="mr-2 h-4 w-4" /> Comments
            {comments.filter(c => c.status === 'Pending').length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white border-none">
                {comments.filter(c => c.status === 'Pending').length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
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
              <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
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
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_CATEGORIES.filter(c => c.id !== "All").map((cat) => (
              <Card key={cat.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl group hover:scale-[1.02] transition-all">
                <CardContent className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all">
                      {cat.icon}
                    </div>
                    <div>
                      <div className="font-black text-gray-900">{cat.label}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">12 Articles</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-50 text-gray-400 hover:text-violet-600">
                    <Edit3 size={18} />
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Card className="border-2 border-dashed border-violet-100 rounded-[2rem] bg-transparent flex items-center justify-center p-8 cursor-pointer hover:bg-violet-50/30 transition-all group">
              <div className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <Plus size={24} />
                </div>
                <span className="font-black text-violet-400">Add Category</span>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl group">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                        {comment.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-gray-900">{comment.author}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{comment.date}</div>
                      </div>
                    </div>
                    <Badge className={`rounded-lg font-bold ${comment.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {comment.status}
                    </Badge>
                  </div>
                  <p className="text-gray-600 font-medium mb-4 italic">"{comment.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-violet-50">
                    <div className="text-xs font-bold text-gray-400">
                      On: <span className="text-violet-600">{comment.post}</span>
                    </div>
                    <div className="flex gap-2">
                      {comment.status === 'Pending' && (
                        <Button 
                          onClick={() => handleApproveComment(comment.id)}
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl"
                        >
                          <CheckCircle2 className="mr-1.5 h-4 w-4" /> Approve
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50 font-bold rounded-xl">
                        <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

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
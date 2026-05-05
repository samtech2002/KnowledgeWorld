"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Image as ImageIcon, Search, Save, X } from "lucide-react";
import { BLOG_CATEGORIES } from "@/pages/Blog";
import { showSuccess } from "@/utils/toast";

interface BlogEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: any) => void;
  editingPost?: any;
}

const BlogEditor = ({ isOpen, onClose, onSave, editingPost }: BlogEditorProps) => {
  const [formData, setFormData] = useState(editingPost || {
    title: "",
    category: "News",
    description: "",
    content: "",
    seoTitle: "",
    seoDesc: "",
    image: ""
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: editingPost?.id || Date.now(), date: new Date().toLocaleDateString() });
    showSuccess(editingPost ? "Post updated!" : "Post published!");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black">{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription className="text-lg font-medium">Fill in the details to publish a new article.</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSave} className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="font-bold ml-1">Article Title</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter catchy title..." 
                  className="h-12 rounded-xl border-violet-100" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="font-bold ml-1">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val) => setFormData({...formData, category: val})}
                >
                  <SelectTrigger className="h-12 rounded-xl border-violet-100">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-violet-50">
                    {BLOG_CATEGORIES.filter(c => c.id !== "All").map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-bold ml-1">Short Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief summary for the card..." 
                  className="rounded-xl border-violet-100 min-h-[100px]" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="font-bold ml-1">Featured Image URL</Label>
                <div className="flex gap-2">
                  <Input 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://..." 
                    className="h-12 rounded-xl border-violet-100" 
                  />
                  <Button type="button" variant="outline" className="rounded-xl h-12"><Upload size={18} /></Button>
                </div>
              </div>

              <div className="p-6 bg-violet-50/50 rounded-[2rem] border border-violet-100 space-y-4">
                <h4 className="text-sm font-black text-violet-600 uppercase tracking-widest flex items-center gap-2">
                  <Search size={14} /> SEO Settings
                </h4>
                <div className="space-y-3">
                  <Input 
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                    placeholder="SEO Title" 
                    className="h-10 rounded-lg border-white bg-white/50" 
                  />
                  <Textarea 
                    value={formData.seoDesc}
                    onChange={(e) => setFormData({...formData, seoDesc: e.target.value})}
                    placeholder="SEO Description" 
                    className="rounded-lg border-white bg-white/50 min-h-[80px]" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold ml-1">Full Content</Label>
            <Textarea 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your article here..." 
              className="rounded-xl border-violet-100 min-h-[200px]" 
              required 
            />
          </div>

          <DialogFooter className="pt-6">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-bold">Cancel</Button>
            <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">
              <Save className="mr-2 h-4 w-4" /> {editingPost ? "Update Post" : "Publish Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogEditor;
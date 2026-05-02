"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  User,
  ArrowLeft,
  Filter,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { showSuccess } from "@/utils/toast";

const INITIAL_DOUBTS = [
  { 
    id: 1, 
    question: "How to calculate the work done in an adiabatic process?", 
    subject: "Physics", 
    status: "Solved", 
    askedBy: "Aryan S.", 
    date: "2 hours ago",
    replies: 1
  },
  { 
    id: 2, 
    question: "Difference between map() and forEach() in JavaScript?", 
    subject: "Coding", 
    status: "Pending", 
    askedBy: "Priya P.", 
    date: "5 hours ago",
    replies: 0
  },
  { 
    id: 3, 
    question: "What are the main themes in 'An Astrologer's Day'?", 
    subject: "English", 
    status: "Solved", 
    askedBy: "Rahul V.", 
    date: "1 day ago",
    replies: 2
  }
];

const DoubtHub = () => {
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState(INITIAL_DOUBTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAskDialogOpen, setIsAskDialogOpen] = useState(false);

  const handleAskDoubt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDoubt = {
      id: Date.now(),
      question: formData.get('question') as string,
      subject: formData.get('subject') as string,
      status: "Pending",
      askedBy: "You",
      date: "Just now",
      replies: 0
    };
    setDoubts([newDoubt, ...doubts]);
    setIsAskDialogOpen(false);
    showSuccess("Your doubt has been posted! Teachers will respond soon.");
  };

  const filteredDoubts = doubts.filter(d => 
    d.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFF] pb-20">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/student')} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-violet-600 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="font-black text-xl text-gray-900">Doubt Hub</h1>
          </div>
        </div>
        <Dialog open={isAskDialogOpen} onOpenChange={setIsAskDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white font-black px-6 rounded-xl shadow-lg shadow-violet-100">
              <Plus className="mr-2 h-4 w-4" /> Ask a Doubt
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Post Your Doubt</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAskDoubt} className="space-y-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                <Input name="subject" placeholder="e.g. Physics, Math" className="rounded-xl border-violet-100" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Question</label>
                <Textarea name="question" placeholder="Describe your doubt in detail..." className="rounded-xl border-violet-100 min-h-[120px]" required />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-12 rounded-xl">
                  Post Question <Send className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </nav>

      <main className="max-w-4xl mx-auto p-8">
        <div className="relative mb-10 group">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
          <Input 
            placeholder="Search doubts by topic or subject..." 
            className="pl-12 h-14 rounded-2xl border-none bg-white shadow-xl shadow-violet-100/50 font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filteredDoubts.map((doubt) => (
            <Card key={doubt.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl hover:scale-[1.01] transition-all cursor-pointer group">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <Badge className={`rounded-lg font-bold px-3 py-1 ${
                    doubt.status === 'Solved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {doubt.status === 'Solved' ? <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> : <Clock className="mr-1.5 h-3.5 w-3.5" />}
                    {doubt.status}
                  </Badge>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{doubt.subject}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-6 group-hover:text-violet-600 transition-colors">
                  {doubt.question}
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-violet-50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                      <User size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-500">{doubt.askedBy} • {doubt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-violet-600">
                    <MessageSquare size={16} />
                    {doubt.replies} {doubt.replies === 1 ? 'Reply' : 'Replies'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoubtHub;
"use client";

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  Clock, 
  User,
  Send,
  Filter,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { showSuccess } from "@/utils/toast";

const MOCK_DOUBTS = [
  { id: 1, student: "Aryan S.", subject: "Physics", question: "How to calculate the work done in an adiabatic process?", date: "2 hours ago", status: "Pending" },
  { id: 2, student: "Priya P.", subject: "Physics", question: "Can you explain the difference between interference and diffraction?", date: "5 hours ago", status: "Pending" },
  { id: 3, student: "Rahul V.", subject: "Mathematics", question: "What is the geometric interpretation of a derivative?", date: "1 day ago", status: "Solved" },
];

const DoubtsTab = () => {
  const [doubts, setDoubts] = useState(MOCK_DOUBTS);
  const [selectedDoubt, setSelectedDoubt] = useState<any>(null);
  const [reply, setReply] = useState("");

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    setDoubts(doubts.map(d => d.id === selectedDoubt.id ? { ...d, status: 'Solved' } : d));
    showSuccess("Your response has been sent to the student!");
    setSelectedDoubt(null);
    setReply("");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Doubt Resolution</h1>
          <p className="text-gray-500 font-medium">Answer student queries and clear their conceptual hurdles.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-orange-500 text-white border-none font-black px-4 py-1.5 rounded-full">
            {doubts.filter(d => d.status === 'Pending').length} Pending Doubts
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {doubts.map((doubt) => (
          <Card key={doubt.id} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl overflow-hidden group">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                    {doubt.student.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{doubt.student}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{doubt.date} • {doubt.subject}</div>
                  </div>
                </div>
                <Badge className={`rounded-lg font-bold px-3 py-1 ${
                  doubt.status === 'Solved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {doubt.status === 'Solved' ? <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> : <Clock className="mr-1.5 h-3.5 w-3.5" />}
                  {doubt.status}
                </Badge>
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-8 leading-relaxed">
                "{doubt.question}"
              </h3>

              <div className="flex justify-end pt-6 border-t border-violet-50">
                {doubt.status === 'Pending' ? (
                  <Button 
                    onClick={() => setSelectedDoubt(doubt)}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100"
                  >
                    Answer Doubt <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" className="text-green-600 font-black hover:bg-green-50 rounded-xl">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> View Response
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedDoubt} onOpenChange={(open) => !open && setSelectedDoubt(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
          {selectedDoubt && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">Respond to Doubt</DialogTitle>
                <DialogDescription className="text-gray-500 font-medium">Provide a clear, concise explanation for {selectedDoubt.student}.</DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
                  <p className="text-sm font-bold text-violet-600 uppercase tracking-widest mb-2">Student Question</p>
                  <p className="text-gray-700 font-medium leading-relaxed italic">"{selectedDoubt.question}"</p>
                </div>
                <form onSubmit={handleReply} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Your Explanation</label>
                    <Textarea 
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Type your answer here..." 
                      className="min-h-[180px] rounded-2xl border-violet-100 focus:ring-violet-500 p-6" 
                      required 
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setSelectedDoubt(null)} className="rounded-xl font-bold">Cancel</Button>
                    <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg">
                      Send Response <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoubtsTab;
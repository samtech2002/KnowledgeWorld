"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  BookOpen, 
  LogOut, 
  ShieldCheck, 
  Trash2, 
  Edit3,
  Filter,
  CheckCircle2,
  Newspaper,
  LayoutDashboard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { showSuccess } from "@/utils/toast";
import { CCC_QUESTION_BANK, Question } from "@/data/ccc-questions";
import BlogTab from "@/components/admin/BlogTab";

const ModeratorDashboard = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>(CCC_QUESTION_BANK.slice(0, 40));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuestion: Question = {
      id: Date.now(),
      question: formData.get('question') as string,
      options: [
        formData.get('opt1') as string,
        formData.get('opt2') as string,
        formData.get('opt3') as string,
        formData.get('opt4') as string,
      ],
      correct: formData.get('correct') as string,
      module: formData.get('subject') as string,
    };
    setQuestions([newQuestion, ...questions]);
    setIsAddDialogOpen(false);
    showSuccess("Question added successfully!");
  };

  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
    showSuccess("Question removed.");
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === "All" || q.module === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ["Basics", "OS", "Writer", "Calc", "Impress", "Internet", "Finance", "Security", "Physics", "Mathematics"];

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg shadow-lg shadow-violet-200">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900">MODERATOR PORTAL</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/login')} className="text-gray-400 hover:text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black shadow-sm">
            M
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <Tabs defaultValue="questions" className="space-y-8">
          <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
            <TabsTrigger value="questions" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
              <BookOpen className="mr-2 h-4 w-4" /> Question Bank
            </TabsTrigger>
            <TabsTrigger value="blog" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
              <Newspaper className="mr-2 h-4 w-4" /> Blog Posts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">Question Bank</h1>
                <p className="text-gray-500 font-medium">Manage and add questions for various subjects and exams.</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105">
                    <Plus className="mr-2 h-5 w-5" /> Add Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black">Add New Question</DialogTitle>
                    <CardDescription className="text-lg font-medium">Create a new question with multiple choice options.</CardDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddQuestion} className="space-y-6 mt-6">
                    <div className="space-y-2">
                      <Label className="font-bold ml-1">Subject / Module</Label>
                      <Select name="subject" required>
                        <SelectTrigger className="h-12 rounded-xl border-violet-100">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-violet-50">
                          {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold ml-1">Question Text</Label>
                      <Input name="question" placeholder="Enter the question..." className="h-12 rounded-xl border-violet-100" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-bold ml-1 text-xs">Option 1</Label>
                        <Input name="opt1" placeholder="Option A" className="h-11 rounded-xl border-violet-100" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold ml-1 text-xs">Option 2</Label>
                        <Input name="opt2" placeholder="Option B" className="h-11 rounded-xl border-violet-100" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold ml-1 text-xs">Option 3</Label>
                        <Input name="opt3" placeholder="Option C" className="h-11 rounded-xl border-violet-100" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold ml-1 text-xs">Option 4</Label>
                        <Input name="opt4" placeholder="Option D" className="h-11 rounded-xl border-violet-100" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold ml-1">Correct Answer</Label>
                      <Input name="correct" placeholder="Must match one of the options exactly" className="h-12 rounded-xl border-violet-100" required />
                    </div>
                    <DialogFooter className="pt-6">
                      <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                      <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Save Question</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
                <Input 
                  placeholder="Search questions..." 
                  className="pl-12 h-12 rounded-2xl border-none bg-white shadow-xl shadow-violet-100/30 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                <Filter className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                {["All", ...subjects.slice(0, 6)].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                      selectedSubject === sub 
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105" 
                      : "bg-white text-gray-500 hover:bg-violet-50 hover:text-violet-600 border border-violet-50"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredQuestions.map((q) => (
                <Card key={q.id} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-violet-50 text-violet-600 border-none font-bold px-3 py-1">
                        {q.module}
                      </Badge>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-50 text-violet-600">
                          <Edit3 size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(q.id)} className="rounded-xl hover:bg-red-50 text-red-500">
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-6">{q.question}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, i) => (
                        <div key={i} className={`p-4 rounded-xl border-2 flex items-center justify-between ${opt === q.correct ? 'border-green-200 bg-green-50/50' : 'border-gray-50 bg-gray-50/30'}`}>
                          <span className={`text-sm font-bold ${opt === q.correct ? 'text-green-700' : 'text-gray-600'}`}>{opt}</span>
                          {opt === q.correct && <CheckCircle2 size={16} className="text-green-600" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <BlogTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ModeratorDashboard;
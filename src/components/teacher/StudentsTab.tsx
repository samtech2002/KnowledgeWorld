"use client";

import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Eye,
  Download,
  GraduationCap,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

const MOCK_STUDENTS = [
  { id: 1, name: "Aryan Sharma", course: "Advanced Physics", progress: 85, lastActive: "2 hours ago", status: "On Track" },
  { id: 2, name: "Priya Patel", course: "Advanced Physics", progress: 42, lastActive: "5 hours ago", status: "Falling Behind" },
  { id: 3, name: "Rahul Verma", course: "Mathematics Mastery", progress: 92, lastActive: "1 day ago", status: "Excellent" },
  { id: 4, name: "Anjali Gupta", course: "Mathematics Mastery", progress: 65, lastActive: "3 hours ago", status: "On Track" },
];

const MOCK_ASSIGNMENTS = [
  { id: 1, student: "Aryan Sharma", title: "Quantum Mechanics Quiz 1", date: "Oct 24", status: "Pending" },
  { id: 2, student: "Siddharth Singh", title: "Calculus Problem Set", date: "Oct 23", status: "Graded" },
];

const StudentsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900">Student Directory</h2>
              <p className="text-gray-500 font-medium">Monitor engagement and progress across your courses.</p>
            </div>
            <div className="relative w-full md:w-72 group">
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
              <Input 
                placeholder="Search students..." 
                className="pl-12 h-11 bg-white border-violet-100 rounded-xl font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-violet-50/50">
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Course</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Progress</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-50">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-violet-50/30 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{student.name}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active {student.lastActive}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{student.course}</Badge>
                      </td>
                      <td className="p-6 w-48">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-black text-gray-400">
                            <span>{student.progress}%</span>
                          </div>
                          <Progress value={student.progress} className="h-1.5 bg-violet-50" />
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge className={`rounded-lg font-bold ${
                          student.status === 'Excellent' ? 'bg-green-50 text-green-600' : 
                          student.status === 'On Track' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {student.status}
                        </Badge>
                      </td>
                      <td className="p-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                              <MoreVertical className="h-5 w-5 text-gray-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                            <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                              <MessageSquare className="mr-2 h-4 w-4" /> Message Student
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" /> View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                              <Download className="mr-2 h-4 w-4" /> Export Report
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
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden">
            <CardHeader className="bg-violet-50/50 border-b border-violet-100">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <FileText className="h-5 w-5 text-violet-600" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {MOCK_ASSIGNMENTS.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-[#F8F9FF] rounded-2xl border border-violet-50 group hover:border-violet-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`text-[10px] font-black border-none ${assignment.status === 'Pending' ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                      {assignment.status}
                    </Badge>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{assignment.date}</span>
                  </div>
                  <div className="font-black text-gray-900 text-sm mb-1">{assignment.title}</div>
                  <div className="text-xs font-bold text-violet-600 mb-4">{assignment.student}</div>
                  <Button 
                    size="sm" 
                    variant={assignment.status === 'Pending' ? 'default' : 'outline'}
                    className={`w-full rounded-xl font-bold shadow-sm ${assignment.status === 'Pending' ? 'bg-violet-600 hover:bg-violet-700' : 'border-violet-100 text-violet-600'}`}
                  >
                    {assignment.status === 'Pending' ? 'Grade Now' : 'View Grade'}
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-violet-600">
                View All Assignments
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl shadow-violet-200/50 bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
            <h3 className="text-xl font-black mb-4 relative z-10">Class Performance</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-violet-200">Average Score</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-1.5 bg-white/20" />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <TrendingUp className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <div className="text-lg font-black">+12%</div>
                  <div className="text-[10px] font-bold text-violet-200 uppercase tracking-widest">Engagement this week</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;
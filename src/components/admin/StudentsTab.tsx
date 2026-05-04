"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  ShieldCheck, 
  Trash2,
  Eye,
  BookOpen,
  Trophy,
  Calendar
} from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentsTabProps {
  students: any[];
  searchQuery: string;
  onRegisterStudent: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StudentsTab = ({ students, searchQuery, onRegisterStudent }: StudentsTabProps) => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [courseFilter, setCourseFilter] = useState("All");

  const allCourses = Array.from(new Set(students.flatMap(s => s.enrolledCourses || [])));

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === "All" || s.enrolledCourses?.includes(courseFilter);
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Student Management</h1>
          <p className="text-gray-500 font-medium">Monitor student progress, enrollments, and exam performance.</p>
        </div>
        <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105">
              <Plus className="mr-2 h-5 w-5" /> Register Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black">Register New Student</DialogTitle>
              <CardDescription className="text-lg font-medium">Manually enroll a student into the platform.</CardDescription>
            </DialogHeader>
            <form onSubmit={(e) => { onRegisterStudent(e); setIsRegisterDialogOpen(false); }} className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label className="font-bold ml-1">Full Name</Label>
                <Input name="name" placeholder="e.g. John Doe" className="h-12 rounded-xl border-violet-100" required />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">Email Address</Label>
                <Input name="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl border-violet-100" required />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">Subscription Plan</Label>
                <Select name="plan" defaultValue="Monthly">
                  <SelectTrigger className="h-12 rounded-xl border-violet-100">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-violet-50">
                    <SelectItem value="Trial">Trial (7 Days)</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Half-Yearly">Half-Yearly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsRegisterDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Enroll Student</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
        <div className="p-8 border-b border-violet-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
              value={searchQuery}
              readOnly
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="h-11 rounded-xl border-violet-100 bg-white w-full md:w-64 font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-violet-600" />
                  <SelectValue placeholder="Filter by Course" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-50">
                <SelectItem value="All">All Courses</SelectItem>
                {allCourses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">Export CSV</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-50/50">
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Enrolled Courses</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Exams Taken</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{student.name}</div>
                        <div className="text-xs font-bold text-gray-400">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledCourses?.length > 0 ? (
                        student.enrolledCourses.map((c: string, i: number) => (
                          <Badge key={i} variant="secondary" className="bg-violet-50 text-violet-600 border-none text-[10px] font-bold">
                            {c}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs font-bold text-gray-400 italic">No enrollments</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="font-black text-gray-900">{student.exams?.length || 0}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${student.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                      <div className={`h-2 w-2 rounded-full ${student.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {student.status}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setSelectedStudent(student)}
                        className="rounded-xl hover:bg-violet-100 text-violet-600"
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                            <MoreVertical className="h-5 w-5 text-gray-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                          <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" /> Email Student
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                            <ShieldCheck className="mr-2 h-4 w-4" /> Manage Plan
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-6 mb-6">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-violet-100 flex items-center justify-center text-violet-600 text-3xl font-black">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-black">{selectedStudent.name}</DialogTitle>
                    <CardDescription className="text-lg font-medium">{selectedStudent.email}</CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-violet-600 text-white border-none font-bold">{selectedStudent.plan} Plan</Badge>
                      <Badge variant="outline" className="border-green-200 text-green-600 font-bold">{selectedStudent.status}</Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-violet-600" /> Enrolled Courses
                  </h3>
                  <div className="space-y-3">
                    {selectedStudent.enrolledCourses?.map((course: string, i: number) => (
                      <div key={i} className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100 flex items-center justify-between">
                        <span className="font-bold text-gray-700">{course}</span>
                        <Badge className="bg-white text-violet-600 border-violet-100 font-bold">Active</Badge>
                      </div>
                    ))}
                    {(!selectedStudent.enrolledCourses || selectedStudent.enrolledCourses.length === 0) && (
                      <p className="text-sm font-medium text-gray-400 italic">No courses enrolled yet.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" /> Exam Performance
                  </h3>
                  <div className="space-y-3">
                    {selectedStudent.exams?.map((exam: any, i: number) => (
                      <div key={i} className="p-4 bg-yellow-50/30 rounded-2xl border border-yellow-100 flex items-center justify-between">
                        <div>
                          <div className="font-black text-gray-900">{exam.subject}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exam.date}</div>
                        </div>
                        <div className="text-xl font-black text-yellow-600">{exam.score}</div>
                      </div>
                    ))}
                    {(!selectedStudent.exams || selectedStudent.exams.length === 0) && (
                      <p className="text-sm font-medium text-gray-400 italic">No exams taken yet.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-violet-50">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Join Date</div>
                    <div className="font-black text-gray-900 flex items-center justify-center gap-1.5">
                      <Calendar className="h-4 w-4 text-violet-400" /> {selectedStudent.joinDate}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Expiry Date</div>
                    <div className="font-black text-gray-900">{selectedStudent.expiryDate}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Paid</div>
                    <div className="font-black text-violet-600">₹{selectedStudent.amount}</div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-10">
                <Button onClick={() => setSelectedStudent(null)} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-12 rounded-xl">
                  Close Details
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsTab;
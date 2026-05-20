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
  Calendar,
  CheckSquare,
  Square,
  Download,
  UserMinus,
  Activity,
  Clock,
  CreditCard
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
import { Checkbox } from "@/components/ui/checkbox";
import { showSuccess } from "@/utils/toast";

interface StudentsTabProps {
  students: any[];
  searchQuery: string;
  onRegisterStudent: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StudentsTab = ({ students, searchQuery, onRegisterStudent }: StudentsTabProps) => {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allCourses = Array.from(new Set(students.flatMap(s => s.enrolledCourses || [])));

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === "All" || s.enrolledCourses?.includes(courseFilter);
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    const matchesPlan = planFilter === "All" || s.plan === planFilter;
    return matchesSearch && matchesCourse && matchesStatus && matchesPlan;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map(s => s.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    showSuccess(`Successfully removed ${selectedIds.length} students.`);
    setSelectedIds([]);
  };

  const handleBulkEmail = () => {
    showSuccess(`Email composer opened for ${selectedIds.length} students.`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Student Management</h1>
          <p className="text-gray-500 font-medium">Monitor student progress, enrollments, and exam performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500 h-14 px-6">
            <Download className="mr-2 h-5 w-5" /> Export Data
          </Button>
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
      </div>

      {selectedIds.length > 0 && (
        <div className="mb-6 p-4 bg-violet-600 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-4 text-white font-bold">
            <CheckSquare className="h-5 w-5" />
            {selectedIds.length} students selected
          </div>
          <div className="flex gap-3">
            <Button onClick={handleBulkEmail} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none font-bold rounded-xl">
              <Mail className="mr-2 h-4 w-4" /> Bulk Email
            </Button>
            <Button onClick={handleBulkDelete} variant="destructive" className="bg-red-500 hover:bg-red-600 font-bold rounded-xl">
              <UserMinus className="mr-2 h-4 w-4" /> Bulk Remove
            </Button>
          </div>
        </div>
      )}

      <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
        <div className="p-8 border-b border-violet-50 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
              value={searchQuery}
              readOnly
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="h-11 rounded-xl border-violet-100 bg-white w-40 font-bold text-gray-600">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-50">
                <SelectItem value="All">All Courses</SelectItem>
                {allCourses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 rounded-xl border-violet-100 bg-white w-32 font-bold text-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-50">
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="h-11 rounded-xl border-violet-100 bg-white w-32 font-bold text-gray-600">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-violet-50">
                <SelectItem value="All">All Plans</SelectItem>
                <SelectItem value="Trial">Trial</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-50/50">
                <th className="p-6 w-12">
                  <Checkbox 
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                    onCheckedChange={toggleSelectAll}
                    className="border-violet-200 data-[state=checked]:bg-violet-600"
                  />
                </th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Plan</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Enrolled Courses</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {filteredStudents.map((student) => (
                <tr key={student.id} className={`hover:bg-violet-50/30 transition-colors group ${selectedIds.includes(student.id) ? 'bg-violet-50/50' : ''}`}>
                  <td className="p-6">
                    <Checkbox 
                      checked={selectedIds.includes(student.id)}
                      onCheckedChange={() => toggleSelect(student.id)}
                      className="border-violet-200 data-[state=checked]:bg-violet-600"
                    />
                  </td>
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
                    <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{student.plan}</Badge>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-wrap gap-1">
                      {student.enrolledCourses?.length > 0 ? (
                        student.enrolledCourses.slice(0, 2).map((c: string, i: number) => (
                          <Badge key={i} variant="secondary" className="bg-violet-50 text-violet-600 border-none text-[10px] font-bold">
                            {c}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs font-bold text-gray-400 italic">No enrollments</span>
                      )}
                      {student.enrolledCourses?.length > 2 && (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-400 border-none text-[10px] font-bold">
                          +{student.enrolledCourses.length - 2} more
                        </Badge>
                      )}
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
        <DialogContent className="sm:max-w-[800px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          {selectedStudent && (
            <div className="flex flex-col h-[90vh]">
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-10 text-white">
                <div className="flex items-center gap-8">
                  <div className="h-24 w-24 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-4xl font-black border border-white/30">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-4xl font-black text-white">{selectedStudent.name}</DialogTitle>
                      <Badge className="bg-white text-violet-600 border-none font-black px-4 py-1 rounded-full">
                        {selectedStudent.status}
                      </Badge>
                    </div>
                    <p className="text-violet-100 text-lg font-medium mt-1">{selectedStudent.email}</p>
                    <div className="flex gap-6 mt-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-violet-200">
                        <Calendar className="h-4 w-4" /> Joined {selectedStudent.joinDate}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-violet-200">
                        <CreditCard className="h-4 w-4" /> {selectedStudent.plan} Plan
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-4">
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
                    </section>

                    <section>
                      <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-4">
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
                    </section>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 mb-4">
                        <Activity className="h-5 w-5 text-cyan-600" /> Recent Activity
                      </h3>
                      <div className="space-y-4">
                        {[
                          { action: "Logged in from Chrome (Windows)", time: "2 hours ago" },
                          { action: "Completed Lesson 4: Quantum Basics", time: "5 hours ago" },
                          { action: "Started Physics Final Exam", time: "1 day ago" },
                        ].map((act, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="h-2 w-2 mt-2 rounded-full bg-cyan-500 shrink-0"></div>
                            <div>
                              <p className="text-sm font-bold text-gray-700">{act.action}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{act.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="p-6 bg-violet-50 rounded-[2rem] border border-violet-100">
                      <h3 className="text-lg font-black text-violet-600 mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" /> Subscription Management
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-500">Expires On</span>
                          <span className="font-black text-gray-900">{selectedStudent.expiryDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-500">Total Paid</span>
                          <span className="font-black text-violet-600">₹{selectedStudent.amount}</span>
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button variant="outline" className="flex-1 rounded-xl font-bold border-violet-200 text-violet-600">Extend 30 Days</Button>
                          <Button variant="outline" className="flex-1 rounded-xl font-bold border-red-100 text-red-500 hover:bg-red-50">Cancel Plan</Button>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setSelectedStudent(null)} className="rounded-xl font-bold">Close Profile</Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 rounded-xl shadow-lg">
                  <Mail className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsTab;
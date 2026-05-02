"use client";

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Mail, ShieldCheck, Trash2 } from "lucide-react";
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

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Student Management</h1>
          <p className="text-gray-500 font-medium">Monitor student progress and subscription details.</p>
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
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">Export CSV</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-violet-50/50">
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Plan</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Join Date</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Expiry Date</th>
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
                    <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{student.plan}</Badge>
                  </td>
                  <td className="p-6">
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${student.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                      <div className={`h-2 w-2 rounded-full ${student.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      {student.status}
                    </div>
                  </td>
                  <td className="p-6 font-bold text-gray-500">{student.joinDate}</td>
                  <td className="p-6 font-bold text-gray-500">{student.expiryDate}</td>
                  <td className="p-6 text-right">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentsTab;
"use client";

import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit3, Users, Trash2 } from "lucide-react";
import { Card, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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

interface CoursesTabProps {
  courses: any[];
  searchQuery: string;
  onAddCourse: (e: React.FormEvent<HTMLFormElement>, isFree: boolean) => void;
  onEditCourse: (e: React.FormEvent<HTMLFormElement>, isFree: boolean, editingCourse: any) => void;
  onDeleteCourse: (id: number) => void;
}

const CoursesTab = ({ courses, searchQuery, onAddCourse, onEditCourse, onDeleteCourse }: CoursesTabProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isFree, setIsFree] = useState(false);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-500 font-medium">Manage, edit, and monitor all educational content.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => { setIsAddDialogOpen(open); if(!open) setIsFree(false); }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105">
              <Plus className="mr-2 h-5 w-5" /> Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black">Create New Course</DialogTitle>
              <CardDescription className="text-lg font-medium">Fill in the details to launch a new course on the platform.</CardDescription>
            </DialogHeader>
            <form onSubmit={(e) => { onAddCourse(e, isFree); setIsAddDialogOpen(false); }} className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Course Title</Label>
                  <Input name="title" placeholder="e.g. Advanced Physics" className="h-12 rounded-xl border-violet-100" required />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Instructor Name</Label>
                  <Input name="instructor" placeholder="e.g. Dr. Smith" className="h-12 rounded-xl border-violet-100" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Category</Label>
                  <Input name="category" placeholder="e.g. Science" className="h-12 rounded-xl border-violet-100" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="font-bold ml-1">Price (₹)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500">Mark as Free</span>
                      <Switch checked={isFree} onCheckedChange={setIsFree} />
                    </div>
                  </div>
                  <Input 
                    name="price" 
                    type="number" 
                    placeholder="1700" 
                    className="h-12 rounded-xl border-violet-100" 
                    disabled={isFree}
                    required={!isFree} 
                  />
                </div>
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Create Course</Button>
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
              placeholder="Search by title or instructor..." 
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
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Course Details</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Students</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                        {course.title.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{course.title}</div>
                        <div className="text-xs font-bold text-gray-400">by {course.instructor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{course.category}</Badge>
                  </td>
                  <td className="p-6 font-black text-gray-900">
                    {course.price === "0" ? (
                      <span className="text-green-600 font-black">FREE</span>
                    ) : (
                      `₹${course.price}`
                    )}
                  </td>
                  <td className="p-6 font-bold text-gray-500">{course.students.toLocaleString()}</td>
                  <td className="p-6">
                    <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${course.status === 'Active' ? 'text-green-600' : 'text-orange-500'}`}>
                      <div className={`h-2 w-2 rounded-full ${course.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                      {course.status}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                          <MoreVertical className="h-5 w-5 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                        <DropdownMenuItem 
                          onClick={() => { setEditingCourse(course); setIsFree(course.price === "0"); }}
                          className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer"
                        >
                          <Edit3 className="mr-2 h-4 w-4" /> Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                          <Users className="mr-2 h-4 w-4" /> View Students
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDeleteCourse(course.id)}
                          className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Course
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

      {/* Edit Dialog */}
      <Dialog open={!!editingCourse} onOpenChange={(open) => { if(!open) { setEditingCourse(null); setIsFree(false); } }}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black">Edit Course</DialogTitle>
            <CardDescription className="text-lg font-medium">Update the course information below.</CardDescription>
          </DialogHeader>
          {editingCourse && (
            <form onSubmit={(e) => { onEditCourse(e, isFree, editingCourse); setEditingCourse(null); }} className="space-y-6 mt-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Course Title</Label>
                  <Input name="title" defaultValue={editingCourse.title} className="h-12 rounded-xl border-violet-100" required />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Instructor Name</Label>
                  <Input name="instructor" defaultValue={editingCourse.instructor} className="h-12 rounded-xl border-violet-100" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold ml-1">Category</Label>
                  <Input name="category" defaultValue={editingCourse.category} className="h-12 rounded-xl border-violet-100" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Label className="font-bold ml-1">Price (₹)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500">Mark as Free</span>
                      <Switch checked={isFree} onCheckedChange={setIsFree} />
                    </div>
                  </div>
                  <Input 
                    name="price" 
                    type="number" 
                    defaultValue={isFree ? "" : editingCourse.price} 
                    className="h-12 rounded-xl border-violet-100" 
                    disabled={isFree}
                    required={!isFree} 
                  />
                </div>
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" onClick={() => setEditingCourse(null)} className="rounded-xl font-bold">Cancel</Button>
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoursesTab;
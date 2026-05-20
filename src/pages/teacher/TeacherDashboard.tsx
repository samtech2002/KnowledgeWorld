import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  FileText, 
  Users, 
  Calendar, 
  Plus, 
  Clock, 
  LogOut,
  X,
  CheckCircle2,
  ExternalLink,
  LayoutDashboard,
  MessageSquare,
  GraduationCap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/utils/toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import StudentsTab from "@/components/teacher/StudentsTab";
import DoubtsTab from "@/components/teacher/DoubtsTab";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeClasses, setActiveClasses] = useState<number[]>([]);

  const handleStartClass = (id: number, subject: string) => {
    if (activeClasses.includes(id)) {
      window.open('https://meet.google.com/new', '_blank');
      showSuccess(`Re-opening Google Meet for ${subject}`);
      return;
    }
    const meetWindow = window.open('https://meet.google.com/new', '_blank');
    if (meetWindow) {
      setActiveClasses([...activeClasses, id]);
      showSuccess(`Live session for ${subject} started on Google Meet!`);
    } else {
      showSuccess("Please allow popups to start the Google Meet session.");
    }
  };

  const schedule = [
    { day: "Monday", classes: ["Physics (10:30 AM)", "Math (02:00 PM)"] },
    { day: "Tuesday", classes: ["Physics (11:00 AM)", "Doubt Session (04:00 PM)"] },
    { day: "Wednesday", classes: ["Math (10:30 AM)", "Advanced Physics (01:00 PM)"] },
    { day: "Thursday", classes: ["Physics (10:30 AM)", "Math (02:00 PM)"] },
    { day: "Friday", classes: ["Weekly Quiz (11:00 AM)", "Math (03:00 PM)"] },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg shadow-lg shadow-violet-200">
            <Video className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900">TEACHER PORTAL</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => navigate('/teacher/create')}
            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-6 rounded-xl shadow-lg shadow-violet-100"
          >
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/login')} className="text-gray-400 hover:text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black shadow-sm">
            T
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
              <TabsTrigger value="overview" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="students" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
                <Users className="mr-2 h-4 w-4" /> Students
              </TabsTrigger>
              <TabsTrigger value="doubts" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
                <MessageSquare className="mr-2 h-4 w-4" /> Doubts
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600 bg-white">
                    <Calendar className="mr-2 h-4 w-4" /> View Schedule
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px] rounded-l-[2rem]">
                  <SheetHeader className="mb-8">
                    <SheetTitle className="text-2xl font-black">Weekly Schedule</SheetTitle>
                    <SheetDescription className="font-medium">Your upcoming teaching sessions for the week.</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6">
                    {schedule.map((item, i) => (
                      <div key={i} className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                        <div className="font-black text-violet-600 mb-2 uppercase tracking-wider text-xs">{item.day}</div>
                        <div className="space-y-2">
                          {item.classes.map((cls, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500"></div>
                              {cls}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600 bg-white">Earnings</Button>
            </div>
          </div>

          <TabsContent value="overview" className="animate-in fade-in duration-500">
            <div className="mb-12">
              <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome, Prof. Sharma</h1>
              <p className="text-gray-500 font-medium">You have 2 live classes scheduled for today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-10">
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: "Total Students", value: "1,240", color: "text-violet-600" },
                    { label: "Course Rating", value: "4.8/5", color: "text-cyan-600" },
                    { label: "Watch Time", value: "420h", color: "text-fuchsia-600" },
                  ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl">
                      <CardContent className="p-6">
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900">Your Active Courses</h2>
                    <span className="text-sm font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">2 Courses Active</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { title: "Advanced Physics", students: 450, lessons: 24, image: "bg-gradient-to-br from-violet-100 to-violet-200" },
                      { title: "Mathematics Mastery", students: 790, lessons: 32, image: "bg-gradient-to-br from-cyan-100 to-cyan-200" },
                    ].map((course, i) => (
                      <Card key={i} className="group overflow-hidden border-none shadow-xl shadow-violet-100/50 rounded-[2.5rem] bg-white/80 backdrop-blur-xl hover:scale-[1.02] transition-all duration-500">
                        <div className={`h-40 ${course.image} relative`}>
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 backdrop-blur-md text-green-600 text-xs font-black px-3 py-1 rounded-lg shadow-sm uppercase tracking-wider">Active</span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                          <div className="flex items-center gap-6 text-sm font-bold text-gray-400">
                            <span className="flex items-center gap-1.5"><Users size={16} className="text-violet-400" /> {course.students}</span>
                            <span className="flex items-center gap-1.5"><FileText size={16} className="text-cyan-400" /> {course.lessons} Lessons</span>
                          </div>
                          <Button variant="ghost" className="w-full mt-6 rounded-xl font-black text-violet-600 hover:bg-violet-50 transition-all">
                            Manage Course
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden">
                  <CardHeader className="bg-violet-50/50 border-b border-violet-100/50">
                    <CardTitle className="text-lg font-black flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-violet-600" />
                      Upcoming Live Classes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {[
                      { id: 1, time: "10:30 AM", subject: "Physics - Optics", duration: "60 min" },
                      { id: 2, time: "02:00 PM", subject: "Math - Calculus", duration: "90 min" },
                    ].map((session) => (
                      <div key={session.id} className="p-5 bg-[#F8F9FF] rounded-2xl border border-violet-50 group hover:border-violet-200 transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded uppercase tracking-widest ${activeClasses.includes(session.id) ? 'bg-green-500' : 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'}`}>
                            {activeClasses.includes(session.id) ? 'Live Now' : 'Live'}
                          </span>
                          <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Clock size={12} /> {session.time}</span>
                        </div>
                        <div className="font-black text-gray-900 mb-1">{session.subject}</div>
                        <div className="text-xs font-bold text-gray-400 mb-4">{session.duration} session</div>
                        <Button 
                          size="sm" 
                          onClick={() => handleStartClass(session.id, session.subject)}
                          className={`w-full rounded-xl font-bold shadow-lg transition-all ${activeClasses.includes(session.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-violet-600 hover:bg-violet-700 shadow-violet-100'}`}
                        >
                          {activeClasses.includes(session.id) ? (
                            <span className="flex items-center gap-2"><ExternalLink size={16} /> Join Google Meet</span>
                          ) : (
                            <span className="flex items-center gap-2"><Video size={16} /> Start Class</span>
                          )}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-black">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      "New student enrolled in Physics",
                      "Assignment submitted by Rahul",
                      "New comment on Lesson 4",
                    ].map((activity, i) => (
                      <div key={i} className="text-sm flex gap-4 group">
                        <div className="h-2 w-2 mt-1.5 rounded-full bg-violet-400 shrink-0 group-hover:scale-150 transition-transform"></div>
                        <span className="text-gray-600 font-medium">{activity}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="doubts">
            <DoubtsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;
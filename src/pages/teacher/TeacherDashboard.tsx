import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  FileText, 
  Users, 
  Calendar, 
  Plus,
  Clock,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TeacherDashboard = () => {
  const navigate = useNavigate();

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
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome, Prof. Sharma</h1>
            <p className="text-gray-500 font-medium">You have 2 live classes scheduled for today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600 bg-white">View Schedule</Button>
            <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600 bg-white">Earnings</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Active Courses */}
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

          {/* Right Column: Upcoming Classes & Notifications */}
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
                  { time: "10:30 AM", subject: "Physics - Optics", duration: "60 min" },
                  { time: "02:00 PM", subject: "Math - Calculus", duration: "90 min" },
                ].map((session, i) => (
                  <div key={i} className="p-5 bg-[#F8F9FF] rounded-2xl border border-violet-50 group hover:border-violet-200 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black text-white bg-gradient-to-r from-red-500 to-pink-500 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">Live</span>
                      <span className="text-xs font-bold text-gray-400 flex items-center gap-1"><Clock size={12} /> {session.time}</span>
                    </div>
                    <div className="font-black text-gray-900 mb-1">{session.subject}</div>
                    <div className="text-xs font-bold text-gray-400 mb-4">{session.duration} session</div>
                    <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-700 rounded-xl font-bold shadow-lg shadow-violet-100">Start Class</Button>
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
      </main>
    </div>
  );
};

export default TeacherDashboard;
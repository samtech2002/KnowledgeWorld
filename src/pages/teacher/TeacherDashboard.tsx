import React from 'react';
import { 
  Video, 
  FileText, 
  Users, 
  Calendar, 
  BarChart3, 
  Plus,
  PlayCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-8 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <Video className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">Teacher Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="mr-2 h-4 w-4" /> New Course
          </Button>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            T
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Prof. Sharma</h1>
            <p className="text-gray-500">You have 2 live classes scheduled for today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">View Schedule</Button>
            <Button variant="outline">Earnings</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Active Courses */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">Total Students</div>
                  <div className="text-2xl font-bold">1,240</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">Course Rating</div>
                  <div className="text-2xl font-bold">4.8/5</div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-1">Watch Time</div>
                  <div className="text-2xl font-bold">420h</div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Your Active Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Advanced Physics", students: 450, lessons: 24, image: "bg-blue-100" },
                  { title: "Mathematics Mastery", students: 790, lessons: 32, image: "bg-indigo-100" },
                ].map((course, i) => (
                  <Card key={i} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                    <div className={`h-32 ${course.image}`}></div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Users size={14} /> {course.students}</span>
                        <span className="flex items-center gap-1"><FileText size={14} /> {course.lessons} Lessons</span>
                      </div>
                      <Button variant="ghost" className="w-full mt-4 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        Manage Course
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Upcoming Classes & Notifications */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Upcoming Live Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { time: "10:30 AM", subject: "Physics - Optics", duration: "60 min" },
                  { time: "02:00 PM", subject: "Math - Calculus", duration: "90 min" },
                ].map((session, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase">Live</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {session.time}</span>
                    </div>
                    <div className="font-bold mb-1">{session.subject}</div>
                    <div className="text-xs text-gray-500 mb-3">{session.duration} session</div>
                    <Button size="sm" className="w-full bg-indigo-600">Start Class</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "New student enrolled in Physics",
                  "Assignment submitted by Rahul",
                  "New comment on Lesson 4",
                ].map((activity, i) => (
                  <div key={i} className="text-sm flex gap-3">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-indigo-400 shrink-0"></div>
                    <span className="text-gray-600">{activity}</span>
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
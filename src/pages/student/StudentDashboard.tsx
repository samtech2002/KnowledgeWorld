import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Trophy,
  Search,
  Star,
  FileText,
  LogOut
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-lg shadow-lg shadow-violet-200">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900">STUDENT PORTAL</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-500">
            <button className="hover:text-violet-600 transition-colors">My Courses</button>
            <button onClick={() => navigate('/student/exam')} className="text-violet-600">Exams</button>
            <button className="hover:text-violet-600 transition-colors">Certificates</button>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigate('/login')} className="text-gray-400 hover:text-red-500">
            <LogOut className="h-5 w-5" />
          </Button>
          <div className="h-10 w-10 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black shadow-sm">
            S
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Hello, Aryan!</h1>
          <p className="text-gray-500 font-medium">You've completed 65% of your weekly goal. Keep it up!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Continue Learning */}
            <Card className="border-none shadow-2xl shadow-violet-100/50 bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-[2.5rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <CardContent className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="text-violet-200 text-xs font-black uppercase tracking-widest">CONTINUE WATCHING</div>
                  <h2 className="text-3xl font-black">Physics: Quantum Mechanics</h2>
                  <p className="text-violet-100 font-medium opacity-80">Lesson 12: Wave-Particle Duality</p>
                  <div className="flex items-center gap-6 pt-4">
                    <Button className="bg-white text-violet-600 hover:bg-violet-50 font-black px-8 h-12 rounded-xl shadow-lg">
                      <PlayCircle className="mr-2 h-5 w-5" /> Resume Lesson
                    </Button>
                    <span className="text-sm font-bold text-violet-200">45 mins left</span>
                  </div>
                </div>
                <div className="h-40 w-40 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20">
                  <PlayCircle size={64} className="text-white/40" />
                </div>
              </CardContent>
            </Card>

            {/* My Courses */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">My Enrolled Courses</h2>
                <Button variant="link" className="text-violet-600 font-bold">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Complete Mathematics", progress: 75, teacher: "Dr. Verma", color: "bg-violet-100" },
                  { title: "English Grammar Pro", progress: 30, teacher: "Ms. Anjali", color: "bg-cyan-100" },
                ].map((course, i) => (
                  <Card key={i} className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl hover:scale-[1.02] transition-all duration-500">
                    <div className={`h-32 ${course.color}`}></div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-black text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">by {course.teacher}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-gray-400">PROGRESS</span>
                          <span className="text-violet-600">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2 bg-violet-50" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-yellow-50/50 rounded-2xl border border-yellow-100">
                  <div className="h-12 w-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">7 Day Streak</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">You're on fire!</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
                  <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-gray-900">Quiz Master</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">10 Quizzes completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black flex items-center gap-2">
                  <FileText className="h-6 w-6 text-violet-600" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {[
                  { date: "Tomorrow", subject: "Math Quiz", time: "10:00 AM" },
                  { date: "Oct 25", subject: "Science Mid-term", time: "02:00 PM" },
                ].map((test, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div>
                      <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{test.subject}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{test.date} • {test.time}</div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => navigate('/student/exam')} className="rounded-xl font-bold text-violet-600 hover:bg-violet-50">
                      Start
                    </Button>
                  </div>
                ))}
                <Button 
                  onClick={() => navigate('/student/exam')}
                  className="w-full bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white font-black h-12 rounded-xl transition-all"
                >
                  View All Exams
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
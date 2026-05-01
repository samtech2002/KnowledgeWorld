import React from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  Trophy,
  Search,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-8 h-16 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-600 rounded-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">My Learning</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600">
            <span>My Courses</span>
            <span>Quizzes</span>
            <span>Certificates</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            S
          </div>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Hello, Aryan!</h1>
          <p className="text-gray-500">You've completed 65% of your weekly goal. Keep it up!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card className="border-none shadow-sm bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-indigo-100 text-sm font-medium">CONTINUE WATCHING</div>
                  <h2 className="text-2xl font-bold">Physics: Quantum Mechanics</h2>
                  <p className="text-indigo-100">Lesson 12: Wave-Particle Duality</p>
                  <div className="flex items-center gap-4 pt-4">
                    <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                      <PlayCircle className="mr-2 h-4 w-4" /> Resume Lesson
                    </Button>
                    <span className="text-sm">45 mins left</span>
                  </div>
                </div>
                <div className="h-32 w-32 bg-white/10 rounded-2xl flex items-center justify-center">
                  <PlayCircle size={48} className="text-white/40" />
                </div>
              </CardContent>
            </Card>

            {/* My Courses */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">My Enrolled Courses</h2>
                <Button variant="link" className="text-indigo-600">View All</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Complete Mathematics", progress: 75, teacher: "Dr. Verma" },
                  { title: "English Grammar Pro", progress: 30, teacher: "Ms. Anjali" },
                ].map((course, i) => (
                  <Card key={i} className="border-none shadow-sm overflow-hidden">
                    <div className="h-24 bg-gray-100"></div>
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">by {course.teacher}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">7 Day Streak</div>
                    <div className="text-xs text-gray-500">You're on fire!</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">Quiz Master</div>
                    <div className="text-xs text-gray-500">10 Quizzes completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: "Tomorrow", subject: "Math Quiz", time: "10:00 AM" },
                  { date: "Oct 25", subject: "Science Mid-term", time: "02:00 PM" },
                ].map((test, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium">{test.subject}</div>
                      <div className="text-xs text-gray-500">{test.date} • {test.time}</div>
                    </div>
                    <Button size="sm" variant="outline">Details</Button>
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

export default StudentDashboard;
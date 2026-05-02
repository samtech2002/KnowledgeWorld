import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  Star, 
  PlayCircle, 
  FileText, 
  ShieldCheck,
  ArrowLeft,
  Zap,
  Lock,
  Calendar
} from "lucide-react";
import { showSuccess } from "@/utils/toast";

const COURSES = [
  {
    id: 1,
    title: "Quantum Mechanics Mastery",
    instructor: "Dr. Sarah Chen",
    category: "Physics",
    rating: 4.9,
    students: "12.5k",
    duration: "24h 15m",
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    description: "Master the fundamental principles of quantum mechanics, from wave-particle duality to Schrödinger's equation. This course is designed for advanced students looking to excel in theoretical physics.",
    curriculum: [
      "Introduction to Quantum World",
      "Wave-Particle Duality Explained",
      "The Schrödinger Equation",
      "Quantum Tunneling & Applications",
      "Atomic Structure & Orbitals"
    ]
  },
  {
    id: 7,
    title: "CCC: Computer Concepts Mastery",
    instructor: "Prof. Alok Mishra",
    category: "Computer",
    rating: 4.8,
    students: "20.1k",
    duration: "3 Months",
    schedule: "Monday to Friday Live Class",
    price: "₹1,700",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    description: "The Certificate Course on Computer Concepts (CCC) is designed to impart basic level IT literacy to common man. This course is essential for anyone looking to understand computers, operating systems, and digital financial tools.",
    curriculum: [
      "Introduction to Computer & OS",
      "Word Processing (MS Word/LibreOffice)",
      "Spreadsheets (MS Excel/LibreOffice)",
      "Presentations (MS PowerPoint)",
      "Internet, WWW and Web Browsers",
      "Digital Financial Tools & Applications",
      "Cyber Security Basics"
    ]
  }
];

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const course = COURSES.find(c => c.id === Number(id)) || COURSES[0];

  const handleEnroll = () => {
    setIsEnrolling(true);
    setTimeout(() => {
      showSuccess(`Successfully enrolled in ${course.title}!`);
      navigate('/student');
      setIsEnrolling(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <Link to="/courses" className="inline-flex items-center text-gray-500 hover:text-violet-600 font-bold mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Badge className="bg-violet-100 text-violet-600 font-bold border-none px-4 py-1 rounded-full mb-4">
                {course.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {course.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-500 font-bold">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                    {course.instructor.charAt(0)}
                  </div>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-1.5 text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span>{course.rating} (4.2k reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-5 w-5" />
                  <span>{course.students} Students</span>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="p-6 bg-white/20 backdrop-blur-md rounded-full cursor-pointer hover:scale-110 transition-transform">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900">About this course</h2>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">
                {course.description}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900">Course Curriculum</h2>
              <div className="space-y-4">
                {course.curriculum.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-white border border-violet-50 rounded-2xl hover:border-violet-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 font-bold text-sm">
                        {i + 1}
                      </div>
                      <span className="font-bold text-gray-700">{item}</span>
                    </div>
                    <Lock className="h-4 w-4 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-32 border-none shadow-2xl shadow-violet-100/50 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="mb-8">
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Course Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-violet-600">{course.price}</span>
                    <span className="text-gray-400 line-through font-bold">₹1,499</span>
                  </div>
                  <div className="mt-2 text-green-600 font-bold text-sm flex items-center gap-1">
                    <Zap className="h-4 w-4 fill-current" /> 60% OFF - Limited Time Offer
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-600 font-medium">
                    <Clock className="h-5 w-5 text-violet-500" />
                    <span>{course.duration} access</span>
                  </div>
                  {course.schedule && (
                    <div className="flex items-center gap-3 text-gray-600 font-medium">
                      <Calendar className="h-5 w-5 text-violet-500" />
                      <span>{course.schedule}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-gray-600 font-medium">
                    <FileText className="h-5 w-5 text-violet-500" />
                    <span>20 Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 font-medium">
                    <ShieldCheck className="h-5 w-5 text-violet-500" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                <Button 
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 h-16 rounded-2xl text-xl font-black shadow-xl shadow-violet-200 transition-all active:scale-[0.98]"
                >
                  {isEnrolling ? (
                    <span className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </span>
                  ) : (
                    "Enroll Now"
                  )}
                </Button>
                
                <p className="text-center text-gray-400 text-xs font-bold mt-6 uppercase tracking-widest">
                  30-Day Money-Back Guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  PlayCircle,
  BookOpen,
  ChevronRight
} from "lucide-react";

const CATEGORIES = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English", "Coding"];

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
    level: "Advanced"
  },
  {
    id: 2,
    title: "Calculus: From Zero to Hero",
    instructor: "Prof. Rajesh Kumar",
    category: "Mathematics",
    rating: 4.8,
    students: "8.2k",
    duration: "18h 45m",
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Organic Chemistry Simplified",
    instructor: "Dr. Amit Shah",
    category: "Chemistry",
    rating: 4.7,
    students: "5.1k",
    duration: "15h 30m",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1532187875605-1ef6c237ddc4?auto=format&fit=crop&q=80&w=800",
    level: "Beginner"
  },
  {
    id: 4,
    title: "Python for Young Scientists",
    instructor: "Tech Mentor Leo",
    category: "Coding",
    rating: 4.9,
    students: "15.3k",
    duration: "12h 00m",
    price: "Free",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
    level: "Beginner"
  },
  {
    id: 5,
    title: "Advanced English Literature",
    instructor: "Ms. Elena Gilbert",
    category: "English",
    rating: 4.6,
    students: "3.4k",
    duration: "20h 10m",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    level: "Advanced"
  },
  {
    id: 6,
    title: "Molecular Biology Basics",
    instructor: "Dr. Priya Rai",
    category: "Biology",
    rating: 4.8,
    students: "6.7k",
    duration: "16h 40m",
    price: "₹1,799",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
    level: "Intermediate"
  }
];

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Explore Our <span className="text-gradient">Premium Courses</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl">
            Discover world-class education tailored for your success. From foundational basics to advanced mastery.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
            <Input 
              placeholder="Search courses, instructors..." 
              className="pl-12 h-12 rounded-2xl border-violet-100 bg-white shadow-sm focus:ring-violet-500 focus:border-violet-500 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            <Filter className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                  selectedCategory === cat 
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105" 
                  : "bg-white text-gray-500 hover:bg-violet-50 hover:text-violet-600 border border-violet-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl hover:scale-[1.02] transition-all duration-500">
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-md text-violet-600 font-bold border-none px-3 py-1 rounded-lg">
                    {course.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="text-white h-16 w-16" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                    <Star className="h-4 w-4 fill-current" />
                    {course.rating}
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {course.level}
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium mb-4">by {course.instructor}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" /> {course.students}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex items-center justify-between border-t border-violet-50 mt-2">
                <div className="text-2xl font-black text-violet-600">
                  {course.price}
                </div>
                <Button 
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white font-bold rounded-xl transition-all"
                >
                  Enroll Now <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-violet-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              variant="link" 
              className="mt-4 text-violet-600 font-bold"
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
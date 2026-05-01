import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Video, 
  CheckCircle2,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            The Future of Online Learning
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Master Any Subject with <br />
            <span className="text-indigo-600">Expert Guidance</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            KnowledgeWorld.in is India's leading platform for Class 1-12 and Competitive Exams. 
            Learn from top educators with interactive live classes and premium study materials.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-14 text-lg rounded-xl shadow-lg shadow-indigo-200">
              Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 h-14 text-lg rounded-xl border-2">
              View Courses
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50k+</div>
              <div className="text-gray-500">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">200+</div>
              <div className="text-gray-500">Expert Teachers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">1000+</div>
              <div className="text-gray-500">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-500">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose KnowledgeWorld?</h2>
            <p className="text-gray-600">Everything you need to excel in your academic journey.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Video className="h-8 w-8 text-blue-600" />,
                title: "Live Interactive Classes",
                desc: "Real-time interaction with teachers and instant doubt clearing sessions."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-indigo-600" />,
                title: "Premium Study Material",
                desc: "Comprehensive PDFs, notes, and assignments curated by experts."
              },
              {
                icon: <Trophy className="h-8 w-8 text-orange-600" />,
                title: "Mock Tests & Quizzes",
                desc: "Regular assessments to track your progress and improve performance."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4 p-3 bg-gray-50 inline-block rounded-xl">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your learning?</h2>
            <p className="text-indigo-100 mb-10 text-lg max-w-2xl mx-auto">
              Join thousands of students who are already achieving their goals with KnowledgeWorld.in
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 px-10 h-14 text-lg font-bold rounded-xl">
                Join for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="text-lg font-bold">KnowledgeWorld.in</span>
          </div>
          <p className="text-gray-500 text-sm mb-8">© 2024 KnowledgeWorld. All rights reserved.</p>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
};

export default Index;
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-violet-50/70 backdrop-blur-xl border-b border-violet-100/50">
      {/* Decorative Top Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-600">
              KNOWLEDGEWORLD
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors">Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors">Courses</Link>
            <Link to="/syllabus" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors">Syllabus</Link>
            <Link to="/login">
              <Button variant="ghost" className="text-violet-600 hover:bg-violet-100/50 font-bold">
                Login
              </Button>
            </Link>
            <Link to="/courses">
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-bold px-6 rounded-full shadow-lg shadow-violet-200">
                Get Started <Zap className="ml-2 h-4 w-4 fill-current" />
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-violet-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-violet-100 p-6 space-y-6 animate-in slide-in-from-top duration-300">
          <Link to="/" className="block text-lg font-bold text-gray-800">Home</Link>
          <Link to="/courses" className="block text-lg font-bold text-gray-800">Courses</Link>
          <Link to="/syllabus" className="block text-lg font-bold text-gray-800">Syllabus</Link>
          <Link to="/login" className="block text-lg font-bold text-violet-600">Login</Link>
          <Link to="/courses" className="block">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold h-12 rounded-xl">Get Started</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
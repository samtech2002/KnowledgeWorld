import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, BookOpen, FileText, MessageSquare, Newspaper } from "lucide-react";
import Logo from "@/components/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-violet-50/70 backdrop-blur-xl border-b border-violet-100/50">
      {/* Decorative Top Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-6">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors">Home</Link>
            <Link to="/courses" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors">Courses</Link>
            <Link to="/syllabus" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors">Syllabus</Link>
            <Link to="/resources" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors flex items-center gap-1.5">
              <FileText className="h-4 w-4" /> Resources
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" /> Contact
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-violet-600 font-semibold transition-colors flex items-center gap-1.5">
              <Newspaper className="h-4 w-4" /> Blog
            </Link>
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
          <Link to="/resources" className="block text-lg font-bold text-gray-800">Resources</Link>
          <Link to="/contact" className="block text-lg font-bold text-gray-800">Contact</Link>
          <Link to="/blog" className="block text-lg font-bold text-gray-800">Blog</Link>
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
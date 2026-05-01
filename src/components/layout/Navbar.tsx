import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              KnowledgeWorld
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
            <Link to="#courses" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Courses</Link>
            <Link to="#about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About</Link>
            <Link to="/login">
              <Button variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Login
              </Button>
            </Link>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Get Started
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
          <Link to="/" className="block text-gray-600 font-medium">Home</Link>
          <Link to="#courses" className="block text-gray-600 font-medium">Courses</Link>
          <Link to="/login" className="block text-gray-600 font-medium">Login</Link>
          <Button className="w-full bg-indigo-600 text-white">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
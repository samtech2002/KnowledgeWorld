import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-violet-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-gray-500 font-medium leading-relaxed">
              Empowering the next generation of innovators through world-class education and cutting-edge technology.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Twitter size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Youtube size={20} />, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 hover:bg-violet-600 hover:text-white transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Courses', 'About Us', 'Contact', 'Careers'].map((link) => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-violet-600 font-bold transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6">Categories</h4>
            <ul className="space-y-4">
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Coding'].map((cat) => (
                <li key={cat}>
                  <Link to="/courses" className="text-gray-500 hover:text-violet-600 font-bold transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 font-medium">
                <MapPin className="h-5 w-5 text-violet-600 shrink-0" />
                <span>123 Education Hub, Knowledge Park, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 font-medium">
                <Phone className="h-5 w-5 text-violet-600 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 font-medium">
                <Mail className="h-5 w-5 text-violet-600 shrink-0" />
                <span>support@knowledgeworld.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-violet-50 text-center">
          <p className="text-gray-400 text-sm font-bold mb-4">
            © {new Date().getFullYear()} KnowledgeWorld. All rights reserved.
          </p>
          <MadeWithDyad />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
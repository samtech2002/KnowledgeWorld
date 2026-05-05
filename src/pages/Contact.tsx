"use client";

import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
  Globe,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess } from "@/utils/toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showSuccess("Message sent successfully! We'll get back to you soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <SEO 
        title="Contact Us - Get in Touch" 
        description="Have questions? Contact KnowledgeWorld for support, partnerships, or general inquiries."
      />
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Have a question or need assistance? Our team is here to help you on your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {[
              {
                icon: <Phone className="h-6 w-6 text-violet-600" />,
                title: "Call Us",
                details: "+91 8888000330",
                sub: "Mon-Sat, 9am to 6pm"
              },
              {
                icon: <Mail className="h-6 w-6 text-cyan-600" />,
                title: "Email Us",
                details: "support@knowledgeworld.in",
                sub: "Online support 24/7"
              },
              {
                icon: <MapPin className="h-6 w-6 text-fuchsia-600" />,
                title: "Visit Us",
                details: "123 Education Hub, Knowledge Park",
                sub: "New Delhi, India 110001"
              }
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="p-4 bg-violet-50 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">{item.title}</h3>
                    <p className="text-lg font-bold text-violet-600">{item.details}</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-none shadow-2xl shadow-violet-200/50 bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-[2.5rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <h3 className="text-xl font-black mb-4 relative z-10">Student Support</h3>
              <p className="text-violet-100 font-medium opacity-80 mb-6 relative z-10">
                Already a student? Access our dedicated Doubt Hub for technical and academic help.
              </p>
              <Button variant="secondary" className="w-full bg-white text-violet-600 hover:bg-violet-50 font-black h-12 rounded-xl shadow-lg relative z-10">
                Go to Doubt Hub
              </Button>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl shadow-violet-100/50 rounded-[3rem] bg-white p-10 md:p-16">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-500 font-medium">Fill out the form below and we'll respond within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700 ml-1">Full Name</Label>
                    <Input placeholder="John Doe" className="h-14 rounded-2xl border-violet-100 bg-violet-50/30 focus:bg-white transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700 ml-1">Email Address</Label>
                    <Input type="email" placeholder="john@example.com" className="h-14 rounded-2xl border-violet-100 bg-violet-50/30 focus:bg-white transition-all" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-gray-700 ml-1">Subject</Label>
                  <Input placeholder="How can we help you?" className="h-14 rounded-2xl border-violet-100 bg-violet-50/30 focus:bg-white transition-all" required />
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-gray-700 ml-1">Message</Label>
                  <Textarea placeholder="Tell us more about your inquiry..." className="min-h-[180px] rounded-[2rem] border-violet-100 bg-violet-50/30 focus:bg-white transition-all p-6" required />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black h-16 rounded-2xl shadow-xl shadow-violet-200 text-lg transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="h-5 w-5" />
                    </span>
                  )}
                </Button>
                
                <div className="flex items-center justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-green-500" /> Secure Data
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={14} className="text-violet-500" /> Fast Response
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
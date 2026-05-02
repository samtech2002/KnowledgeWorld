import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle2, Target, Info } from "lucide-react";

const Syllabus = () => {
  const jeeSyllabus = [
    { unit: "General Physics", topics: ["Units and Dimensions", "Least Count", "Significant Figures", "Error Analysis"] },
    { unit: "Mechanics", topics: ["Kinematics", "Newton's Laws of Motion", "Work, Energy and Power", "Rotational Motion", "Gravitation"] },
    { unit: "Thermal Physics", topics: ["Thermal Expansion", "Calorimetry", "Heat Transfer", "Kinetic Theory of Gases", "Thermodynamics"] },
    { unit: "Electricity & Magnetism", topics: ["Electrostatics", "Current Electricity", "Magnetic Effects of Current", "Electromagnetic Induction", "Alternating Current"] },
    { unit: "Optics", topics: ["Reflection and Refraction", "Lenses", "Wave Optics", "Interference", "Diffraction"] },
    { unit: "Modern Physics", topics: ["Atomic Nucleus", "Dual Nature of Matter", "Radioactivity", "Photoelectric Effect"] }
  ];

  const neetSyllabus = [
    { unit: "Physical World & Measurement", topics: ["Nature of Physical Laws", "Units of Measurement", "Errors in Measurement"] },
    { unit: "Kinematics", topics: ["Motion in a Straight Line", "Motion in a Plane", "Scalar and Vector Quantities"] },
    { unit: "Laws of Motion", topics: ["Intuitive Concept of Force", "Inertia", "Newton's Laws", "Friction", "Circular Motion"] },
    { unit: "Properties of Bulk Matter", topics: ["Elasticity", "Pressure in Fluids", "Viscosity", "Surface Tension"] },
    { unit: "Oscillations & Waves", topics: ["Periodic Motion", "Simple Harmonic Motion", "Wave Motion", "Doppler Effect"] },
    { unit: "Electrostatics", topics: ["Electric Charges", "Coulomb's Law", "Electric Field", "Electric Potential", "Capacitance"] },
    { unit: "Electronic Devices", topics: ["Semiconductors", "Logic Gates", "Transistors", "P-N Junction"] }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Exam <span className="text-gradient">Syllabus Guide</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Stay ahead of your preparation with our detailed breakdown of Physics topics for competitive exams.
          </p>
        </div>

        <Tabs defaultValue="jee" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-violet-50/50 p-1.5 rounded-2xl max-w-md mx-auto">
            <TabsTrigger value="jee" className="rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
              JEE Main & Advanced
            </TabsTrigger>
            <TabsTrigger value="neet" className="rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
              NEET (Medical)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jee" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6">
              <div className="bg-violet-600 rounded-[2rem] p-8 text-white mb-4 flex items-center justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-2">JEE Physics Mastery</h2>
                  <p className="text-violet-100 font-medium opacity-90">Focus on conceptual depth and numerical problem-solving.</p>
                </div>
                <Target className="h-24 w-24 text-white/10 absolute -right-4 -bottom-4" />
              </div>
              
              {jeeSyllabus.map((section, idx) => (
                <Card key={idx} className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                  <CardHeader className="bg-violet-50/30 border-b border-violet-50">
                    <CardTitle className="text-xl font-black flex items-center gap-3 text-gray-900">
                      <div className="h-8 w-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm">
                        {idx + 1}
                      </div>
                      {section.unit}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-violet-50/50 transition-colors group">
                          <CheckCircle2 className="h-5 w-5 text-violet-400 group-hover:text-violet-600 transition-colors" />
                          <span className="font-bold text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="neet" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6">
              <div className="bg-cyan-600 rounded-[2rem] p-8 text-white mb-4 flex items-center justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-2">NEET Physics Essentials</h2>
                  <p className="text-cyan-100 font-medium opacity-90">Emphasis on fundamental concepts and speed-accuracy balance.</p>
                </div>
                <BookOpen className="h-24 w-24 text-white/10 absolute -right-4 -bottom-4" />
              </div>

              {neetSyllabus.map((section, idx) => (
                <Card key={idx} className="border-none shadow-xl shadow-cyan-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                  <CardHeader className="bg-cyan-50/30 border-b border-cyan-50">
                    <CardTitle className="text-xl font-black flex items-center gap-3 text-gray-900">
                      <div className="h-8 w-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white text-sm">
                        {idx + 1}
                      </div>
                      {section.unit}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-50/50 transition-colors group">
                          <CheckCircle2 className="h-5 w-5 text-cyan-400 group-hover:text-cyan-600 transition-colors" />
                          <span className="font-bold text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 p-8 bg-white rounded-[2.5rem] border border-violet-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="h-16 w-16 rounded-2xl bg-violet-50 flex items-center justify-center shrink-0">
            <Info className="h-8 w-8 text-violet-600" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Need personalized guidance?</h3>
            <p className="text-gray-500 font-medium">Our expert mentors can help you create a custom study plan based on these syllabi. Join a live session today!</p>
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-14 rounded-2xl shrink-0">
            Talk to Mentor
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Syllabus;
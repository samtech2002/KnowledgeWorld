import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  CheckCircle2, 
  Target, 
  Info, 
  Beaker, 
  Calculator, 
  Dna, 
  Zap 
} from "lucide-react";

const SYLLABUS_DATA = {
  jee: {
    Physics: [
      { unit: "Mechanics", topics: ["Kinematics", "Newton's Laws", "Work & Energy", "Rotational Motion", "Gravitation"] },
      { unit: "Thermal Physics", topics: ["Thermodynamics", "Kinetic Theory", "Calorimetry", "Heat Transfer"] },
      { unit: "Electricity & Magnetism", topics: ["Electrostatics", "Current Electricity", "EMI", "Alternating Current"] },
      { unit: "Optics & Modern Physics", topics: ["Ray Optics", "Wave Optics", "Atoms & Nuclei", "Dual Nature"] }
    ],
    Chemistry: [
      { unit: "Physical Chemistry", topics: ["Atomic Structure", "Chemical Bonding", "Equilibrium", "Chemical Kinetics"] },
      { unit: "Inorganic Chemistry", topics: ["Periodic Table", "p-Block Elements", "Coordination Compounds", "Metallurgy"] },
      { unit: "Organic Chemistry", topics: ["GOC", "Hydrocarbons", "Alcohols & Phenols", "Aldehydes & Ketones"] }
    ],
    Mathematics: [
      { unit: "Algebra", topics: ["Complex Numbers", "Matrices & Determinants", "Probability", "Sequences & Series"] },
      { unit: "Calculus", topics: ["Limits & Continuity", "Differentiation", "Integration", "Differential Equations"] },
      { unit: "Coordinate Geometry", topics: ["Straight Lines", "Circles", "Conic Sections", "3D Geometry"] }
    ]
  },
  neet: {
    Physics: [
      { unit: "Mechanics", topics: ["Laws of Motion", "Work, Energy & Power", "System of Particles", "Properties of Matter"] },
      { unit: "Oscillations & Waves", topics: ["SHM", "Wave Motion", "Doppler Effect", "Superposition"] },
      { unit: "Electrostatics", topics: ["Electric Charges", "Potential", "Capacitance", "Current Electricity"] },
      { unit: "Modern Physics", topics: ["Photoelectric Effect", "X-Rays", "Radioactivity", "Nuclear Physics"] }
    ],
    Chemistry: [
      { unit: "Physical Chemistry", topics: ["Mole Concept", "States of Matter", "Thermodynamics", "Solutions"] },
      { unit: "Inorganic Chemistry", topics: ["s-Block", "d & f Block", "Chemical Bonding", "Environmental Chemistry"] },
      { unit: "Organic Chemistry", topics: ["Biomolecules", "Polymers", "Chemistry in Everyday Life", "Hydrocarbons"] }
    ],
    Biology: [
      { unit: "Botany", topics: ["Plant Kingdom", "Morphology of Plants", "Photosynthesis", "Plant Growth"] },
      { unit: "Zoology", topics: ["Animal Kingdom", "Human Physiology", "Structural Organization", "Biomolecules"] },
      { unit: "Genetics & Ecology", topics: ["Inheritance", "Evolution", "Ecosystem", "Biodiversity"] }
    ]
  }
};

const Syllabus = () => {
  const [examType, setExamType] = useState<"jee" | "neet">("jee");
  const [selectedSubject, setSelectedSubject] = useState("Physics");

  const currentSyllabus = SYLLABUS_DATA[examType][selectedSubject as keyof typeof SYLLABUS_DATA['jee']];

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics": return <Zap className="h-5 w-5" />;
      case "Chemistry": return <Beaker className="h-5 w-5" />;
      case "Mathematics": return <Calculator className="h-5 w-5" />;
      case "Biology": return <Dna className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getThemeColor = () => {
    if (examType === "jee") return "violet";
    return "cyan";
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Exam <span className="text-gradient">Syllabus Guide</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            Master every topic with our structured curriculum for India's toughest competitive exams.
          </p>
        </div>

        <Tabs defaultValue="jee" onValueChange={(v) => {
          setExamType(v as "jee" | "neet");
          setSelectedSubject("Physics");
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-12 bg-violet-50/50 p-1.5 rounded-2xl max-w-md mx-auto">
            <TabsTrigger value="jee" className="rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
              JEE Main & Advanced
            </TabsTrigger>
            <TabsTrigger value="neet" className="rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:text-cyan-600 data-[state=active]:shadow-sm">
              NEET (Medical)
            </TabsTrigger>
          </TabsList>

          {/* Subject Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(SYLLABUS_DATA[examType]).map((subject) => (
              <Button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                variant={selectedSubject === subject ? "default" : "outline"}
                className={`rounded-2xl font-bold px-6 h-12 transition-all ${
                  selectedSubject === subject 
                    ? examType === "jee" ? "bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-200" : "bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-200"
                    : "bg-white border-violet-100 text-gray-500 hover:text-violet-600"
                }`}
              >
                <span className="mr-2">{getSubjectIcon(subject)}</span>
                {subject}
              </Button>
            ))}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6">
              <div className={`rounded-[2rem] p-8 text-white mb-4 flex items-center justify-between overflow-hidden relative ${
                examType === "jee" ? "bg-violet-600" : "bg-cyan-600"
              }`}>
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-2">{examType.toUpperCase()} {selectedSubject} Mastery</h2>
                  <p className="text-white/90 font-medium opacity-90">
                    {examType === "jee" 
                      ? "Focus on conceptual depth and advanced problem-solving." 
                      : "Emphasis on fundamental concepts and speed-accuracy balance."}
                  </p>
                </div>
                <div className="opacity-10 absolute -right-4 -bottom-4 scale-150">
                  {getSubjectIcon(selectedSubject)}
                </div>
              </div>
              
              {currentSyllabus?.map((section, idx) => (
                <Card key={idx} className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                  <CardHeader className={`${examType === "jee" ? "bg-violet-50/30 border-violet-50" : "bg-cyan-50/30 border-cyan-50"} border-b`}>
                    <CardTitle className="text-xl font-black flex items-center gap-3 text-gray-900">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-white text-sm ${
                        examType === "jee" ? "bg-violet-600" : "bg-cyan-600"
                      }`}>
                        {idx + 1}
                      </div>
                      {section.unit}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                          <CheckCircle2 className={`h-5 w-5 transition-colors ${
                            examType === "jee" ? "text-violet-400 group-hover:text-violet-600" : "text-cyan-400 group-hover:text-cyan-600"
                          }`} />
                          <span className="font-bold text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Tabs>

        <div className="mt-16 p-8 bg-white rounded-[2.5rem] border border-violet-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="h-16 w-16 rounded-2xl bg-violet-50 flex items-center justify-center shrink-0">
            <Info className="h-8 w-8 text-violet-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-gray-900 mb-2">Need a personalized study plan?</h3>
            <p className="text-gray-500 font-medium">Our AI-powered system can create a custom schedule based on your strengths and weaknesses in these topics.</p>
          </div>
          <Button className={`${
            examType === "jee" ? "bg-violet-600 hover:bg-violet-700" : "bg-cyan-600 hover:bg-cyan-700"
          } text-white font-black px-8 h-14 rounded-2xl shrink-0 shadow-lg transition-all hover:scale-105`}>
            Generate My Plan
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Syllabus;
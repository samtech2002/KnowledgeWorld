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
  Zap,
  Languages,
  Monitor,
  Video,
  Play,
  X,
  Globe
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
  },
  maharashtra: {
    "English 11th": [
      { unit: "Section I: Prose", topics: ["Being Neighborly", "On To The Summit", "The Call of the Soil", "Pillars of Democracy", "Mrs. Adis", "Tiger Hills"] },
      { unit: "Section II: Poetry", topics: ["Cherry Tree", "The Sower", "There is Another Sky", "Upon Westminster Bridge", "Nose versus Eyes", "The Planners"] },
      { unit: "Section III: Writing Skills", topics: ["Expansion of Ideas", "Blog Writing", "E-mails", "Interview", "Film Review", "The Art of Compering"] },
      { unit: "Section IV: Genre-Drama", topics: ["History of English Drama", "The Rising of the Moon", "A Midsummer Night's Dream", "An Enemy of the People"] }
    ],
    "English 12th": [
      { unit: "Section I: Prose", topics: ["An Astrologer's Day", "On Saying 'Please'", "The Cop and the Anthem", "Big Data-Big Insights", "The New Dress", "Into the Wild", "Why we Travel", "Voyaging Towards Excellence"] },
      { unit: "Section II: Poetry", topics: ["Song of the Open Road", "Indian Weavers", "The Inchcape Rock", "Have you Earned your Tomorrow", "Father Returning Home", "Money", "She Walks in Beauty", "Small Towns and Rivers"] },
      { unit: "Section III: Writing Skills", topics: ["Summary Writing", "Do Schools Kill Creativity?", "Note-Making", "Statement of Purpose", "Drafting a Virtual Message", "Group Discussion"] },
      { unit: "Section IV: Genre-Novel", topics: ["History of Novel", "To Sir, with Love", "Around the World in Eighty Days", "The Sign of Four"] }
    ],
    "Geography": [
      { unit: "Population", topics: ["Population Part-1", "Population Part-2", "Migration", "Human Development"] },
      { unit: "Human Settlements", topics: ["Types of Settlements", "Land Use", "Rural-Urban Fringe", "Urbanization"] },
      { unit: "Economic Activities", topics: ["Primary Economic Activities", "Secondary Economic Activities", "Tertiary Economic Activities", "Quaternary Activities"] },
      { unit: "Region & Development", topics: ["Concept of Region", "Regional Planning", "Regional Imbalance", "Sustainable Development"] },
      { unit: "Geography: Trends", topics: ["Recent Trends in Geography", "Geographical Information System (GIS)", "Global Positioning System (GPS)", "Careers in Geography"] }
    ]
  },
  computer: {
    "CCC": [
      { unit: "Introduction to Computer", topics: ["History of Computers", "Characteristics of Computer System", "Basic Applications of Computer", "Components of Computer System", "Concept of Hardware and Software"] },
      { unit: "Introduction to Operating System", topics: ["Basics of Operating System", "The User Interface", "Operating System Simple Settings", "File and Directory Management"] },
      { unit: "Word Processing", topics: ["Word Processing Basics", "Opening and Closing Documents", "Text Creation and Manipulation", "Formatting the Text", "Table Manipulation"] },
      { unit: "Spreadsheet", topics: ["Elements of Electronic Spreadsheet", "Manipulation of Cells", "Formulas and Functions", "Charts and Graphs"] },
      { unit: "Presentation", topics: ["Basics of Presentation Software", "Creating Presentation", "Preparation and Formatting of Slides", "Providing Aesthetics", "Slide Show"] },
      { unit: "Internet & WWW", topics: ["Basics of Computer Networks", "Internet", "Services on Internet", "World Wide Web and Websites", "Web Browsing Software", "Search Engines"] },
      { unit: "Digital Financial Tools", topics: ["Digital Financial Tools", "OTP", "QR Code", "UPI", "AEPS", "USSD", "Internet Banking", "E-Wallet"] },
      { unit: "Cyber Security", topics: ["Cyber Security Basics", "Securing PC", "Securing Smart Phone", "Social Networking Safety"] }
    ]
  }
};

const VIDEO_LECTURES = {
  "Physics": [
    { title: "Introduction to Mechanics", duration: "15:20", id: "p7bzE1E5PMY" },
    { title: "Laws of Motion Deep Dive", duration: "22:45", id: "L9X75Xf_6_Y" }
  ],
  "Chemistry": [
    { title: "Atomic Structure Basics", duration: "18:10", id: "p7bzE1E5PMY" },
    { title: "Chemical Bonding Explained", duration: "25:30", id: "L9X75Xf_6_Y" }
  ],
  "Mathematics": [
    { title: "Calculus Fundamentals", duration: "30:15", id: "p7bzE1E5PMY" },
    { title: "Algebraic Identities", duration: "20:00", id: "L9X75Xf_6_Y" }
  ],
  "Biology": [
    { title: "Cell Biology 101", duration: "12:40", id: "p7bzE1E5PMY" },
    { title: "Human Physiology Intro", duration: "28:15", id: "L9X75Xf_6_Y" }
  ],
  "CCC": [
    { title: "Computer Basics for Beginners", duration: "10:00", id: "p7bzE1E5PMY" },
    { title: "Internet & Web Browsing", duration: "15:50", id: "L9X75Xf_6_Y" }
  ],
  "Geography": [
    { title: "World Population Distribution", duration: "18:45", id: "p7bzE1E5PMY" },
    { title: "Human Settlements & Land Use", duration: "21:10", id: "L9X75Xf_6_Y" }
  ]
};

const Syllabus = () => {
  const [examType, setExamType] = useState<keyof typeof SYLLABUS_DATA>("jee");
  const [selectedSubject, setSelectedSubject] = useState<string>("Physics");
  const [activeVideo, setActiveVideo] = useState<{id: string, title: string} | null>(null);

  const handleExamTypeChange = (value: string) => {
    const type = value as keyof typeof SYLLABUS_DATA;
    setExamType(type);
    setSelectedSubject(Object.keys(SYLLABUS_DATA[type])[0]);
    setActiveVideo(null);
  };

  const currentSyllabus = SYLLABUS_DATA[examType][selectedSubject as keyof typeof SYLLABUS_DATA['jee']];
  const currentVideos = VIDEO_LECTURES[selectedSubject as keyof typeof VIDEO_LECTURES] || [];

  const getSubjectIcon = (subject: string) => {
    if (subject.includes("English")) return <Languages className="h-5 w-5" />;
    if (subject === "CCC") return <Monitor className="h-5 w-5" />;
    if (subject === "Geography") return <Globe className="h-5 w-5" />;
    switch (subject) {
      case "Physics": return <Zap className="h-5 w-5" />;
      case "Chemistry": return <Beaker className="h-5 w-5" />;
      case "Mathematics": return <Calculator className="h-5 w-5" />;
      case "Biology": return <Dna className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getThemeColor = () => {
    if (examType === "jee") return "bg-violet-600";
    if (examType === "neet") return "bg-cyan-600";
    if (examType === "computer") return "bg-emerald-600";
    return "bg-orange-600";
  };

  const getTabActiveColor = () => {
    if (examType === "jee") return "data-[state=active]:text-violet-600";
    if (examType === "neet") return "data-[state=active]:text-cyan-600";
    if (examType === "computer") return "data-[state=active]:text-emerald-600";
    return "data-[state=active]:text-orange-600";
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
            Master every topic with our structured curriculum and expert video lectures.
          </p>
        </div>

        {activeVideo && (
          <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <Card className="border-none shadow-2xl shadow-violet-200/50 rounded-[2.5rem] overflow-hidden bg-black relative">
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6 bg-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-violet-600 uppercase tracking-widest mb-1">Now Playing</div>
                  <h3 className="text-xl font-black text-gray-900">{activeVideo.title}</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setActiveVideo(null)} className="rounded-full hover:bg-red-50 hover:text-red-500">
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        <Tabs value={examType} onValueChange={handleExamTypeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-violet-50/50 p-1.5 rounded-2xl max-w-4xl mx-auto">
            <TabsTrigger value="jee" className={`rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm ${getTabActiveColor()}`}>
              JEE
            </TabsTrigger>
            <TabsTrigger value="neet" className={`rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm ${getTabActiveColor()}`}>
              NEET
            </TabsTrigger>
            <TabsTrigger value="maharashtra" className={`rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm ${getTabActiveColor()}`}>
              State Board
            </TabsTrigger>
            <TabsTrigger value="computer" className={`rounded-xl font-bold py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm ${getTabActiveColor()}`}>
              Computer
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(SYLLABUS_DATA[examType]).map((subject) => (
              <Button
                key={subject}
                onClick={() => { setSelectedSubject(subject); setActiveVideo(null); }}
                variant={selectedSubject === subject ? "default" : "outline"}
                className={`rounded-2xl font-bold px-6 h-12 transition-all ${
                  selectedSubject === subject 
                    ? `${getThemeColor()} hover:opacity-90 shadow-lg` 
                    : "bg-white border-violet-100 text-gray-500 hover:text-violet-600"
                }`}
              >
                <span className="mr-2">{getSubjectIcon(subject)}</span>
                {subject}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className={`rounded-[2rem] p-8 text-white mb-4 flex items-center justify-between overflow-hidden relative ${getThemeColor()}`}>
                <div className="relative z-10">
                  <h2 className="text-2xl font-black mb-2">
                    {selectedSubject} Curriculum
                  </h2>
                  <p className="text-white/90 font-medium opacity-90">
                    Comprehensive topic-wise breakdown for {selectedSubject}.
                  </p>
                </div>
                <div className="opacity-10 absolute -right-4 -bottom-4 scale-150">
                  {getSubjectIcon(selectedSubject)}
                </div>
              </div>
              
              {currentSyllabus?.map((section, idx) => (
                <Card key={idx} className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                  <CardHeader className={`${examType === "jee" ? "bg-violet-50/30 border-violet-50" : examType === "neet" ? "bg-cyan-50/30 border-cyan-50" : examType === "computer" ? "bg-emerald-50/30 border-emerald-50" : "bg-orange-50/30 border-orange-50"} border-b`}>
                    <CardTitle className="text-xl font-black flex items-center gap-3 text-gray-900">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-white text-sm ${getThemeColor()}`}>
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
                            examType === "jee" ? "text-violet-400 group-hover:text-violet-600" : 
                            examType === "neet" ? "text-cyan-400 group-hover:text-cyan-600" : 
                            examType === "computer" ? "text-emerald-400 group-hover:text-emerald-600" :
                            "text-orange-400 group-hover:text-orange-600"
                          }`} />
                          <span className="font-bold text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl sticky top-32">
                <CardHeader className="bg-violet-50/50 border-b border-violet-100">
                  <CardTitle className="text-xl font-black flex items-center gap-2">
                    <Video className="h-5 w-5 text-violet-600" />
                    Video Lectures
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {currentVideos.length > 0 ? currentVideos.map((video, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        setActiveVideo({id: video.id, title: video.title});
                        window.scrollTo({ top: 200, behavior: 'smooth' });
                      }}
                      className={`group p-4 rounded-2xl border transition-all cursor-pointer ${
                        activeVideo?.id === video.id 
                        ? 'bg-violet-600 border-violet-600 text-white' 
                        : 'bg-gray-50 border-transparent hover:border-violet-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
                          activeVideo?.id === video.id ? 'bg-white/20 text-white' : 'bg-violet-600 text-white'
                        }`}>
                          <Play className="h-5 w-5 fill-current" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-black text-sm line-clamp-1 ${activeVideo?.id === video.id ? 'text-white' : 'text-gray-900'}`}>{video.title}</div>
                          <div className={`text-xs font-bold uppercase tracking-widest ${activeVideo?.id === video.id ? 'text-violet-200' : 'text-gray-400'}`}>{video.duration} • HD</div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8">
                      <Video className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                      <p className="text-sm font-bold text-gray-400">No videos available for this subject yet.</p>
                    </div>
                  )}
                  <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-12 rounded-xl shadow-lg shadow-violet-100 mt-4">
                    View All Lectures
                  </Button>
                </CardContent>
              </Card>
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
          <Button className={`${getThemeColor()} hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shrink-0 shadow-lg transition-all hover:scale-105`}>
            Generate My Plan
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Syllabus;
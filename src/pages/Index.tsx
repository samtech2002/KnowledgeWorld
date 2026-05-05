import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFF] selection:bg-violet-200 selection:text-violet-900">
      <SEO 
        title="Home - India's Premier Learning Platform" 
        description="KnowledgeWorld.in combines cutting-edge technology with India's top educators to deliver a learning experience that's as effective as it is engaging."
        keywords="JEE, NEET, CCC, online education, India learning platform, physics, math, biology"
      />
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <HeroCarousel />

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-violet-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Active Students", value: "50k+" },
              { label: "Expert Mentors", value: "200+" },
              { label: "Premium Courses", value: "1.2k+" },
              { label: "Success Rate", value: "98%" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl font-black text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">{stat.value}</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Engineered for Excellence</h2>
            <p className="text-xl text-gray-500 font-medium">Our platform is built with the latest pedagogical research and technology.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Video className="h-10 w-10 text-white" />,
                title: "Ultra-HD Live Classes",
                desc: "Experience lag-free, high-definition interactive sessions with real-time doubt resolution.",
                color: "from-violet-600 to-indigo-600"
              },
              {
                icon: <BookOpen className="h-10 w-10 text-white" />,
                title: "AI-Powered Analytics",
                desc: "Get personalized insights into your learning patterns and areas that need focus.",
                color: "from-cyan-500 to-blue-600"
              },
              {
                icon: <ShieldCheck className="h-10 w-10 text-white" />,
                title: "Verified Certifications",
                desc: "Earn industry-recognized certificates that validate your skills and knowledge.",
                color: "from-fuchsia-600 to-pink-600"
              }
            ].map((feature, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-[#F8F9FF] border border-violet-50 hover:bg-white hover:shadow-2xl hover:shadow-violet-100 transition-all duration-500">
                <div className={`mb-8 p-4 bg-gradient-to-br ${feature.color} inline-block rounded-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-violet-900 via-violet-800 to-indigo-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[120px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to redefine your <br /> learning journey?</h2>
            <p className="text-violet-100 mb-12 text-xl max-w-2xl mx-auto font-medium opacity-80">
              Join the elite community of learners at KnowledgeWorld.in and start your path to mastery today.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-white text-violet-900 hover:bg-cyan-50 px-12 h-16 text-xl font-black rounded-2xl shadow-xl transition-all hover:scale-105">
                Join Now — It's Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
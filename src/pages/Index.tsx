import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { 
  BookOpen, 
  Users, 
  Trophy, 
  Video, 
  ArrowRight,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFF] selection:bg-violet-200 selection:text-violet-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-violet-100 text-violet-600 text-sm font-bold mb-8 animate-bounce">
            <Sparkles className="h-4 w-4" />
            Next-Gen Learning Experience
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
            Elevate Your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500">
              Future Potential
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            KnowledgeWorld.in combines cutting-edge technology with India's top educators to deliver a learning experience that's as effective as it is engaging.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/courses">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-10 h-16 text-xl font-bold rounded-2xl shadow-2xl shadow-violet-200 transition-all hover:scale-105">
                Start Free Trial <Rocket className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="px-10 h-16 text-xl font-bold rounded-2xl border-2 border-violet-100 bg-white hover:bg-violet-50 transition-all">
                Explore Courses
              </Button>
            </Link>
          </div>
          
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
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

      <footer className="py-20 border-t border-violet-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-violet-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter">KNOWLEDGEWORLD</span>
          </div>
          <p className="text-gray-400 font-bold text-sm mb-10 tracking-widest uppercase">Empowering the next generation of innovators</p>
          <div className="flex justify-center gap-8 mb-12">
            {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
              <a key={social} href="#" className="text-gray-400 hover:text-violet-600 font-bold transition-colors">{social}</a>
            ))}
          </div>
          <div className="pt-8 border-t border-gray-50">
            <p className="text-gray-400 text-sm mb-4">© 2024 KnowledgeWorld. All rights reserved.</p>
            <MadeWithDyad />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
"use client";

import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920",
    title: "Master Your Future",
    subtitle: "Join 50k+ students learning from India's top educators.",
    tag: "Next-Gen Learning"
  },
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920",
    title: "Interactive Live Classes",
    subtitle: "Experience real-time doubt solving with HD video streaming.",
    tag: "Live Sessions"
  },
  {
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1920",
    title: "Learn Anywhere, Anytime",
    subtitle: "Access premium resources and lectures on any device.",
    tag: "Flexible Learning"
  },
  {
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1920",
    title: "Comprehensive Library",
    subtitle: "Over 1.2k+ courses covering JEE, NEET, CCC and more.",
    tag: "Resource Hub"
  },
  {
    image: "https://images.unsplash.com/photo-1523050335456-c38a89b7d28b?auto=format&fit=crop&q=80&w=1920",
    title: "Achieve Your Dreams",
    subtitle: "98% success rate in competitive exams across India.",
    tag: "Success Stories"
  }
];

const HeroCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      <Carousel 
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="h-[85vh] min-h-[600px] ml-0">
          {SLIDES.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-full pl-0">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-center items-start text-white">
                <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-400 text-sm font-bold mb-6">
                    <Sparkles className="h-4 w-4" />
                    {slide.tag}
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] max-w-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 max-w-xl mb-10 leading-relaxed font-medium opacity-90">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link to="/courses">
                      <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white px-10 h-16 text-xl font-bold rounded-2xl shadow-2xl shadow-violet-900/50 transition-all hover:scale-105">
                        Start Free Trial <Rocket className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                    <Link to="/syllabus">
                      <Button size="lg" variant="outline" className="px-10 h-16 text-xl font-bold rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all">
                        View Syllabus <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Controls */}
        <div className="absolute bottom-12 right-12 flex gap-4 z-20">
          <CarouselPrevious className="static translate-y-0 h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white" />
          <CarouselNext className="static translate-y-0 h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:text-white" />
        </div>
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
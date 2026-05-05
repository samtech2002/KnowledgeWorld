"use client";

import React from 'react';
import { GraduationCap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
  showText?: boolean;
}

const Logo = ({ className, iconSize = 24, textSize = "text-2xl", showText = true }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
      <div className="relative">
        {/* Main Icon Container */}
        <div className="p-2.5 bg-gradient-to-br from-violet-600 via-violet-500 to-cyan-500 rounded-[1.2rem] shadow-xl shadow-violet-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
          <GraduationCap 
            size={iconSize} 
            className="text-white drop-shadow-md" 
          />
        </div>
        
        {/* Decorative Secondary Icon */}
        <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-lg shadow-lg border border-violet-50 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
          <Globe size={iconSize * 0.5} className="text-cyan-500" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            "font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-cyan-600",
            textSize
          )}>
            KNOWLEDGE
          </span>
          <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase ml-0.5">
            WORLD
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
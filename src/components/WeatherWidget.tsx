"use client";

import React from 'react';
import { useWeather } from '@/hooks/useWeather';
import { CloudSun, MapPin, Loader2 } from 'lucide-react';

const WeatherWidget = () => {
  const { weather, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50/50 rounded-full border border-violet-100/50 animate-pulse">
        <Loader2 className="h-3 w-3 text-violet-400 animate-spin" />
        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Detecting...</span>
      </div>
    );
  }

  if (error || !weather) return null;

  return (
    <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border border-violet-100/50 shadow-sm hover:shadow-md transition-all group cursor-default">
      <div className="text-xl group-hover:scale-110 transition-transform duration-300">
        {weather.icon}
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className="text-sm font-black text-gray-900">{weather.temp}°C</span>
          <span className="text-[10px] font-bold text-violet-600 uppercase tracking-tighter">{weather.condition}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={10} className="text-gray-400" />
          <span className="text-[9px] font-bold text-gray-400 truncate max-w-[80px]">{weather.location}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
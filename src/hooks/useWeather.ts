"use client";

import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
  location: string;
  icon: string;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      // Using a free weather API (Open-Meteo for data and a reverse geocoding for name)
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      // Reverse geocoding to get city name
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const geoData = await geoRes.json();
      const city = geoData.address.city || geoData.address.town || geoData.address.village || "Unknown Location";

      setWeather({
        temp: Math.round(weatherData.current_weather.temperature),
        condition: getWeatherCondition(weatherData.current_weather.weathercode),
        location: city,
        icon: getWeatherIcon(weatherData.current_weather.weathercode)
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );

    // Auto-update every 30 minutes
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }, 1800000);

    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error };
}

// Helper to map WMO Weather interpretation codes
function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 99) return "Thunderstorm";
  return "Cloudy";
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "☁️";
}
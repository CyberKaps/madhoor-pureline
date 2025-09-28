"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";


const images = [
   "/assets/NatureBg.png",
  "/assets/SugarcaneFarm.webp",
  "/assets/NatureBg.png",
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Constant Content */}
      <div className="relative text- text-white z-10 px-4">
        <h1 className="text-5xl md:text-8xl font-bold mb-4">
          Cold Pressed <br /> Groundnut oil<br />& Natural Jaggery
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Pure Taste, Straight from the Source
        </p>
        <Button className="px-6 py-3  bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
          Order Online
        </Button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 flex space-x-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
}

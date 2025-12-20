"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Leaf, Sparkles, ArrowRight } from "lucide-react";

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>

      {/* Decorative animated leaf */}
      <motion.div 
        className="absolute top-20 right-20 opacity-20"
        animate={{ 
          rotate: [0, 10, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Leaf className="w-32 h-32 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative text-white z-10 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-[#5a7c5e]/90 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">100% Pure & Organic</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-2xl"
        >
          <span className="text-white">Cold Pressed</span> <br />
          <span className="text-[#b8d99b]">Groundnut Oil</span><br />
          <span className="text-white">& Natural Jaggery</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-white font-medium max-w-2xl drop-shadow-lg"
        >
          Pure Taste, Straight from the Source — Crafted with tradition, delivered with love
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Button className="px-8 py-6 bg-[#5a7c5e] text-white rounded-full font-semibold hover:bg-[#4a6b50] transition shadow-2xl text-lg group">
            Order Online
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button className="px-8 py-6 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition shadow-xl text-lg">
            Explore Products
          </Button>
        </motion.div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 flex space-x-3 z-10">
        {images.map((_, index) => (
          <motion.span
            key={index}
            onClick={() => setCurrent(index)}
            whileHover={{ scale: 1.2 }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              current === index ? "bg-white w-8" : "bg-white/50"
            }`}
          ></motion.span>
        ))}
      </div>
    </section>
  );
}

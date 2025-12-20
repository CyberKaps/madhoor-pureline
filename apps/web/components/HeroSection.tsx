"use client"

import heroProducts from "../assets/HeroImg.png";
import { WhyUs } from "./Whyus";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { Leaf, Droplet, Heart, ShieldCheck } from "lucide-react";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
  return (
    <section ref={ref} className="relative bg-gradient-to-br from-[#c9c0a8] via-[#d4cdb7] to-[#bdb298] py-24 overflow-hidden">
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-10 right-10 opacity-10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Leaf className="w-32 h-32 text-[#5a7c5e]" />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 left-10 opacity-10"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Droplet className="w-24 h-24 text-[#5a7c5e]" />
      </motion.div>

      <motion.div className="container relative z-10" style={{ y, opacity, scale }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Heading */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-[#5a7c5e] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
              >
                <Leaf className="w-4 h-4" />
                100% Organic & Pure
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold text-[#1f3a2e] leading-tight"
              >
                Nature's Goodness,
                <span className="block text-[#5a7c5e]">Delivered Pure</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg text-[#2d4a3e] leading-relaxed"
              >
                Experience the authentic taste of cold-pressed groundnut oil and natural jaggery, 
                crafted with care from farm to table.
              </motion.p>
            </div>

            {/* Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#d4cdb7]">
                <Leaf className="w-6 h-6 text-[#5a7c5e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#1f3a2e] text-sm">100% Natural</h3>
                  <p className="text-xs text-[#4a6b50] mt-1">No chemicals or preservatives</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#d4cdb7]">
                <Droplet className="w-6 h-6 text-[#5a7c5e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#1f3a2e] text-sm">Cold Pressed</h3>
                  <p className="text-xs text-[#4a6b50] mt-1">Extracted below 40°C</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#d4cdb7]">
                <Heart className="w-6 h-6 text-[#5a7c5e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#1f3a2e] text-sm">Ethically Sourced</h3>
                  <p className="text-xs text-[#4a6b50] mt-1">From local farmers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg shadow-md border border-[#d4cdb7]">
                <ShieldCheck className="w-6 h-6 text-[#5a7c5e] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#1f3a2e] text-sm">Premium Quality</h3>
                  <p className="text-xs text-[#4a6b50] mt-1">Hand-crafted with care</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="brand" 
                size="lg"
                className="rounded-full px-8 bg-[#5a7c5e] hover:bg-[#4a6b50] text-white shadow-xl border-2 border-white/30 text-base"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full px-8 border-2 border-[#5a7c5e] text-[#5a7c5e] hover:bg-[#5a7c5e] hover:text-white bg-white/80 backdrop-blur-sm text-base"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            className="relative"
            initial={{ x: 80, opacity: 0, scale: 0.95 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Decorative background circle */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#5a7c5e]/20 to-[#7a9b5c]/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <img
                src={heroProducts.src}
                alt="Fresh Groundnut Oil and Natural Jaggery"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl border-4 border-white/50 relative z-10"
              />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 bg-[#5a7c5e] text-white rounded-full p-6 shadow-2xl z-20 border-4 border-white"
              >
                <div className="text-center">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs font-medium">Organic</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

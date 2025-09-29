"use client"

import { Button } from "./ui/button";
import heroProducts from "../assets/HeroImg.png";
import { WhyUs } from "./Whyus";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="bg-[#fafafa] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <WhyUs />
          </motion.div>

          {/* Right Content - Product Image */}
          <motion.div
            className="relative"
            initial={{ x: 80, opacity: 0, scale: 0.95 }}
            whileInView={{ x: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={heroProducts.src}
              alt="Fresh Groundnut Oil and Natural Jaggery"
              className="w-full h-auto object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

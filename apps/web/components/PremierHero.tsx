"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Leaf, Sparkles, ArrowRight, Droplet, Star } from "lucide-react";
import Link from "next/link";

const heroImages = [
    "/assets/NatureBg.png",
    "/assets/SugarcaneFarm.webp",
    "/assets/NatureBg.png", // Using duplicate as placeholder if only 2 exist
];

export default function PremierHero() {
    const [currentContent, setCurrentContent] = useState(0);
    const containerRef = useRef(null);

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Auto-rotate hero text/theme every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentContent((prev) => (prev + 1) % 2);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#1a2c24]">
            {/* Background Parallax & Overlay */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentContent}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroImages[currentContent]})` }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#dcd6c4]" />
                <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-20" />
            </motion.div>

            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center max-w-5xl mx-auto">

                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full flex items-center gap-2 text-white mb-8 shadow-2xl"
                >
                    <Sparkles className="w-4 h-4 text-[#b8d99b]" />
                    <span className="text-sm font-semibold tracking-wider uppercase">100% Pure & Organic</span>
                </motion.div>

                {/* Main Heading with Staggered Characters */}
                <div className="overflow-hidden">
                    <AnimatePresence mode="wait">
                        {currentContent === 0 ? (
                            <motion.h1
                                key="heading-1"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-8xl font-bold text-white leading-tight drop-shadow-lg font-serif"
                            >
                                Nature's <span className="text-[#b8d99b] inline-block">Gold</span> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#e8e0cc]">
                                    Cold Pressed
                                </span>
                            </motion.h1>
                        ) : (
                            <motion.h1
                                key="heading-2"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-8xl font-bold text-white leading-tight drop-shadow-lg font-serif"
                            >
                                Pure <span className="text-[#e8e0cc] inline-block">Sweetness</span> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#b8d99b]">
                                    Natural Jaggery
                                </span>
                            </motion.h1>
                        )}
                    </AnimatePresence>
                </div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-6 text-xl md:text-2xl text-gray-200 max-w-2xl font-light"
                >
                    Experience the authentic taste of tradition, crafted with care from farm to table. No chemicals, just pure nature.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 mt-10"
                >
                    <Link href="/products">
                        <Button className="h-14 px-8 rounded-full bg-[#5a7c5e] hover:bg-[#4a6b50] text-white text-lg font-semibold shadow-[0_0_20px_rgba(90,124,94,0.5)] border border-[#7a9b5c] transition-all hover:scale-105 group">
                            Shop Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" className="h-14 px-8 rounded-full bg-transparent border-white text-white text-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-all hover:scale-105">
                            Explore Purity
                        </Button>
                    </Link>
                </motion.div>

                {/* Floating Abstract Shapes */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-10 opacity-20 blur-sm pointer-events-none"
                >
                    <Leaf className="w-32 h-32 text-[#b8d99b]" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-10 opacity-20 blur-sm pointer-events-none"
                >
                    <Droplet className="w-40 h-40 text-[#b8d99b]" />
                </motion.div>
            </div>

            {/* Trust Indicators at Grid Bottom */}
            <div className="absolute bottom-0 w-full bg-black/20 backdrop-blur-md border-t border-white/10 py-6 z-20">
                <div className="container mx-auto flex justify-center gap-8 md:gap-16 flex-wrap px-4">
                    {[
                        { icon: Leaf, text: "100% Organic" },
                        { icon: Droplet, text: "Cold Pressed" },
                        { icon: Star, text: "Premium Quality" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-white/90">
                            <item.icon className="w-5 h-5 text-[#b8d99b]" />
                            <span className="text-sm md:text-base font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

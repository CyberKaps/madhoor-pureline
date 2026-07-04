"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, Droplets, ArrowRight } from "lucide-react";

const trustMarkers = [
    { icon: Leaf, label: "100% Pure & Natural" },
    { icon: ShieldCheck, label: "Zero Chemicals" },
    { icon: Droplets, label: "Cold Pressed" },
];

export default function PremierHero() {
    return (
        <section className="w-full flex flex-col items-center bg-[#faf9f8]">
            {/* Full Width Hero Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full relative"
            >
                <Image
                    src="/assets/heroSection.webp"
                    alt="Madhoor Pureline Products"
                    width={1536}
                    height={1024}
                    priority
                    className="w-full h-auto block"
                />
            </motion.div>

            {/* Experience Block */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto px-6 pt-16 pb-16 text-center flex flex-col items-center"
            >
                <div className="w-28 h-28 mb-4">
                    <img
                        src="/assets/logo.jpeg"
                        alt="Madhoor Pureline"
                        className="w-full h-full object-contain mix-blend-multiply rounded-full"
                    />
                </div>

                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">
                    <Leaf className="w-3.5 h-3.5" />
                    26+ Years of Traditional Goodness
                </span>

                <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-5 tracking-tight leading-[1.1]">
                    Pure by Nature,{" "}
                    <span className="text-primary">Perfected by Tradition</span>
                </h1>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                    Madhoor Pureline is a trusted name in naturally crafted jaggery and
                    cold-pressed groundnut oil, made using traditional methods and pure
                    ingredients — bringing the richness of tradition straight to your kitchen.
                </p>

                {/* Call to action buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
                    <Link
                        href="/products"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-[#7b5034] hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
                    >
                        Shop Our Products
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    >
                        Our Story
                    </Link>
                </div>

                {/* Trust markers */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                    {trustMarkers.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-foreground/70">
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                                <Icon className="w-4.5 h-4.5" />
                            </span>
                            <span className="text-sm font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

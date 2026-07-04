"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
    id: string;
    eyebrow: string;
    title: string;
    highlight: string;
    bullets: string[];
    ctaLabel: string;
    ctaHref: string;
    image: { src: string; w: number; h: number };
    /** gradient + accent theme */
    bg: string;
    dark?: boolean;
    accentText: string;
    accentChip: string;
};

const slides: Slide[] = [
    {
        id: "oil",
        eyebrow: "Cold-Pressed Purity",
        title: "Hydraulic Cold-Pressed",
        highlight: "Groundnut Oil",
        bullets: ["No heat extraction", "Zero chemicals or solvents", "Rich, authentic flavor"],
        ctaLabel: "Shop the Oil",
        ctaHref: "/products",
        image: { src: "/assets/productImages/groundnutOil.png", w: 1133, h: 1465 },
        bg: "bg-gradient-to-br from-[#f7efe3] via-[#f2e7d6] to-[#ecdcc6]",
        accentText: "text-primary",
        accentChip: "bg-primary/10 text-primary",
    },
    {
        id: "jaggery",
        eyebrow: "Naturally Sweet",
        title: "100% Natural",
        highlight: "Jaggery (Gud)",
        bullets: ["No sulphur or bleach", "Mineral-rich & unrefined", "Traditional since 1999"],
        ctaLabel: "Shop the Jaggery",
        ctaHref: "/products",
        image: { src: "/assets/productImages/jaggery.png", w: 1462, h: 1030 },
        bg: "bg-gradient-to-br from-[#eef4e5] via-[#e6efda] to-[#dbe8cd]",
        accentText: "text-leaf",
        accentChip: "bg-leaf/10 text-leaf",
    },
    // {
    //     id: "heritage",
    //     eyebrow: "26+ Years of Trust",
    //     title: "From Our Farms",
    //     highlight: "to Your Kitchen",
    //     bullets: ["Farm-direct sourcing", "Chemical-free & pure", "Loved by 1000s of families"],
    //     ctaLabel: "Explore Products",
    //     ctaHref: "/products",
    //     image: { src: "/assets/productImages/family-combo.png", w: 1200, h: 1200 },
    //     bg: "bg-gradient-to-br from-[#8a5a38] via-[#7b5034] to-[#3d2a20]",
    //     dark: true,
    //     accentText: "text-[#f5c578]",
    //     accentChip: "bg-white/10 text-[#f5c578]",
    // },
];

const DURATION = 5200;

export default function PromoCarousel() {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef(0);

    const slide = slides[active]!;

    useEffect(() => {
        if (paused || reduceMotion) return;
        let raf = 0;
        const start = performance.now() - progressRef.current * DURATION;
        const tick = (now: number) => {
            const p = Math.min((now - start) / DURATION, 1);
            progressRef.current = p;
            setProgress(p);
            if (p >= 1) {
                progressRef.current = 0;
                setProgress(0);
                setActive((prev) => (prev + 1) % slides.length);
            } else {
                raf = requestAnimationFrame(tick);
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, paused, reduceMotion]);

    const goTo = (i: number) => {
        progressRef.current = 0;
        setProgress(0);
        setActive((i + slides.length) % slides.length);
    };

    return (
        <section className="py-12 md:py-16 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <div
                    className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-lg"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`${slide.bg} relative`}
                        >
                            <div className="grid md:grid-cols-2 items-center gap-6 min-h-[440px] md:min-h-[420px] px-8 py-10 md:px-14">
                                {/* Text */}
                                <div className={`relative z-10 text-center md:text-left ${slide.dark ? "text-white" : "text-foreground"}`}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <span className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full ${slide.accentChip}`}>
                                            {slide.eyebrow}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] mb-5">
                                            {slide.title}{" "}
                                            <span className={slide.accentText}>{slide.highlight}</span>
                                        </h2>
                                        <ul className="space-y-2.5 mb-7 inline-block text-left">
                                            {slide.bullets.map((b) => (
                                                <li key={b} className={`flex items-center gap-2.5 text-sm md:text-base ${slide.dark ? "text-white/85" : "text-muted-foreground"}`}>
                                                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${slide.accentText}`} />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                        <div>
                                            <Link
                                                href={slide.ctaHref}
                                                className={`group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ${
                                                    slide.dark ? "bg-white text-primary" : "bg-primary text-primary-foreground hover:bg-[#7b5034]"
                                                }`}
                                            >
                                                {slide.ctaLabel}
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Product image */}
                                <div className="relative flex justify-center md:justify-end">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, x: 30 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <motion.div
                                            animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <Image
                                                src={slide.image.src}
                                                alt={`${slide.title} ${slide.highlight}`}
                                                width={slide.image.w}
                                                height={slide.image.h}
                                                className="w-auto h-auto max-h-[300px] md:max-h-[340px] max-w-full object-contain rounded-2xl ring-4 ring-white/60 shadow-2xl"
                                            />
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Arrows */}
                    <button
                        onClick={() => goTo(active - 1)}
                        aria-label="Previous slide"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-foreground hover:bg-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => goTo(active + 1)}
                        aria-label="Next slide"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-foreground hover:bg-white transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots + progress */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                        {slides.map((s, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to ${s.highlight}`}
                                    className={`h-2 rounded-full overflow-hidden transition-all duration-300 ${
                                        isActive ? "w-8 bg-black/15" : "w-2 bg-black/20 hover:bg-black/30"
                                    }`}
                                >
                                    {isActive && (
                                        <span
                                            className="block h-full bg-primary rounded-full"
                                            style={{ width: `${reduceMotion ? 100 : progress * 100}%` }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

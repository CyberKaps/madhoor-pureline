"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, Droplets, ArrowRight, Star } from "lucide-react";

const trustMarkers = [
    { icon: Leaf, label: "100% Pure & Natural" },
    { icon: ShieldCheck, label: "Zero Chemicals" },
    { icon: Droplets, label: "Cold Pressed" },
];

const products = [
    {
        name: "Cold-Pressed Groundnut Oil",
        subtitle: "Hydraulic pressed · Chemical-free",
        img: "/assets/productImages/groundnutOil.png",
        w: 1133,
        h: 1465,
    },
    {
        name: "Natural Jaggery (Gud)",
        subtitle: "Traditional · Unrefined · Since 1999",
        img: "/assets/productImages/jaggery.png",
        w: 1462,
        h: 1030,
    },
];

const DURATION = 2800;

export default function PremierHero() {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef(0);

    const product = products[active]!;

    // Auto-rotate with a smooth progress value (pauses on hover / reduced motion)
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
                setActive((prev) => (prev + 1) % products.length);
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
        setActive(i);
    };

    // ─── 3D tilt (cursor parallax) ───
    const mx = useMotionValue(0); // -0.5 .. 0.5
    const my = useMotionValue(0);
    const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), springCfg);
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), springCfg);
    const badgeX = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), springCfg);
    const badgeY = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), springCfg);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const handleLeave = () => {
        mx.set(0);
        my.set(0);
        setPaused(false);
    };

    // ─── Cursor-reactive glow (follows mouse across the whole hero) ───
    const glowX = useMotionValue(-500);
    const glowY = useMotionValue(-500);
    const gx = useSpring(glowX, { stiffness: 120, damping: 25, mass: 0.6 });
    const gy = useSpring(glowY, { stiffness: 120, damping: 25, mass: 0.6 });

    const handleSectionMove = (e: React.MouseEvent<HTMLElement>) => {
        if (reduceMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        glowX.set(e.clientX - r.left);
        glowY.set(e.clientY - r.top);
    };

    return (
        <section
            onMouseMove={handleSectionMove}
            className="relative w-full overflow-hidden bg-gradient-to-br from-[#faf6f2] via-[#f6f0e9] to-[#eef2e5]"
        >
            {/* Cursor-reactive warm glow */}
            {!reduceMotion && (
                <motion.div aria-hidden style={{ x: gx, y: gy }} className="pointer-events-none absolute left-0 top-0 z-0">
                    <div
                        className="-translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full blur-3xl"
                        style={{ background: "radial-gradient(circle, rgba(145,98,66,0.12), transparent 60%)" }}
                    />
                </motion.div>
            )}

            {/* Animated ambient blobs */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
                animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-leaf/10 blur-3xl"
                animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative container mx-auto px-6 pt-28 md:pt-32 pb-20 md:pb-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* ─── Left: Text ─── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center lg:text-left"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/70 border border-primary/15 text-primary text-xs font-semibold tracking-widest uppercase shadow-sm backdrop-blur-sm">
                            <Leaf className="w-3.5 h-3.5" />
                            Since 1999 · 26+ Years of Purity
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-[1.08] mb-6">
                            Rooted in Nature,
                            <br />
                            <span className="text-primary">Made with Purity</span>
                        </h1>

                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                            Pure cold-pressed groundnut oil and natural jaggery — crafted the
                            traditional way, free from chemicals, for a healthier you and a
                            better tomorrow.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 mb-10">
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

                        <div className="flex flex-wrap items-center lg:justify-start justify-center gap-x-6 gap-y-3">
                            {trustMarkers.map(({ icon: Icon, label }) => (
                                <div key={label} className="flex items-center gap-2 text-foreground/70">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                        <Icon className="w-4 h-4" />
                                    </span>
                                    <span className="text-sm font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── Right: Animated product spotlight ─── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="relative"
                    >
                        <div
                            className="relative mx-auto w-full max-w-[30rem]"
                            onMouseEnter={() => setPaused(true)}
                            onMouseMove={handleMove}
                            onMouseLeave={handleLeave}
                            style={{ perspective: 1000 }}
                        >
                            {/* The stage (tilts with cursor) */}
                            <motion.div
                                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                                className="relative rounded-[2.5rem] bg-gradient-to-br from-[#f4eee5] via-[#eef1e7] to-[#e6efdf] border border-white shadow-sm overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.12]"
                                    style={{
                                        backgroundImage: "radial-gradient(#916242 1px, transparent 1px)",
                                        backgroundSize: "22px 22px",
                                    }}
                                />

                                {/* Spotlight glow */}
                                <motion.div
                                    aria-hidden
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/60 blur-3xl"
                                    animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0.75, 0.5] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                />

                                {/* Rotating product */}
                                <div className="relative h-[440px] sm:h-[500px] flex items-center justify-center p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={active}
                                            initial={{ opacity: 0, x: reduceMotion ? 0 : 60, scale: 0.9 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: reduceMotion ? 0 : -60, scale: 0.9 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ transform: "translateZ(50px)" }}
                                        >
                                            <motion.div
                                                animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
                                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                            >
                                                <Image
                                                    src={product.img}
                                                    alt={product.name}
                                                    width={product.w}
                                                    height={product.h}
                                                    priority
                                                    className="w-auto h-auto max-h-[380px] max-w-full object-contain rounded-2xl ring-4 ring-white shadow-2xl"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </motion.div>

                            {/* Floating purity badge — parallax */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                style={{ x: badgeX, y: badgeY }}
                                className="absolute -top-4 -right-3 bg-leaf text-leaf-foreground rounded-2xl shadow-xl px-4 py-3 text-center z-30"
                            >
                                <div className="text-lg font-bold leading-none">100%</div>
                                <div className="text-[10px] font-semibold tracking-wider uppercase mt-1">
                                    Chemical Free
                                </div>
                            </motion.div>

                            {/* Floating rating pill — parallax (opposite) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.75 }}
                                style={{ x: badgeY, y: badgeX }}
                                className="absolute -bottom-4 -left-3 bg-white rounded-2xl shadow-xl px-4 py-3 border border-black/5 z-30"
                            >
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                                    ))}
                                </div>
                                <span className="block text-[11px] text-muted-foreground font-medium mt-0.5">
                                    Loved by 1000s of families
                                </span>
                            </motion.div>
                        </div>

                        {/* Product caption + progress switcher */}
                        <div className="mt-8 flex flex-col items-center gap-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-center"
                                >
                                    <h3 className="font-serif font-bold text-lg text-foreground">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {product.subtitle}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center gap-2">
                                {products.map((p, i) => {
                                    const isActive = i === active;
                                    return (
                                        <button
                                            key={p.name}
                                            onClick={() => goTo(i)}
                                            aria-label={`Show ${p.name}`}
                                            className={`h-2 rounded-full overflow-hidden transition-all duration-300 ${
                                                isActive ? "w-8 bg-primary/20" : "w-2 bg-primary/30 hover:bg-primary/50"
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
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

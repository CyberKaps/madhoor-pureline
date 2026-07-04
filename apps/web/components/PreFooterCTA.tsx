"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function PreFooterCTA() {
    const reduceMotion = useReducedMotion();

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#a06a42] via-[#7b5034] to-[#3d2a20] text-white">
            {/* Warm radial highlight */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 right-0 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-40"
                style={{ background: "radial-gradient(circle, rgba(245,197,120,0.5), transparent 60%)" }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-40 -left-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-30"
                style={{ background: "radial-gradient(circle, rgba(46,125,50,0.5), transparent 60%)" }}
            />

            <div className="relative container mx-auto px-6 py-24 md:py-28 text-center">
                <motion.div
                    initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="h-px w-8 bg-white/40" />
                        <span className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-white/70">
                            Made Pure, Made for You
                        </span>
                        <span className="h-px w-8 bg-white/40" />
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] max-w-4xl mx-auto mb-6">
                        Ready to bring home the taste of{" "}
                        <span className="text-[#f5c578]">real purity?</span>
                    </h2>

                    {/* Subcopy */}
                    <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
                        Pure cold-pressed groundnut oil and natural jaggery — crafted the
                        traditional way and delivered fresh to your door.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/products"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                        >
                            Shop Our Products
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="https://wa.me/919834452105"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chat on WhatsApp
                        </a>
                    </div>

                    {/* Trust line */}
                    <p className="mt-8 text-white/50 text-xs md:text-sm tracking-wide">
                        100% Pure · Chemical-Free · Trusted since 1999
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";

type PageHeroProps = {
    badge?: string;
    title: string;
    highlight?: string;
    subtitle?: string;
    /** Optional background image path. Falls back to the gradient if missing. */
    image?: string;
};

export default function PageHero({ badge, title, highlight, subtitle, image }: PageHeroProps) {
    const reduceMotion = useReducedMotion();
    const [imageOk, setImageOk] = useState(true);
    const showImage = Boolean(image) && imageOk;

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#faf6f2] via-[#f6f0e9] to-[#eef2e5] pt-32 md:pt-36 pb-16 md:pb-20">
            {/* Background image + cream scrim (only when an image is available) */}
            {showImage && (
                <>
                    <Image
                        src={image!}
                        alt=""
                        aria-hidden
                        fill
                        priority
                        sizes="100vw"
                        onError={() => setImageOk(false)}
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/90" />
                </>
            )}

            {/* Ambient blobs */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
                animate={reduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -bottom-28 -left-24 w-96 h-96 rounded-full bg-leaf/10 blur-3xl"
                animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="relative container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {badge && (
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/70 border border-primary/15 text-primary text-xs font-semibold tracking-widest uppercase shadow-sm backdrop-blur-sm">
                            <Leaf className="w-3.5 h-3.5" />
                            {badge}
                        </span>
                    )}

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-[1.1] mb-5">
                        {title}
                        {highlight && (
                            <>
                                {" "}
                                <span className="text-primary">{highlight}</span>
                            </>
                        )}
                    </h1>

                    {subtitle && (
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

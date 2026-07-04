"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

type Stat = { value: string; label: string };

const stats: Stat[] = [
    { value: "26+", label: "YEARS LEGACY" },
    { value: "100%", label: "PURE & ORGANIC" },
    { value: "0%", label: "CHEMICALS" },
    { value: "A1", label: "QUALITY GRADE" },
];

function CountUpValue({ value, start }: { value: string; start: boolean }) {
    // Split into leading number (if any) + surrounding text, e.g. "26+" -> 26 & "+"
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

    useEffect(() => {
        if (!match || !start) return;
        const [, prefix = "", digits = "0", suffix = ""] = match;
        const controls = animate(0, parseInt(digits, 10), {
            duration: 1.4,
            ease: "easeOut",
            onUpdate: (latest) => {
                setDisplay(`${prefix}${Math.round(latest)}${suffix}`);
            },
        });
        return () => controls.stop();
    }, [start, value]);

    return <>{match ? display : value}</>;
}

export default function Metrics() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="w-full bg-[#211814]/5 py-12 md:py-16">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white border border-[#211814]/10 rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-3 tabular-nums">
                                <CountUpValue value={stat.value} start={inView} />
                            </div>
                            <div className="text-xs font-semibold tracking-[0.2em] text-[#211814]/70 uppercase text-center">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

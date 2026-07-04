"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
    const reduceMotion = useReducedMotion();
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [down, setDown] = useState(false);

    // Dot follows instantly; ring trails with a spring.
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 });

    useEffect(() => {
        if (reduceMotion) return;
        // Only for real mouse pointers (skip touch devices)
        if (!window.matchMedia("(pointer: fine)").matches) return;

        setEnabled(true);
        document.body.classList.add("hide-native-cursor");

        const move = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            const target = e.target as HTMLElement | null;
            setHovering(
                Boolean(target?.closest('a, button, [role="button"], input, textarea, select, label'))
            );
        };
        const onDown = () => setDown(true);
        const onUp = () => setDown(false);

        window.addEventListener("mousemove", move);
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.body.classList.remove("hide-native-cursor");
        };
    }, [reduceMotion]);

    if (!enabled) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
            {/* Dot */}
            <motion.div style={{ x, y }} className="absolute left-0 top-0">
                <div
                    className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height,opacity,transform] duration-200 ${
                        hovering ? "w-1.5 h-1.5 opacity-50" : "w-2 h-2 opacity-100"
                    } ${down ? "scale-75" : ""}`}
                />
            </motion.div>

            {/* Trailing ring */}
            <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
                <div
                    className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 transition-[width,height,background-color,transform] duration-200 ${
                        hovering ? "w-11 h-11 bg-primary/5 border-primary/40" : "w-8 h-8"
                    } ${down ? "scale-90" : ""}`}
                />
            </motion.div>
        </div>
    );
}

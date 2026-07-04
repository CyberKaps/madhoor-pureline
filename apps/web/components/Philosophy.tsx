"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ShieldCheck, Sparkles, Sprout, type LucideIcon } from "lucide-react";

type Item = {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: "leaf" | "primary";
};

const items: Item[] = [
  {
    title: "Zero Chemical Processing",
    desc: "We strictly avoid chemical solvents, artificial colors, and synthetic preservatives. What you get is nature in its truest form.",
    icon: ShieldCheck,
    accent: "leaf",
  },
  {
    title: "Nutrient Retention",
    desc: "By avoiding high heat in our extraction processes, our oils and jaggery retain their natural antioxidants, vitamins, and deep regional flavors.",
    icon: Sparkles,
    accent: "primary",
  },
  {
    title: "Sustainable Sourcing",
    desc: "We partner with local farmers to ensure ethical practices, sustainable agriculture, and fair trade from seed to packaging.",
    icon: Sprout,
    accent: "leaf",
  },
];

function PhilosophyCard({ item, index }: { item: Item; index: number }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 18, mass: 0.4 };
  const rotateX = useSpring(mvX, springCfg);
  const rotateY = useSpring(mvY, springCfg);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mvX.set(py * -7);
    mvY.set(px * 7);
  };
  const handleLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  const Icon = item.icon;
  const isLeaf = item.accent === "leaf";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative bg-card border border-border rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-2xl hover:border-primary/25 transition-[box-shadow,border-color] duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className={`pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isLeaf ? "bg-leaf/15" : "bg-primary/15"
        }`}
      />

      {/* Faint index number */}
      <span className="absolute top-6 right-8 font-serif font-bold text-5xl text-foreground/[0.04] select-none">
        0{index + 1}
      </span>

      {/* Icon chip */}
      <div
        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
          isLeaf ? "bg-leaf/10 text-leaf" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="w-7 h-7" strokeWidth={1.75} />
      </div>

      <h3 className="relative text-2xl font-bold text-foreground mb-4">{item.title}</h3>
      <p className="relative text-muted-foreground leading-relaxed">{item.desc}</p>

      {/* Bottom accent line grows on hover */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 ${
          isLeaf ? "bg-leaf" : "bg-primary"
        }`}
      />
    </motion.div>
  );
}

export default function Philosophy() {
  return (
    <section className="py-20 px-4 mt-12 bg-white border-y border-[#ece4dd]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-4">Why Choose Madhoor?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <PhilosophyCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

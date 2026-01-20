"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Droplet, Award, Users, Sparkles, Target, ArrowRight } from "lucide-react";
import Image from "next/image";

// Placeholder for images - ideally these would be imports
// import aboutHero from "../../assets/aboutHero.jpg"; 

export default function AboutPage() {
  return (
    <main className="bg-[#f5fbe9] min-h-screen text-[#1f3a2e] overflow-hidden">

      {/* Parallax-style Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#1f3a2e]">
          {/* Abstract organic shapes */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#5a7c5e] rounded-full blur-[150px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#b8d99b] rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-20"></div>
        </div>

        <div className="container relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-8 text-white/90">
              <Sparkles className="w-4 h-4 text-[#b8d99b]" />
              <span className="text-sm font-medium tracking-wider uppercase">Est. 1999</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              Rooted in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8d99b] to-[#e8e0cc]">Tradition</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Crafting purity for over two decades. A legacy of wholesome, chemical-free nutrition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section with Timeline vibe */}
      <section className="py-24 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-[#1f3a2e] leading-tight">
              From Our Family <br /> to Yours.
            </h2>
            <div className="space-y-6 text-lg text-[#4a6b50] leading-relaxed">
              <p>
                Madhoor Pureline began as a humble promise: to provide jaggery that tasted like home.
                Starting as <strong>Krishna Organic Agro Products</strong> in 1999, we championed the cause of
                chemical-free farming when it was still a novel concept.
              </p>
              <p>
                Today, we have expanded our family of products to include premium
                <strong> Hydraulic Cold Pressed Oils</strong>. Unlike industrial processing, our method relies
                on patience and precision—extracting oils without heat to preserve every drop of nutrition.
              </p>
              <div className="p-6 bg-[#e8e0cc]/30 border-l-4 border-[#5a7c5e] rounded-r-xl italic text-[#2d4a3e]">
                "Our oils are free from preservatives, added water, and palm oil. Just nature, bottled."
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-[#1f3a2e] rounded-[3rem] overflow-hidden relative shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="/assets/SugarcaneFarm.webp" alt="Our Farm" className="w-full h-full object-cover opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-bold text-xl">Krishna Organic Agro</p>
                <p className="text-sm opacity-80">Our Roots in Maharashtra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="bg-[#1f3a2e] py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Legacy", value: "25+" },
              { label: "Pure & Organic", value: "100%" },
              { label: "Chemicals", value: "0%" },
              { label: "Quality Grade", value: "A1" },
            ].map((stat, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="text-4xl md:text-5xl font-bold text-[#b8d99b] mb-2">{stat.value}</h3>
                <p className="text-sm uppercase tracking-widest opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#5a7c5e] font-bold tracking-widest uppercase text-sm">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1f3a2e] mt-2">Why We Do What We Do</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Integrity First",
              desc: "We never compromise on quality. If it's not pure enough for our family, it's not pure enough for yours.",
              color: "bg-rose-100 text-rose-600"
            },
            {
              icon: Leaf,
              title: "Sustainable Future",
              desc: "We work directly with local farmers, ensuring fair trade and eco-friendly practices that protect our soil.",
              color: "bg-emerald-100 text-emerald-600"
            },
            {
              icon: Target,
              title: "Zero Water Sourcing",
              desc: "Our unique processing ensures zero added moisture, giving you oils with longer shelf life and richer taste.",
              color: "bg-blue-100 text-blue-600"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#e8e0cc] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1f3a2e] mb-4">{item.title}</h3>
              <p className="text-[#4a6b50] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#e8e0cc] relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1f3a2e] mb-8">
            Experience the Purity Yourself
          </h2>
          <a href="/products">
            <button className="bg-[#1f3a2e] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#5a7c5e] transition-all shadow-xl hover:shadow-2xl inline-flex items-center gap-2 group">
              Shop Our Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </div>
      </section>

    </main>
  );
}
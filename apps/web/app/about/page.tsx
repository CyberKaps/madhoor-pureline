"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Philosophy from "../../components/Philosophy";

export default function AboutPage() {
  return (
    <main className="bg-[#faf9f8] min-h-screen text-[#444] overflow-hidden pt-24 pb-12">

      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[#444] mb-6 leading-tight">
              26+ Years of Pure Tradition
            </h1>
            <p className="text-xl md:text-2xl text-[#8c5e3d] font-medium leading-relaxed mb-8">
              We aspire to transform everyday cooking from chemically-refined staples to naturally wholesome, cold-pressed, and organically processed alternatives.
            </p>
          </motion.div>
        </div>

        {/* Feature Image / Banner */}
        <motion.div
          className="w-full aspect-[21/9] md:aspect-[21/7] bg-[#ece4dd] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8c5e3d]/20 to-transparent z-10" />
          <Image
            src="/assets/SugarcaneFarm.webp"
            alt="Madhoor Pureline Products"
            fill
            priority
            className="object-cover opacity-90 blur-[2px] scale-100"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-8 py-4 md:px-12 md:py-6 rounded-full border border-[#2e7d32]/20 shadow-xl">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#2e7d32] tracking-wide">
                100% NATURAL
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Our Story & Process */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-[#666] leading-relaxed"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2e7d32] mb-8">
              From Our Farms <br /> to Your Kitchen
            </h2>
            <p>
              Madhoor Pureline began as a humble promise in 1999: to provide organic, chemical-free food staples that taste like home. What started as <strong>Krushna Organic Agro Products</strong> has blossomed into a legacy of health-conscious manufacturing.
            </p>
            <p>
              Our flagship products, the <strong>Hydraulic Cold Press Groundnut Oil</strong> and <strong>100% Organic Jaggery</strong>, are crafted using traditional techniques paired with modern hygiene. We extract oils mechanically without heating them, completely bypassing the chemical solvents used in refined oils.
            </p>
            <p>
              Similarly, our Jaggery is processed using a state-of-the-art <strong>indirect heating system</strong>, ensuring no charring occurs and every essential mineral is beautifully preserved without the use of sulphur or bleach.
            </p>

            <div className="pt-4">
              <ul className="space-y-3 font-medium text-[#8c5e3d]">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2e7d32] w-5 h-5" /> 0% Preservatives & Chemicals</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2e7d32] w-5 h-5" /> Mechanically Wood-Pressed Oils</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#2e7d32] w-5 h-5" /> Indirect Steam Heated Jaggery</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 pt-12">
              <div className="bg-[#ece4dd] rounded-[2rem] aspect-[4/5] p-6 shadow-sm flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Leaf className="w-12 h-12 text-[#8c5e3d] mb-4" />
                <h3 className="font-bold text-xl text-[#444]">Organic Farms</h3>
                <p className="text-sm mt-2 opacity-80">Direct from local farmers</p>
              </div>
              <div className="bg-[#2e7d32] text-white rounded-[2rem] aspect-[4/5] p-6 shadow-lg flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Heart className="w-12 h-12 text-white/90 mb-4" />
                <h3 className="font-bold text-xl">Heart Healthy</h3>
                <p className="text-sm mt-2 opacity-90">Rich in MUFA & PUFA</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#8c5e3d] text-white rounded-[2rem] aspect-[4/5] p-6 shadow-lg flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Shield className="w-12 h-12 text-white/90 mb-4" />
                <h3 className="font-bold text-xl">Purity Assured</h3>
                <p className="text-sm mt-2 opacity-90">Zero sulphur bleach</p>
              </div>
              <div className="bg-white rounded-[2rem] aspect-[4/5] p-6 shadow-sm border border-[#ece4dd] flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Target className="w-12 h-12 text-[#2e7d32] mb-4" />
                <h3 className="font-bold text-xl text-[#444]">Hydraulic Press</h3>
                <p className="text-sm mt-2 opacity-80">No heat extraction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values / Philosophy */}
      <Philosophy />

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#444] mb-8">
            Experience the Purity Yourself
          </h2>
          <Link href="/products">
            <button className="bg-[#8c5e3d] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#6e492f] transition-all shadow-md hover:shadow-xl inline-flex items-center gap-2 group">
              Shop Our Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}
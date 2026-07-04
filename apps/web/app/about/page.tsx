"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Philosophy from "../../components/Philosophy";
import PageHero from "../../components/PageHero";

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen text-foreground overflow-hidden">

      <PageHero
        badge="Our Story"
        title="26+ Years of Pure"
        highlight="Tradition"
        subtitle="We aspire to transform everyday cooking — from chemically-refined staples to naturally wholesome, cold-pressed, and organically processed alternatives."
        image="/assets/hero/about.webp"
      />

      {/* Feature Banner */}
      <section className="relative px-4 pt-12 md:pt-16 pb-8 max-w-7xl mx-auto">
        <motion.div
          className="w-full aspect-[21/9] md:aspect-[21/7] bg-muted rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-sm"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/25 to-transparent z-10" />
          <Image
            src="/assets/SugarcaneFarm.webp"
            alt="Madhoor Pureline Farms"
            fill
            priority
            className="object-cover opacity-90 blur-[3px] scale-105"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-8 py-4 md:px-12 md:py-6 rounded-full border border-leaf/20 shadow-xl">
              <p className="text-2xl md:text-4xl font-serif font-bold text-leaf tracking-wide">
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
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-8">
              From Our Farms <br /> to Your Kitchen
            </h2>
            <p>
              Madhoor Pureline began as a humble promise in 1999: to provide organic, chemical-free food staples that taste like home. What started as <strong className="text-foreground">Krushna Organic Agro Products</strong> has blossomed into a legacy of health-conscious manufacturing.
            </p>
            <p>
              Our flagship products, the <strong className="text-foreground">Hydraulic Cold Press Groundnut Oil</strong> and <strong className="text-foreground">100% Organic Jaggery</strong>, are crafted using traditional techniques paired with modern hygiene. We extract oils mechanically without heating them, completely bypassing the chemical solvents used in refined oils.
            </p>
            <p>
              Similarly, our Jaggery is processed using a state-of-the-art <strong className="text-foreground">indirect heating system</strong>, ensuring no charring occurs and every essential mineral is beautifully preserved without the use of sulphur or bleach.
            </p>

            <div className="pt-4">
              <ul className="space-y-3 font-medium text-primary">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-leaf w-5 h-5 shrink-0" /> 0% Preservatives & Chemicals</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-leaf w-5 h-5 shrink-0" /> Mechanically Wood-Pressed Oils</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-leaf w-5 h-5 shrink-0" /> Indirect Steam Heated Jaggery</li>
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
              <div className="bg-muted rounded-[2rem] aspect-[4/5] p-6 shadow-sm flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Leaf className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-bold text-xl text-foreground">Organic Farms</h3>
                <p className="text-sm mt-2 text-muted-foreground">Direct from local farmers</p>
              </div>
              <div className="bg-leaf text-leaf-foreground rounded-[2rem] aspect-[4/5] p-6 shadow-lg flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Heart className="w-12 h-12 text-white/90 mb-4" />
                <h3 className="font-bold text-xl">Heart Healthy</h3>
                <p className="text-sm mt-2 opacity-90">Rich in MUFA & PUFA</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-primary text-primary-foreground rounded-[2rem] aspect-[4/5] p-6 shadow-lg flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Shield className="w-12 h-12 text-white/90 mb-4" />
                <h3 className="font-bold text-xl">Purity Assured</h3>
                <p className="text-sm mt-2 opacity-90">Zero sulphur bleach</p>
              </div>
              <div className="bg-white rounded-[2rem] aspect-[4/5] p-6 shadow-sm border border-border flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300">
                <Target className="w-12 h-12 text-leaf mb-4" />
                <h3 className="font-bold text-xl text-foreground">Hydraulic Press</h3>
                <p className="text-sm mt-2 text-muted-foreground">No heat extraction</p>
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
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-8">
            Experience the Purity Yourself
          </h2>
          <Link href="/products">
            <button className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-bold text-lg hover:bg-[#7b5034] transition-all shadow-md hover:shadow-xl hover:scale-[1.03] inline-flex items-center gap-2 group">
              Shop Our Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}

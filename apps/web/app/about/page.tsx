"use client"

import { motion } from "framer-motion";
import { Leaf, Heart, Shield, Droplet, Award, Users, Sparkles, Target } from "lucide-react";

function page() {
  return (
    <main className="bg-gradient-to-b from-[#dcd6c4] to-[#c9c0a8] min-h-screen text-[#1f3a2e]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5a7c5e] to-[#4a6b50] py-24 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-20 right-20 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Leaf className="w-40 h-40 text-white" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Since 1999 - A Legacy of Purity</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About Madhoor Pureline
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
          >
            Where purity meets health. Crafting wholesome, chemical-free food products
            that nourish both body and soul.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-20 bg-[#e8e0cc]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 text-[#1f3a2e] flex items-center gap-3">
              <div className="w-12 h-1 bg-[#5a7c5e]"></div>
              Our Story & Vision
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-[#2d4a3e]">
                We are a proud extension of <strong className="text-[#5a7c5e]">Madhur Jaggery (Krishna Organic Agro Products)</strong> —
                a trusted name in organic jaggery since 1999. With decades of experience
                and a strong foundation built on integrity and innovation, we carry forward
                a legacy of natural, high-quality food production.
              </p>
              <p className="text-lg leading-relaxed text-[#2d4a3e]">
                In our expansion into the edible oil industry, we specialize in
                <strong className="text-[#5a7c5e]"> Hydraulic Cold Pressed Oils</strong> made from carefully selected,
                A1-grade raw materials. Our oils are free from preservatives, added water,
                and palm oil, crafted with an indirect heating method that retains essential
                nutrients and natural flavors — just as nature intended.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#5a7c5e] to-[#7a9b5c] p-8 rounded-2xl shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/90 p-6 rounded-xl text-center">
                    <Award className="w-12 h-12 text-[#5a7c5e] mx-auto mb-3" />
                    <p className="text-3xl font-bold text-[#1f3a2e]">25+</p>
                    <p className="text-sm text-[#4a6b50] font-medium">Years Legacy</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-xl text-center">
                    <Users className="w-12 h-12 text-[#5a7c5e] mx-auto mb-3" />
                    <p className="text-3xl font-bold text-[#1f3a2e]">100%</p>
                    <p className="text-sm text-[#4a6b50] font-medium">Organic</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-xl text-center">
                    <Leaf className="w-12 h-12 text-[#5a7c5e] mx-auto mb-3" />
                    <p className="text-3xl font-bold text-[#1f3a2e]">A1</p>
                    <p className="text-sm text-[#4a6b50] font-medium">Grade Quality</p>
                  </div>
                  <div className="bg-white/90 p-6 rounded-xl text-center">
                    <Heart className="w-12 h-12 text-[#5a7c5e] mx-auto mb-3" />
                    <p className="text-3xl font-bold text-[#1f3a2e]">0</p>
                    <p className="text-sm text-[#4a6b50] font-medium">Chemicals</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-[#2d4a3e] to-[#1f3a2e] text-white py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Why Choose <span className="text-[#7a9b5c]">Madhoor Pureline</span>?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "100% Organic",
                desc: "Made from premium, locally grown ingredients with zero chemicals."
              },
              {
                icon: Droplet,
                title: "Cold Press Technology",
                desc: "Retains nutrients and natural flavors through indirect heating."
              },
              {
                icon: Shield,
                title: "Eco-Friendly",
                desc: "Food-grade packaging with quality-controlled manufacturing."
              },
              {
                icon: Target,
                title: "Zero Water Processing",
                desc: "We never add water or moisture content during processing."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-[#5a7c5e] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#7a9b5c]">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 md:px-20 bg-[#e8e0cc]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-[#5a7c5e]"></div>
              <Target className="w-8 h-8 text-[#5a7c5e]" />
              <div className="w-12 h-1 bg-[#5a7c5e]"></div>
            </div>
            
            <h2 className="text-4xl font-bold mb-8 text-[#1f3a2e]">
              Our Mission
            </h2>
            
            <p className="text-xl leading-relaxed text-[#2d4a3e] mb-8">
              Our mission is to honor traditional practices while embracing modern innovation
              to deliver the finest quality products to your table. We believe in sustainable farming,
              ethical sourcing, and creating products that are as good for the planet as they are for you.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#5a7c5e] to-[#7a9b5c] text-white p-8 rounded-2xl shadow-xl"
            >
              <p className="text-lg italic font-medium">
                "Bringing nature's purity to your home, one bottle at a time."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-[#c9c0a8] to-[#bdb298]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-center text-[#1f3a2e]"
          >
            Our Core Values
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Integrity", desc: "We stand by our promise of 100% natural products" },
              { icon: Leaf, title: "Sustainability", desc: "Supporting local farmers and eco-friendly practices" },
              { icon: Award, title: "Excellence", desc: "Uncompromising quality in every product we create" }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-[#5a7c5e] to-[#7a9b5c] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#1f3a2e]">{value.title}</h3>
                <p className="text-[#4a6b50] leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default page
"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="py-20 px-4 mt-12 bg-white border-y border-[#ece4dd]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8c5e3d] font-bold tracking-widest uppercase text-sm">Our Philosophy</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#444] mt-4">Why Choose Madhoor?</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Zero Chemical Processing",
              desc: "We strictly avoid chemical solvents, artificial colors, and synthetic preservatives. What you get is nature in its truest form.",
              color: "bg-[#fcf4f1] text-leaf"
            },
            {
              title: "Nutrient Retention",
              desc: "By avoiding high heat in our extraction processes, our oils and jaggery retain their natural antioxidants, vitamins, and deep regional flavors.",
              color: "bg-[#f9eae4] text-[#8c5e3d]"
            },
            {
              title: "Sustainable Sourcing",
              desc: "We partner with local farmers to ensure ethical practices, sustainable agriculture, and fair trade from seed to packaging.",
              color: "bg-[#fdfbf9] text-[#444] border border-[#ece4dd]"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${item.color} p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300`}
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="opacity-80 leading-relaxed text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

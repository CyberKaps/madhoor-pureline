"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    question: "What makes Madhoor Pureline oils different?",
    answer:
      "Our oils are 100% pure, cold-pressed, and free from chemicals, palm oil, and added water. We use a hydraulic pressing method without any heat, which ensures maximum nutrition and authentic regional flavor in every drop.",
  },
  {
    question: "Is your jaggery organic and unrefined?",
    answer:
      "Yes! Our jaggery is 100% organic, traditional, and unrefined. We process it using a modern indirect heating system so it doesn't char, and we strictly avoid sulphur bleaching or chemical clarifiers.",
  },
  {
    question: "Are your products suitable for children and families?",
    answer:
      "Absolutely. Madhoor Pureline products are crafted for wholesome family wellness. We believe that if it's not pure enough for our own family, it's not pure enough for yours.",
  },
  {
    question: "How should I store Madhoor Pureline products?",
    answer:
      "Store our cold-pressed oils and jaggery in a cool, dry place away from direct sunlight. Because we use no artificial preservatives, keeping them away from excess moisture will preserve their freshness and nutritional value.",
  },
  {
    question: "Can I use your oils for cooking and skincare?",
    answer:
      "Yes! Because of their absolute purity, our cold-pressed oils are incredibly versatile. They are perfect for heart-healthy cooking, deep frying, as well as external applications like natural hair nourishment and skin care.",
  },
  {
    question: "Are Madhoor Pureline products sustainable?",
    answer:
      "We are deeply committed to sustainability. We partner directly with local farmers for ethical sourcing, promote chemical-free soil practices, and utilize eco-friendly packaging whenever possible.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first one by default

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-white py-24 px-4 border-y border-[#ece4dd]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#8c5e3d] font-bold tracking-widest uppercase text-sm">Got Questions?</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-4 text-[#444]">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isOpen ? "bg-primary/5 border-primary/20" : "bg-white border-[#ece4dd] hover:border-[#8c5e3d]/50"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-6 md:px-8 py-6 focus:outline-none text-left"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${isOpen ? "text-primary" : "text-[#444]"}`}>
                    {faq.question}
                  </span>
                  
                  <div className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isOpen ? "bg-primary text-white" : "bg-[#ece4dd] text-[#8c5e3d]"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-6 pt-0 text-[#666] text-lg leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

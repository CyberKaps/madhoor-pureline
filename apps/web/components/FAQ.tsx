"use client";

import React, { useState } from "react";

const faqData = [
  {
    question: "What makes Madhoor Pureline oils different?",
    answer:
      "Our oils are 100% pure, cold-pressed, and free from chemicals, palm oil, and added water. This ensures maximum nutrition and authentic flavor in every drop.",
  },
  {
    question: "Are your products suitable for children and families?",
    answer:
      "Absolutely! Madhoor Pureline products are crafted for wholesome family wellness, using only honest, natural ingredients safe for all ages.",
  },
  {
    question: "Is your jaggery organic and unrefined?",
    answer:
      "Yes, our jaggery is traditional, unrefined, and rich in minerals. It is made without chemicals or artificial additives, making it a healthy sweetener.",
  },
  {
    question: "How should I store Madhoor Pureline oils?",
    answer:
      "Store our oils in a cool, dry place away from direct sunlight to preserve their freshness and nutritional value.",
  },
  {
    question: "Can I use your oils for cooking and skincare?",
    answer:
      "Our oils are versatile and can be used for both cooking and external applications like hair and skin care, thanks to their purity.",
  },
  {
    question: "Are Madhoor Pureline products sustainable?",
    answer:
      "We are committed to sustainability by using eco-friendly packaging and sourcing ingredients responsibly.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[#5a7c5e] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-[#f5fbe9]">Frequently Asked Questions</h2>
        <p className="text-center text-[#e8e0cc] mb-10">Find answers to common questions about our products and brand.</p>
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow border border-[#e8e0cc] overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-lg font-semibold text-left text-[#1f3a2e] focus:outline-none"
                onClick={() => handleToggle(idx)}
                aria-expanded={openIndex === idx}
              >
                {faq.question}
                <span className="ml-4 text-[#5a7c5e] text-2xl">
                  {openIndex === idx ? "▲" : "▼"}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5 text-[#4a6b50] text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

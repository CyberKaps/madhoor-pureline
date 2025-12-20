
"use client";





import { motion } from "framer-motion";
import ProductSection from "components/Product";

export default function ShopPage() {
  return (
    <main className="bg-gradient-to-b from-[#dcd6c4] to-[#c9c0a8] min-h-screen text-[#1f3a2e]">
      {/* Hero/Stack Section */}
      <section className="py-16 px-4 md:px-0 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block bg-gradient-to-br from-[#5a7c5e] to-[#4a6b50] text-white px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-widest shadow">PURELINE ROUTINE</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow">Build your complete wellness stack</h1>
          <p className="text-lg text-[#4a6b50] max-w-2xl mx-auto mb-8 font-medium">Layer our scientifically balanced products to nourish, energize, and protect your family from the inside out.</p>
        </motion.div>
      </section>

      {/* Routine/Highlights Section */}
      {/* <section className="max-w-5xl mx-auto px-4 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#e8e0cc] rounded-3xl p-8 shadow-xl flex flex-col items-center border border-[#c9c0a8] hover:scale-105 transition-transform duration-300">
            <span className="bg-gradient-to-br from-[#5a7c5e] to-[#4a6b50] text-white px-3 py-1 rounded-full text-xs font-bold mb-2 shadow">COLD PRESSED</span>
            <h3 className="text-xl font-bold mb-2">100% Pure Oils</h3>
            <p className="text-[#4a6b50] text-center">No chemicals, no palm oil, no added water. Retains natural flavor and nutrients.</p>
          </div>
          <div className="bg-[#e8e0cc] rounded-3xl p-8 shadow-xl flex flex-col items-center border border-[#c9c0a8] hover:scale-105 transition-transform duration-300">
          {(products as Product[]).map((product, idx) => (
            <>
              <h3 className="text-xl font-bold mb-2">Natural Jaggery</h3>
              <p className="text-[#4a6b50] text-center">Traditional, unrefined, and rich in minerals. Sweeten your food the healthy way.</p>
            </>
          ))}
          </div>
          <div className="bg-[#e8e0cc] rounded-3xl p-8 shadow-xl flex flex-col items-center border border-[#c9c0a8] hover:scale-105 transition-transform duration-300">
            <span className="bg-gradient-to-br from-[#4a6b50] to-[#5a7c5e] text-white px-3 py-1 rounded-full text-xs font-bold mb-2 shadow">FAMILY HEALTH</span>
            <h3 className="text-xl font-bold mb-2">Wholesome Living</h3>
            <p className="text-[#4a6b50] text-center">Support your family’s wellness with pure, honest ingredients from Madhoor Pureline.</p>
          </div>
        </div>
      </section> */}

      {/* Product Cards Section */}
      <ProductSection />
    </main>
  );
}
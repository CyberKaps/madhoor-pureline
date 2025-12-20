
"use client";


type PackOption = {
  label: string;
  price: string;
};

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  tags: string[];
  highlight: string;
  description: string;
  packOptions?: PackOption[];
};

import { products } from "data/ProductsData";
// Ensure products is typed as Product[]

import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function ProductSection() {
  return (
    <main className="bg-gradient-to-b from-[#dcd6c4] to-[#c9c0a8] min-h-screen text-[#1f3a2e]">

      <h3 className="text-5xl text-center p-10 font-extrabold text-[#1f3a2e]">Our Product's</h3>
      {/* Product Cards Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {(products as Product[]).map((product, idx) => (
            <motion.div
              key={product.id}
              className="bg-gradient-to-br from-[#e8e0cc] to-[#c9c0a8] rounded-3xl shadow-2xl border border-[#c9c0a8] overflow-hidden flex flex-col hover:scale-105 hover:shadow-3xl transition-transform duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-full aspect-[4/3] bg-[#fff] flex items-center justify-center overflow-hidden border-b border-[#c9c0a8] group-hover:bg-[#e8e0cc] transition-colors duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: 'center' }}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.tags && product.tags.map((tag, i) => (
                    <span key={i} className="bg-[#c9c0a8] text-[#5a7c5e] px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm">{tag}</span>
                  ))}
                  {product.highlight && (
                    <span className="bg-gradient-to-br from-[#5a7c5e] to-[#4a6b50] text-white px-2 py-0.5 rounded-full text-xs font-bold uppercase ml-auto shadow">{product.highlight}</span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold mb-1 leading-tight">{product.title}</h3>
                <p className="text-[#4a6b50] text-sm mb-4 flex-1 font-medium leading-relaxed">{product.description}</p>
                <div className="mb-4">
                  {product.packOptions && product.packOptions.map((pack, i) => (
                    <div key={i} className="flex items-center justify-between text-base mb-1">
                      <span className="font-semibold text-[#1f3a2e]">{pack.label}</span>
                      <span className="font-bold text-[#5a7c5e]">{pack.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-20 mt-auto">
                  <a href="https://wa.me/919423041414" target="_blank"><Button variant="brand" size="sm" className="rounded-full px-6 bg-[#5a7c5e] hover:bg-[#4a6b50] text-white shadow-md font-bold">Buy now</Button></a>
                  <span className="text-[#5a7c5e] font-extrabold text-xl tracking-tight">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
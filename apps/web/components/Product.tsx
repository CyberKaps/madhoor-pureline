"use client";

import React from "react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    id: 1,
    title: "Groundnut oil (1 ltr)",
    price: "Rs.400",
    image: "/assets/productImages/product1.jpeg",
  },
  {
    id: 2,
    title: "Groundnut oil (5 ltr)",
    price: "Rs.1400",
    image: "/assets/productImages/product3.jpeg",
  },
  {
    id: 3,
    title: "Jaggery (1 kg)",
    price: "Rs. 60",
    image: "/assets/productImages/product2.jpeg",
  },
];

export default function ShopSeasonProduce() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  
  return (
    <section ref={ref} className="relative bg-gradient-to-b from-[#bdb298] to-[#c9c0a8] py-12 overflow-hidden">
      {/* Heading */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1f3a2e] mb-6 border-b-2 border-[#5a7c5e] inline-block pb-1">
          Our Products
        </h2>
      </motion.div>

      {/* Product Cards */}
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-[#e8e0cc] rounded-lg shadow-lg border-2 border-[#c9c0a8] overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.12, 
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              style={{ perspective: 1000 }}
            >
              <div className="w-full h-56 bg-[#d4cdb7] overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="p-4 text-[#1f3a2e]">
                <h3 className="text-base font-semibold mb-1">{product.title}</h3>
                <p className="text-sm font-medium text-[#4a6b50] mb-3">{product.price}</p>
                <div className="flex items-center justify-between">
                  <motion.button 
                    className="bg-[#5a7c5e] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#4a6b50] transition shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                  <motion.span 
                    className="text-xs text-[#4a6b50] font-medium flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.span 
                      className="w-2 h-2 bg-[#5a7c5e] rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    ></motion.span>
                    In stock
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
        style={{ y }}
      >
        <Button variant="brand" size="lg" className="rounded-full px-8 bg-[#5a7c5e] hover:bg-[#4a6b50] text-white shadow-lg hover:shadow-2xl transition-all duration-300">
          Order Online
        </Button>
      </motion.div>
    </section>
  );
}

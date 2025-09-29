"use client";

import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
  return (
    <section className="bg-[#d4e8c5] py-12 px-6 md:px-20">
      {/* Heading */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3c36] mb-6 border-b border-[#1e3c36] inline-block pb-1">
          Our Products
        </h2>
      </motion.div>

      {/* Product Cards */}
      <div className="md:flex gap-12 justify-center mb-10 flex-wrap">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="max-w-xs group cursor-pointer relative mb-8 transform transition duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover rounded-md"
            />

            <div className="mt-3 text-[#1e3c36]">
              <h3 className="text-base font-medium">{product.title}</h3>
              <p className="text-sm">{product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Button variant="brand" size="default" className="rounded-full px-6">
          Order Online
        </Button>
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../lib/api";
import { Product as ApiProduct } from "../types/product";
import ProductCard, { ProductCardProps } from "./ProductCard";

export default function ProductSection() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiProducts: ApiProduct[] = await getProducts();

        const mappedProducts: ProductCardProps[] = apiProducts.map((p, index) => ({
          id: p.id,
          title: p.name,
          price: `₹${p.price}`,
          image: p.imageUrl || "/assets/productImages/product1.jpeg",
          tags: ["NATURAL", "PURE"],
          highlight: index === 0 ? "BESTSELLER" : undefined,
          description: p.description,
          packOptions: [],
          index: index
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-24 text-lg text-[#5a7c5e]">Cultivating Products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-24 text-lg text-[#5a7c5e]">Harvesting soon...</div>;
  }

  return (
    <section className="bg-gradient-to-b from-[#dcd6c4] to-[#f5fbe9] py-24 relative overflow-hidden" id="products">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#5a7c5e 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-sm font-bold text-[#5a7c5e] tracking-[0.2em] uppercase mb-3">from our farms</h3>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1f3a2e]">Pure Collection</h2>
          <div className="w-20 h-1 bg-[#b8d99b] mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 3).map((product, idx) => (
            <ProductCard key={product.id} {...product} index={idx} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <a href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-transparent border-2 border-[#5a7c5e] text-[#1f3a2e] font-serif font-bold text-lg rounded-full hover:bg-[#5a7c5e] hover:text-white transition-all shadow-sm hover:shadow-lg flex items-center gap-2"
            >
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </motion.button>
          </a>
        </div>
      </div>
    </section>
  );
}
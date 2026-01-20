"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../../lib/api";
import { Product as ApiProduct } from "../../types/product";
import ProductCard, { ProductCardProps } from "../../components/ProductCard";
import { Filter, Search } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");


  const categories = ["ALL", "OILS", "JAGGERY", "COMBOS"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiProducts: ApiProduct[] = await getProducts();
        const mappedProducts: ProductCardProps[] = apiProducts.map((p, index) => {
          // Simple logic to guess category from name/desc if not in DB
          let category = "OILS";
          if (p.name.toLowerCase().includes("jaggery")) category = "JAGGERY";
          if (p.name.toLowerCase().includes("combo")) category = "COMBOS";

          return {
            id: p.id,
            title: p.name,
            price: `₹${p.price}`,
            image: p.imageUrl || "/assets/productImages/product1.jpeg",
            tags: [category, "PURE"],
            highlight: index === 0 ? "BESTSELLER" : undefined,
            description: p.description,
            packOptions: [],
            index: index
          };
        });
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesCategory = filter === "ALL" || p.tags.includes(filter);
    return matchesCategory;
  });

  return (
    <main className="bg-[#f5fbe9] min-h-screen">
      {/* Short Hero */}
      <section className="relative bg-[#1f3a2e] py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5a7c5e] rounded-full blur-[100px] opacity-40"></div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#b8d99b] text-lg md:text-xl max-w-2xl mx-auto"
          >
            Curated purity for your wellness journey.
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-[#e8e0cc] shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-start md:justify-center overflow-x-auto scrollbar-hide">

          {/* Categories */}
          <div className="flex gap-2 w-max md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === cat
                  ? "bg-[#1f3a2e] text-white shadow-lg"
                  : "bg-[#e8e0cc]/50 text-[#5a7c5e] hover:bg-[#e8e0cc]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-24 text-lg text-[#5a7c5e]">Cultivating Products...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} {...product} index={idx} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-[#4a6b50]">
                No products found matching your criteria.
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
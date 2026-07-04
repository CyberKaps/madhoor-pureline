"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProducts } from "../../lib/api";
import { Product as ApiProduct } from "../../types/product";
import ProductCard, { ProductCardProps } from "../../components/ProductCard";

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
          let category = "OILS";
          if (p.name.toLowerCase().includes("jaggery")) category = "JAGGERY";
          if (p.name.toLowerCase().includes("combo")) category = "COMBOS";

          return {
            id: p.id,
            title: p.name,
            price: `₹${p.price}`,
            originalPrice: p.originalPrice ? `₹${p.originalPrice}` : undefined,
            image: p.imageUrl || "/assets/productImages/product1.jpeg",
            tags: [category, "PURE"],
            highlight: index === 0 ? "SALE" : undefined,
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
    <main className="bg-[#faf9f8] min-h-screen">
      
      {/* Clean Header */}
      <section className="pt-32 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2e7d32] mb-4">
          All Products
        </h1>
        <p className="text-[#444] max-w-2xl mx-auto">
          Experience the true essence of sweetness and purity with our natural range.
        </p>
      </section>

      {/* Filter Bar */}
      {/* <section className="sticky top-20 z-40 bg-[#faf9f8]/95 backdrop-blur-md border-b border-t border-[#ece4dd] py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-center overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 w-max pb-2 md:pb-0 px-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all whitespace-nowrap border ${
                  filter === cat
                  ? "bg-[#8c5e3d] text-white border-[#8c5e3d]"
                  : "bg-transparent text-[#444] border-[#ece4dd] hover:border-[#8c5e3d]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section> */}

      {/* Grid */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-24 text-lg text-[#8c5e3d]">Cultivating Products...</div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} className="w-full max-w-[320px]">
                  <ProductCard key={product.id} {...product} index={idx} />
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-[#444]">
                No products found matching your criteria.
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
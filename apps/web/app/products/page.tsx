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
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", "OILS", "JAGGERY", "GHEE"];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const apiProducts: ApiProduct[] = await getProducts();
        const mappedProducts: ProductCardProps[] = apiProducts.map((p, index) => {
          // Simple logic to guess category from name/desc if not in DB
          let category = "OILS";
          if (p.name.toLowerCase().includes("jaggery")) category = "JAGGERY";
          if (p.name.toLowerCase().includes("ghee")) category = "GHEE";

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
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#b8d99b] text-xl max-w-2xl mx-auto"
          >
            Curated purity for your wellness journey.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-[#e8e0cc] shadow-sm">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
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

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a7c5e]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#f0f0f0] border-none rounded-full focus:ring-2 focus:ring-[#5a7c5e] outline-none text-[#1f3a2e]"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6 py-16">
        {loading ? (
          <div className="text-center py-24 text-lg text-[#5a7c5e]">Cultivating Products...</div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
"use client";

import { useEffect, useState } from "react";
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
          originalPrice: p.originalPrice ? `₹${p.originalPrice}` : undefined,
          image: p.imageUrl || "/assets/productImages/product1.jpeg",
          tags: ["NATURAL", "PURE"],
          description: p.description,
          packOptions: [],
          index: index,
          inStock: (p as any).inStock,
          outOfStockMessage: (p as any).outOfStockMessage,
          ingredients: (p as any).ingredientsText
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
    return <div className="text-center py-24 text-lg text-primary">Cultivating Products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-24 text-lg text-primary">Harvesting soon...</div>;
  }

  return (
    <section className="bg-gradient-to-b from-[#fcf4f1] to-white py-24 relative overflow-hidden" id="products">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#916242 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-8 border-b border-border/50 pb-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary tracking-wide">
            Most Loved by Customers
          </h2>
          <a href="/products" className="text-primary font-semibold text-sm hover:underline uppercase tracking-widest hidden sm:block">
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product, idx) => (
            <ProductCard key={product.id} {...product} index={idx} />
          ))}
        </div>
        
        <div className="mt-6 text-center sm:hidden">
          <a href="/products" className="text-primary font-semibold text-sm hover:underline uppercase tracking-widest">
            View all
          </a>
        </div>
      </div>
    </section>
  );
}
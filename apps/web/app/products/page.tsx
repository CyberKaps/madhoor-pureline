"use client";

import { useEffect, useState } from "react";
import ProductCard, { ProductCardProps } from "../../components/ProductCard";
import PageHero from "../../components/PageHero";
import { getProducts } from "../../lib/api";
import { Product as ApiProduct } from "../../types/product";

export default function ShopPage() {
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
          highlight: index === 0 ? "SALE" : undefined,
          description: p.description,
          packOptions: [],
          index: index,
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

  return (
    <main className="bg-background min-h-screen">
      <PageHero
        badge="Our Collection"
        title="Pure & Natural"
        highlight="Products"
        subtitle="Experience the true essence of sweetness and purity with our naturally crafted range of cold-pressed oils and jaggery."
        image="/assets/hero/products.webp"
      />

      {/* Grid */}
      <section className="container mx-auto px-4 py-14 md:py-16">
        {loading ? (
          <div className="text-center py-24 text-lg text-primary">Cultivating Products...</div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto">
              {products.map((product, idx) => (
                <div key={product.id} className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.5rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
                  <ProductCard {...product} index={idx} />
                </div>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                No products available right now. Please check back soon.
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

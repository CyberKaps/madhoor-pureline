import { getOneProduct, getProducts } from "lib/api";
import { Button } from "components/ui/button";
import { Accordion } from "components/ui/accordion";
import { Metadata } from "next";
import Link from "next/link";
import ProductImageGallery from "components/ProductImageGallery";
import AddToCartButton from "components/AddToCartButton";

// Generate metadata for the product page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getOneProduct(resolvedParams.id);

  if (!product) {
    return {
      title: 'Product Not Found | Madhoor Pureline',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | Madhoor Pureline`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product: any) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getOneProduct(resolvedParams.id);

  if (!product) {
    return <div className="min-h-screen pt-32 text-center">Product not found</div>;
  }

  // Build accordion items from the rich mock data
  const accordionItems = [];

  if (product.howToUse && product.howToUse.length > 0) {
    accordionItems.push({
      title: "How To Use",
      content: (
        <ul className="space-y-3">
          {product.howToUse.map((item: any, i: number) => (
            <li key={i}>
              <strong className="text-[#8c5e3d] block mb-1">{item.title}</strong>
              <span>{item.desc}</span>
            </li>
          ))}
        </ul>
      )
    });
  }

  if (product.benefits && product.benefits.length > 0) {
    accordionItems.push({
      title: "Benefits",
      content: (
        <ul className="space-y-3">
          {product.benefits.map((item: any, i: number) => (
            <li key={i}>
              <strong className="text-[#8c5e3d] block mb-1">{item.title}</strong>
              <span>{item.desc}</span>
            </li>
          ))}
        </ul>
      )
    });
  }

  if (product.faqs && product.faqs.length > 0) {
    accordionItems.push({
      title: "FAQs",
      content: (
        <ul className="space-y-4">
          {product.faqs.map((faq: any, i: number) => (
            <li key={i}>
              <strong className="text-[#8c5e3d] block mb-1">{faq.q}</strong>
              <p>{faq.a}</p>
            </li>
          ))}
        </ul>
      )
    });
  }

  if (product.ingredientsText) {
    accordionItems.push({
      title: "Ingredients",
      content: <p>{product.ingredientsText}</p>
    });
  }

  if (product.storageConditions && product.storageConditions.length > 0) {
    accordionItems.push({
      title: "Storage Conditions",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          {product.storageConditions.map((cond: string, i: number) => (
            <li key={i}>{cond}</li>
          ))}
        </ul>
      )
    });
  }

  return (
    <div className="bg-[#faf9f8] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-[#8c5e3d]/80 font-medium">
          <Link href="/" className="hover:text-[#8c5e3d] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#444]">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-20">

          {/* Left Column: Image Gallery */}
          <div className="relative">
            <div className="sticky top-32">
              <ProductImageGallery
                images={(product as any).images || [
                  product.imageUrl,
                  product.imageUrl, // Duplicated for demonstration
                  "/assets/productImages/product1.jpeg"
                ].filter(Boolean)}
                productName={product.name}
              />
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#444] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              {(product as any).originalPrice && (
                <span className="text-xl text-[#888] line-through font-medium">
                  Rs. {(product as any).originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-[#444] flex items-baseline gap-1">
                Rs. {product.price}
                {(product as any).unit && (
                  <span className="text-lg font-medium text-[#888]">
                    / {(product as any).unit}
                  </span>
                )}
              </span>
              {(product as any).originalPrice && (
                <span className="text-[#2e7d32] text-sm font-bold bg-[#fcf4f1] px-3 py-1 rounded-md ml-2">
                  Save Rs. {(product as any).originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed font-sans font-medium tracking-wide">
              {product.description}
            </p>

            {(product as any).inStock === false ? (
              <div className="mb-12 bg-red-50 p-4 rounded-[20px] border border-red-100 max-w-md">
                <div className="text-red-600 font-bold text-lg mb-1">Out of Stock</div>
                {(product as any).outOfStockMessage && (
                  <div className="text-red-500 font-medium text-sm">{(product as any).outOfStockMessage}</div>
                )}
              </div>
            ) : (
              <div className="mb-12 block">
                <AddToCartButton product={product} />
              </div>
            )}

            {/* Rich Description */}
            {product.longDescription && (
              <div className="prose prose-sm max-w-none text-[#444] mb-8 leading-relaxed space-y-4">
                {product.longDescription.split('\\n\\n').map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* Accordion Sections */}
            <div className="mt-8">
              <Accordion items={accordionItems} />
            </div>
          </div>
        </div>

        {/* Use Case Categories */}
        <div className="border-t border-border/50 pt-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8">
            Use Case Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {((product as any).useCases || [
              { title: "Daily Cooking", img: "/assets/cooking.png" },
              { title: "Chai", img: "/assets/chai.png" },
              { title: "Coffee", img: "/assets/coffee.png" },
              { title: "Immunity", img: "/assets/immunity.png" },
              { title: "Baking", img: "/assets/baking.png" },
              { title: "Kids", img: "/assets/kids.png" }
            ]).map((cat: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer">
                <div className="w-full aspect-square overflow-hidden bg-white mb-3 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="font-bold text-[#a63f3f] text-sm md:text-base text-center">
                  {cat.title}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export type ProductCardProps = {
    id: string;
    title: string;
    price: string;
    image: string;
    tags: string[];
    highlight?: string;
    description: string;
    packOptions?: { label: string; price: string }[];
    index: number;
};

export default function ProductCard({
    id,
    title,
    price,
    image,
    tags,
    highlight,
    description,
    packOptions,
    index,
}: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-[#f4f2eb]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Highlight Badge */}
                {highlight && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#1f3a2e] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        {highlight}
                    </div>
                )}

                {/* Floating Add to Cart Button (Visible on Hover) */}
                <motion.button
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#5a7c5e] hover:border-[#5a7c5e] shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent card click if we add link later
                        addToCart(id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Plus className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow relative">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#f5fbe9] rounded-bl-[3rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex gap-2 mb-3 flex-wrap">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-[9px] font-bold tracking-[0.15em] text-[#7a9b5c] border border-[#7a9b5c]/20 px-2 py-0.5 rounded-full uppercase transition-colors group-hover:bg-[#7a9b5c] group-hover:text-white"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-xl font-serif font-bold text-[#1f3a2e] leading-tight group-hover:text-[#5a7c5e] transition-colors duration-300">
                        {title}
                    </h3>
                </div>

                <p className="text-[#6b7c70] text-xs leading-relaxed mb-4 line-clamp-2 font-medium">
                    {description}
                </p>

                <div className="mt-auto flex items-end justify-between border-t border-[#1f3a2e]/5 pt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[#7a9b5c] font-bold uppercase tracking-wider mb-0.5">Price</span>
                        <span className="text-2xl font-serif font-bold text-[#1f3a2e]">{price}</span>
                    </div>

                    <Button
                        className="rounded-full px-5 py-2.5 h-auto bg-[#1f3a2e] text-xs font-bold text-white hover:bg-[#5a7c5e] transition-all shadow-md group-hover:shadow-lg"
                        onClick={() => addToCart(id)}
                    >
                        <ShoppingCart className="w-3.5 h-3.5 mr-2" />
                        Buy Now
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Eye, ShoppingCart } from "lucide-react";
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
            className="bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-[#e8e0cc] flex flex-col h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                {/* Overlay Action Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full w-12 h-12 bg-white text-[#1f3a2e] hover:bg-[#5a7c5e] hover:text-white transition-colors"
                    >
                        <Eye className="w-5 h-5" />
                    </Button>
                    <Button
                        size="icon"
                        className="rounded-full w-12 h-12 bg-[#5a7c5e] text-white hover:bg-[#4a6b50] transition-colors"
                        onClick={() => addToCart(id)}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>

                {highlight && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1f3a2e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {highlight}
                    </div>
                )}
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <div className="flex gap-2 mb-4">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-bold tracking-wider text-[#7a9b5c] bg-[#7a9b5c]/10 px-2 py-1 rounded-md uppercase"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold text-[#1f3a2e] mb-2 font-serif">
                    {title}
                </h3>
                <p className="text-[#6b7c70] text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {description}
                </p>

                <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-6 mt-auto">
                    <span className="text-2xl font-bold text-[#1f3a2e]">{price}</span>
                    <Button
                        className="rounded-full px-6 bg-[#1f3a2e] hover:bg-[#5a7c5e] text-white transition-colors shadow-lg"
                        onClick={() => addToCart(id)}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

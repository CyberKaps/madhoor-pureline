"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { ShoppingBag } from "lucide-react";

export type ProductCardProps = {
    id: string;
    title: string;
    price: string;
    originalPrice?: string;
    image: string;
    tags: string[];
    highlight?: string;
    description: string;
    ingredients?: string;
    packOptions?: { label: string; price: string }[];
    index: number;
    inStock?: boolean;
    outOfStockMessage?: string;
};

export default function ProductCard({
    id,
    title,
    price,
    originalPrice,
    image,
    tags,
    highlight,
    description,
    ingredients,
    packOptions,
    index,
    inStock,
    outOfStockMessage,
}: ProductCardProps) {
    const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addToCart({
            id, title, price, originalPrice, image, tags, highlight, description, ingredients, packOptions, index, inStock, outOfStockMessage
        }));
    };

    return (
        <motion.div
            className="group relative bg-[#faf9f8] rounded-[20px] overflow-hidden h-full flex flex-col shadow-sm border border-[#ece4dd] transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-[#fff] p-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-300 ease-in-out"
                />

                {/* Ingredients Overlay on Hover */}
                <div className="absolute inset-4 bg-primary rounded-[20px] flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <h4 className="text-[1.3rem] font-serif font-bold text-white mb-2">Ingredients</h4>
                    <p className="text-[12px] font-semibold text-white/90 text-center leading-tight">
                        {ingredients || "Concentrated Sugarcane Juice, Natural Extracts"}
                    </p>
                </div>

                {/* Highlight Badge */}
                {highlight && (
                    <div className="absolute top-0 right-0 z-20 bg-[#f39c12] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-[10px]">
                        {highlight}
                    </div>
                )}

                {/* Discount Badge */}
                {originalPrice && id !== "2" && (
                    <div className="absolute top-0 left-0 z-20 bg-leaf text-leaf-foreground text-[11px] font-bold px-3 py-1.5 uppercase tracking-wider rounded-br-[10px] shadow-sm">
                        {Math.round(((parseInt(originalPrice.replace(/\D/g,'')) - parseInt(price.replace(/\D/g,''))) / parseInt(originalPrice.replace(/\D/g,''))) * 100)}% OFF
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="px-4 py-3 flex flex-col flex-grow bg-[#faf9f8]">
                <h3 className="text-[14px] font-semibold text-[#444] leading-snug mb-1">
                    {title}
                </h3>

                <p className="text-[#666] text-[12px] leading-tight mb-2 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto mb-3">
                    <div className="flex items-center gap-2 text-[13px]">
                        <span className="font-bold text-[#444]">{price.replace('₹', 'Rs. ')}</span>
                        {originalPrice && (
                            <span className="text-[#888] line-through text-[11px] font-medium">
                                {originalPrice.replace('₹', 'Rs. ')}
                            </span>
                        )}
                        {originalPrice && (
                            <span className="text-leaf text-[10px] font-bold ml-auto">
                                Save Rs. {parseInt(originalPrice.replace(/\D/g,'')) - parseInt(price.replace(/\D/g,''))}
                            </span>
                        )}
                    </div>
                </div>

                <div className="w-full mt-auto flex gap-2">
                    <Link href={`/products/${id}`} passHref className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full rounded-[0.4rem] h-10 border-primary text-primary hover:bg-primary/5 font-medium text-sm transition-colors shadow-none"
                        >
                            View
                        </Button>
                    </Link>
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 rounded-[0.4rem] h-10 bg-primary hover:bg-[#7b5034] text-primary-foreground font-medium text-sm transition-colors shadow-none flex items-center gap-2"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Add
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

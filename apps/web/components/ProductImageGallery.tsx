"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // If there are no images, show a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#ece4dd] rounded-3xl flex items-center justify-center text-[#8c5e3d]/50 font-bold">
        No Image
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row h-full relative">
      {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-12 h-12 md:w-18 md:h-18 rounded-[20px] border-2 transition-all overflow-hidden shrink-0 bg-white ${
              activeIndex === idx
                ? "border-[#2e7d32] shadow-md"
                : "border-[#ece4dd] hover:border-[#8c5e3d] opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow bg-white rounded-3xl p-8 shadow-sm border border-[#ece4dd] relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[500px]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e5ccbf]/20 rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d09c7a]/10 rounded-tr-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            src={images[activeIndex]}
            alt={`${productName} main image`}
            className="w-full h-full max-h-[500px] object-contain relative z-10"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first item by default

    return (
        <div className="flex flex-col gap-2">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={index} className="border border-border/50 rounded-[20px] overflow-hidden bg-white">
                        <button
                            className="w-full flex items-center justify-between p-4 bg-[#faf9f8] hover:bg-[#f2efe9] transition-colors text-left font-semibold text-[#8c5e3d]"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                        >
                            {item.title}
                            <ChevronDown className={`w-5 h-5 text-[#8c5e3d] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 text-sm text-[#444] leading-relaxed bg-white">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}

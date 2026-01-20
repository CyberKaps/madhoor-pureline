"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const featuredReviews = [
    {
        name: "Aarav S.",
        role: "Verified Buyer",
        rating: 5,
        comment: "Absolutely love the cold-pressed oils! The quality and taste are unmatched. My family uses them every day.",
    },
    {
        name: "Priya M.",
        role: "Regular Customer",
        rating: 5,
        comment: "The jaggery is so pure and flavorful. I feel good giving it to my kids knowing it's chemical-free.",
    },
    {
        name: "Rahul K.",
        role: "Chef",
        rating: 5,
        comment: "I've tried many organic brands, but Madhoor Pureline stands out. The groundnut oil brings out the true flavor of my dishes.",
    },
];

export default function FeaturedReviews() {
    return (
        <section className="py-24 bg-[#1f3a2e] relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5a7c5e]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b8d99b]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
                            <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
                            <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
                            <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
                            <Star className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />
                            <span className="text-[#b8d99b] font-medium ml-2">4.9/5 Average Rating</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                            Loved by <br />
                            <span className="text-[#b8d99b]">Thousands</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/reviews">
                            <Button variant="outline" className="rounded-full border-[#5a7c5e] text-[#b8d99b] hover:bg-[#5a7c5e] hover:text-white bg-transparent">
                                Read All Reviews <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featuredReviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors relative group"
                        >
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-[#5a7c5e]/20 group-hover:text-[#5a7c5e]/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
                                ))}
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#5a7c5e] to-[#b8d99b] flex items-center justify-center text-white font-bold">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{review.name}</h4>
                                    <p className="text-sm text-[#5a7c5e]">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

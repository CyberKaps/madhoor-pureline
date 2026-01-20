"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog";
import { motion } from "framer-motion";
import { Star, Quote, Plus } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const initialReviews: Review[] = [
  {
    name: "Aarav S.",
    rating: 5,
    comment: "Absolutely love the cold-pressed oils! The quality and taste are unmatched. My family uses them every day.",
    date: "2025-12-10",
  },
  {
    name: "Priya M.",
    rating: 4,
    comment: "The jaggery is so pure and flavorful. I feel good giving it to my kids knowing it's chemical-free.",
    date: "2025-12-15",
  },
  {
    name: "Rahul K.",
    rating: 5,
    comment: "Great customer service and fast shipping. Will definitely order again!",
    date: "2025-12-18",
  },
  {
    name: "Sneha D.",
    rating: 5,
    comment: "The coconut oil is so fresh and aromatic. I use it for cooking and for my hair!",
    date: "2025-12-19",
  },
  {
    name: "Vikram P.",
    rating: 4,
    comment: "Fast delivery and eco-friendly packaging. The groundnut oil is a staple in my kitchen now.",
    date: "2025-12-20",
  },
  {
    name: "Meera T.",
    rating: 5,
    comment: "I appreciate the transparency and purity. The oils taste just like homemade!",
    date: "2025-12-20",
  },
  {
    name: "Suresh B.",
    rating: 5,
    comment: "Excellent products and very helpful support team. Highly recommended.",
    date: "2025-12-21",
  },
  {
    name: "Anjali R.",
    rating: 4,
    comment: "Tried the sesame oil for the first time and loved it. Will try more products soon!",
    date: "2025-12-21",
  },
  {
    name: "Deepak S.",
    rating: 5,
    comment: "The best jaggery I’ve ever tasted. Reminds me of my childhood!",
    date: "2025-12-21",
  },
];

const ReviewCard = ({ review, index }: { review: Review, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#e8e0cc] break-inside-avoid mb-6"
  >
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < review.rating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#e8e0cc]'}`}
        />
      ))}
    </div>

    <p className="text-[#2d4a3e] text-lg font-light leading-relaxed mb-6 italic">
      "{review.comment}"
    </p>

    <div className="flex justify-between items-end border-t border-[#2d4a3e]/10 pt-4">
      <div>
        <span className="block font-bold text-[#1f3a2e] text-lg font-serif">{review.name}</span>
        <span className="text-[#7a9b5c] text-xs font-bold uppercase tracking-wider">Verified Buyer</span>
      </div>
      <span className="text-[#7a9b5c]/60 text-xs">{new Date(review.date).toLocaleDateString()}</span>
    </div>
  </motion.div>
);

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [error, setError] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (rating: number) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setReviews([
      { ...form, date: new Date().toISOString() },
      ...reviews,
    ]);
    setForm({ name: "", rating: 5, comment: "" });
    setIsModalOpen(false);
    setError("");
  };

  return (
    <main className="bg-[#f5fbe9] min-h-screen">
      {/* Header Summary */}
      <section className="bg-[#1f3a2e] text-white py-24 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            Loved by Nature,<br />Loved by You
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mt-12"
          >
            <div className="text-center">
              <span className="text-6xl font-bold block mb-2 text-[#b8d99b]">4.9</span>
              <div className="flex gap-1 justify-center mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-[#f59e0b] fill-[#f59e0b]" />)}
              </div>
              <span className="text-sm opacity-80">Average Rating</span>
            </div>

            <div className="h-16 w-[1px] bg-white/20 hidden md:block"></div>

            <div className="text-center">
              <span className="text-6xl font-bold block mb-2 text-[#b8d99b]">2k+</span>
              <span className="text-sm opacity-80 uppercase tracking-widest font-bold">Happy Families</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Floating Add Button */}
        <div className="flex justify-end mb-8 sticky top-24 z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1f3a2e] text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#5a7c5e] transition-colors"
                >
                  <Plus className="w-5 h-5" /> Write a Review
                </motion.button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px] bg-[#f5fbe9] border border-[#e8e0cc]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-[#1f3a2e] text-center font-serif">Share Your Experience</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-[#4a6b50] font-semibold mb-1 text-sm uppercase tracking-wide">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                      className="w-full bg-white border border-[#e8e0cc] rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a7c5e] focus:ring-1 focus:ring-[#5a7c5e] transition-all"
                      maxLength={32}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4a6b50] font-semibold mb-1 text-sm uppercase tracking-wide">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(star)}
                          className={`transition-transform hover:scale-110 ${form.rating >= star ? 'text-[#f59e0b]' : 'text-[#e8e0cc]'}`}
                        >
                          <Star className={`w-8 h-8 ${form.rating >= star ? 'fill-[#f59e0b]' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4a6b50] font-semibold mb-1 text-sm uppercase tracking-wide">Comment</label>
                    <textarea
                      name="comment"
                      value={form.comment}
                      onChange={handleInput}
                      className="w-full bg-white border border-[#e8e0cc] rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a7c5e] focus:ring-1 focus:ring-[#5a7c5e] transition-all"
                      rows={4}
                      maxLength={300}
                      required
                      placeholder="How did you like our products?"
                    />
                  </div>

                  {error && <div className="text-red-500 font-semibold text-sm">{error}</div>}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1f3a2e] text-white font-bold py-3 rounded-lg shadow hover:bg-[#5a7c5e] transition-all duration-200"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} index={idx} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ReviewsPage;
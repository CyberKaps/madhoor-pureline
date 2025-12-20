
"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/button";

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

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-gradient-to-br from-[#f5fbe9] to-[#e8e0cc] rounded-3xl shadow-xl border border-[#e8e0cc] p-8 flex flex-col gap-2 hover:shadow-2xl transition-shadow duration-300 w-full md:w-[390px] lg:w-[420px] mx-auto h-full">
    <div className="flex items-center gap-2 mb-1">
      <span className="font-bold text-[#1f3a2e]">{review.name}</span>
      <span className="text-[#7a9b5c] text-sm">{new Date(review.date).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center gap-1 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < review.rating ? 'text-[#5a7c5e]' : 'text-[#e8e0cc]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
    <div className="text-[#4a6b50] text-base mb-2">{review.comment}</div>
  </div>
);

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

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
    setShowForm(false);
    setError("");
  };

  return (
    <main className="bg-gradient-to-b from-[#dcd6c4] to-[#c9c0a8] min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-16">
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-center mb-3 text-[#1f3a2e] drop-shadow-lg tracking-tight font-serif">Customer Reviews</h1>
          <div className="flex justify-center mb-3">
            <div className="h-1 w-24 bg-gradient-to-r from-[#5a7c5e] to-[#7a9b5c] rounded" />
          </div>
          <p className="text-center text-lg text-[#4a6b50] mb-2">See what our customers are saying about Madhoor Pureline products.</p>
        </div>
        {/* Buttons below reviews grid */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl border border-[#e8e0cc] p-8 mb-10 animate-fade-in">
            <h2 className="text-2xl font-bold text-[#1f3a2e] mb-4">Add Your Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[#4a6b50] font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInput}
                  className="w-full border border-[#e8e0cc] rounded-lg px-4 py-2 focus:outline-none focus:border-[#5a7c5e]"
                  maxLength={32}
                  required
                />
              </div>
              {/* ...existing code... (removed accidental Button inside form) */}
              <div>
                <label className="block text-[#4a6b50] font-semibold mb-1">Comment</label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleInput}
                  className="w-full border border-[#e8e0cc] rounded-lg px-4 py-2 focus:outline-none focus:border-[#5a7c5e]"
                  rows={4}
                  maxLength={300}
                  required
                />
              </div>
              {error && <div className="text-red-500 font-semibold">{error}</div>}
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-br from-[#5a7c5e] to-[#7a9b5c] text-white font-bold px-6 py-2 rounded-full shadow hover:scale-105 hover:shadow-lg transition-all duration-200"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-[#e8e0cc] text-[#5a7c5e] font-bold px-6 py-2 rounded-full shadow hover:bg-[#dcd6c4] transition-all duration-200"
                  onClick={() => { setShowForm(false); setError(""); }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.length === 0 ? (
            <div className="text-center text-[#4a6b50] col-span-full">No reviews yet. Be the first to add one!</div>
          ) : (
            (showAll ? reviews : reviews.slice(0, 6)).map((review, idx) => (
              <div key={idx} className="flex h-full">
                <ReviewCard review={review} />
              </div>
            ))
          )}
        </div>
        <div className="flex justify-center gap-4 mt-12">
          <button
            className="bg-gradient-to-br from-[#5a7c5e] to-[#7a9b5c] text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a7c5e] focus:ring-offset-2"
            onClick={() => setShowForm(true)}
          >
            <span className="inline-block align-middle"></span> Add Review
          </button>
          {reviews.length > 6 && (
            <button
              className="bg-gradient-to-br from-[#5a7c5e] to-[#7a9b5c] text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5a7c5e] focus:ring-offset-2"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? <span className="inline-block align-middle">✖️</span> : <span className="inline-block align-middle"></span>} {showAll ? 'Close Reviews' : 'View All Reviews'}
            </button>
          )}
        </div>
        </div>
    </main>
  );
}
export default ReviewsPage;
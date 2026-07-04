"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, MapPin, Send, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // For static exports (like Netlify's 'out' folder), the key MUST be on the frontend.
    // Web3Forms keys are designed to be public. Protect it by setting allowed domains in your Web3Forms dashboard.
    formData.append("access_key", "caa7f1e8-c3a4-45b9-aa15-87de33259f4b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000); // Reset after 5 seconds
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f8] relative overflow-hidden pt-32 pb-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e5ccbf]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d09c7a]/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#444] mb-6">Let's Connect</h1>
          <p className="text-xl text-[#666] max-w-2xl mx-auto font-light">
            Have questions about our pure, natural products? We're here to help you on your wellness journey.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div className="grid sm:grid-cols-2 gap-6">

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ece4dd] hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-[#8c5e3d]/10 rounded-full flex items-center justify-center text-[#8c5e3d] mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#444] text-lg mb-2">Email Us</h3>
                <a href="mailto:madhoorpureline@gmail.com" className="text-[#666] hover:text-[#8c5e3d] transition-colors break-all">
                  madhoorpureline@gmail.com
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ece4dd] hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-[#8c5e3d]/10 rounded-full flex items-center justify-center text-[#8c5e3d] mb-6 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#444] text-lg mb-2">WhatsApp</h3>
                <a href="https://wa.me/919834452105" className="text-[#666] hover:text-[#8c5e3d] transition-colors">
                  +91 9834452105
                </a>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ece4dd] hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-[#8c5e3d]/10 rounded-full flex items-center justify-center text-[#8c5e3d] mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#444] text-lg mb-2">Response Time</h3>
                <p className="text-[#666]">Mon - Sat<br />9:00 AM - 6:00 PM</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#ece4dd] hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-[#8c5e3d]/10 rounded-full flex items-center justify-center text-[#8c5e3d] mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#444] text-lg mb-2">Location</h3>
                <p className="text-[#666]">Shipping pure sweetness across all of India</p>
              </div>

            </div>

            {/* Google Map */}
            <div className="w-full h-80 bg-[#ece4dd] rounded-3xl overflow-hidden shadow-sm border border-[#ece4dd] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.491235072155!2d75.78789577551095!3d20.852241293817514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd99f0074a40df3%3A0x6da9d81c1ba7e693!2sMadhoor%20Pureline!5e0!3m2!1sen!2sin!4v1768941892187!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </div>

          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white rounded-2xl p-8 md:p-14 shadow-lg border border-[#ece4dd] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4ebd9] rounded-bl-full pointer-events-none opacity-50"></div>

              <h2 className="text-3xl font-bold text-[#444] mb-8 font-serif">Send us a Message</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#8c5e3d] tracking-wider uppercase">First Name</label>
                    <input type="text" name="first_name" required className="w-full bg-[#faf9f8] border border-[#ece4dd] rounded-[20px] px-4 py-4 focus:outline-none focus:border-[#8c5e3d] focus:ring-1 focus:ring-[#8c5e3d] transition-all text-[#444]" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#8c5e3d] tracking-wider uppercase">Last Name</label>
                    <input type="text" name="last_name" required className="w-full bg-[#faf9f8] border border-[#ece4dd] rounded-[20px] px-4 py-4 focus:outline-none focus:border-[#8c5e3d] focus:ring-1 focus:ring-[#8c5e3d] transition-all text-[#444]" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8c5e3d] tracking-wider uppercase">Email Address</label>
                  <input type="email" name="email" required className="w-full bg-[#faf9f8] border border-[#ece4dd] rounded-[20px] px-4 py-4 focus:outline-none focus:border-[#8c5e3d] focus:ring-1 focus:ring-[#8c5e3d] transition-all text-[#444]" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#8c5e3d] tracking-wider uppercase">Message</label>
                  <textarea name="message" required rows={5} className="w-full bg-[#faf9f8] border border-[#ece4dd] rounded-[20px] px-4 py-4 focus:outline-none focus:border-[#8c5e3d] focus:ring-1 focus:ring-[#8c5e3d] transition-all resize-none text-[#444]" placeholder="How can we help you?" />
                </div>

                <Button
                  disabled={status === "loading" || status === "success"}
                  className={`w-full h-14 rounded-[20px] text-lg font-medium shadow-md transition-all mt-4 ${status === "success"
                    ? "bg-[#6b8c42] hover:bg-[#5a7a35] text-white"
                    : "bg-[#8c5e3d] hover:bg-[#724a2e] text-white"
                    }`}
                  size="lg"
                >
                  {status === "loading" ? "Sending..." : status === "success" ? "Message Sent Successfully!" : "Send Message"}
                  {status === "idle" || status === "error" ? <Send className="w-5 h-5 ml-2" /> : null}
                  {status === "success" ? <CheckCircle className="w-5 h-5 ml-2" /> : null}
                </Button>

                {status === "error" && (
                  <p className="text-red-500 text-sm mt-2 text-center font-medium">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </form>

            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

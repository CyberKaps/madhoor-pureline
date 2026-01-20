"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin, Send, MessageCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#f5fbe9] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5a7c5e]/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#b8d99b]/20 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1f3a2e] mb-6">Let's Connect</h1>
          <p className="text-xl text-[#4a6b50] max-w-2xl mx-auto">
            Have questions about our organic products? We're here to help you on your wellness journey.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e0cc] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#5a7c5e]/10 rounded-full flex items-center justify-center text-[#5a7c5e] mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1f3a2e] mb-1">Email Us</h3>
                <a href="mailto:madhoorpureline@gmail.com" className="text-[#4a6b50] hover:text-[#5a7c5e] transition-colors">
                  madhoorpureline@gmail.com
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e0cc] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#5a7c5e]/10 rounded-full flex items-center justify-center text-[#5a7c5e] mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1f3a2e] mb-1">WhatsApp</h3>
                <a href="https://wa.me/919423041414" className="text-[#4a6b50] hover:text-[#5a7c5e] transition-colors">
                  +91 94230 41414
                </a>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e0cc] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#5a7c5e]/10 rounded-full flex items-center justify-center text-[#5a7c5e] mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1f3a2e] mb-1">Response Time</h3>
                <p className="text-[#4a6b50]">Mon - Sat, 9 AM - 6 PM</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e0cc] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#5a7c5e]/10 rounded-full flex items-center justify-center text-[#5a7c5e] mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1f3a2e] mb-1">Location</h3>
                <p className="text-[#4a6b50]">Shipping across India</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-80 bg-[#e8e0cc] rounded-3xl overflow-hidden shadow-lg border border-[#e8e0cc] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3728.491235072155!2d75.78789577551095!3d20.852241293817514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd99f0074a40df3%3A0x6da9d81c1ba7e693!2sMadhoor%20Pureline!5e0!3m2!1sen!2sin!4v1768941892187!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
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
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-[#e8e0cc] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8d99b]/20 rounded-bl-full pointer-events-none"></div>

              <h2 className="text-2xl font-bold text-[#1f3a2e] mb-6 font-serif">Send us a Message</h2>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4a6b50] tracking-wide uppercase">First Name</label>
                    <input type="text" className="w-full bg-[#f9f9f9] border border-[#e0e0e0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a7c5e] focus:bg-white transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4a6b50] tracking-wide uppercase">Last Name</label>
                    <input type="text" className="w-full bg-[#f9f9f9] border border-[#e0e0e0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a7c5e] focus:bg-white transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#4a6b50] tracking-wide uppercase">Email Address</label>
                  <input type="email" className="w-full bg-[#f9f9f9] border border-[#e0e0e0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a7c5e] focus:bg-white transition-all" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#4a6b50] tracking-wide uppercase">Message</label>
                  <textarea rows={4} className="w-full bg-[#f9f9f9] border border-[#e0e0e0] rounded-lg px-4 py-3 focus:outline-none focus:border-[#5a7c5e] focus:bg-white transition-all resize-none" placeholder="Tell us about your needs..." />
                </div>

                <Button className="w-full h-12 bg-[#1f3a2e] hover:bg-[#5a7c5e] text-white rounded-lg text-lg font-bold shadow-lg transition-all" size="lg">
                  Send Message <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>

            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Contact;

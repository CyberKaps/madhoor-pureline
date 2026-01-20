"use client";

import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Leaf, ArrowRight, CreditCard, Send } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#0f231a] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-5 pointer-events-none"></div>

      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#5a7c5e] rounded-full blur-[150px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#b8d99b] rounded-full blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Newsletter Section */}
        <div className="bg-[#5a7c5e] rounded-[2rem] p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/assets/grain.png')] opacity-10 pointer-events-none"></div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl font-serif font-bold mb-3">Join our Wellness Community</h3>
            <p className="text-white/90">Subscribe for exclusive offers, health tips, and new product launches.</p>
          </div>
          <div className="relative z-10 w-full md:w-auto flex-shrink-0">
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 w-full md:w-80 transition-all"
              />
              <Button className="bg-[#1f3a2e] hover:bg-[#0f231a] text-white rounded-full px-8 py-6 font-bold shadow-lg transition-transform hover:scale-105">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#b8d99b] rounded-lg flex items-center justify-center text-[#1f3a2e]">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif leading-none">Madhoor</h3>
                <span className="text-xs text-[#b8d99b] uppercase tracking-widest font-bold">Pureline</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              Dedicated to bringing you the purest, chemical-free cold-pressed oils and natural sweeteners.
              Rooted in tradition, crafted for modern wellness.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5a7c5e] hover:scale-110 transition-all duration-300 border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif text-[#b8d99b]">Shop</h4>
            <ul className="space-y-4">
              {['Cold Pressed Oils', 'Natural Jaggery', 'A2 Ghee', 'Combos', 'Gift Packs'].map((item) => (
                <li key={item}>
                  <a href="/products" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 block text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif text-[#b8d99b]">Company</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Story', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms & Conditions', href: '#' }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300 block text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif text-[#b8d99b]">Visit Us</h4>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5a7c5e] mt-1 shrink-0" />
                <p>78, Garkheda BK. Bhusawal Road,<br />Jamner, Jalgaon, MH - 424206</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#5a7c5e] shrink-0" />
                <a href="mailto:madhoorpureline@gmail.com" className="hover:text-white transition-colors">madhoorpureline@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5a7c5e] shrink-0" />
                <a href="tel:+919423041414" className="hover:text-white transition-colors">+91 94230 41414</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm md:text-left text-center">
            © 2025 Madhoor Pureline. All rights reserved.
          </p>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder for payment icons */}
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
          </div>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Developed by <a href="https://www.cyberkaps.me" target="_blank" rel="noopener noreferrer" className="text-[#b8d99b] hover:underline">CyberKaps</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
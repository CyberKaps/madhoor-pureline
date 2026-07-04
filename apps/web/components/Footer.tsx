"use client";

import { Facebook, Instagram, Phone, Mail, MapPin, Leaf, ArrowRight, CreditCard, Send } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Footer = () => {

  const whatsappMessage = encodeURIComponent(
    "Hi Kalpesh, I checked out your work and wanted to connect with you regarding website development"
  );
  return (
    <footer className="bg-[#211814] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-start">
              <img
                src="/assets/logo.jpeg"
                alt="Madhoor Pureline"
                className="w-32 md:w-40 h-auto object-contain"
              />
            </div>
            <p className="text-white/60 leading-relaxed text-sm">
              Dedicated to bringing you the purest, chemical-free cold-pressed oils and natural sweeteners.
              Rooted in tradition, crafted for modern wellness.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, XIcon].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-serif text-secondary">Shop</h4>
            <ul className="space-y-4">
              {['Natural Jaggery', 'Groundnut Oil', 'Jaggery Powder (Coming Soon)', 'Coconut Oil (Coming Soon)'].map((item) => (
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
            <h4 className="text-lg font-bold mb-6 font-serif text-secondary">Company</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Story', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' }
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
            <h4 className="text-lg font-bold mb-6 font-serif text-secondary">Visit Us</h4>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                <p>78, Garkheda BK. Bhusawal Road,<br />Jamner, Jalgaon, MH - 424206</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:madhoorpureline@gmail.com" className="hover:text-white transition-colors">madhoorpureline@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+919834452105" className="hover:text-white transition-colors">+91 9834452105</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm md:text-left text-center">
            © 2026 Madhoor Pureline. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {["UPI", "Visa", "Mastercard", "RuPay"].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-white/70 text-[11px] font-semibold tracking-wide"
              >
                {method}
              </span>
            ))}
          </div>


          <p className="text-white/40 text-sm flex items-center gap-1">
            Developed and designed by{" "}
            <a
              href={`https://wa.me/918530761040?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              <span className="text-green-500 font-bold">Kalpesh</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for header background
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const headerShadow = useTransform(scrollY, [0, 100], [0, 0.3]);

  return (
    <>
      <motion.header 
        className="sticky top-0 z-50 w-full bg-[#dcd6c4] border-b-2 border-[#b8ae93] backdrop-blur-sm"
        style={{ 
          opacity: headerOpacity,
          boxShadow: useTransform(headerShadow, (v) => `0 4px 6px rgba(0,0,0,${v})`)
        }}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/MadhoorLogo.png" alt="Madhoor Pureline" className="w-12 h-12 rounded-md object-cover shadow-sm" />
            <div>
              <span className="text-xl font-bold text-[#1f3a2e] tracking-wide">Madhoor Pureline</span>
              <p className="text-xs text-[#4a6b50]">The Pure Promise</p>
            </div>
          </Link>

          <nav className="hidden md:flex sm:gap-6 items-center space-x-8 text-[#1f3a2e] font-medium">
            {[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/shop" },
              { label: "About Us", href: "/about" },
              { label: "Reviews", href: "/reviews" },
              { label: "Contact", href: "/contact" }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={item.href} className="hover:text-[#5a7c5e] transition-colors relative group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5a7c5e] transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="relative text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-3 bg-[#7a9b5c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
          </div>

          <button
            className="md:hidden text-[#2d4a3e]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Fixed Right Banner */}
      <div
        className="hidden md:flex items-center justify-end fixed top-0 right-0 py-2 w-[140px] h-20 z-[50]"
        aria-hidden="true"
      >
        <img src="/assets/MadhoorLogo.png" alt="Logo" />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#2d4a3e] text-[#f5f3ed] flex flex-col items-center justify-center space-y-8 z-[60]">
          <button
            className="absolute top-6 right-6 text-[#7a9b5c]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          <Link href="/shop" className="text-xl hover:text-[#7a9b5c]" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link href="/subscription" className="text-xl hover:text-[#7a9b5c]" onClick={() => setMobileOpen(false)}>Subscription</Link>
          <Link href="/about" className="text-xl hover:text-[#7a9b5c]" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/contact" className="text-xl hover:text-[#7a9b5c]" onClick={() => setMobileOpen(false)}>Contact</Link>

          <button className="relative text-[#7a9b5c] hover:text-white" onClick={() => setMobileOpen(false)} aria-label="Cart">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-[#7a9b5c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
        </div>
      )}
    </>
  );
}

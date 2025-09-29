"use client";

import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Header - reserve space for fixed right banner with md:mr-14 */}
      <header className="w-full flex md:mr-14">
        {/* Left Logo Section */}
        <div className="bg-[#f57c3b] md:w-[25vw] flex flex-col justify-center px-6 py-4">
          <h1 className="text-2xl font-bold text-[#243629] tracking-wide">
            Madhoor Pureline
          </h1>
          <p className="text-sm text-[#243629]">The Pure Promise</p>
        </div>

        {/* Middle Nav Section */}
        <div className="flex-1 bg-[#243629] flex items-center justify-between px-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-white">
            <a href="#shop" className="hover:text-[#f57c3b] transition-colors">
              Shop
            </a>
            <a href="#subscription" className="hover:text-[#f57c3b] transition-colors">
              Subscription
            </a>
            <a href="#about" className="hover:text-[#f57c3b] transition-colors">
              About Us
            </a>
            <a href="#contact" className="hover:text-[#f57c3b] transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions (desktop) */}
          <div className="hidden md:flex items-center me-40 space-x-6">
            <button className="flex items-center text-[#f57c3b] hover:text-white transition-colors">
              <User className="w-5 h-5 mr-1" />
              Log In
            </button>
            <button className="relative text-[#f57c3b] hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-3 bg-[#f57c3b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#f57c3b]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fixed Right Side Banner (visible from md up) */}
      <div
        className="bg-[#] hidden md:flex items-center justify-end
                   fixed top-0 right-0 py- w w-35 h-20 z-50"
        aria-hidden
      >
        <img src="/assets/MadhoorLogo.png" alt="Logo" />
      </div>

      {/* Mobile Nav Overlay (higher z so it can cover the fixed banner on mobile) */}
      {mobileOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#243629] text-white flex flex-col items-center justify-center space-y-8 z-60">
          {/* Close Button in Overlay */}
          <button
            className="absolute top-6 right-6 text-[#f57c3b]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          <a href="#shop" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>Shop</a>
          <a href="#subscription" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>Subscription</a>
          <a href="#about" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>About Us</a>
          <a href="#contact" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>Contact</a>

          <button className="flex items-center text-[#f57c3b] hover:text-white" onClick={() => setMobileOpen(false)}>
            <User className="w-5 h-5 mr-2" /> Log In
          </button>

          <button className="relative text-[#f57c3b] hover:text-white" onClick={() => setMobileOpen(false)}>
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-[#f57c3b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
        </div>
      )}
    </>
  );
}

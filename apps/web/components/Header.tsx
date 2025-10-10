"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check token on mount
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Listen for token changes (storage event)
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <>
      {/* Header */}
      <header className="w-full flex md:mr-14">
        {/* Left Logo */}
        <div className="bg-[#f57c3b] md:w-[25vw] flex flex-col justify-center px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-[#243629] tracking-wide">
            Madhoor Pureline
          </Link>
          <p className="text-sm text-[#243629]">The Pure Promise</p>
        </div>

        {/* Middle Nav */}
        <div className="flex-1 bg-[#243629] flex items-center justify-between px-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-white">
            <Link href="/shop" className="hover:text-[#f57c3b] transition-colors">Shop</Link>
            <Link href="/subscription" className="hover:text-[#f57c3b] transition-colors">Subscription</Link>
            <Link href="/about" className="hover:text-[#f57c3b] transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-[#f57c3b] transition-colors">Contact</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center mr-40 space-x-6">
            {!isLoggedIn ? (
              <Link href="/login" className="flex items-center text-[#f57c3b] hover:text-white transition-colors">
                <User className="w-5 h-5 mr-1" /> Log In
              </Link>
            ) : (
              <>
                <Link href="/profile" className="flex items-center text-[#f57c3b] hover:text-white transition-colors">
                  <User className="w-5 h-5 mr-1" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#f57c3b] text-[#243629] rounded-md hover:bg-[#ff8c4a] transition"
                >
                  Logout
                </button>
              </>
            )}

            <button className="relative text-[#f57c3b] hover:text-white transition-colors" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-3 bg-[#f57c3b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
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

      {/* Fixed Right Banner */}
      <div
        className="hidden md:flex items-center justify-end fixed top-0 right-0 py-2 w-[140px] h-20 z-[50]"
        aria-hidden="true"
      >
        <img src="/assets/MadhoorLogo.png" alt="Logo" />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#243629] text-white flex flex-col items-center justify-center space-y-8 z-[60]">
          <button
            className="absolute top-6 right-6 text-[#f57c3b]"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          <Link href="/shop" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link href="/subscription" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>Subscription</Link>
          <Link href="/about" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/contact" className="text-xl hover:text-[#f57c3b]" onClick={() => setMobileOpen(false)}>Contact</Link>

          {!isLoggedIn ? (
            <Link href="/login" className="flex items-center text-[#f57c3b] hover:text-white transition-colors">
              <User className="w-5 h-5 mr-1" /> Log In
            </Link>
          ) : (
            <>
              <Link href="/profile" className="flex items-center text-[#f57c3b] hover:text-white transition-colors">
                <User className="w-5 h-5 mr-1" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#f57c3b] text-[#243629] rounded-md hover:bg-[#ff8c4a] transition"
              >
                Logout
              </button>
            </>
          )}

          <button className="relative text-[#f57c3b] hover:text-white" onClick={() => setMobileOpen(false)} aria-label="Cart">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-3 bg-[#f57c3b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
        </div>
      )}
    </>
  );
}

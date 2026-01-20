"use client";

import { useEffect, useState } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import CartDrawer from "./CartDrawer";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Pages with dark hero sections where header text should be white initially
  const isDarkHero = ["/", "/products", "/about", "/reviews"].includes(pathname);

  // Dynamic header styles based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(220, 214, 196, 0)", "rgba(255, 255, 255, 0.95)"]
  );
  const headerBackdropBlur = useTransform(scrollY, [0, 50], ["0px", "12px"]);
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(184, 174, 147, 0)", "rgba(184, 174, 147, 0.4)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.05)"]
  );
  const paddingY = useTransform(scrollY, [0, 50], ["20px", "12px"]);

  // Text Color Transformation
  // If Dark Hero: White -> Dark Green
  // If Light Hero: Dark Green -> Dark Green
  const textColor = useTransform(
    scrollY,
    [0, 50],
    [isDarkHero ? "rgba(255, 255, 255, 1)" : "rgba(31, 58, 46, 1)", "rgba(31, 58, 46, 1)"]
  );

  return (
    <>
      <motion.header
        className="fixed top-0 z-50 w-full transition-all duration-300"
        style={{
          backgroundColor: headerBackground,
          backdropFilter: headerBackdropBlur,
          borderBottom: `1px solid`,
          borderColor: headerBorder,
          boxShadow: headerShadow,
          paddingTop: paddingY,
          paddingBottom: paddingY,
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/assets/MadhoorLogo.png"
                alt="Madhoor Pureline"
                className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                style={{ color: textColor }}
                className="text-xl font-serif font-bold tracking-wide leading-none transition-colors"
              >
                Madhoor
              </motion.span>
              <span className="text-[10px] text-[#5a7c5e] uppercase tracking-[0.2em] font-medium">
                Pureline
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative group"
                >
                  <motion.span
                    style={{ color: textColor }}
                    className={cn(
                      "text-sm font-medium transition-colors group-hover:opacity-80",
                      isActive ? "font-bold" : ""
                    )}
                  >
                    {item.label}
                  </motion.span>

                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#5a7c5e]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <CartDrawer />
            <motion.div
              style={{ backgroundColor: textColor }}
              className="h-6 w-[1px] opacity-20"
            ></motion.div>
            <AuthButtons textColor={textColor} />
          </div>

          <button
            className="md:hidden p-2 rounded-full transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-[#5a7c5e]" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-[#f5fbe9] z-[70] shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-serif font-bold text-[#1f3a2e]">Menu</span>
                <button
                  className="text-[#2d4a3e] p-2 hover:bg-[#2d4a3e]/5 rounded-full"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-[#1f3a2e] block py-2 border-b border-[#2d4a3e]/5 hover:text-[#5a7c5e] hover:pl-2 transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-6">
                <div className="pt-6 border-t border-[#2d4a3e]/10">
                  <CartDrawer />
                </div>
                <div className="flex flex-col gap-4">
                  <AuthButtons isMobile />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function AuthButtons({ textColor, isMobile }: { textColor?: MotionValue<string>; isMobile?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));

    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUserId(localStorage.getItem("userId"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!mounted) return null;

  if (token) {
    return (
      <div className={cn("flex items-center gap-4", isMobile && "flex-col w-full")}>
        {userId && (
          <Link href={`/dashboard/${userId}`} className={cn(isMobile && "w-full")}>
            <motion.button
              style={{ color: !isMobile ? (textColor || "#1f3a2e") : "#1f3a2e" }}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors group",
                isMobile && "w-full justify-center p-3 bg-[#e8e0cc]/30 rounded-full"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-[#5a7c5e]/10 flex items-center justify-center group-hover:bg-[#5a7c5e] group-hover:text-white transition-colors">
                <User className="w-4 h-4" />
              </div>
              <span>Profile</span>
            </motion.button>
          </Link>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.reload();
          }}
          className={cn(
            "text-sm font-medium text-red-500 hover:text-red-700 transition-colors",
            isMobile && "w-full py-2 border border-red-200 rounded-full"
          )}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex gap-3", isMobile && "flex-col w-full")}>
      <Link href="/login" className={cn(isMobile && "w-full")}>
        <motion.button
          style={{
            color: !isMobile ? (textColor || "#1f3a2e") : "#1f3a2e",
            borderColor: !isMobile ? (textColor || "#1f3a2e") : "#1f3a2e"
          }}
          whileHover={!isMobile ? {
            backgroundColor: "#1f3a2e",
            color: "#ffffff",
            borderColor: "#1f3a2e"
          } : {}}
          className={cn(
            "px-5 py-2 text-sm font-medium border rounded-full transition-all shadow-sm hover:shadow-md",
            isMobile && "w-full justify-center border-[#1f3a2e] text-[#1f3a2e]"
          )}
        >
          Login
        </motion.button>
      </Link>
      <Link href="/signup" className={cn(isMobile && "w-full")}>
        <button className="w-full px-5 py-2 text-sm font-medium text-white bg-[#5a7c5e] rounded-full hover:bg-[#4a6b50] transition-all shadow-sm hover:shadow-md hover:scale-105">
          Sign Up
        </button>
      </Link>
    </div>
  );
}

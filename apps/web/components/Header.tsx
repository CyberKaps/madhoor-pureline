"use client";

import { useState } from "react";
import { Menu, X, ShoppingBag, User, LogOut, Package } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleCart } from "../store/cartSlice";
import { toggleAuthModal, logout } from "../store/authSlice";
import AuthModal from "./AuthModal";
import CartSheet from "./CartSheet";

import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartItemsCount = useAppSelector((state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Dynamic header styles based on scroll
  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.95)"]
  );
  const headerBackdropBlur = useTransform(scrollY, [0, 50], ["0px", "12px"]);
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(184, 174, 147, 0.2)", "rgba(184, 174, 147, 0.4)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 20px rgba(0,0,0,0.05)"]
  );
  const paddingY = useTransform(scrollY, [0, 50], ["20px", "12px"]);

  // Text Color Transformation
  // Always dark green/brown
  const textColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(61, 42, 32, 1)", "rgba(61, 42, 32, 1)"]
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
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/assets/logo.jpeg"
                alt="Madhoor Pureline"
                className="w-20 md:w-28 h-auto object-contain mix-blend-multiply transition-transform hover:scale-105"
              />
            </motion.div>
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
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#916242]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <motion.div
              style={{ backgroundColor: textColor }}
              className="h-6 w-[1px] opacity-20"
            ></motion.div>
            
            <button 
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-[#444] hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#f39c12] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#444]">Hi, {user?.name?.split(' ')[0]}</span>
                <Link href="/orders" className="p-2 text-[#444] hover:text-primary transition-colors" title="My Orders">
                  <Package className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("token");
                  }}
                  className="p-2 text-[#444] hover:text-primary transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => dispatch(toggleAuthModal(true))}
                className="flex items-center gap-2 p-2 text-[#444] hover:text-primary transition-colors font-medium text-sm"
              >
                <User className="w-5 h-5" />
                Login
              </button>
            )}
            
            <Link href="/contact">
              <button className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-[#7b5034] transition-all shadow-sm hover:shadow-md hover:scale-105">
                Contact
              </button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-[#444]"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#f39c12] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              className="p-2 rounded-full transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-primary" />
            </button>
          </div>
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
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[300px] bg-background z-[70] shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-serif font-bold text-foreground">Menu</span>
                <button
                  className="text-foreground p-2 hover:bg-foreground/5 rounded-full"
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
                      className="text-lg font-medium text-foreground block py-2 border-b border-foreground/5 hover:text-primary hover:pl-2 transition-all"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between border-t border-foreground/5 pt-4">
                    <span className="font-medium text-foreground">Hi, {user?.name}</span>
                    <button 
                      onClick={() => {
                        dispatch(logout());
                        localStorage.removeItem("token");
                        setMobileOpen(false);
                      }}
                      className="text-sm text-red-500 font-bold"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      dispatch(toggleAuthModal(true));
                      setMobileOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium border border-primary text-primary rounded-full hover:bg-primary/5 transition-all"
                  >
                    <User className="w-5 h-5" />
                    Login / Sign Up
                  </button>
                )}
                
                <Link href="/contact" className="w-full block" onClick={() => setMobileOpen(false)}>
                  <button className="w-full px-5 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-[#7b5034] transition-all shadow-sm">
                    Contact Us
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModal />
      <CartSheet />
    </>
  );
}

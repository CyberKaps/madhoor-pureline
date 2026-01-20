"use client";

import { useCart } from "context/CartContext";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetClose } from "./ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartDrawer() {
    const { cart, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();

    const totalAmount = cart?.items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="relative p-2 text-[#1f3a2e] hover:text-[#5a7c5e] transition-colors">
                    <ShoppingBag className="w-6 h-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#5a7c5e] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                            {cartCount}
                        </span>
                    )}
                </button>
            </SheetTrigger>
            <SheetContent className="bg-[#f0ece0] border-l-[#c9c0a8] w-full sm:max-w-md flex flex-col p-0">
                <SheetHeader className="p-6 border-b border-[#c9c0a8] bg-[#e8e0cc]">
                    <SheetTitle className="text-2xl font-bold text-[#1f3a2e] flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" /> Your Cart
                    </SheetTitle>
                    <SheetDescription className="text-[#4a6b50]">
                        Review your selected items before checkout.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {!cart || !cart.items || cart.items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                            <ShoppingBag className="w-16 h-16 text-[#c9c0a8]" />
                            <p className="text-lg font-medium text-[#1f3a2e]">Your cart is empty</p>
                            <p className="text-sm text-[#4a6b50]">Add some wellness products to get started.</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {cart.items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white rounded-xl p-4 shadow-sm border border-[#e0dac5] flex gap-4"
                                >
                                    <div className="w-20 h-20 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0 border border-[#eee]">
                                        <img
                                            src={item.product.imageUrl || "/assets/productImages/product1.jpeg"}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-[#1f3a2e] line-clamp-1">{item.product.name}</h4>
                                            <p className="text-sm text-[#5a7c5e] font-semibold">₹{item.product.price}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3 bg-[#f0ece0] rounded-full px-2 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    className="p-1 hover:bg-[#e0dac5] rounded-full transition-colors disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3 text-[#1f3a2e]" />
                                                </button>
                                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    className="p-1 hover:bg-[#e0dac5] rounded-full transition-colors"
                                                >
                                                    <Plus className="w-3 h-3 text-[#1f3a2e]" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.productId)}
                                                className="text-red-400 hover:text-red-600 transition-colors p-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {cart && cart.items?.length > 0 && (
                    <div className="p-6 border-t border-[#c9c0a8] bg-[#e8e0cc] space-y-4">
                        <div className="flex items-center justify-between text-[#1f3a2e]">
                            <span className="text-base font-medium">Subtotal</span>
                            <span className="text-xl font-bold">₹{totalAmount}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>
                            <SheetClose asChild>
                                <Link href="/checkout">
                                    <Button className="w-full bg-[#5a7c5e] hover:bg-[#4a6b50] text-white">
                                        Checkout
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}

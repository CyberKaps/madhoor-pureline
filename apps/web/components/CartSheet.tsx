"use client";

import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleCart, removeFromCart, updateQuantity } from "../store/cartSlice";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSheet() {
  const dispatch = useAppDispatch();
  const { items, isCartOpen } = useAppSelector((state) => state.cart);

  const parsePrice = (price: any) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const parsed = parseInt(price.replace(/\D/g, ""), 10);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const subtotal = items.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => dispatch(toggleCart(open))}>
      <SheetContent className="w-full sm:max-w-lg bg-[#faf9f8] border-l-[#ece4dd] flex flex-col p-0">
        <SheetHeader className="p-6 border-b border-[#ece4dd] bg-white">
          <SheetTitle className="font-serif text-2xl text-primary flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center h-full text-[#666] space-y-4"
              >
                <ShoppingBag className="w-16 h-16 opacity-20" />
                <p>Your cart is empty.</p>
                <Button 
                  onClick={() => dispatch(toggleCart(false))}
                  className="bg-primary hover:bg-[#7b5034] text-white rounded-[0.4rem] mt-4"
                >
                  Continue Shopping
                </Button>
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={item.id}
                  className="flex gap-4 bg-white p-4 rounded-[12px] shadow-sm border border-[#ece4dd]"
                >
                  <div className="w-20 h-20 bg-[#faf9f8] rounded-[8px] p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-bold text-[#444] text-sm line-clamp-2 leading-tight">
                      {item.title}
                    </h4>
                    <div className="font-bold text-primary mt-1">
                      ₹{parsePrice(item.price) * item.quantity}
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-3 border border-[#ece4dd] rounded-[6px] px-2 py-1">
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          disabled={item.quantity <= 1}
                          className="text-[#666] hover:text-primary disabled:opacity-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="text-[#666] hover:text-primary"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <SheetFooter className="p-6 border-t border-[#ece4dd] bg-white flex flex-col">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="font-bold text-[#444]">Subtotal</span>
              <span className="font-bold text-primary">₹{subtotal}</span>
            </div>
            <p className="text-xs text-[#666] mb-4">Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={() => dispatch(toggleCart(false))}>
              <Button className="w-full bg-primary hover:bg-[#7b5034] text-white rounded-[0.4rem] h-12 text-lg font-medium shadow-none">
                Checkout
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

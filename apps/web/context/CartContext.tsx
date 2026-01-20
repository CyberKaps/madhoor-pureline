"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart } from "lib/api";
import { Cart, CartItem } from "types/cart";
import { useAuth } from "hooks/useAuth";
import { toast } from "sonner";

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    // We can track auth state to refresh cart on login
    // For now, we'll just fetch on mount and assume persistence or refetch on page reload

    const refreshCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const data = await getCart();
            setCart(data);
        } catch (error: any) {
            // Ignore 401 (unauthorized) as it just means session expired or invalid
            if (error.response?.status !== 401) {
                console.error("Failed to fetch cart", error);
            }
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    const addToCart = async (productId: string, quantity: number = 1) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to add items to cart");
            // Optional: Redirect to login
            return;
        }

        setLoading(true);
        try {
            await apiAddToCart(productId, quantity);
            await refreshCart();
            toast.success("Added to cart");
        } catch (error) {
            toast.error("Failed to add to cart");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId: string, quantity: number) => {
        try {
            // Optimistic update could go here
            await updateCartItem(productId, quantity);
            await refreshCart();
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            await apiRemoveFromCart(productId);
            await refreshCart();
            toast.success("Removed from cart");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    };

    const clearCart = async () => {
        try {
            await apiClearCart();
            setCart(null);
            toast.success("Cart cleared");
        } catch (error) {
            toast.error("Failed to clear cart");
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

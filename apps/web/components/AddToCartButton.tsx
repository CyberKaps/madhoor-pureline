"use client";

import { useAppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { ProductCardProps } from "./ProductCard";

interface AddToCartButtonProps {
  product: any;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    // Map the API product format to the ProductCardProps format expected by the store
    const cartProduct: ProductCardProps = {
      id: product.id,
      title: product.name,
      price: `₹${product.price}`,
      image: product.imageUrl || "/assets/productImages/product1.jpeg",
      tags: [],
      description: product.description,
      index: 0,
    };
    
    dispatch(addToCart(cartProduct));
  };

  return (
    <Button 
      onClick={handleAddToCart}
      className="w-full md:w-auto px-12 py-6 rounded-[0.4rem] bg-[#8c5e3d] hover:bg-[#724a2e] text-white font-medium text-lg shadow-md transition-all flex gap-3 items-center"
    >
      <ShoppingBag className="w-5 h-5" />
      Add to Cart
    </Button>
  );
}

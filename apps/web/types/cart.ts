import { Product } from "./product";

export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    product: Product;
}

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
}

export interface CartResponse {
    success: boolean;
    cart: Cart | null;
}

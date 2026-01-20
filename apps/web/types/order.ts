import { Product } from "./product";

export interface Address {
    street: string;
    city: string;
    pincode: number;
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentMode = "COD" | "ONLINE";

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    paymentMode: PaymentMode;
    shippingAddress: Address;
    createdAt: string;
    razorpayOrderId?: string;
    paymentId?: string;
}

export interface CreateOrderData {
    street: string;
    city: string;
    pincode: number;
    paymentMode: PaymentMode;
}

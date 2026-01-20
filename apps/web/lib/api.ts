
import { api } from "./axios";

export async function signUp(name: string, email: string, password: string) {
  return api.post("auth/signup", {
    name,
    email,
    password,
  });
}

export async function logIn(email: string, password: string) {
  const res = await api.post("auth/login", {
    email,
    password,
  });

  const { token, userId } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);

  return { token, userId };
}

export async function getUserDetails() {
  const res = await api.get("auth/me");

  return res.data.user;
}

export async function getProducts() {
  const res = await api.get("product");
  return res.data.data;
}

export async function getOneProduct(id: string) {
  const res = await api.get(`product/${id}`);
  return res.data.data;
}

// Cart APIs
export async function getCart() {
  const res = await api.get("cart");
  return res.data.cart;
}

export async function addToCart(productId: string, quantity: number = 1) {
  const res = await api.post("cart/add", { productId, quantity });
  return res.data;
}

export async function updateCartItem(productId: string, quantity: number) {
  const res = await api.put("cart/item", { productId, quantity });
  return res.data;
}

export async function removeFromCart(productId: string) {
  const res = await api.delete(`cart/item/${productId}`);
  return res.data;
}

export async function clearCart() {
  const res = await api.delete("cart");
  return res.data;
}

// Order APIs
export async function createOrder(data: { street: string; city: string; pincode: number; paymentMode: "COD" | "ONLINE" }) {
  const res = await api.post("order", data);
  return res.data;
}

// Payment APIs
export async function createRazorpayOrder(orderId: string) {
  const res = await api.post("payment/create-order", { orderId });
  return res.data;
}

export async function verifyPayment(data: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}) {
  const res = await api.post("payment/verify", data);
  return res.data;
}
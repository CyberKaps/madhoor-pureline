
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
  // const res = await api.get("product");
  // return res.data.data;

  // Returning static data as per user request
  return [
    {
      id: "1",
      name: "Natural Jaggery",
      description: "Pure, chemical-free jaggery blocks made from the finest sugarcane. Rich in minerals and perfect for daily consumption.",
      price: 150,
      imageUrl: "/assets/productImages/natural-jaggery.png",
      stock: 50,
      categoryId: "jaggery",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Jaggery Powder",
      description: "Convenient and natural jaggery powder. Excellent natural sweetener for tea, coffee, and desserts.",
      price: 180,
      imageUrl: "/assets/productImages/jaggery-powder.png",
      stock: 45,
      categoryId: "jaggery",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      name: "Groundnut Oil",
      description: "Wood-pressed groundnut oil. Retains natural flavor and nutrients. Heart-healthy and perfect for Indian cooking.",
      price: 450,
      imageUrl: "/assets/productImages/groundnut-oil.png",
      stock: 30,
      categoryId: "oil",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      name: "Coconut Oil",
      description: "Pure cold-pressed coconut oil. Ideal for cooking, skin, and hair care. Extracted from fresh coconuts.",
      price: 350,
      imageUrl: "/assets/productImages/coconut-oil.png",
      stock: 25,
      categoryId: "oil",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "5",
      name: "Family Wellness Combo",
      description: "Includes 1L Groundnut Oil, 500ml Coconut Oil, and 1kg Natural Jaggery. The perfect starter pack for a healthy kitchen.",
      price: 899,
      imageUrl: "/assets/productImages/family-combo.png",
      stock: 50,
      categoryId: "combos",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "6",
      name: "Sweet & Pure Combo",
      description: "A delightful pair of 1kg Jaggery Powder and 1kg Natural Jaggery cubes. Double the sweetness, double the health.",
      price: 320,
      imageUrl: "/assets/productImages/sweet-pure-combo.png",
      stock: 100,
      categoryId: "combos",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
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
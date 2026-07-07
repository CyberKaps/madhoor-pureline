"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { clearCart } from "../../store/cartSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { api } from "../../lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShoppingBag, CreditCard, Banknote } from "lucide-react";
import Script from "next/script";

// Add Razorpay type to window
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState<"COD" | "ONLINE">("ONLINE");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

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

  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping - discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = async () => {
    if (!couponCode) return;
    try {
      // Assuming a backend endpoint for checking coupons, for now, mock it or leave it as 0 if not fully implemented in API
      const { data } = await api.get(`/coupons/${couponCode}`);
      if (data.coupon) {
        setDiscount(data.coupon.discountValue);
        toast.success("Coupon applied!");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      return;
    }

    setLoading(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: parsePrice(item.price),
      }));

      const payload = {
        items: orderItems,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: parseInt(formData.pincode, 10),
        paymentMode,
        couponCode: couponCode || undefined,
      };

      // Call backend to create order
      const { data } = await api.post("/order", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const orderId = data.orderId;

      if (paymentMode === "ONLINE") {
        // Init Razorpay flow
        try {
          const rzpResponse = await api.post("/payment/razorpay/order", { orderId }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          });
          
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy",
            amount: rzpResponse.data.amount,
            currency: rzpResponse.data.currency,
            name: "Madhoor Pureline",
            description: "Order Payment",
            order_id: rzpResponse.data.razorpayOrderId,
            handler: async function (response: any) {
              try {
                await api.post("/payment/razorpay/verify", {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId
                }, {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                toast.success("Payment successful! Order placed.");
                dispatch(clearCart());
                router.push(`/success?orderId=${orderId}`);
              } catch (err) {
                toast.error("Payment verification failed. Please contact support.");
              }
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.phone
            },
            theme: {
              color: "#8c5e3d"
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.on('payment.failed', function (response: any) {
            toast.error(response.error.description || "Payment failed");
          });
          rzp.open();
          setLoading(false);
          return;
        } catch (rzpErr: any) {
          toast.error("Failed to initialize payment gateway. Please try Cash on Delivery.");
          setLoading(false);
          return;
        }
      }

      toast.success("Order placed successfully!");
      dispatch(clearCart());
      router.push(`/success?orderId=${orderId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      if (paymentMode !== "ONLINE") {
        setLoading(false);
      }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#faf9f8] pt-20">
        <ShoppingBag className="w-20 h-20 text-[#ece4dd] mb-6" />
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push("/products")} className="bg-primary hover:bg-[#7b5034] text-white">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="bg-[#faf9f8] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        {/* Left Form */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-8">Checkout</h1>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6 bg-white p-6 rounded-[12px] shadow-sm border border-[#ece4dd]">
            <h2 className="text-xl font-bold text-[#444] mb-4">Shipping Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input name="name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" required value={formData.phone} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label>Street Address</Label>
              <Input name="street" required value={formData.street} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input name="city" required value={formData.city} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input name="state" required value={formData.state} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label>PIN Code</Label>
                <Input name="pincode" required value={formData.pincode} onChange={handleChange} />
              </div>
            </div>

            <div className="pt-6 border-t border-[#ece4dd]">
              <h2 className="text-xl font-bold text-[#444] mb-4">Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 border rounded-[12px] cursor-pointer transition-colors ${paymentMode === 'ONLINE' ? 'border-primary bg-primary/5' : 'border-[#ece4dd]'}`}>
                  <input type="radio" name="payment" value="ONLINE" checked={paymentMode === 'ONLINE'} onChange={() => setPaymentMode('ONLINE')} className="w-5 h-5 accent-primary" />
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-6 h-6 ${paymentMode === 'ONLINE' ? 'text-primary' : 'text-[#888]'}`} />
                    <div>
                      <div className="font-bold text-[#444]">Pay Online (Razorpay)</div>
                      <div className="text-sm text-[#666]">Credit Card, UPI, Wallets</div>
                    </div>
                  </div>
                </label>
                <label className={`flex items-center gap-4 p-4 border rounded-[12px] cursor-pointer transition-colors ${paymentMode === 'COD' ? 'border-primary bg-primary/5' : 'border-[#ece4dd]'}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMode === 'COD'} onChange={() => setPaymentMode('COD')} className="w-5 h-5 accent-primary" />
                  <div className="flex items-center gap-3">
                    <Banknote className={`w-6 h-6 ${paymentMode === 'COD' ? 'text-primary' : 'text-[#888]'}`} />
                    <div>
                      <div className="font-bold text-[#444]">Cash on Delivery</div>
                      <div className="text-sm text-[#666]">Pay when you receive the order</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right Summary */}
        <div>
          <div className="bg-white p-6 rounded-[12px] shadow-sm border border-[#ece4dd] sticky top-32">
            <h2 className="text-xl font-bold text-[#444] mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-[#faf9f8] rounded-[8px] p-2 flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#444] text-sm">{item.title}</h4>
                    <p className="text-xs text-[#666]">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-primary">
                    ₹{parsePrice(item.price) * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#ece4dd] py-6 space-y-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Coupon Code" 
                  value={couponCode} 
                  onChange={(e) => setCouponCode(e.target.value)} 
                />
                <Button type="button" variant="outline" onClick={applyCoupon}>Apply</Button>
              </div>

              <div className="flex justify-between text-[#666]">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#666]">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2e7d32] font-medium">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-primary pt-4 border-t border-[#ece4dd]">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              form="checkout-form"
              disabled={loading}
              className="w-full bg-primary hover:bg-[#7b5034] text-white h-14 text-lg font-medium shadow-none mt-4 rounded-[0.4rem]"
            >
              {loading ? "Processing..." : `Place Order • ₹${total}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

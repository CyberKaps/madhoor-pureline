"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "context/CartContext";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { toast } from "sonner";
import { createOrder, createRazorpayOrder, verifyPayment } from "lib/api";
import { loadRazorpayScript } from "lib/payment";

export default function CheckoutPage() {
    const { cart, loading: cartLoading, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        street: "",
        city: "",
        pincode: ""
    });

    useEffect(() => {
        // If cart is loaded and empty, redirect
        if (!cartLoading && (!cart || cart.items.length === 0)) {
            // Allow a moment for hydration, but ideally check earlier
            // router.push("/products");
        }
    }, [cart, cartLoading, router]);


    const totalAmount = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.street || !formData.city || !formData.pincode) {
            toast.error("Please fill in all address details");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order in Backend
            const orderRes = await createOrder({
                street: formData.street,
                city: formData.city,
                pincode: Number(formData.pincode),
                paymentMode: "ONLINE"
            });

            if (!orderRes.success) throw new Error(orderRes.message);

            const orderId = orderRes.orderId;

            // 2. Load Razorpay SDK
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                throw new Error("Razorpay SDK failed to load");
            }

            // 3. Create Razorpay Order
            const rzpOrderRes = await createRazorpayOrder(orderId);
            if (!rzpOrderRes.success) throw new Error("Failed to init payment");

            // 4. Open Razorpay Modal
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_12345678901234",
                amount: rzpOrderRes.amount,
                currency: rzpOrderRes.currency,
                name: "Madhoor Pureline",
                description: "Wellness Products",
                order_id: rzpOrderRes.razorpayOrderId,
                handler: async function (response: any) {
                    toast.info("Verifying Payment...");
                    // 5. Verify Payment
                    try {
                        const verifyRes = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: orderId
                        });

                        if (verifyRes.success) {
                            toast.success("Payment Successful!");
                            await clearCart();
                            router.push("/products"); // Or a success page
                        } else {
                            toast.error("Payment Verification Failed");
                        }
                    } catch (err) {
                        toast.error("Payment Verification Error");
                        console.error(err);
                    }
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#5a7c5e"
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                toast.error("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-[#f0ece0] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#1f3a2e]">Your cart is empty</h2>
                    <Button className="mt-4 bg-[#5a7c5e]" onClick={() => router.push("/products")}>Browse Products</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f0ece0] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

                {/* Left: Address Form */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c9c0a8]">
                    <h2 className="text-xl font-bold text-[#1f3a2e] mb-6">Shipping Address</h2>
                    <form onSubmit={handlePayment} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="street">Street Address</Label>
                            <Input
                                id="street"
                                placeholder="123 Wellness St"
                                value={formData.street}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="Mumbai"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="pincode">Pincode</Label>
                                <Input
                                    id="pincode"
                                    placeholder="400001"
                                    type="number"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-6 bg-[#5a7c5e] hover:bg-[#4a6b50] text-white font-bold h-12 text-lg"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : `Pay ₹${totalAmount}`}
                        </Button>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div className="bg-[#e8e0cc] p-6 rounded-xl shadow-sm border border-[#c9c0a8] h-fit">
                    <h2 className="text-xl font-bold text-[#1f3a2e] mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <span className="text-[#4a6b50]">{item.product.name} x {item.quantity}</span>
                                <span className="font-semibold text-[#1f3a2e]">₹{item.product.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-[#c9c0a8] flex justify-between items-center text-lg font-bold text-[#1f3a2e]">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

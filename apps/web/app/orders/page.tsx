"use client";

import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, MapPin, Receipt } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../../store/store";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch if authenticated (or wait for rehydration)
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.get("/order", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setOrders(res.data.data || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, [isAuthenticated]);

  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#faf9f8] pt-20">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Please Login</h2>
        <p className="text-[#666] mb-6">You need to be logged in to view your orders.</p>
        <Button onClick={() => router.push("/")} className="bg-primary hover:bg-[#7b5034] text-white">Go to Home</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-[#faf9f8] pt-20">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
         <p className="mt-4 text-[#888]">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9f8] min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold text-[#444] mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-[#e5e5e5]">
            <Package className="w-16 h-16 text-[#ccc] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#444] mb-2">No orders found</h3>
            <p className="text-[#666] mb-6">You haven't placed any orders yet.</p>
            <Button onClick={() => router.push("/products")} className="bg-primary hover:bg-[#7b5034] text-white">Start Shopping</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-[#e5e5e5] overflow-hidden transition-all">
                {/* Header (Clickable) */}
                <div 
                  className="p-6 cursor-pointer hover:bg-[#faf9f8] transition-colors"
                  onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#888] font-medium mb-1">Order ID</p>
                      <p className="font-mono text-[#444] text-sm">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888] font-medium mb-1">Date</p>
                      <p className="text-[#444] text-sm">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888] font-medium mb-1">Total Amount</p>
                      <p className="text-primary font-bold">₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#888] font-medium mb-1">Status</p>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold
                        ${order.status === 'PAID' || order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                          'bg-orange-100 text-orange-700'}`}>
                        {order.status === 'PAID' || order.status === 'DELIVERED' ? <CheckCircle className="w-3 h-3" /> :
                         order.status === 'CANCELLED' ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {order.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#888] font-medium mb-1">Payment</p>
                      <p className="text-[#444] text-sm font-medium">{order.paymentMode}</p>
                    </div>
                    <div className="pl-4 border-l border-[#ece4dd]">
                      {expandedOrderId === order.id ? (
                        <ChevronUp className="w-6 h-6 text-[#888]" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#888]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrderId === order.id && (
                  <div className="px-6 pb-6 border-t border-[#ece4dd] pt-6 bg-[#faf9f8]/50">
                    <div className="grid md:grid-cols-2 gap-12">
                      {/* Left: Items */}
                      <div>
                        <h4 className="font-bold text-[#444] mb-6 flex items-center gap-2">
                          <Package className="w-5 h-5 text-primary" />
                          Order Items
                        </h4>
                        <div className="space-y-4">
                          {order.items.map((item: any) => (
                            <div key={item.id} className="flex items-start justify-between pb-4 border-b border-[#ece4dd] last:border-0 last:pb-0">
                              <div>
                                <p className="font-bold text-[#444] text-[15px]">{item.product?.name || item.name || "Product"}</p>
                                <p className="text-sm text-[#666] mt-1">Qty: {item.quantity} × ₹{item.price}</p>
                              </div>
                              <p className="font-bold text-[#444]">₹{item.price * item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Summary & Address */}
                      <div className="space-y-8">
                        <div>
                          <h4 className="font-bold text-[#444] mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Shipping Address
                          </h4>
                          <div className="text-sm text-[#666] leading-relaxed">
                            <p className="font-medium text-[#444] mb-1">Delivering to:</p>
                            <p>{order.shippingAddress?.street}</p>
                            <p>{order.shippingAddress?.city}{order.shippingAddress?.state ? `, ${order.shippingAddress?.state}` : ''} - {order.shippingAddress?.pincode}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-[#444] mb-4 flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-primary" />
                            Order Summary
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-[#666]">
                              <span>Subtotal</span>
                              <span>₹{order.subTotalAmount}</span>
                            </div>
                            <div className="flex justify-between text-[#666]">
                              <span>Shipping</span>
                              <span>{order.shippingAmount === 0 ? "Free" : `₹${order.shippingAmount}`}</span>
                            </div>
                            {order.discountAmount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-₹{order.discountAmount}</span>
                              </div>
                            )}
                            <div className="flex justify-between font-bold text-[#444] pt-3 border-t border-[#ece4dd] text-base">
                              <span>Total</span>
                              <span className="text-primary">₹{order.totalAmount}</span>
                            </div>
                          </div>
                        </div>

                        {(order.razorpayOrderId || order.paymentId) && (
                          <div className="pt-4 border-t border-[#ece4dd] space-y-1">
                            {order.razorpayOrderId && (
                              <p className="text-xs text-[#888]">Razorpay Order ID: <span className="font-mono text-[#444]">{order.razorpayOrderId}</span></p>
                            )}
                            {order.paymentId && (
                              <p className="text-xs text-[#888]">Payment ID: <span className="font-mono text-[#444]">{order.paymentId}</span></p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

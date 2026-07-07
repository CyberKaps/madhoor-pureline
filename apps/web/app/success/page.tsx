"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="bg-[#faf9f8] min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#e5e5e5] max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-[#444] mb-4">
          Order Successful!
        </h1>
        
        <p className="text-[#666] mb-8 text-lg">
          Thank you for shopping with Madhoor Pureline. Your order has been placed successfully.
        </p>
        
        {orderId && (
          <div className="bg-[#faf9f8] p-4 rounded-xl border border-[#e5e5e5] mb-8">
            <p className="text-sm text-[#888] mb-1">Order Reference ID</p>
            <p className="font-mono font-medium text-[#444]">{orderId}</p>
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => router.push("/products")}
            className="w-full py-6 rounded-[0.4rem] bg-[#8c5e3d] hover:bg-[#724a2e] text-white font-medium text-lg flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.push("/")}
            className="w-full py-6 rounded-[0.4rem] border-[#8c5e3d] text-[#8c5e3d] hover:bg-[#8c5e3d]/5 font-medium text-lg"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

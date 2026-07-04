import React from 'react';

export const metadata = {
  title: 'Terms & Conditions - Madhoor Pureline',
  description: 'Terms & Conditions for Madhoor Pureline',
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#faf9f8] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-[#ece4dd]">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#444] mb-4">Terms & Conditions</h1>
          <p className="text-[#8c5e3d] font-medium mb-12">Effective Date: May 2026</p>

          <div className="space-y-8 text-[#555] leading-relaxed">
            <p>
              Welcome to <strong>Madhoor Pureline</strong>. By accessing or using our website, you agree to be bound by the following Terms & Conditions.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">1. General</h2>
              <p>
                The content of the pages of this website is for your general information and use only. It is subject to change without notice. 
                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">2. Products & Availability</h2>
              <p className="mb-3">
                All products displayed on our website are subject to availability. We reserve the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Limit the quantities of any products or services that we offer.</li>
                <li>Discontinue any product at any time.</li>
                <li>Change pricing and product descriptions without prior notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">3. Pricing & Payments</h2>
              <p>
                All prices are in Indian Rupees (INR) unless stated otherwise. We reserve the right to update prices without prior notice.
                Payment for products is processed securely. Currently, inquiries and order processing may also happen via direct WhatsApp communication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">4. Shipping & Delivery</h2>
              <p>
                Delivery timelines are estimates and not guarantees. Madhoor Pureline is not responsible for delays caused by third-party delivery services or unforeseen circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">5. Returns & Refunds</h2>
              <p>
                Due to the consumable nature of our products (oils, jaggery, etc.), we only accept returns or offer refunds if the product arrives damaged or if the wrong item is delivered. You must contact us within 48 hours of delivery with photographic evidence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">6. Limitation of Liability</h2>
              <p>
                Madhoor Pureline shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our products or website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting to the website. Your continued use of the website implies acceptance of these updated terms.
              </p>
            </section>

            <section className="bg-[#faf9f8] p-8 rounded-2xl border border-[#ece4dd] mt-12">
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Contact Us</h2>
              <p className="mb-4">If you have any questions regarding these Terms & Conditions, please contact us at:</p>
              <address className="not-italic space-y-2 text-[#444] font-medium">
                <p><strong>Madhoor Pureline</strong></p>
                <p>📧 <a href="mailto:madhoorpureline@gmail.com" className="hover:text-[#8c5e3d] transition-colors">madhoorpureline@gmail.com</a></p>
                <p>📞 <a href="tel:+919834452105" className="hover:text-[#8c5e3d] transition-colors">+91 9834452105</a></p>
              </address>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}

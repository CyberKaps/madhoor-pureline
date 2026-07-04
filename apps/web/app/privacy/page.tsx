import React from 'react';

export const metadata = {
  title: 'Privacy Policy - Madhoor Pureline',
  description: 'Privacy Policy for Madhoor Pureline',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#faf9f8] pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-[#ece4dd]">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#444] mb-4">Privacy Policy</h1>
          <p className="text-[#8c5e3d] font-medium mb-12">Effective Date: May 2026</p>

          <div className="space-y-8 text-[#555] leading-relaxed">
            <p>
              At <strong>Madhoor Pureline</strong>, we value your privacy and are committed to protecting your personal information.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Information We Collect</h2>
              <p className="mb-3">We may collect the following information when you interact with our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Messages submitted through the contact form</li>
                <li>Basic website usage data through analytics tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Respond to your inquiries</li>
                <li>Communicate regarding products or services</li>
                <li>Improve our website experience</li>
                <li>Provide customer support</li>
              </ul>
              <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">WhatsApp Communication</h2>
              <p>
                Our website may redirect users to WhatsApp for business inquiries. By contacting us through WhatsApp, you also agree to WhatsApp’s own privacy practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Cookies & Analytics</h2>
              <p className="mb-3">
                We may use cookies or analytics tools to understand website traffic and improve user experience. These tools may collect anonymous information such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Time spent on the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Data Security</h2>
              <p>
                We take reasonable measures to protect your information from unauthorized access or misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Third-Party Services</h2>
              <p className="mb-3">
                Our website may contain links or integrations from third-party platforms such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>WhatsApp</li>
                <li>Google Analytics</li>
                <li>Social media platforms</li>
              </ul>
              <p>We are not responsible for the privacy practices of these third-party services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Your Rights</h2>
              <p className="mb-3">You may contact us anytime to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your data</li>
                <li>Correct your information</li>
                <li>Request deletion of your information</li>
              </ul>
            </section>

            <section className="bg-[#faf9f8] p-8 rounded-2xl border border-[#ece4dd] mt-12">
              <h2 className="text-2xl font-bold text-[#444] mb-4 font-serif">Contact Us</h2>
              <p className="mb-4">If you have any questions regarding this Privacy Policy, you can contact us at:</p>
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

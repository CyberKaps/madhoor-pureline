import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#c9c0a8] to-[#b8ae93] border-t-4 border-[#5a7c5e]">
      <div className="container mx-auto px-4 py-16">
        {/* Brand Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="h-8 w-8 text-[#5a7c5e]" />
            <h3 className="text-3xl font-bold text-[#1f3a2e]">Madhoor Pureline</h3>
          </div>
          <p className="text-[#4a6b50] text-sm italic">The Pure Promise - 100% Natural & Organic</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#1f3a2e] mb-4 text-lg border-b-2 border-[#5a7c5e] pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 mt-4">
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-[#1f3a2e] mb-4 text-lg border-b-2 border-[#5a7c5e] pb-2 inline-block">Support</h4>
            <ul className="space-y-3 mt-4">
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Payment Methods
                </a>
              </li>
              <li>
                <a href="#" className="text-[#2d4a3e] hover:text-[#5a7c5e] transition-colors flex items-center gap-2">
                  <span className="text-[#5a7c5e]">→</span> Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-bold text-[#1f3a2e] mb-4 text-lg border-b-2 border-[#5a7c5e] pb-2 inline-block">Visit Us</h4>
            <div className="text-[#2d4a3e] space-y-3 mt-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#5a7c5e] flex-shrink-0 mt-1" />
                <div>
                  <p className="leading-relaxed">78, Garkheda BK. Bhusawal Road,</p>
                  <p className="leading-relaxed">Jamner, Jalgaon, MH - 424206.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#1f3a2e] mb-4 text-lg border-b-2 border-[#5a7c5e] pb-2 inline-block">Get in Touch</h4>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3 text-[#2d4a3e] group">
                <Mail className="h-5 w-5 text-[#5a7c5e]" />
                <a href="mailto:madhoorpureline@gmail.com" className="hover:text-[#5a7c5e] transition-colors">
                  madhoorpureline@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#2d4a3e] group">
                <Phone className="h-5 w-5 text-[#5a7c5e]" />
                <a href="tel:+919423041414" className="hover:text-[#5a7c5e] transition-colors">
                  +91 94230 41414
                </a>
              </div>
              
              {/* Social Media Icons */}
              <div className="pt-2">
                <p className="text-sm font-medium text-[#1f3a2e] mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a href="#" className="bg-[#5a7c5e] text-white p-2 rounded-full hover:bg-[#4a6b50] transition-all hover:scale-110 shadow-md">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-[#5a7c5e] text-white p-2 rounded-full hover:bg-[#4a6b50] transition-all hover:scale-110 shadow-md">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-[#5a7c5e] text-white p-2 rounded-full hover:bg-[#4a6b50] transition-all hover:scale-110 shadow-md">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* Copyright */}
      </div>
      <div className="border-t-2 border-[#5a7c5e] bg-[#1f3a2e] py-6">
          <p className="text-[#dcd6c4] text-sm text-center">
            © 2025 Madhoor Pureline. All rights reserved. | Crafted with 🌿 by Kalpesh
          </p>
        </div>
    </footer>
  );
};

export default Footer;
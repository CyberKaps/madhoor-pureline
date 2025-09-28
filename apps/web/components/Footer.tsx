import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#fafafa] border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Legal Links */}
          <div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Payment Methods
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Address:</h4>
            <div className="text-muted-foreground space-y-1">
              <p>78, Garkheda BK. Bhusawal Road,</p>
              <p>Jamner, Jalgaon, MH - 424206.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Contact:</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:madhoorpureline@gmail.com" className="hover:text-foreground transition-colors">
                  madhoorpureline@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+91 94230 41414" className="hover:text-foreground transition-colors">
                  +91 94230 41414
                </a>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-3 pt-2">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        

        {/* Copyright */}
        
        
      </div>
      <div className="border-t bg-[#d4e8c5] border-border mt-8 py-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 by Madhur pureline. Powered and secured by Kalpesh
          </p>
        </div>
    </footer>
  );
};

export default Footer;
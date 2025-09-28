import { Button } from "./ui/button";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full">
      {/* Top Banner */}
      <div className="bg-brand-green-accent text-foreground text-center py-2 text-sm font-medium bg-[#d4e8c5]">
        FREE SHIPPING ON ORDERS OVER Rs.2000
      </div>
      <hr className="bg-[#3c5923]" />
      {/* Main Header */}
      <header className="bg-[#fafafa] border-b border-border px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-light text-foreground tracking-wide">
               Madhoor Pureline
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#shop" className="text-foreground hover:text-brand-green transition-colors font-medium">
              Shop
            </a>
            <a href="#subscription" className="text-foreground hover:text-brand-green transition-colors font-medium">
              Subscription
            </a>
            <a href="#about" className="text-foreground hover:text-brand-green transition-colors font-medium">
              About Us
            </a>
            <a href="#contact" className="text-foreground hover:text-brand-green transition-colors font-medium">
              Contact
            </a>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-brand-green">
              <User className="w-4 h-4 mr-2" />
              Log In
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-brand-green relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-brand-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
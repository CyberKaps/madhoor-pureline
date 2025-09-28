import { Button } from "./ui/button";
import heroProducts from "../assets/HeroImg.png";

const HeroSection = () => {
  return (
    <section className="bg-[#fafafa] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-[#825031] text-brand-green leading-tight">
              Cold pressed,<br />
              Groundnut Oil<br />
              & Natural Jaggery
            </h1>
            
            <p className="text-lg text-muted-foreground text-[#825031] leading-relaxed max-w-md">
              At Pure Flav, we're dedicated to goodness in every sip. Delicious, fresh juice, just as nature intended.
            </p>
            
            <Button variant="brand" size="lg" className="rounded-full px-8">
              Shop
            </Button>
          </div>
          
          {/* Right Content - Product Image */}
          <div className="relative">
            <img 
              src={heroProducts.src} 
              alt="Fresh green juice bottles with natural ingredients including lime, ginger, and leafy greens"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
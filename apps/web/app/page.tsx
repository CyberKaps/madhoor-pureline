import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroBg";
import HeroSection from "../components/HeroSection";
import ShopSeasonProduce from "../components/Product";


export default function Home() {
  return (
    <>
      <Header />
      <HeroCarousel />
      <HeroSection />
      <ShopSeasonProduce />
      <Footer />
    </>
  );
}

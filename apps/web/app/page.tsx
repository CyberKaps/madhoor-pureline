import HeroBanner from "../components/HeroBanner";
import PremierHero from "../components/PremierHero";
import ProductSection from "../components/Product";
import PromoCarousel from "../components/PromoCarousel";
import Philosophy from "../components/Philosophy";
import FAQ from "../components/FAQ";
import Metrics from "../components/Metrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Pure Groundnut Oil & Natural Jaggery Online | Madhoor Pureline",
  description: "Shop 100% pure, chemical-free cold pressed groundnut oil and natural jaggery. Madhoor Pureline offers the best quality oil and jaggery directly from farms.",
  keywords: ["oil", "groundnut oil", "natural jaggery", "jaggery", "buy groundnut oil online", "buy natural jaggery", "pure oil", "cold pressed oil", "Madhoor Pureline", "cooking oil", "madhoor jaggery", "madhur pureline", "madhur jaggery", "madhur gud", "madhoor gud"],
  openGraph: {
    title: "Buy Pure Groundnut Oil & Natural Jaggery Online | Madhoor Pureline",
    description: "Shop 100% pure, chemical-free cold pressed groundnut oil and natural jaggery.",
  }
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <PremierHero />
      <ProductSection />
      <PromoCarousel />
      <Philosophy />
      <Metrics />
      <FAQ />
    </main>
  );
}

import type { Metadata } from "next";
import { Montserrat, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "components/Header";
import Footer from "components/Footer";
import PreFooterCTA from "components/PreFooterCTA";
import WhatsAppButton from "components/WhatsAppButton";
import CustomCursor from "components/CustomCursor";
import ScrollProgress from "components/ScrollProgress";
import GrainOverlay from "components/GrainOverlay";

import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://madhoorpureline.com'),
  title: {
    default: "Madhoor Pureline | Premium Cold Pressed Oils & Jaggery",
    template: "%s | Madhoor Pureline",
  },
  description: "Experience the authentic taste of health with Madhoor Pureline. We offer 100% pure, chemical-free cold-pressed groundnut oil, natural jaggery, and premium wellness products directly from our farms.",
  keywords: ["cold pressed oil", "pure jaggery", "groundnut oil", "chemical free oil", "natural sweeteners", "organic farm products", "Madhoor Pureline", "healthy cooking oil"],
  authors: [{ name: "Madhoor Pureline" }],
  creator: "Madhoor Pureline",
  publisher: "Madhoor Pureline",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://madhoorpureline.com",
    siteName: "Madhoor Pureline",
    title: "Madhoor Pureline | Premium Cold Pressed Oils & Jaggery",
    description: "Experience the authentic taste of health with Madhoor Pureline. We offer 100% pure, chemical-free cold-pressed groundnut oil and natural jaggery.",
    images: [
      {
        url: "/assets/heroSection.webp",
        width: 1200,
        height: 630,
        alt: "Madhoor Pureline Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Madhoor Pureline | Premium Cold Pressed Oils & Jaggery",
    description: "Experience the authentic taste of health with Madhoor Pureline. 100% pure, chemical-free cold-pressed groundnut oil and natural jaggery.",
    images: ["/assets/heroSection.webp"],
  },
  icons: {
    icon: "/assets/logo.jpeg",
    apple: "/assets/logo.jpeg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${fraunces.variable} font-sans`}>
          <GrainOverlay />
          <ScrollProgress />
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <PreFooterCTA />
          <Footer />
          <WhatsAppButton />
          <Toaster />
      </body>
    </html>
  );
}

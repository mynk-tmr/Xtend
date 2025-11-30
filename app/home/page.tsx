import type { Metadata } from "next";
import CTASection from "@/components/home/CTASection";
import FeaturedListings from "@/components/home/FeaturedListings";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import StorageCarousel from "@/components/home/StorageCarousel";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Xtended Space - Find Your Perfect Storage Space",
  description:
    "Discover and list storage spaces across India. Browse thousands of verified warehouses, studios, apartments, and commercial spaces with instant booking.",
  keywords: [
    "storage spaces",
    "warehouses",
    "studios",
    "commercial spaces",
    "rental",
    "India",
  ],
  openGraph: {
    title: "Xtended Space - Find Your Perfect Storage Space",
    description:
      "Discover and list storage spaces across India. Browse thousands of verified spaces with instant booking.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <div>
      <Header />

      <main className="space-y-10">
        <HeroSection />
        <StorageCarousel />
        <FeaturesSection />
        <HowItWorks />
        <FeaturedListings />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

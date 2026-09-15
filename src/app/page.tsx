"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/luxe/HeroSection"), { ssr: true });
const ProductGrid = dynamic(() => import("@/components/luxe/ProductGrid"), { ssr: false });
const BenefitsSection = dynamic(() => import("@/components/luxe/BenefitsSection"), { ssr: false });
const CategorySection = dynamic(() => import("@/components/luxe/CategorySection"), { ssr: false });
const PromoBanner = dynamic(() => import("@/components/luxe/PromoBanner"), { ssr: false });

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/section.png)",
          }}
        />
        <div className="relative z-10">
          <BenefitsSection />
          <CategorySection />
          <PromoBanner />
        </div>
      </div>
      <ProductGrid />
    </>
  );
}

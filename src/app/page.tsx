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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "LUXE",
            url: "https://ecomerence-jade.vercel.app",
            logo: "https://ecomerence-jade.vercel.app/favicon.ico",
            description: "Premium luxury shopping — watches, perfumes, bags, and accessories.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "LUXE — Premium Luxury Shopping",
            url: "https://ecomerence-jade.vercel.app",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://ecomerence-jade.vercel.app/products?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
      <HeroSection />
      <BenefitsSection />
      <CategorySection />
      <PromoBanner />
      <ProductGrid />
    </>
  );
}

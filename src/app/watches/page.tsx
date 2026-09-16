import type { Metadata } from "next";
import CategoryPage from "@/components/luxe/CategoryPage";

export const metadata: Metadata = {
  title: "Luxury Watches",
  description:
    "Explore our collection of premium luxury watches featuring Swiss movement, sapphire crystal, and Italian leather straps. Free express shipping on all orders.",
  keywords: ["luxury watches", "Swiss watches", "premium watches", "designer watches", "men watches", "women watches"],
  openGraph: {
    title: "Luxury Watches — LUXE",
    description: "Explore our collection of premium luxury watches featuring Swiss movement and Italian leather.",
  },
};

export default function WatchesPage() {
  return (
    <CategoryPage
      category="watches"
      title="Watches"
      description="Precision timepieces crafted with Swiss movement and premium materials."
    />
  );
}

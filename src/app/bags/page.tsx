import type { Metadata } from "next";
import CategoryPage from "@/components/luxe/CategoryPage";

export const metadata: Metadata = {
  title: "Luxury Leather Bags",
  description:
    "Shop handcrafted premium leather bags. Full-grain Italian leather, gold-tone hardware, and suede-lined interiors. Free express shipping.",
  keywords: ["luxury bags", "leather bags", "designer bags", "Italian leather", "premium handbags"],
  openGraph: {
    title: "Luxury Leather Bags — LUXE",
    description: "Handcrafted premium leather bags with full-grain Italian leather and gold-tone hardware.",
  },
};

export default function BagsPage() {
  return (
    <CategoryPage
      category="bags"
      title="Bags"
      description="Handcrafted leather bags for the modern connoisseur."
    />
  );
}

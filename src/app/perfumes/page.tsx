import type { Metadata } from "next";
import CategoryPage from "@/components/luxe/CategoryPage";

export const metadata: Metadata = {
  title: "Luxury Perfumes & Fragrances",
  description:
    "Discover exquisite luxury perfumes and fragrances. Oriental, woody, and floral scents crafted with premium ingredients. Long-lasting 8-12 hour wear.",
  keywords: ["luxury perfume", "designer fragrance", "premium cologne", "long lasting perfume", "eau de parfum"],
  openGraph: {
    title: "Luxury Perfumes — LUXE",
    description: "Discover exquisite luxury perfumes and fragrances crafted with premium ingredients.",
  },
};

export default function PerfumesPage() {
  return (
    <CategoryPage
      category="perfumes"
      title="Perfumes"
      description="Exquisite fragrances that define luxury and elegance."
    />
  );
}

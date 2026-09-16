import type { Metadata } from "next";
import CategoryPage from "@/components/luxe/CategoryPage";

export const metadata: Metadata = {
  title: "Luxury Accessories",
  description:
    "Refined luxury accessories to complete your ensemble. Premium craftsmanship, Italian materials, and luxury gift packaging included.",
  keywords: ["luxury accessories", "premium accessories", "designer accessories", "luxury gift shop"],
  openGraph: {
    title: "Luxury Accessories — LUXE",
    description: "Refined luxury accessories with premium craftsmanship and Italian materials.",
  },
};

export default function AccessoriesPage() {
  return (
    <CategoryPage
      category="accessories"
      title="Accessories"
      description="Refined accessories to complete your luxury ensemble."
    />
  );
}

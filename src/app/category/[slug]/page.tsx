"use client";

import { useParams } from "next/navigation";
import CategoryPage from "@/components/luxe/CategoryPage";
import type { Category } from "@/data/products";

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  watches: {
    title: "Watches Collection",
    description: "Precision timepieces crafted with Swiss movement and premium materials.",
  },
  perfumes: {
    title: "Perfumes Collection",
    description: "Exquisite fragrances that define luxury and elegance.",
  },
  bags: {
    title: "Bags Collection",
    description: "Handcrafted leather bags for the modern connoisseur.",
  },
  accessories: {
    title: "Accessories Collection",
    description: "Refined accessories to complete your luxury ensemble.",
  },
};

export default function CategorySlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  const meta = CATEGORY_META[slug] || {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Collection`,
    description: "Browse our curated selection of premium products.",
  };

  return (
    <CategoryPage
      category={slug as Category}
      title={meta.title}
      description={meta.description}
    />
  );
}

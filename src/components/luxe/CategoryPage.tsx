"use client";

import { motion } from "framer-motion";
import { PRODUCTS, type Category } from "@/data/products";
import ProductCard from "@/components/luxe/ProductCard";
import CategoryTabs from "@/components/luxe/CategoryTabs";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryPageProps {
  category: Category;
  title: string;
  description: string;
}

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

export default function CategoryPage({ category, title, description }: CategoryPageProps) {
  const meta = CATEGORY_META[category] || { title, description };
  const filtered = PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="min-h-screen pb-24 lg:pb-10" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-5 pb-3">
        <nav className="flex items-center gap-1.5 text-[11px] overflow-x-auto no-scrollbar" style={{ color: "#408A71" }}>
          <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
          <Link href="/products" className="hover:opacity-80 transition-opacity shrink-0">Products</Link>
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
          <span className="truncate opacity-60 capitalize">{category}</span>
        </nav>
      </div>

      {/* Category Banner */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12"
          style={{
            background: "linear-gradient(135deg, rgba(64,138,113,0.12) 0%, rgba(8,24,20,0.9) 50%, rgba(10,22,19,0.95) 100%)",
            border: "1px solid rgba(64,138,113,0.2)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px]"
            style={{ background: "radial-gradient(circle, rgba(64,138,113,0.15) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-[60px]"
            style={{ background: "radial-gradient(circle, rgba(176,228,204,0.08) 0%, transparent 70%)" }}
          />

          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block" style={{ color: "#408A71" }}>
              LUXE {category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
              {meta.title}
            </h1>
            <p className="text-sm sm:text-base mt-3 max-w-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
              {meta.description}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-8 h-0.5" style={{ backgroundColor: "#408A71" }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#408A71" }} />
              <div className="w-8 h-0.5" style={{ backgroundColor: "#408A71" }} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-6">
        <CategoryTabs />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="h-20 w-20 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.2)" }}
            >
              <span className="text-3xl font-serif" style={{ color: "rgba(64,138,113,0.4)" }}>L</span>
            </div>
            <p className="text-sm mb-2" style={{ color: "#FFFFFF" }}>No products found</p>
            <p className="text-xs" style={{ color: "#6B7280" }}>Try adjusting your filters or browse all products.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-5 text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
              style={{ color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.3)", backgroundColor: "rgba(64,138,113,0.05)" }}
            >
              View All Products
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

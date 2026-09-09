"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, type Product } from "@/data/products";
import ProductCard from "@/components/luxe/ProductCard";
import CategoryTabs from "@/components/luxe/CategoryTabs";
import Link from "next/link";
import { ChevronRight, ChevronDown, ArrowUpDown, X } from "lucide-react";

type SortOption = "featured" | "price-low" | "price-high" | "newest" | "best-seller";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "best-seller", label: "Best Seller" },
];

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => {
        const aNew = a.badge === "New Arrival" ? 1 : 0;
        const bNew = b.badge === "New Arrival" ? 1 : 0;
        return bNew - aNew;
      });
    case "best-seller":
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}

export default function ProductsPage() {
  const [sort, setSort] = useState<SortOption>("featured");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    return sortProducts(result, sort);
  }, [sort, activeCategory]);

  return (
    <div className="min-h-screen pb-24 lg:pb-10" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-5 pb-3">
        <nav className="flex items-center gap-1.5 text-[11px] overflow-x-auto no-scrollbar" style={{ color: "#408A71" }}>
          <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
          <span className="truncate opacity-60">Products</span>
        </nav>
      </div>

      {/* Page Header */}
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
              LUXE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
              All Products
            </h1>
            <p className="text-sm sm:text-base mt-3 max-w-lg leading-relaxed" style={{ color: "#9CA3AF" }}>
              Browse our full curated collection of premium luxury goods.
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-4">
        <CategoryTabs onSelect={setActiveCategory} />
      </div>

      {/* Sort + Results Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-4 flex items-center justify-between">
        <p className="text-xs" style={{ color: "#6B7280" }}>
          Showing <span style={{ color: "#B0E4CC" }}>{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full transition-all"
            style={{
              color: "#B0E4CC",
              backgroundColor: "rgba(64,138,113,0.08)",
              border: "1px solid rgba(64,138,113,0.2)",
            }}
          >
            <ArrowUpDown className="h-3 w-3" />
            {SORT_OPTIONS.find((o) => o.value === sort)?.label}
            <ChevronDown className={`h-3 w-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <motion.div
                  className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden min-w-[180px]"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid #18362D",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs transition-colors"
                      style={{
                        color: sort === option.value ? "#B0E4CC" : "#9CA3AF",
                        backgroundColor: sort === option.value ? "rgba(64,138,113,0.1)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (sort !== option.value) e.currentTarget.style.backgroundColor = "rgba(64,138,113,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        if (sort !== option.value) e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Grid or Empty State */}
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
            <p className="text-xs mb-5" style={{ color: "#6B7280" }}>Try adjusting your filters or sorting options.</p>
            <button
              onClick={() => {
                setSort("featured");
                setActiveCategory("all");
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
              style={{ color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.3)", backgroundColor: "rgba(64,138,113,0.05)" }}
            >
              <X className="h-3 w-3" />
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useSearch } from "@/context/SearchContext";
import { PRODUCTS, type Product } from "@/data/products";
import ProductCard from "./ProductCard";
import CategoryTabs from "./CategoryTabs";
import { ArrowUpDown, ChevronDown, X } from "lucide-react";

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

export default function ProductGrid() {
  const { query, setQuery } = useSearch();
  const [sort, setSort] = useState<SortOption>("featured");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.badge?.toLowerCase().includes(q)
      );
    }
    return sortProducts(result, sort);
  }, [query, sort, activeCategory]);

  const handleReset = () => {
    setSort("featured");
    setActiveCategory("all");
    setQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-[#081814] py-14 sm:py-20 pb-28 lg:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(8,24,20,0.8)_0%,_rgba(5,13,11,0.9)_40%,_rgba(2,6,5,1)_100%)] pointer-events-none noise-bg" />

      {/* Golden Sparkle Dust Trail - hidden on mobile for perf */}
      <div className="golden-sparkle-canvas hidden md:block">
        <div className="golden-dust-core" />
        <div className="golden-dust-trail" />
        <div className="golden-dust-scatter" />

        {[
          { top: "18%", right: "12%", dur: "3s", delay: "0s", lg: true },
          { top: "25%", right: "20%", dur: "2.5s", delay: "0.5s" },
          { top: "35%", right: "8%", dur: "3.5s", delay: "1s", lg: true },
          { top: "22%", right: "30%", dur: "2.8s", delay: "0.3s" },
          { top: "40%", right: "18%", dur: "3.2s", delay: "1.5s" },
          { top: "15%", right: "25%", dur: "4s", delay: "0.8s", lg: true },
          { top: "30%", right: "5%", dur: "2.6s", delay: "2s" },
          { top: "45%", right: "28%", dur: "3.8s", delay: "0.2s" },
          { top: "28%", right: "15%", dur: "3s", delay: "1.2s", lg: true },
          { top: "38%", right: "35%", dur: "2.4s", delay: "0.7s" },
          { top: "20%", right: "40%", dur: "3.6s", delay: "1.8s" },
          { top: "42%", right: "10%", dur: "2.9s", delay: "0.4s", lg: true },
          { top: "33%", right: "22%", dur: "3.1s", delay: "2.2s" },
          { top: "12%", right: "18%", dur: "2.7s", delay: "0.6s" },
          { top: "48%", right: "32%", dur: "3.4s", delay: "1.4s" },
        ].map((s, i) => (
          <div
            key={`star-${i}`}
            className={`golden-star ${s.lg ? "golden-star-lg" : ""}`}
            style={{ top: s.top, right: s.right, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties}
          />
        ))}

        {[
          { top: "20%", right: "10%", size: "2px", dur: "7s", delay: "0s", dx: "-50px", dy: "-80px" },
          { top: "30%", right: "15%", size: "3px", dur: "6s", delay: "1s", dx: "-30px", dy: "-60px", bright: true },
          { top: "25%", right: "22%", size: "2px", dur: "8s", delay: "2s", dx: "-70px", dy: "-40px" },
          { top: "35%", right: "8%", size: "2px", dur: "5s", delay: "0.5s", dx: "-40px", dy: "-90px" },
          { top: "18%", right: "28%", size: "3px", dur: "7s", delay: "1.5s", dx: "-60px", dy: "-50px", alt: true },
          { top: "40%", right: "12%", size: "2px", dur: "6s", delay: "3s", dx: "-35px", dy: "-70px" },
          { top: "22%", right: "35%", size: "2px", dur: "9s", delay: "0.8s", dx: "-80px", dy: "-30px" },
          { top: "38%", right: "25%", size: "3px", dur: "5.5s", delay: "2.5s", dx: "-45px", dy: "-85px", bright: true },
          { top: "28%", right: "5%", size: "2px", dur: "7.5s", delay: "1.2s", dx: "-55px", dy: "-65px" },
          { top: "45%", right: "20%", size: "2px", dur: "6.5s", delay: "0.3s", dx: "-30px", dy: "-75px" },
          { top: "15%", right: "16%", size: "3px", dur: "8s", delay: "1.8s", dx: "-65px", dy: "-45px", alt: true },
          { top: "32%", right: "30%", size: "2px", dur: "5s", delay: "3.5s", dx: "-25px", dy: "-95px" },
        ].map((p, i) => (
          <div
            key={`particle-${i}`}
            className="golden-particle"
            style={{
              top: p.top,
              right: p.right,
              "--size": p.size,
              "--dur": p.dur,
              "--delay": p.delay,
              "--dx": p.dx,
              "--dy": p.dy,
              "--color": p.bright ? "rgba(255,215,0,0.9)" : p.alt ? "rgba(230,202,101,0.9)" : undefined,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 lg:px-12 lg:max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 mb-3 animate-fade-in-up">
            <span className="text-emerald text-[10px]">✦</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald">
              Handpicked Just for You
            </span>
            <span className="text-emerald text-[10px]">✦</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold animate-fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            <span className="font-serif text-luxe-white">Curated </span>
            <span className="text-emerald">for You</span>
          </h2>
          <p
            className="text-xs text-muted mt-2 max-w-xs mx-auto line-clamp-2 animate-fade-in-up"
            style={{ animationDelay: "160ms" }}
          >
            Discover our top picks, selected with quality, style, and performance in mind.
          </p>
          <div
            className="flex items-center justify-center gap-1.5 mt-3 animate-fade-in-up"
            style={{ animationDelay: "240ms" }}
          >
            <div className="w-10 h-px bg-emerald/20" />
            <span className="text-emerald text-[9px]">◆</span>
            <div className="w-10 h-px bg-emerald/20" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <CategoryTabs onSelect={setActiveCategory} activeCategory={activeCategory} />
        </div>

        {/* Sort + Results Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted">
            {query.trim() ? (
              <>{filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;</>
            ) : (
              <>Showing <span className="text-emerald">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}</>
            )}
          </span>

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

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                <div
                  className="absolute right-0 top-full mt-1 z-50 rounded-xl overflow-hidden min-w-[180px]"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid #18362D",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => { setSort(option.value); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-[rgba(64,138,113,0.05)]"
                      style={{
                        color: sort === option.value ? "#B0E4CC" : "#9CA3AF",
                        backgroundColor: sort === option.value ? "rgba(64,138,113,0.1)" : "transparent",
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Grid */}
        <div key={`${query}-${sort}-${activeCategory}`}>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div
                className="h-20 w-20 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.2)" }}
              >
                <span className="text-3xl font-serif" style={{ color: "rgba(64,138,113,0.4)" }}>L</span>
              </div>
              <p className="text-sm mb-2" style={{ color: "#FFFFFF" }}>No products found</p>
              <p className="text-xs mb-5" style={{ color: "#6B7280" }}>Try adjusting your filters or sorting options.</p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{ color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.3)", backgroundColor: "rgba(64,138,113,0.05)" }}
              >
                <X className="h-3 w-3" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

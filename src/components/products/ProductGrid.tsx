"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Grid3X3, Watch, Droplets, ShoppingBag, Gem, Shield, Truck, RotateCcw, HeadphonesIcon, ArrowRight, Home, LayoutGrid, Heart, Package, User } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import ProductCard from "./ProductCard";

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  all: Grid3X3,
  watches: Watch,
  perfumes: Droplets,
  bags: ShoppingBag,
  accessories: Gem,
};

const TRUST_FEATURES = [
  { icon: Shield, label: "Premium Quality", sub: "Top quality products" },
  { icon: Truck, label: "Free Shipping", sub: "On orders over $89" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
  { icon: HeadphonesIcon, label: "24/7 Support", sub: "Always here to help" },
];

const BOTTOM_NAV = [
  { icon: Home, label: "Home", active: true },
  { icon: LayoutGrid, label: "Categories", active: false },
  { icon: Heart, label: "Wishlist", active: false },
  { icon: Package, label: "Orders", active: false },
  { icon: User, label: "Account", active: false },
];

export default function ProductGrid() {
  const { query } = useSearch();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.badge?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, query]);

  return (
    <>
      {/* ─── Main Product Grid Section ─── */}
      <section className="relative py-14 sm:py-20 pb-28 lg:pb-20">
        {/* Background radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(8,24,20,0.8)_0%,_rgba(5,13,11,0.9)_40%,_rgba(2,6,5,1)_100%)] pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 lg:px-12 lg:max-w-7xl">
          {/* Section header — compact */}
          <div className="text-center mb-8">
            <motion.div
              className="flex items-center justify-center gap-1.5 mb-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[#408A71] text-[10px]">✦</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#408A71]">
                Handpicked Just for You
              </span>
              <span className="text-[#408A71] text-[10px]">✦</span>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 }}
            >
              <span className="font-serif text-white">Curated </span>
              <span className="font-sans text-[#B0E4CC]">for You</span>
            </motion.h2>
            <motion.p
              className="text-xs text-zinc-400 mt-2 max-w-xs mx-auto line-clamp-2"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.16 }}
            >
              Discover our top picks, selected with quality, style, and performance in mind.
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-1.5 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.24 }}
            >
              <div className="w-10 h-px bg-[#408A71]/30" />
              <span className="text-[#408A71] text-[9px]">◆</span>
              <div className="w-10 h-px bg-[#408A71]/30" />
            </motion.div>
          </div>

          {/* Filter tabs — compact pills */}
          <LayoutGroup>
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap px-1 max-w-full">
                {CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.value];
                  const isActive = activeCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setActiveCategory(cat.value)}
                      className="relative shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full transition-all duration-300"
                    >
                      {isActive ? (
                        <motion.div
                          layout
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full bg-[#438E75] shadow-[0_0_16px_rgba(67,142,117,0.4)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      ) : (
                        <div className="absolute inset-0 rounded-full border border-emerald-900/40 bg-zinc-900/50" />
                      )}
                      <Icon
                        className={`relative z-10 h-3.5 w-3.5 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/50"
                        }`}
                      />
                      <span
                        className={`relative z-10 transition-colors duration-300 whitespace-nowrap ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </LayoutGroup>

          {/* Search indicator */}
          <AnimatePresence>
            {query.trim() && (
              <motion.div
                className="text-center mb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <span className="text-xs text-white/50">
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid — tight mobile 2-col */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + query}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          <AnimatePresence>
            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="text-white/40 text-sm">
                  No products found matching your search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* View More CTA */}
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <a
              href="/products"
              className="group inline-flex items-center gap-2 rounded-full border border-[#18362D] bg-[#0A1613]/60 px-7 py-2.5 text-xs font-medium text-white/70 hover:text-white hover:border-[#285A48] hover:bg-[#0A1613] transition-all duration-300"
            >
              View More Products
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Trust Feature Strip ─── */}
      <div className="relative bg-[#050D0B] border-t border-[#18362D]/50 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_FEATURES.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="h-9 w-9 rounded-lg border border-[#18362D] bg-[#0A1613]/60 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-[#529E84]" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white">{item.label}</p>
                  <p className="text-[9px] text-white/30 mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Fixed Mobile Bottom Navigation Bar ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pointer-events-auto">
        <div className="bg-[#050D0B]/90 backdrop-blur-md border-t border-[#18362D]/60 py-2">
          <div className="flex items-center justify-around">
            {BOTTOM_NAV.map((item) => (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-300 ${
                  item.active
                    ? "text-[#36D399]"
                    : "text-white/35 hover:text-white/55"
                }`}
              >
                <item.icon className="h-5 w-5" strokeWidth={item.active ? 2.2 : 1.8} />
                <span className="text-[9px] font-medium leading-none">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

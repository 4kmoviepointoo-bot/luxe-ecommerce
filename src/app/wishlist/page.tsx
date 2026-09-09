"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/luxe/ProductCard";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="pt-4 pb-20 lg:pb-0" style={{ backgroundColor: "#081814" }}>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-12 lg:max-w-7xl">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-luxe-white">Wishlist</h1>
          <p className="text-xs text-muted mt-1">{ids.length} item{ids.length !== 1 ? "s" : ""} saved</p>
        </motion.div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div
              className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: "rgba(64,138,113,0.12)" }}
            >
              <Heart className="h-7 w-7" style={{ color: "#408A71" }} />
            </div>
            <p className="text-sm mb-1" style={{ color: "#FFFFFF" }}>
              Your wishlist is empty
            </p>
            <p className="text-xs mb-6" style={{ color: "#6B7280" }}>
              Save your favorite items to view them later
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all"
              style={{
                backgroundColor: "#1B3E33",
                color: "#FFFFFF",
                border: "1px solid rgba(64,138,113,0.3)",
              }}
            >
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

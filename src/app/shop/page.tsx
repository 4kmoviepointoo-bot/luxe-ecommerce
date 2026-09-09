"use client";

import { motion } from "framer-motion";
import ProductGrid from "@/components/luxe/ProductGrid";

export default function ShopPage() {
  return (
    <div className="pt-4">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-12 lg:max-w-7xl">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-luxe-white">Shop All</h1>
          <p className="text-xs text-muted mt-1">Browse our complete collection</p>
        </motion.div>
      </div>
      <ProductGrid />
    </div>
  );
}

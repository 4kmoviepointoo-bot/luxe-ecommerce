"use client";

import { motion } from "framer-motion";
import { ArrowRight, Watch, Gem, ShoppingBag, WatchIcon, Sparkles } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "All", icon: Sparkles, active: true },
  { name: "Watches", icon: Watch },
  { name: "Perfumes", icon: Gem },
  { name: "Bags", icon: ShoppingBag },
  { name: "Accessories", icon: WatchIcon },
];

export default function CategorySection() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-[#F7F7F3]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Shop By Category
        </motion.h2>
        <motion.a
          href="/collections"
          className="text-sm font-medium text-emerald hover:text-mint transition-colors flex items-center gap-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#050D0B",
          border: "1px solid rgba(64,138,113,0.15)",
        }}
      >
        <div className="flex gap-0 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex-1 min-w-[100px]"
            >
              <Link
                href="/shop"
                className={`flex flex-col items-center gap-2.5 px-4 py-5 transition-all duration-300 w-full ${
                  cat.active
                    ? "bg-emerald/10"
                    : "hover:bg-emerald/5"
                }`}
                style={{
                  borderRight: i < CATEGORIES.length - 1 ? "1px solid rgba(64,138,113,0.1)" : "none",
                }}
              >
                <cat.icon
                  className={`h-5 w-5 ${
                    cat.active ? "text-emerald" : "text-[#AEB8B3]"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    cat.active ? "text-emerald" : "text-[#AEB8B3]"
                  }`}
                >
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

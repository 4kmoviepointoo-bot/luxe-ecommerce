"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Package,
  User,
  ArrowRight,
  Headphones,
  Watch,
  Sparkles,
  Tag,
  LayoutGrid,
  HelpCircle,
  MapPin,
  Phone,
} from "lucide-react";

const CATEGORIES = [
  { name: "Watches", icon: Watch, href: "/watches", description: "Precision timepieces" },
  { name: "Perfumes", icon: Sparkles, href: "/perfumes", description: "Signature fragrances" },
  { name: "Bags", icon: ShoppingBag, href: "/bags", description: "Luxury leather goods" },
  { name: "Accessories", icon: Headphones, href: "/accessories", description: "Refined finishing touches" },
];

const NAV_ITEMS = [
  { label: "Shop All", href: "/products", icon: ShoppingBag },
  { label: "Collections", href: "/collections", icon: LayoutGrid, badge: "NEW" },
  { label: "New Arrivals", href: "/new-arrivals", icon: Tag },
  { label: "Sale", href: "/sale", icon: Tag },
];

const ACCOUNT_ITEMS = [
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Orders", href: "/orders", icon: Package },
  { label: "Track Order", href: "/track-order", icon: MapPin },
  { label: "FAQ", href: "/faq", icon: HelpCircle },
  { label: "Account", href: "/account", icon: User },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function MenuPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 lg:pb-16" style={{ backgroundColor: "#081814" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "#408A71" }}
            >
              Navigate
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
          >
            Shop by Category
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm"
            style={{ color: "#6B7280" }}
          >
            Find exactly what you&apos;re looking for
          </motion.p>
        </div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.name} variants={itemVariants}>
              <Link href={cat.href}>
                <div
                  className="group rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid rgba(64,138,113,0.15)",
                  }}
                >
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-3 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: "rgba(64,138,113,0.15)" }}
                  >
                    <cat.icon className="h-5 w-5" style={{ color: "#408A71" }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-0.5" style={{ color: "#FFFFFF" }}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px]" style={{ color: "#6B7280" }}>
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>
            Quick Links
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#0A1613",
              border: "1px solid rgba(64,138,113,0.15)",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-5 py-3.5 transition-colors"
                style={{
                  borderBottom: i < NAV_ITEMS.length - 1 ? "1px solid rgba(64,138,113,0.1)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" style={{ color: "#408A71" }} />
                  <span className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold"
                      style={{ backgroundColor: "#408A71", color: "#020908" }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <ArrowRight className="h-3.5 w-3.5" style={{ color: "#6B7280" }} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>
            Account
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#0A1613",
              border: "1px solid rgba(64,138,113,0.15)",
            }}
          >
            {ACCOUNT_ITEMS.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-5 py-3.5 transition-colors"
                style={{
                  borderBottom: i < ACCOUNT_ITEMS.length - 1 ? "1px solid rgba(64,138,113,0.1)" : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" style={{ color: "#6B7280" }} />
                  <span className="text-sm" style={{ color: "#FFFFFF" }}>
                    {item.label}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5" style={{ color: "#6B7280" }} />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              backgroundColor: "#0A1613",
              border: "1px solid rgba(64,138,113,0.15)",
            }}
          >
            <Phone className="h-5 w-5 mx-auto mb-2" style={{ color: "#408A71" }} />
            <p className="text-xs mb-1" style={{ color: "#6B7280" }}>
              Need help?
            </p>
            <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
              +1 (555) 123-4567
            </p>
            <p className="text-[11px] mt-1" style={{ color: "#6B7280" }}>
              Mon-Fri, 9am-6pm EST
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

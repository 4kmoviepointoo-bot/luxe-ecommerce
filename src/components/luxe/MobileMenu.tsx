"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ShoppingBag, Heart, Package, User, ArrowRight, Home, LayoutGrid, Tag } from "lucide-react";

const NAV_ITEMS = [
  { label: "Shop", href: "/products", icon: ShoppingBag },
  { label: "Collections", href: "/collections", icon: LayoutGrid, badge: "NEW" },
  { label: "New Arrivals", href: "/new-arrivals", icon: Tag },
  { label: "Sale", href: "/sale", icon: Tag },
];

const EXTRA_ITEMS = [
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Orders", href: "/orders", icon: Package },
  { label: "Account", href: "/account", icon: User },
];

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MobileMenu({ isOpen: controlledOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {controlledOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-bg-deep/95 backdrop-blur-xl border-r border-border-custom lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-border-custom">
              <span className="text-lg font-semibold text-luxe-white">Menu</span>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-luxe-white hover:bg-white/8 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-5">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-luxe-white/70 hover:bg-surface hover:text-luxe-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-emerald/70" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="inline-flex items-center rounded-full bg-emerald px-2 py-0.5 text-[9px] font-bold text-bg-deep">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-border-custom mx-5" />
            <nav className="flex flex-col gap-1 p-5">
              {EXTRA_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-luxe-white/50 hover:bg-surface hover:text-luxe-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CartDrawer({ isOpen: controlledOpen, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <AnimatePresence>
      {controlledOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-bg-deep/95 backdrop-blur-xl border-l border-border-custom"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-border-custom">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-emerald" />
                <span className="text-lg font-semibold text-luxe-white">Cart</span>
                <span className="text-xs text-muted">({itemCount})</span>
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-luxe-white hover:bg-white/8 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 px-5">
                <ShoppingBag className="h-12 w-12 text-muted/30" />
                <p className="text-sm text-muted">Your cart is empty</p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="rounded-full bg-emerald px-6 py-2.5 text-xs font-semibold text-bg-deep hover:shadow-[0_0_16px_rgba(120,217,143,0.3)] transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.color}-${item.size}`} className="flex gap-3 p-3 rounded-xl bg-surface border border-border-custom">
                      <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src={item.image} alt={item.title} width={48} height={48} quality={85} className="object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-luxe-white line-clamp-1">{item.title}</p>
                        <p className="text-[10px] text-muted mt-0.5">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                            className="h-6 w-6 rounded-md bg-card border border-border-custom flex items-center justify-center text-muted hover:text-luxe-white transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-medium text-luxe-white w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                            className="h-6 w-6 rounded-md bg-card border border-border-custom flex items-center justify-center text-muted hover:text-luxe-white transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.productId, item.color, item.size)}
                          className="text-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-xs font-bold text-emerald">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border-custom p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Subtotal</span>
                    <span className="text-sm font-bold text-luxe-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="block w-full rounded-xl bg-emerald py-3 text-center text-sm font-semibold text-bg-deep hover:shadow-[0_0_20px_rgba(120,217,143,0.3)] transition-all"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-[11px] text-muted hover:text-luxe-white transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

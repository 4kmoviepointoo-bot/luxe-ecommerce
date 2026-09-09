"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, Package, Copy, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

function ConfettiPiece({ index }: { index: number }) {
  const colors = ["#B0E4CC", "#408A71", "#285A48", "#fbbf24", "#34d399", "#60a5fa"];
  const color = colors[index % colors.length];
  const left = (index * 7 + 13) % 100;
  const delay = (index * 0.1) % 0.8;
  const duration = 2 + (index % 4) * 0.5;
  const size = 4 + (index % 6);
  const rotation = (index * 45) % 360;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}%`,
        top: -10,
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        borderRadius: 1,
      }}
      initial={{ y: -10, opacity: 1, rotate: 0 }}
      animate={{
        y: 600,
        opacity: [1, 1, 0],
        rotate: rotation + 720,
        x: [0, ((index % 2 === 0 ? 1 : -1) * 50)],
      }}
      transition={{
        duration,
        delay,
        ease: "easeIn",
      }}
    />
  );
}

export default function OrderSuccessPage() {
  const { items, subtotal, clearCart } = useCart();
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  const orderNumber = useMemo(() => {
    return `LX-${Date.now().toString(36).substring(2, 8).toUpperCase()}`;
  }, []);

  const orderItems = useMemo(() => [...items], []);
  const orderTotal = useMemo(() => {
    const shipping = subtotal >= 150 ? 0 : 12.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  }, [subtotal]);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16 relative overflow-hidden" style={{ backgroundColor: "#081814" }}>
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {Array.from({ length: 60 }).map((_, i) => (
              <ConfettiPiece key={i} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-lg text-center relative z-10">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="h-20 w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(64,138,113,0.2)" }}>
            <CheckCircle className="h-10 w-10" style={{ color: "#408A71" }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm mb-8 max-w-sm mx-auto"
          style={{ color: "#9CA3AF" }}
        >
          Thank you for shopping with LUXE. Your order has been placed successfully.
        </motion.p>

        {/* Order Number */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)" }}
        >
          <p className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Order Number</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-bold" style={{ color: "#B0E4CC" }}>{orderNumber}</span>
            <button
              onClick={handleCopyOrder}
              className="p-1.5 rounded-md transition-colors"
              style={{ backgroundColor: "rgba(64,138,113,0.1)" }}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" style={{ color: "#408A71" }} />
              ) : (
                <Copy className="h-3.5 w-3.5" style={{ color: "#6B7280" }} />
              )}
            </button>
          </div>
        </motion.div>

        {/* Order Items */}
        {orderItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-xl p-4 mb-6 text-left"
            style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-3.5 w-3.5" style={{ color: "#408A71" }} />
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#408A71" }}>Items Ordered</span>
            </div>
            <div className="space-y-2">
              {orderItems.map((item, i) => (
                <div key={`${item.productId}-${i}`} className="flex items-center justify-between py-2" style={{ borderBottom: i < orderItems.length - 1 ? "1px solid rgba(64,138,113,0.1)" : "none" }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: "#FFFFFF" }}>{item.title}</p>
                    <p className="text-[10px]" style={{ color: "#6B7280" }}>Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-medium" style={{ color: "#B0E4CC" }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 mt-2" style={{ borderTop: "1px solid rgba(64,138,113,0.15)" }}>
              <span className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>Total</span>
              <span className="text-sm font-bold" style={{ color: "#B0E4CC" }}>${orderTotal.toFixed(2)}</span>
            </div>
          </motion.div>
        )}

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="rounded-xl p-4 mb-8 text-left"
          style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)" }}
        >
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span style={{ color: "#6B7280" }}>Status</span>
              <span className="font-medium" style={{ color: "#408A71" }}>Processing</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6B7280" }}>Est. Delivery</span>
              <span className="font-medium" style={{ color: "#FFFFFF" }}>2-5 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "#6B7280" }}>Shipping</span>
              <span className="font-medium" style={{ color: "#FFFFFF" }}>Free Express</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold transition-all"
            style={{ backgroundColor: "#1B3E33", color: "#FFFFFF", border: "1px solid rgba(64,138,113,0.3)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#408A71";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(64,138,113,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1B3E33";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "#408A71" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

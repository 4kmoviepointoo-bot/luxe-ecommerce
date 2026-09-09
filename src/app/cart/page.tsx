"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Check, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const PROMO_CODES: Record<string, { discount: number; type: "percent" | "fixed" }> = {
  LUXE20: { discount: 20, type: "percent" },
  SAVE10: { discount: 10, type: "percent" },
  FREESHIP: { discount: 0, type: "fixed" },
};

const SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 12.99;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = appliedPromo && PROMO_CODES[appliedPromo]
    ? PROMO_CODES[appliedPromo].type === "percent"
      ? subtotal * (PROMO_CODES[appliedPromo].discount / 100)
      : PROMO_CODES[appliedPromo].discount
    : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + shipping + tax;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-10" style={{ backgroundColor: "#081814" }}>
      <div className="max-w-lg mx-auto px-4 sm:px-6 pt-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>Cart</h1>
            <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
          </div>
          {items.length > 0 && (
            <button onClick={clearCart} className="text-xs transition-colors" style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Clear All
            </button>
          )}
        </motion.div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="h-20 w-20 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.2)" }}>
              <ShoppingBag className="h-8 w-8" style={{ color: "rgba(64,138,113,0.4)" }} />
            </div>
            <p className="text-sm mb-2" style={{ color: "#FFFFFF" }}>Your cart is empty</p>
            <p className="text-xs mb-5" style={{ color: "#6B7280" }}>Add some items to get started.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
              style={{ color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.3)", backgroundColor: "rgba(64,138,113,0.05)" }}
            >
              <ArrowLeft className="h-3 w-3" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Cart Items */}
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.productId}-${item.color}-${item.size}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)" }}
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg flex items-center justify-center shrink-0 overflow-hidden" style={{ backgroundColor: "#0D2820" }}>
                    <Image src={item.image} alt={item.title} width={56} height={56} quality={80} className="object-contain" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-1" style={{ color: "#FFFFFF" }}>{item.title}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
                      {item.color && <span style={{ color: "#9CA3AF" }}>Color: </span>}
                      {item.size && item.size !== "One Size" && <span style={{ color: "#9CA3AF" }}>Size: {item.size}</span>}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "#408A71" }}>${item.price} each</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                        className="h-7 w-7 rounded-md flex items-center justify-center transition-colors"
                        style={{ backgroundColor: "#0D2820", border: "1px solid rgba(64,138,113,0.15)", color: "#6B7280" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(64,138,113,0.3)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(64,138,113,0.15)")}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-medium w-6 text-center" style={{ color: "#FFFFFF" }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                        className="h-7 w-7 rounded-md flex items-center justify-center transition-colors"
                        style={{ backgroundColor: "#0D2820", border: "1px solid rgba(64,138,113,0.15)", color: "#6B7280" }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(64,138,113,0.3)")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(64,138,113,0.15)")}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId, item.color, item.size)}
                      className="transition-colors"
                      style={{ color: "#6B7280" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-bold" style={{ color: "#B0E4CC" }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Promo Code */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="h-3.5 w-3.5" style={{ color: "#408A71" }} />
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#408A71" }}>Promo Code</span>
              </div>
              {appliedPromo ? (
                <div className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ backgroundColor: "rgba(64,138,113,0.1)", border: "1px solid rgba(64,138,113,0.2)" }}>
                  <div className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5" style={{ color: "#408A71" }} />
                    <span className="text-xs font-medium" style={{ color: "#B0E4CC" }}>{appliedPromo}</span>
                    <span className="text-[10px]" style={{ color: "#6B7280" }}>
                      {PROMO_CODES[appliedPromo]?.type === "percent"
                        ? `-${PROMO_CODES[appliedPromo].discount}%`
                        : `-$${PROMO_CODES[appliedPromo].discount}`}
                    </span>
                  </div>
                  <button onClick={handleRemovePromo} className="transition-colors" style={{ color: "#6B7280" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Enter code"
                    className="flex-1 rounded-lg px-3 py-2.5 text-xs outline-none transition-all"
                    style={{ backgroundColor: "#081914", border: "1px solid rgba(64,138,113,0.15)", color: "#F7F7F3" }}
                    onFocus={(e) => (e.target.style.borderColor = "#408A71")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(64,138,113,0.15)")}
                    onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2.5 rounded-lg text-xs font-semibold transition-all"
                    style={{ backgroundColor: "#1B3E33", color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.3)" }}
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="text-[10px] mt-2" style={{ color: "#EF4444" }}>{promoError}</p>
              )}
              <p className="text-[10px] mt-2" style={{ color: "#6B7280" }}>Try: LUXE20, SAVE10, FREESHIP</p>
            </div>

            {/* Order Summary */}
            <div className="rounded-xl p-4" style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)" }}>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#408A71" }}>Order Summary</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>Subtotal ({itemCount} items)</span>
                  <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#408A71" }}>Discount ({appliedPromo})</span>
                    <span className="text-xs font-medium" style={{ color: "#408A71" }}>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>Shipping</span>
                  <span className="text-xs font-medium" style={{ color: shipping === 0 ? "#408A71" : "#FFFFFF" }}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-[10px]" style={{ color: "#6B7280" }}>
                    Free shipping on orders over ${SHIPPING_THRESHOLD}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>Tax (8%)</span>
                  <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 mt-3" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>Total</span>
                    <span className="text-lg font-bold" style={{ color: "#B0E4CC" }}>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full rounded-xl py-3 text-center text-sm font-semibold mt-4 transition-all"
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
                Proceed to Checkout
              </Link>
            </div>

            {/* Continue Shopping */}
            <div className="text-center pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: "#408A71" }}
              >
                <ArrowLeft className="h-3 w-3" />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

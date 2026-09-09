"use client";

import { motion, type Variants } from "framer-motion";
import { Star, Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const infoReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ProductShowcase() {
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has("hero-showcase");

  const handleAddToCart = () => {
    if (addedToCart) return;
    addItem(
      {
        productId: "showcase-1",
        title: "Minimal Leather Tote",
        price: 289,
        image: "",
        color: "#1a1a1a",
        size: "One Size",
      },
      1
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  return (
    <motion.div
      className="relative w-[300px] sm:w-[340px] lg:w-[380px] group cursor-pointer"
      whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      <div className="relative rounded-3xl overflow-hidden bg-[#0A1613] border border-[#18362D] shadow-md transition-shadow duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Image area */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-[#050D0B] via-[#0A1613] to-[#050D0B] overflow-hidden">
          {/* Inner radial spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(64,138,113,0.08)_0%,_transparent_70%)]" />
          {/* Floor reflection glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[35%] bg-[#408A71]/8 rounded-full blur-[50px]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-40 h-48 sm:w-48 sm:h-56 rounded-2xl bg-gradient-to-br from-white/6 to-white/2 shadow-lg" />
              <div className="absolute -bottom-2 -right-2 w-40 h-48 sm:w-48 sm:h-56 rounded-2xl border border-white/5" />
            </div>
          </div>

          {/* Badge — top left */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-[#194034]/90 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold text-[#A2E2C9] tracking-wide uppercase shadow-lg">
              New Arrival
            </span>
          </motion.div>

          {/* Discount — top right */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-amber-500/90 px-2.5 py-1 text-[11px] font-bold text-[#0A1613] tracking-wide shadow-lg">
              -17%
            </span>
          </motion.div>

          {/* Wishlist — below discount */}
          <motion.button
            onClick={async (e) => { e.preventDefault(); e.stopPropagation(); await toggle("hero-showcase"); }}
            className="absolute top-14 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg transition-colors text-white/70 hover:text-[#B0E4CC]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className="h-4.5 w-4.5"
              fill={isWishlisted ? "currentColor" : "none"}
              color={isWishlisted ? "#B0E4CC" : undefined}
            />
          </motion.button>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info — staggered reveal */}
        <motion.div
          className="p-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {/* Category */}
          <motion.span variants={infoReveal} className="text-[10px] font-semibold uppercase tracking-widest text-[#529E84] mb-1 block">
            Accessories
          </motion.span>

          {/* Title */}
          <motion.h3
            variants={infoReveal}
            className="text-base font-medium text-white mb-1.5"
          >
            Minimal Leather Tote
          </motion.h3>

          {/* Rating */}
          <motion.div variants={infoReveal} className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-xs text-white/40">
              4.9 (2.4k)
            </span>
          </motion.div>

          {/* Color dots */}
          <motion.div variants={infoReveal} className="flex items-center gap-1.5 mb-3">
            {["#1a1a1a", "#8B7355", "#D4A574", "#F5F5DC"].map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-white/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </motion.div>

          {/* Price */}
          <motion.div variants={infoReveal} className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-[#36D399]">
              $289
            </span>
            <span className="text-sm text-[#6B7280] line-through">
              $349
            </span>
          </motion.div>

          {/* Add to Cart */}
          <motion.button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(); }}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-300 ${
              addedToCart
                ? "bg-[#36D399] text-[#0A1613]"
                : "bg-[#1B3E33] text-white hover:bg-[#255244] hover:shadow-[0_0_20px_rgba(27,62,51,0.4)]"
            }`}
            whileHover={{ scale: addedToCart ? 1 : 1.02 }}
            whileTap={{ scale: addedToCart ? 1 : 0.98 }}
          >
            {addedToCart ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-[#408A71]/8 rounded-[50%] blur-xl group-hover:w-[90%] transition-all duration-500" />
    </motion.div>
  );
}

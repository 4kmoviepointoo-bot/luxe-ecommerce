"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const isWishlisted = has(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (addedToCart) return;
    addItem(
      {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        color: product.colors[0],
        size: product.sizes[0],
      },
      1
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggle(product.id);
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <motion.div
        layout
        layoutId={`card-${product.id}`}
        className="relative flex flex-col rounded-2xl overflow-hidden bg-[#0A1613] border border-[#18362D] shadow-md transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover:border-[#285A48]/50"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        tabIndex={0}
      >
        {/* ─── Full-Bleed Image Frame ─── */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden">
          {/* Product image */}
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={250}
            quality={75}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent && !parent.querySelector(".mockup-fallback")) {
                const fallback = document.createElement("div");
                fallback.className = "mockup-fallback absolute inset-0 flex items-center justify-center flex-col gap-2";
                fallback.innerHTML = `<div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald/10 to-transparent border border-emerald/15" /><span class="text-[9px] text-emerald/30">No Image</span>`;
                parent.appendChild(fallback);
              }
            }}
          />

          {/* Bottom gradient blend */}
          <div className="absolute bottom-0 inset-x-0 z-[1] h-12 bg-gradient-to-t from-[#0A1613] via-[#0A1613]/60 to-transparent" />

          {/* Top ambient glow */}
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-emerald/5 via-transparent to-transparent pointer-events-none" />

          {/* Badge — top left */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center rounded-full bg-[#194034]/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-semibold text-[#B0E4CC] tracking-wide uppercase shadow-md border border-emerald/20">
              {product.badge}
            </span>
          )}

          {/* Discount badge — top right */}
          <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center rounded-full bg-[#D97706]/90 px-2 py-0.5 text-[9px] font-bold text-black tracking-wide shadow-md">
            -{discount}%
          </span>

          {/* Wishlist button */}
          <motion.button
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 mt-8 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg transition-colors hover:bg-black/60"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className="h-3.5 w-3.5 transition-colors"
              fill={isWishlisted ? "#B0E4CC" : "none"}
              color={isWishlisted ? "#B0E4CC" : "rgba(255,255,255,0.6)"}
            />
          </motion.button>
        </div>

        {/* Content — compact padding */}
        <div className="p-3 sm:p-4 flex flex-col">
          {/* Category */}
          <span className="text-[9px] font-semibold uppercase tracking-widest text-[#529E84]">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="mt-1 text-sm font-semibold text-white line-clamp-1">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-2.5 w-2.5 ${
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-white/10 text-white/10"
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] text-white/40">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5 mt-auto pt-2">
            <span className="text-sm font-bold text-[#36D399] whitespace-nowrap">
              ${product.price}
            </span>
            <span className="text-[10px] text-[#6B7280] line-through whitespace-nowrap">
              ${product.originalPrice}
            </span>
          </div>

          {/* Add to Cart — compact pill */}
          <motion.button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-all duration-300 mt-2 ${
              addedToCart
                ? "bg-[#36D399] text-[#0A1613]"
                : "bg-[#1B3E33] text-white hover:bg-[#255244]"
            }`}
            whileHover={{ scale: addedToCart ? 1 : 1.02 }}
            whileTap={{ scale: addedToCart ? 1 : 0.98 }}
          >
            {addedToCart ? (
              <>
                <Check className="h-3 w-3" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-3 w-3" />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}

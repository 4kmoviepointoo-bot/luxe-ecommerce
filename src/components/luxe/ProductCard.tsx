"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useFlyToCart } from "@/context/FlyToCartContext";

export default function ProductCard({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { triggerFly } = useFlyToCart();
  const isWishlisted = has(product.id);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAdding || isAdded) return;

      addItem({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        color: product.colors[0],
        size: product.sizes[0],
      }, 1);

      if (cardRef.current) {
        triggerFly({
          id: product.id,
          image: product.image,
          startRect: cardRef.current.getBoundingClientRect(),
        });
      }

      setIsAdding(true);
      setTimeout(() => { setIsAdding(false); setIsAdded(true); }, 1000);
      setTimeout(() => { setIsAdded(false); }, 2800);
    },
    [isAdding, isAdded, addItem, product, triggerFly]
  );

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
      <div
        ref={cardRef}
        className="relative flex flex-col rounded-2xl overflow-hidden bg-card border border-border-custom shadow-md transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] group-hover:border-emerald/20 group-hover:-translate-y-0.5"
        tabIndex={0}
      >
        {/* Image */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden">
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 bg-gradient-to-br from-bg-deep via-surface to-bg-deep">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald/10 to-transparent border border-emerald/15" />
              <span className="text-[9px] text-emerald/30">No Image</span>
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={250}
              quality={80}
              loading="lazy"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}

          <div className="absolute bottom-0 inset-x-0 z-[1] h-12 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-emerald/5 via-transparent to-transparent pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1.5">
            {product.badge && (
              <span className="inline-flex items-center rounded-full bg-deep-green/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-semibold text-mint tracking-wide uppercase shadow-md border border-emerald/20">
                {product.badge}
              </span>
            )}
          </div>

          <span className="absolute top-2.5 right-2.5 z-10 inline-flex items-center rounded-full bg-gold/90 px-2 py-0.5 text-[9px] font-bold text-bg-deep tracking-wide shadow-md">
            -{discount}%
          </span>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-2.5 right-2.5 mt-8 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg transition-all hover:bg-black/60 hover:scale-110 active:scale-90"
          >
            <Heart
              className={`h-3.5 w-3.5 transition-colors ${
                isWishlisted ? "text-emerald fill-emerald" : "text-luxe-white/60"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-emerald/80">
            {product.category}
          </span>
          <h3 className="mt-1 text-sm font-semibold text-luxe-white line-clamp-1">
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
                      ? "fill-star text-star"
                      : "fill-white/10 text-white/10"
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] text-muted">
              {product.rating} ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Colors */}
          <div className="flex items-center gap-1 mt-2">
            {product.colors.map((c) => (
              <span
                key={c}
                className="h-3 w-3 rounded-full border border-white/10"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center gap-1.5 mt-auto pt-2">
            <span className="text-sm font-bold text-emerald">${product.price}</span>
            <span className="text-[10px] text-muted line-through">${product.originalPrice}</span>
          </div>

          {/* Add to Cart */}
          <div className="mt-2 h-8 relative">
            {!isAdding && !isAdded && (
              <button
                onClick={handleAddToCart}
                className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-deep-green text-luxe-white text-xs font-semibold hover:bg-emerald/80 hover:text-bg-deep transition-all duration-200 active:scale-95"
              >
                <ShoppingCart className="h-3.5 w-3.5" />
                Add to Cart
              </button>
            )}

            {isAdding && (
              <div className="w-full h-8 flex items-center justify-center">
                <div className="flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-full animate-pulse">
                  <ShoppingCart className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            )}

            {isAdded && (
              <div className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-emerald text-bg-deep text-xs font-semibold">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                Added to Cart
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

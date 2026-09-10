"use client";

import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  ShoppingCart,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  ChevronRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useFlyToCart } from "@/context/FlyToCartContext";

const TABS = ["Description", "Specifications", "Customer Reviews"] as const;
type Tab = (typeof TABS)[number];

const SPECS: Record<string, string[]> = {
  watches: [
    "Movement: Swiss Automatic",
    "Case Material: 316L Stainless Steel / Titanium",
    "Crystal: Sapphire with Anti-Reflective Coating",
    "Water Resistance: 100m / 330ft",
    "Case Diameter: 40mm",
    "Strap: Genuine Italian Leather",
    "Warranty: 2-Year International",
  ],
  perfumes: [
    "Fragrance Family: Oriental Woody",
    "Top Notes: Bergamot, Black Pepper",
    "Heart Notes: Oud, Amber, Rose",
    "Base Notes: Sandalwood, Vanilla, Musk",
    "Concentration: Eau de Parfum",
    "Volume Options: 50ml / 100ml",
    "Longevity: 8-12 Hours",
  ],
  bags: [
    "Material: Full-Grain Italian Leather",
    "Lining: Premium Suede Interior",
    "Hardware: Gold-Tone Brass",
    "Closure: Magnetic Snap",
    "Pockets: 2 Interior, 1 Exterior",
    "Strap Drop: 22cm (Adjustable)",
    "Dimensions: 35 x 28 x 12 cm",
  ],
  accessories: [
    "Material: Premium Grade A",
    "Origin: Italian Craftsmanship",
    "Finish: Polished / Brushed",
    "Dimensions: Standard",
    "Weight: Lightweight",
    "Packaging: Luxury Gift Box",
    "Warranty: 1-Year Manufacturer",
  ],
};

const REVIEWS = [
  {
    name: "Alexander M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely stunning piece. The craftsmanship is exceptional and it arrived in beautiful packaging. Worth every penny.",
    verified: true,
  },
  {
    name: "Sofia L.",
    rating: 5,
    date: "1 month ago",
    text: "Bought this as a gift for my husband and he loves it. The quality is evident from the moment you open the box.",
    verified: true,
  },
  {
    name: "James R.",
    rating: 4,
    date: "3 weeks ago",
    text: "Great product overall. Shipping was fast and the item matched the description perfectly. Highly recommend.",
    verified: true,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const product = PRODUCTS.find((p) => p.id === id);

  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("Description");
  const [activeImage, setActiveImage] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReviews, setUserReviews] = useState<{ name: string; rating: number; date: string; text: string; verified: boolean }[]>([]);
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { triggerFly } = useFlyToCart();
  const addBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`reviews-${id}`);
      if (stored) setUserReviews(JSON.parse(stored));
    } catch {}
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#081814" }}>
        <div className="text-center">
          <div className="h-20 w-20 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.2)" }}>
            <ShoppingBag className="h-8 w-8" style={{ color: "#408A71" }} />
          </div>
          <p className="text-sm mb-4" style={{ color: "#6B7280" }}>Product not found</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "#408A71" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = has(product.id);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const specs = SPECS[product.category] || SPECS.accessories;

  const thumbnails = useMemo(
    () => [0, 1, 2, 3].map(() => product.image),
    [product.image]
  );

  const handleAddToCart = useCallback(() => {
    if (isAdding || isAdded) return;
    for (let i = 0; i < quantity; i++) {
      addItem(
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          color: product.colors[selectedColor],
          size: product.sizes[selectedSize],
        },
        1
      );
    }

    if (addBtnRef.current) {
      triggerFly({
        id: product.id,
        image: product.image,
        startRect: addBtnRef.current.getBoundingClientRect(),
      });
    }

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setIsAdded(true);
    }, 1000);
    setTimeout(() => {
      setIsAdded(false);
    }, 2800);
  }, [isAdding, isAdded, quantity, addItem, product, selectedColor, selectedSize, triggerFly]);

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          color: product.colors[selectedColor],
          size: product.sizes[selectedSize],
        },
        1
      );
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-10" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-5 pb-3">
        <nav className="flex items-center gap-1.5 text-[11px] overflow-x-auto no-scrollbar" style={{ color: "#408A71" }}>
          <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
          <Link href="/shop" className="hover:opacity-80 transition-opacity shrink-0">
            Products
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
          <Link
            href={`/${product.category}`}
            className="hover:opacity-80 transition-opacity capitalize shrink-0"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
          <span className="truncate opacity-60">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
          {/* ─── Left: Image Gallery ─── */}
          <div className="flex-1 max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
              style={{
                backgroundColor: "#0A1613",
                border: "1px solid rgba(64,138,113,0.15)",
              }}
            >
              {/* Spotlight background */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(64,138,113,0.12) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 40%, rgba(176,228,204,0.04) 0%, transparent 50%)",
                }}
              />

              {/* Product image */}
              <div className="relative flex items-center justify-center h-full w-full p-10 sm:p-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      quality={80}
                      priority
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Badges */}
              <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
                {product.badge && (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-wide uppercase backdrop-blur-sm"
                    style={{
                      backgroundColor: "rgba(27,62,51,0.9)",
                      color: "#B0E4CC",
                      border: "1px solid rgba(64,138,113,0.3)",
                    }}
                  >
                    <Sparkles className="h-3 w-3" />
                    {product.badge}
                  </span>
                )}
                <span
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-[10px] font-bold backdrop-blur-sm"
                  style={{
                    backgroundColor: "rgba(216,169,74,0.9)",
                    color: "#091413",
                  }}
                >
                  -{discount}%
                </span>
              </div>

              {/* Actions */}
              <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
                <motion.button
                  onClick={async () => await toggle(product.id)}
                  className="flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm shadow-lg transition-all"
                  style={{
                    backgroundColor: "rgba(8,24,20,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`h-[18px] w-[18px] transition-colors ${
                      isWishlisted ? "fill-[#B0E4CC] text-[#B0E4CC]" : "text-white/50"
                    }`}
                  />
                </motion.button>
                <button
                  className="flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm shadow-lg transition-all hover:bg-white/10"
                  style={{
                    backgroundColor: "rgba(8,24,20,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Share2 className="h-[18px] w-[18px] text-white/50" />
                </button>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-4">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                    activeImage === i
                      ? "ring-2 ring-[#408A71] ring-offset-2 ring-offset-[#081814]"
                      : "hover:opacity-80"
                  }`}
                  style={{
                    backgroundColor: "#0A1613",
                    border: `1px solid ${activeImage === i ? "#408A71" : "rgba(64,138,113,0.15)"}`,
                  }}
                >
                  <div className="relative w-full h-full p-2">
                    <Image
                      src={img}
                      alt={`${product.title} view ${i + 1}`}
                      fill
                      quality={60}
                      className="object-contain"
                      sizes="100px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ─── Right: Product Info ─── */}
          <div className="flex-1 max-w-xl lg:max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="lg:sticky lg:top-28"
            >
              {/* Category */}
              <span
                className="text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{ color: "#408A71" }}
              >
                {product.category}
              </span>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[42px] font-bold mt-3 leading-[1.1]"
                style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
              >
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-[18px] w-[18px] ${
                        i < Math.floor(product.rating)
                          ? "fill-[#D8A94A] text-[#D8A94A]"
                          : "fill-white/10 text-white/10"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                  {product.rating}
                </span>
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-6">
                <span className="text-4xl sm:text-5xl font-bold" style={{ color: "#B0E4CC" }}>
                  ${product.price}
                </span>
                <span className="text-lg line-through" style={{ color: "#6B7280" }}>
                  ${product.originalPrice}
                </span>
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(64,138,113,0.15)",
                    color: "#408A71",
                  }}
                >
                  Save ${product.originalPrice - product.price}
                </span>
              </div>

              {/* Divider */}
              <div className="my-6" style={{ height: "1px", backgroundColor: "rgba(64,138,113,0.15)" }} />

              {/* Colors */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#6B7280" }}>
                  Color
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(i)}
                      className="h-10 w-10 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: c,
                        border: `3px solid ${selectedColor === i ? "#408A71" : "rgba(255,255,255,0.1)"}`,
                        boxShadow: selectedColor === i ? "0 0 16px rgba(64,138,113,0.4)" : "none",
                        transform: selectedColor === i ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              {product.sizes.length > 1 && (
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#6B7280" }}>
                    Size
                  </p>
                  <div className="flex items-center gap-2.5">
                    {product.sizes.map((s, i) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(i)}
                        className="min-w-[52px] h-11 rounded-xl text-xs font-semibold transition-all duration-300"
                        style={{
                          backgroundColor: selectedSize === i ? "#408A71" : "#0A1613",
                          color: selectedSize === i ? "#091413" : "#6B7280",
                          border: `1px solid ${selectedSize === i ? "#408A71" : "rgba(64,138,113,0.2)"}`,
                          boxShadow: selectedSize === i ? "0 0 16px rgba(64,138,113,0.3)" : "none",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                {/* Quantity */}
                <div
                  className="flex items-center rounded-xl overflow-hidden shrink-0"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid rgba(64,138,113,0.2)",
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-white/5"
                    style={{ color: "#6B7280" }}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span
                    className="flex h-12 w-12 items-center justify-center text-sm font-bold"
                    style={{ color: "#FFFFFF" }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-12 w-12 items-center justify-center transition-colors hover:bg-white/5"
                    style={{ color: "#6B7280" }}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <div className="flex-1 relative h-12" ref={addBtnRef}>
                  <AnimatePresence mode="wait">
                    {!isAdding && !isAdded && (
                      <motion.button
                        key="default"
                        onClick={handleAddToCart}
                        className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl text-sm font-semibold"
                        style={{
                          backgroundColor: "#1B3E33",
                          color: "#FFFFFF",
                          border: "1px solid rgba(64,138,113,0.3)",
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </motion.button>
                    )}

                    {isAdding && (
                      <motion.div
                        key="adding"
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="flex items-center justify-center gap-3 bg-black text-white px-10 py-3 rounded-full relative overflow-visible"
                          initial={{ width: "100%", borderRadius: "0.75rem" }}
                          animate={{ width: "auto", borderRadius: "9999px" }}
                          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                          >
                            <ShoppingCart className="h-5 w-5 text-white" />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}

                    {isAdded && (
                      <motion.div
                        key="success"
                        className="w-full h-12 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: "#408A71", color: "#091413" }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as const }}
                        >
                          <Check className="h-4 w-4" strokeWidth={3} />
                        </motion.div>
                        Added to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Buy Now */}
              <motion.button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl h-12 text-sm font-bold mt-3 transition-all duration-300"
                style={{
                  backgroundColor: "#B0E4CC",
                  color: "#091413",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(176,228,204,0.25)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="h-4 w-4" />
                Buy Now — ${product.price * quantity}
              </motion.button>

              {/* Trust badges */}
              <div
                className="rounded-2xl p-4 mt-6"
                style={{
                  backgroundColor: "#0A1613",
                  border: "1px solid rgba(64,138,113,0.15)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Truck,
                      title: "Free Express Shipping",
                      sub: "2-4 Business Days",
                    },
                    {
                      icon: ShieldCheck,
                      title: "2-Year Warranty",
                      sub: "Official Brand Coverage",
                    },
                    {
                      icon: RotateCcw,
                      title: "30-Day Returns",
                      sub: "Hassle-Free Policy",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div
                        className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "rgba(64,138,113,0.1)",
                          border: "1px solid rgba(64,138,113,0.15)",
                        }}
                      >
                        <item.icon className="h-4 w-4" style={{ color: "#408A71" }} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold" style={{ color: "#FFFFFF" }}>
                          {item.title}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="mt-8">
                <div
                  className="flex gap-1 p-1 rounded-xl"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid rgba(64,138,113,0.15)",
                  }}
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="flex-1 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: activeTab === tab ? "rgba(64,138,113,0.15)" : "transparent",
                        color: activeTab === tab ? "#408A71" : "#6B7280",
                        border: activeTab === tab ? "1px solid rgba(64,138,113,0.25)" : "1px solid transparent",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5"
                  >
                    {activeTab === "Description" && (
                      <div className="space-y-4">
                        <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                          {product.description}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                          Every detail has been meticulously crafted to deliver an unparalleled luxury experience. From the premium materials to the signature finishing touches, this piece embodies timeless elegance and modern sophistication.
                        </p>
                        <div
                          className="rounded-xl p-4 mt-4"
                          style={{
                            backgroundColor: "rgba(64,138,113,0.05)",
                            border: "1px solid rgba(64,138,113,0.1)",
                          }}
                        >
                          <p className="text-xs leading-relaxed" style={{ color: "#408A71" }}>
                            ✦ Handcrafted with premium materials
                          </p>
                          <p className="text-xs leading-relaxed mt-1" style={{ color: "#408A71" }}>
                            ✦ Authenticity guaranteed with serial number
                          </p>
                          <p className="text-xs leading-relaxed mt-1" style={{ color: "#408A71" }}>
                            ✦ Luxury gift packaging included
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === "Specifications" && (
                      <div className="space-y-0">
                        {specs.map((spec, i) => (
                          <div
                            key={spec}
                            className="flex items-center justify-between py-3"
                            style={{
                              borderBottom: i < specs.length - 1 ? "1px solid rgba(64,138,113,0.1)" : "none",
                            }}
                          >
                            <span className="text-xs" style={{ color: "#6B7280" }}>
                              {spec.split(":")[0]}
                            </span>
                            <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>
                              {spec.split(":").slice(1).join(":").trim()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "Customer Reviews" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                                {product.rating}
                              </span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating)
                                        ? "fill-[#D8A94A] text-[#D8A94A]"
                                        : "fill-white/10 text-white/10"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                              Based on {(product.reviews + userReviews.length).toLocaleString()} reviews
                            </p>
                          </div>
                          <button
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300"
                            style={{
                              backgroundColor: showReviewForm ? "rgba(64,138,113,0.25)" : "rgba(64,138,113,0.1)",
                              color: "#408A71",
                              border: "1px solid rgba(64,138,113,0.3)",
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>
                            </svg>
                            {showReviewForm ? "Cancel" : "Write a Review"}
                          </button>
                        </div>

                        {/* Review Form */}
                        <AnimatePresence>
                          {showReviewForm && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div
                                className="rounded-2xl p-5 mb-4"
                                style={{
                                  backgroundColor: "#0A1613",
                                  border: "1px solid rgba(64,138,113,0.2)",
                                }}
                              >
                                <h4 className="text-sm font-semibold mb-4" style={{ color: "#FFFFFF" }}>
                                  Share Your Experience
                                </h4>

                                {/* Star Rating */}
                                <div className="mb-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B7280" }}>
                                    Your Rating
                                  </p>
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        onClick={() => setReviewRating(star)}
                                        className="transition-transform hover:scale-110"
                                      >
                                        <Star
                                          className={`h-6 w-6 transition-colors ${
                                            star <= reviewRating
                                              ? "fill-[#D8A94A] text-[#D8A94A]"
                                              : "fill-white/10 text-white/10 hover:fill-white/20"
                                          }`}
                                        />
                                      </button>
                                    ))}
                                    <span className="ml-2 text-xs" style={{ color: "#6B7280" }}>
                                      {reviewRating}/5
                                    </span>
                                  </div>
                                </div>

                                {/* Name */}
                                <div className="mb-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B7280" }}>
                                    Your Name
                                  </p>
                                  <input
                                    type="text"
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    placeholder="e.g. John D."
                                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                                    style={{
                                      backgroundColor: "#081814",
                                      border: "1px solid rgba(64,138,113,0.2)",
                                      color: "#FFFFFF",
                                    }}
                                  />
                                </div>

                                {/* Review Text */}
                                <div className="mb-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#6B7280" }}>
                                    Your Review
                                  </p>
                                  <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Tell us what you think about this product..."
                                    rows={4}
                                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                                    style={{
                                      backgroundColor: "#081814",
                                      border: "1px solid rgba(64,138,113,0.2)",
                                      color: "#FFFFFF",
                                    }}
                                  />
                                </div>

                                {/* Submit */}
                                <button
                                  onClick={() => {
                                    if (!reviewName.trim() || !reviewText.trim()) return;
                                    const newReview = {
                                      name: reviewName.trim(),
                                      rating: reviewRating,
                                      date: "Just now",
                                      text: reviewText.trim(),
                                      verified: false,
                                    };
                                    const updated = [newReview, ...userReviews];
                                    setUserReviews(updated);
                                    localStorage.setItem(`reviews-${id}`, JSON.stringify(updated));
                                    setReviewName("");
                                    setReviewText("");
                                    setReviewRating(5);
                                    setShowReviewForm(false);
                                  }}
                                  disabled={!reviewName.trim() || !reviewText.trim()}
                                  className="w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                  style={{
                                    backgroundColor: reviewName.trim() && reviewText.trim() ? "#408A71" : "rgba(64,138,113,0.2)",
                                    color: reviewName.trim() && reviewText.trim() ? "#091413" : "#6B7280",
                                  }}
                                >
                                  Submit Review
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div
                          style={{
                            height: "1px",
                            backgroundColor: "rgba(64,138,113,0.1)",
                          }}
                        />

                        {/* User Reviews */}
                        {userReviews.map((review, i) => (
                          <div
                            key={`user-${i}`}
                            className="py-4"
                            style={{
                              borderBottom: i < userReviews.length - 1 || REVIEWS.length > 0 ? "1px solid rgba(64,138,113,0.1)" : "none",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                                  style={{
                                    backgroundColor: "rgba(216,169,74,0.15)",
                                    color: "#D8A94A",
                                  }}
                                >
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>
                                    {review.name}
                                    <span
                                      className="ml-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                                      style={{
                                        backgroundColor: "rgba(216,169,74,0.15)",
                                        color: "#D8A94A",
                                      }}
                                    >
                                      New
                                    </span>
                                  </p>
                                  <p className="text-[10px]" style={{ color: "#6B7280" }}>
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${
                                      j < review.rating
                                        ? "fill-[#D8A94A] text-[#D8A94A]"
                                        : "fill-white/10 text-white/10"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs mt-3 leading-relaxed" style={{ color: "#9CA3AF" }}>
                              {review.text}
                            </p>
                          </div>
                        ))}

                        {/* Default Reviews */}
                        {REVIEWS.map((review, i) => (
                          <div
                            key={`default-${i}`}
                            className="py-4"
                            style={{
                              borderBottom: i < REVIEWS.length - 1 ? "1px solid rgba(64,138,113,0.1)" : "none",
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                                  style={{
                                    backgroundColor: "rgba(64,138,113,0.15)",
                                    color: "#408A71",
                                  }}
                                >
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>
                                    {review.name}
                                    {review.verified && (
                                      <span
                                        className="ml-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                                        style={{
                                          backgroundColor: "rgba(64,138,113,0.15)",
                                          color: "#408A71",
                                        }}
                                      >
                                        Verified
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-[10px]" style={{ color: "#6B7280" }}>
                                    {review.date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    className={`h-3 w-3 ${
                                      j < review.rating
                                        ? "fill-[#D8A94A] text-[#D8A94A]"
                                        : "fill-white/10 text-white/10"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs mt-3 leading-relaxed" style={{ color: "#9CA3AF" }}>
                              {review.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Complete The Look / Related Products ─── */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-20 lg:mt-28">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Complete The Look
              </motion.h2>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-10 h-0.5" style={{ backgroundColor: "#408A71" }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#408A71" }} />
                <div className="w-10 h-0.5" style={{ backgroundColor: "#408A71" }} />
              </div>
            </div>
            <Link
              href={`/${product.category}`}
              className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: "#408A71" }}
            >
              View All
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group block"
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid rgba(64,138,113,0.15)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(64,138,113,0.06) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      quality={75}
                      loading="lazy"
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                  {p.badge && (
                    <span
                      className="absolute top-2.5 left-2.5 z-20 inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-wide uppercase backdrop-blur-sm"
                      style={{
                        backgroundColor: "rgba(27,62,51,0.9)",
                        color: "#B0E4CC",
                        border: "1px solid rgba(64,138,113,0.2)",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3.5 px-0.5">
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "rgba(64,138,113,0.6)" }}
                  >
                    {p.category}
                  </p>
                  <h3
                    className="text-sm font-semibold mt-1.5 line-clamp-1 transition-colors group-hover:text-[#B0E4CC]"
                    style={{ color: "#FFFFFF" }}
                  >
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-bold" style={{ color: "#B0E4CC" }}>
                      ${p.price}
                    </span>
                    <span className="text-[10px] line-through" style={{ color: "#6B7280" }}>
                      ${p.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to shop */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-14 lg:mt-20">
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full px-10 py-3.5 text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(64,138,113,0.15)]"
            style={{
              color: "#B0E4CC",
              border: "1px solid rgba(64,138,113,0.3)",
              backgroundColor: "rgba(64,138,113,0.05)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

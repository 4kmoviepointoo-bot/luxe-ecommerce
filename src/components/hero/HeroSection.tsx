"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Truck, RotateCcw, Headphones, Star } from "lucide-react";
import ProductShowcase from "./ProductShowcase";

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.5 },
  },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      delay: i * 0.08,
    },
  }),
};

const TRUST_ITEMS = [
  { icon: Shield, title: "Premium Quality", subtitle: "Finest materials & craftsmanship" },
  { icon: Truck, title: "Free Shipping", subtitle: "On all orders over $99" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", subtitle: "We're here to help" },
];

const CATEGORIES = [
  { name: "All", icon: "✦" },
  { name: "Watches", icon: "⌚" },
  { name: "Perfumes", icon: "✿" },
  { name: "Bags", icon: "👜" },
  { name: "Accessories", icon: "✦" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const productY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const productRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const headlineWords = ["Redefine", "Your", "Style"];

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Deep radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#081814] via-[#050D0B] to-[#020605]" />

      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#408A71]/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#285A48]/15 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] gap-12 lg:gap-8 pt-24 pb-16">
          {/* Left: Text content */}
          <motion.div
            className="flex-1 max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#194034]/60 border border-[#285A48]/40 px-4 py-1.5 text-xs font-medium text-[#A2E2C9] tracking-wide uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                New Season 2026
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <h1 style={{ y: headlineY as never }} className="mb-6">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordReveal}
                  className={`inline-block mr-[0.3em] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] ${
                    i === 2
                      ? "text-shimmer"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              style={{ y: subtitleY as never }}
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/50 max-w-md leading-relaxed mb-10"
            >
              Curated luxury pieces crafted for the modern connoisseur.
              Timeless design meets uncompromising quality.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              style={{ y: ctaY as never }}
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="/products"
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#B0E4CC] px-8 py-3.5 text-sm font-semibold text-[#081814] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(176,228,204,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#B0E4CC] via-white/20 to-[#B0E4CC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2.5">
                  <span className="btn-shimmer">Shop Collection</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="/menu"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/8 hover:border-white/30 hover:text-white hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore Categories
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6"
            >
              {/* Avatar stack */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#081814] bg-gradient-to-br from-[#408A71] to-[#285A48] flex items-center justify-center text-[10px] font-medium text-white"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold text-white">10K+</p>
                  <p className="text-[11px] text-white/40">Happy Customers</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-white/10" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">4.9</p>
                  <p className="text-[11px] text-white/40">Average Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Product Showcase */}
          <motion.div
            variants={scaleIn}
            className="flex-1 flex justify-center lg:justify-end w-full max-w-lg"
          >
            <motion.div style={{ y: productY as never, rotate: productRotate as never }}>
              <ProductShowcase />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Trust Bar ─── */}
      <div className="border-t border-[#18362D]/50 bg-[#050D0B]/80">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="h-10 w-10 rounded-xl bg-[#194034]/60 border border-[#285A48]/40 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-[#529E84]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Shop By Category ─── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Shop By Category
          </motion.h2>
          <motion.a
            href="/products"
            className="text-sm font-medium text-[#529E84] hover:text-[#A2E2C9] transition-colors flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        <motion.div
          className="flex gap-3 overflow-x-auto scrollbar-none pb-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.name}
              className={`shrink-0 flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                i === 0
                  ? "bg-[#194034] border-[#285A48] text-[#A2E2C9]"
                  : "bg-[#0A1613]/60 border-[#18362D] text-white/50 hover:border-[#285A48]/60 hover:text-white/70"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className="text-xs font-medium">{cat.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ─── Exclusive Banner ─── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16">
        <motion.div
          className="relative rounded-2xl bg-gradient-to-r from-[#194034] to-[#0F2E24] border border-[#285A48]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#B0E4CC]/5 rounded-full blur-[60px]" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="h-12 w-12 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
              <span className="text-2xl">🎁</span>
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#A2E2C9]">Exclusive For You</h3>
              <p className="text-sm text-white/50">Sign up and get 10% off your first order</p>
            </div>
          </div>

          <a
            href="/auth"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#B0E4CC] px-6 py-3 text-sm font-semibold text-[#081814] hover:shadow-[0_0_20px_rgba(176,228,204,0.3)] transition-all relative z-10"
          >
            Join Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

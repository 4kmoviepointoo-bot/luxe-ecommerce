"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const STATS = [
  {
    icon: Truck,
    label: "Free Worldwide Shipping",
    detail: "On orders over $150",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
    detail: "Dedicated concierge team",
  },
  {
    icon: ShieldCheck,
    label: "100% Secure Checkout",
    detail: "SSL encrypted payments",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const textReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function TrustBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative border-t border-white/10 bg-[#285A48]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex items-center gap-4 py-8 sm:py-10 sm:px-8 first:sm:pl-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg">
                <stat.icon className="h-5 w-5" />
              </div>
              <motion.div variants={textReveal}>
                <p className="text-sm font-semibold text-white">
                  {stat.label}
                </p>
                <p className="text-xs text-white/60 mt-0.5">
                  {stat.detail}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

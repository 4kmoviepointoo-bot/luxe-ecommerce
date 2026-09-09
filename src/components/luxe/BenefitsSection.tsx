"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Headphones } from "lucide-react";

const BENEFITS = [
  { icon: Shield, label: "Premium Quality", sub: "Finest materials & craftsmanship" },
  { icon: Truck, label: "Free Shipping", sub: "On all orders over $99" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
  { icon: Headphones, label: "24/7 Support", sub: "We're here to help" },
];

export default function BenefitsSection() {
  return (
    <div className="relative z-20 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-[#081914]/80 backdrop-blur-xl border border-emerald/15 shadow-[0_0_40px_rgba(139,232,167,0.05)] p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {BENEFITS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-start gap-3 ${
                  i < 3 ? "lg:border-r lg:border-emerald/10 lg:pr-6" : ""
                }`}
              >
                <div className="h-10 w-10 rounded-xl bg-emerald/10 border border-emerald/15 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-emerald" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F7F7F3]">{item.label}</p>
                  <p className="text-[11px] text-[#AEB8B3] mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

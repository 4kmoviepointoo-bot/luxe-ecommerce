"use client";

import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pb-16">
      <motion.div
        className="relative rounded-2xl bg-gradient-to-r from-[#0D2820]/80 to-[#081914]/80 backdrop-blur-xl border border-emerald/15 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-[50px]" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#D8A94A]/20 to-[#D8A94A]/5 border border-[#D8A94A]/20 flex items-center justify-center shrink-0">
            <Gift className="h-5 w-5 text-[#D8A94A]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-emerald">Exclusive For You</h3>
            <p className="text-[11px] text-[#AEB8B3]">Sign up and get 10% off your first order</p>
          </div>
        </div>

        <Link
          href="/signup"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-[#020908] hover:shadow-[0_0_20px_rgba(139,232,167,0.3)] hover:scale-[1.02] transition-all duration-300 relative z-10"
        >
          Join Now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}

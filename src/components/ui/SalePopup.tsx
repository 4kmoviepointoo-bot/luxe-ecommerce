"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function SalePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("sale-popup-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("sale-popup-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            className="relative w-full max-w-md rounded-3xl border border-emerald/30 bg-gradient-to-br from-[#020908] via-[#04110E] to-[#071612] p-8 shadow-[0_0_60px_rgba(139,232,167,0.15)]"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 rounded-full p-1.5 text-[#AEB8B3]/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald">
                Limited Time Offer
              </div>

              <h2 className="mb-2 text-5xl font-serif font-bold text-[#D8A94A]">30% OFF</h2>
              <p className="mb-1 text-lg text-[#F7F7F3]">Your First Order</p>
              <p className="mb-6 text-sm text-[#AEB8B3]">
                Use code <span className="font-bold text-emerald">LUXE30</span> at checkout
              </p>

              <a
                href="/shop"
                onClick={dismiss}
                className="block w-full rounded-full bg-emerald py-3.5 text-sm font-semibold text-[#020908] transition-all hover:shadow-[0_8px_30px_rgba(139,232,167,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Shop Now
              </a>

              <button
                onClick={dismiss}
                className="mt-3 text-xs text-[#AEB8B3]/50 hover:text-[#AEB8B3] transition-colors"
              >
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  ChevronRight,
  Check,
  Truck,
  MapPin,
  Clock,
  ArrowLeft,
} from "lucide-react";

const TRACKING_STEPS = [
  { label: "Order Placed", icon: Package, description: "Your order has been confirmed" },
  { label: "Processing", icon: Clock, description: "We're preparing your items" },
  { label: "Shipped", icon: Truck, description: "Package is on its way" },
  { label: "Out for Delivery", icon: MapPin, description: "Arriving today" },
  { label: "Delivered", icon: Check, description: "Successfully delivered" },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [tracking, setTracking] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;
    setIsSearching(true);
    // Simulate lookup
    setTimeout(() => {
      setTracking(2); // Show "Shipped" step as demo
      setIsSearching(false);
    }, 1200);
  };

  const activeStep = tracking ?? -1;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#091413" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#B0E4CC] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "#B0E4CC" }}>Track Order</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ backgroundColor: "#1B3E33", border: "1px solid rgba(64,138,113,0.3)" }}>
            <Package className="h-7 w-7" style={{ color: "#B0E4CC" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Track Your Order
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6B7280" }}>
            Enter your order details below to see real-time tracking information.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="max-w-lg mx-auto rounded-2xl p-6 sm:p-8 mb-10"
          style={{
            backgroundColor: "#0D2820",
            border: "1px solid rgba(64,138,113,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#AEB8B3" }}>
                Order ID
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#6B7280" }} />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. LUXE-8942"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  style={{
                    backgroundColor: "#091413",
                    border: "1px solid rgba(64,138,113,0.2)",
                    color: "#FFFFFF",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(64,138,113,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(64,138,113,0.2)")}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "#AEB8B3" }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                style={{
                  backgroundColor: "#091413",
                  border: "1px solid rgba(64,138,113,0.2)",
                  color: "#FFFFFF",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(64,138,113,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(64,138,113,0.2)")}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                backgroundColor: "#1B3E33",
                color: "#FFFFFF",
                border: "1px solid rgba(64,138,113,0.3)",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSearching ? (
                <motion.div
                  className="h-4 w-4 border-2 rounded-full"
                  style={{ borderColor: "#B0E4CC", borderTopColor: "transparent" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Track My Order
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Tracking Progress */}
        <AnimatePresence>
          {activeStep >= 0 && (
            <motion.div
              className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8"
              style={{
                backgroundColor: "#0D2820",
                border: "1px solid rgba(64,138,113,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                  Order {orderId || "LUXE-8942"}
                </h2>
                <span
                  className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(64,138,113,0.15)", color: "#408A71" }}
                >
                  {TRACKING_STEPS[activeStep].label}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative mt-6 mb-8">
                <div className="absolute top-3 left-0 right-0 h-0.5" style={{ backgroundColor: "rgba(64,138,113,0.15)" }} />
                <motion.div
                  className="absolute top-3 left-0 h-0.5"
                  style={{ backgroundColor: "#408A71" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeStep / (TRACKING_STEPS.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
                <div className="relative flex justify-between">
                  {TRACKING_STEPS.map((step, i) => {
                    const isActive = i <= activeStep;
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex flex-col items-center">
                        <motion.div
                          className="w-6 h-6 rounded-full flex items-center justify-center z-10"
                          style={{
                            backgroundColor: isActive ? "#408A71" : "#091413",
                            border: `2px solid ${isActive ? "#408A71" : "rgba(64,138,113,0.3)"}`,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.1, duration: 0.3, type: "spring" }}
                        >
                          <Icon className="h-3 w-3" style={{ color: isActive ? "#FFFFFF" : "#6B7280" }} />
                        </motion.div>
                        <span
                          className="mt-2 text-[9px] font-medium text-center hidden sm:block"
                          style={{ color: isActive ? "#B0E4CC" : "#6B7280" }}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step Details */}
              <motion.div
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ backgroundColor: "rgba(64,138,113,0.08)", border: "1px solid rgba(64,138,113,0.1)" }}
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#1B3E33" }}>
                  {(() => {
                    const Icon = TRACKING_STEPS[activeStep].icon;
                    return <Icon className="h-4 w-4" style={{ color: "#B0E4CC" }} />;
                  })()}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "#FFFFFF" }}>
                    {TRACKING_STEPS[activeStep].label}
                  </p>
                  <p className="text-[11px]" style={{ color: "#6B7280" }}>
                    {TRACKING_STEPS[activeStep].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-[#B0E4CC]"
            style={{ color: "#408A71" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

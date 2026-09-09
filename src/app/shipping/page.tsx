"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  Truck,
  Globe,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from "lucide-react";

const shippingMethods = [
  {
    icon: Truck,
    name: "Standard Shipping",
    time: "5-7 Business Days",
    price: "Free over $150",
    description: "Reliable tracked delivery for everyday orders.",
    features: ["Order tracking", "Insurance included", "Signature on delivery"],
  },
  {
    icon: Zap,
    name: "Express Shipping",
    time: "2-3 Business Days",
    price: "$12.99",
    description: "Get your items faster with priority handling.",
    features: ["Priority processing", "Real-time tracking", "Fully insured"],
  },
  {
    icon: Globe,
    name: "International",
    time: "7-14 Business Days",
    price: "Calculated at checkout",
    description: "Worldwide delivery to over 120 countries.",
    features: ["Customs handled", "Full tracking", "Delivered duty paid"],
  },
];

const policies = [
  {
    title: "Free Shipping Threshold",
    content: "Orders over $150 qualify for free standard shipping within the continental US. No promo code needed — it's applied automatically at checkout.",
  },
  {
    title: "Processing Time",
    content: "All orders are processed within 1-2 business days. Orders placed before 2PM EST ship the same day. Weekend orders ship Monday.",
  },
  {
    title: "Packaging",
    content: "Every item is carefully packaged in our signature gift-ready box with tissue paper, authenticity card, and care instructions.",
  },
  {
    title: "Insurance & Protection",
    content: "All shipments are fully insured against loss and damage. If your package arrives damaged, contact us within 48 hours for a replacement.",
  },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#B0E4CC] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "#B0E4CC" }}>Shipping</span>
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.3)" }}>
            <Truck className="h-7 w-7" style={{ color: "#B0E4CC" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Shipping Information
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6B7280" }}>
            Fast, secure delivery with full tracking and insurance on every order.
          </p>
        </motion.div>

        {/* Shipping Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-16">
          {shippingMethods.map((method, i) => (
            <motion.div
              key={method.name}
              className="rounded-2xl p-6 relative"
              style={{
                backgroundColor: "#0A1613",
                border: "1px solid rgba(64,138,113,0.15)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#1B3E33" }}>
                <method.icon className="h-6 w-6" style={{ color: "#B0E4CC" }} />
              </div>
              <h3 className="text-base font-semibold mb-1" style={{ color: "#FFFFFF" }}>{method.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium" style={{ color: "#B0E4CC" }}>{method.time}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(64,138,113,0.1)", color: "#408A71" }}>
                  {method.price}
                </span>
              </div>
              <p className="text-xs mb-4" style={{ color: "#6B7280" }}>{method.description}</p>
              <ul className="space-y-2">
                {method.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "#AEB8B3" }}>
                    <CheckCircle2 className="h-3 w-3 shrink-0" style={{ color: "#408A71" }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Shipping Policies
          </h2>
          <div className="space-y-4">
            {policies.map((p, i) => (
              <motion.div
                key={p.title}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#0A1613",
                  border: "1px solid rgba(64,138,113,0.15)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center mt-0.5 shrink-0" style={{ backgroundColor: "#1B3E33" }}>
                    <ShieldCheck className="h-3 w-3" style={{ color: "#B0E4CC" }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1" style={{ color: "#FFFFFF" }}>{p.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{p.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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

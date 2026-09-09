"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  RotateCcw,
  Clock,
  ShieldCheck,
  Package,
  CheckCircle2,
} from "lucide-react";

const returnSteps = [
  {
    icon: Package,
    title: "Initiate Return",
    description: "Contact our support team within 30 days of delivery with your order ID and reason for return.",
  },
  {
    icon: RotateCcw,
    title: "Ship It Back",
    description: "We'll provide a prepaid return label. Pack the item in its original packaging and drop it off.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Check",
    description: "Our team inspects the returned item within 2-3 business days of receiving it.",
  },
  {
    icon: CheckCircle2,
    title: "Refund Processed",
    description: "Your refund is issued to the original payment method within 5-7 business days.",
  },
];

const policies = [
  {
    title: "30-Day Return Window",
    content: "You have 30 calendar days from the date of delivery to initiate a return. Items must be unused, in their original packaging, with all tags attached.",
  },
  {
    title: "Eligible Items",
    content: "All watches, perfumes (unopened), bags, and accessories are eligible for return. Personalized or engraved items are final sale.",
  },
  {
    title: "Refund Method",
    content: "Refunds are processed to the original payment method. Processing time is 5-7 business days after we receive and inspect your return.",
  },
  {
    title: "Exchange Option",
    content: "Prefer an exchange? Contact us and we'll arrange a swap for a different size, color, or product of equal or greater value.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#B0E4CC] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "#B0E4CC" }}>Returns</span>
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
            <RotateCcw className="h-7 w-7" style={{ color: "#B0E4CC" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Returns & Refunds
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6B7280" }}>
            We want you to love your purchase. If it's not quite right, our return process is simple and hassle-free.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {returnSteps.map((step, i) => (
            <motion.div
              key={step.title}
              className="rounded-2xl p-5 relative"
              style={{
                backgroundColor: "#0A1613",
                border: "1px solid rgba(64,138,113,0.15)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold" style={{ color: "rgba(64,138,113,0.3)" }}>
                0{i + 1}
              </span>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: "#1B3E33" }}>
                <step.icon className="h-5 w-5" style={{ color: "#B0E4CC" }} />
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: "#FFFFFF" }}>{step.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{step.description}</p>
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
            Return Policy
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
                    <Clock className="h-3 w-3" style={{ color: "#B0E4CC" }} />
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

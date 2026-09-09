"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, FileText } from "lucide-react";

const sections = [
  {
    title: "Terms of Service",
    content: "Welcome to LUXE. By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. These terms apply to all visitors, users, and customers of our luxury e-commerce platform.",
  },
  {
    title: "Acceptable Use",
    content: "You agree to use our website only for lawful purposes and in accordance with these Terms. You must not misuse our services, attempt to gain unauthorized access to any portion of the website, or engage in any activity that disrupts or interferes with our platform's functionality.",
  },
  {
    title: "Intellectual Property Rights",
    content: "All content on this website, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of LUXE or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.",
  },
  {
    title: "Product Information & Pricing",
    content: "We strive to provide accurate descriptions and pricing for all products. However, we do not warrant that product descriptions, pricing, or other content is error-free, complete, or current. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.",
  },
  {
    title: "Orders & Payment",
    content: "By placing an order, you represent that all information provided is accurate. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available, inaccuracies in product or pricing information, or errors identified by our fraud detection systems. Payment must be received in full before order processing.",
  },
  {
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by law, LUXE shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services. Our total liability shall not exceed the amount paid by you for the product in question within the twelve months preceding the claim.",
  },
  {
    title: "Account Terms",
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use. We reserve the right to suspend or terminate accounts that violate these Terms or engage in suspicious activity.",
  },
  {
    title: "Returns & Refunds",
    content: "Returns and refunds are governed by our Return Policy, which is incorporated into these Terms by reference. Please review our Returns page for detailed information about eligible items, return windows, and refund procedures.",
  },
  {
    title: "Modifications to Terms",
    content: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes constitutes acceptance of the modified Terms. We recommend reviewing this page periodically.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#B0E4CC] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "#B0E4CC" }}>Terms of Service</span>
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
            <FileText className="h-7 w-7" style={{ color: "#B0E4CC" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Terms of Service
          </h1>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Last updated: January 1, 2025
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              className="rounded-xl p-6"
              style={{
                backgroundColor: "#0A1613",
                border: "1px solid rgba(64,138,113,0.15)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "#408A71" }}>
                {section.title}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          className="mt-10 rounded-xl p-5 text-center"
          style={{ backgroundColor: "#0A1613", border: "1px solid rgba(64,138,113,0.15)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Questions about our Terms? Contact us at{" "}
            <a href="mailto:legal@luxe.com" className="font-medium hover:underline" style={{ color: "#B0E4CC" }}>
              legal@luxe.com
            </a>
          </p>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="text-center mt-10"
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

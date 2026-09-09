"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowLeft, Shield } from "lucide-react";

const sections = [
  {
    title: "Data We Collect",
    content: "We collect information you provide directly: name, email, shipping address, payment details, and communication preferences. We automatically collect usage data including IP address, browser type, pages visited, and time spent on our site. This data helps us personalize your experience and improve our services.",
  },
  {
    title: "How We Use Your Information",
    content: "Your information is used to process orders, send transactional emails, provide customer support, personalize product recommendations, detect and prevent fraud, and improve our website functionality. We may also use your email (with consent) to send marketing communications about new collections and exclusive offers.",
  },
  {
    title: "Cookie Policy",
    content: "We use essential cookies for site functionality, analytics cookies to understand user behavior, and preference cookies to remember your settings. You can manage cookie preferences through your browser settings. Disabling certain cookies may limit some website features. We do not sell cookie data to third parties.",
  },
  {
    title: "Data Sharing",
    content: "We share your information only as necessary to fulfill orders (shipping carriers, payment processors), comply with legal obligations, or protect our rights. We do not sell your personal data to third parties. All service providers are contractually bound to protect your information and use it only for the services they provide to us.",
  },
  {
    title: "Data Security",
    content: "We implement industry-standard security measures including 256-bit SSL encryption, PCI DSS compliant payment processing, and regular security audits. While we take reasonable precautions, no method of transmission over the Internet is 100% secure. We encourage you to use strong passwords and enable two-factor authentication.",
  },
  {
    title: "Data Retention",
    content: "We retain your personal information for as long as your account is active or as needed to provide services. Order data is retained for 7 years for tax and legal compliance. You may request deletion of your account data at any time, subject to our legal retention obligations.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal data. You may also request data portability, opt out of marketing communications, and withdraw consent for data processing. To exercise these rights, contact our privacy team at privacy@luxe.com. We respond to all requests within 30 days.",
  },
  {
    title: "Children's Privacy",
    content: "Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete it promptly. If you believe we have collected such information, please contact us immediately.",
  },
  {
    title: "Policy Updates",
    content: "We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date. Significant changes will be communicated via email. Your continued use of our services after changes take effect constitutes acceptance of the revised policy.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#081814" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#B0E4CC] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "#B0E4CC" }}>Privacy Policy</span>
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
            <Shield className="h-7 w-7" style={{ color: "#B0E4CC" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Privacy Policy
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
            Questions about our Privacy Policy? Contact us at{" "}
            <a href="mailto:privacy@luxe.com" className="font-medium hover:underline" style={{ color: "#B0E4CC" }}>
              privacy@luxe.com
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

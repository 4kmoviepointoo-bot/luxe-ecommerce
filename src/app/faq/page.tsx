"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";

const faqCategories = [
  {
    title: "Orders & Payments",
    items: [
      {
        question: "How do I place an order?",
        answer: "Browse our collections, add items to your cart, and proceed to checkout. You can pay with credit/debit cards, PayPal, Apple Pay, or Afterpay for split payments.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "Orders can be modified or cancelled within 1 hour of placement. After that, we begin processing and cannot make changes. Contact support immediately if you need assistance.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay, and Afterpay. All transactions are encrypted and secure.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use 256-bit SSL encryption and PCI DSS compliant payment processing. Your card details are never stored on our servers.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International orders typically arrive within 7-14 business days.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes! We ship to over 120 countries worldwide. International shipping rates and delivery times are calculated at checkout based on your location.",
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also visit our Track Order page to check your shipment status in real-time.",
      },
      {
        question: "What if my package is lost or damaged?",
        answer: "All shipments are fully insured. If your package arrives damaged or goes missing, contact us within 48 hours and we'll arrange a replacement or full refund.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return window from the date of delivery. Items must be unused, in original packaging, with all tags attached. Personalized items are final sale.",
      },
      {
        question: "How do I start a return?",
        answer: "Visit our Returns page or contact support with your order ID. We'll provide a prepaid return label and guide you through the process.",
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive and inspect your return. The amount is credited to your original payment method.",
      },
      {
        question: "Can I exchange for a different item?",
        answer: "Yes! Contact us to arrange an exchange for a different size, color, or product. If the new item costs more, we'll send you a secure payment link for the difference.",
      },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        question: "Do I need an account to shop?",
        answer: "No, you can checkout as a guest. However, creating an account lets you track orders, save wishlists, and enjoy faster checkout on future purchases.",
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Sign In' on the top navigation, then select 'Forgot Password'. Enter your email and we'll send a secure reset link within minutes.",
      },
      {
        question: "How can I contact customer support?",
        answer: "You can reach us via email at support@luxe.com, live chat on our website, or by phone at +1 (555) 123-4567. Our team is available Monday-Friday, 9AM-6PM EST.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer: "Yes! All orders come in our signature gift-ready packaging. For an additional $5, you can add a handwritten gift note and premium ribbon wrapping.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: "#0D2820",
        border: `1px solid ${isOpen ? "rgba(64,138,113,0.3)" : "rgba(64,138,113,0.1)"}`,
      }}
      layout
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <span className="text-sm font-medium" style={{ color: isOpen ? "#B0E4CC" : "#FFFFFF" }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4" style={{ color: "#6B7280" }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4">
              <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#091413" }}>
      {/* Breadcrumb */}
      <div className="border-b" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
          <Link href="/" className="hover:text-[#B0E4CC] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span style={{ color: "#B0E4CC" }}>FAQ</span>
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
            <HelpCircle className="h-7 w-7" style={{ color: "#B0E4CC" }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Frequently Asked Questions
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6B7280" }}>
            Find quick answers to common questions. Can't find what you need? Our team is here to help.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIdx * 0.1, duration: 0.4 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "#408A71" }}>
                {category.title}
              </h2>
              <div className="space-y-2">
                {category.items.map((item) => {
                  const id = `${category.title}-${item.question}`;
                  return (
                    <AccordionItem
                      key={id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openIndex === id}
                      onToggle={() => handleToggle(id)}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          className="mt-16 rounded-2xl p-6 sm:p-8 text-center"
          style={{
            backgroundColor: "#0D2820",
            border: "1px solid rgba(64,138,113,0.15)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold mb-2" style={{ color: "#FFFFFF" }}>
            Still have questions?
          </h3>
          <p className="text-xs mb-5" style={{ color: "#6B7280" }}>
            Our support team is available Monday-Friday, 9AM-6PM EST.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:support@luxe.com"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "#1B3E33", color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.2)" }}
            >
              <Mail className="h-3.5 w-3.5" />
              support@luxe.com
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "#1B3E33", color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.2)" }}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Live Chat
            </a>
            <a
              href="tel:+15551234567"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
              style={{ backgroundColor: "#1B3E33", color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.2)" }}
            >
              <Phone className="h-3.5 w-3.5" />
              +1 (555) 123-4567
            </a>
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

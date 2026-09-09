"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#081814" }}
    >
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 */}
          <motion.h1
            className="text-[120px] sm:text-[160px] font-bold leading-none mb-4"
            style={{ color: "#0D2820", fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            404
          </motion.h1>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(64,138,113,0.2)" }} />
            <div className="h-2 w-2 rotate-45" style={{ backgroundColor: "#408A71" }} />
            <div className="h-px flex-1" style={{ backgroundColor: "rgba(64,138,113,0.2)" }} />
          </div>

          {/* Message */}
          <motion.h2
            className="text-xl sm:text-2xl font-bold mb-3"
            style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Page Not Found
          </motion.h2>
          <motion.p
            className="text-sm mb-8"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all"
              style={{
                backgroundColor: "#1B3E33",
                color: "#FFFFFF",
                border: "1px solid rgba(64,138,113,0.3)",
              }}
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors"
              style={{
                border: "1px solid rgba(64,138,113,0.2)",
                color: "#6B7280",
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

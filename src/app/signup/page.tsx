"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Gift, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    console.log("Signup Google Login Clicked");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });
    if (error) console.error("OAuth Error:", error.message);
  };

  const handleAppleSignIn = async () => {
    console.log("Signup Apple Login Clicked");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });
    if (error) console.error("OAuth Error:", error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: "#091413" }}>
      <motion.div
        className="max-w-md w-full mx-auto p-8 rounded-2xl relative"
        style={{
          backgroundColor: "rgba(10, 22, 19, 0.8)",
          backdropFilter: "blur(24px)",
          border: "1px solid #18362D",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(64, 138, 113, 0.05)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        {/* Icon Badge */}
        <motion.div
          className="h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{
            backgroundColor: "rgba(24, 54, 45, 0.6)",
            border: "1px solid #255244",
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Gift className="h-5 w-5" style={{ color: "#B0E4CC" }} />
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
            Join LUXE
          </h1>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Get 10% off your first order
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Name */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="John Doe"
                className="w-full rounded-xl pl-11 pr-4 py-3 text-sm transition-all outline-none"
                style={{
                  backgroundColor: "#050D0B",
                  border: "1px solid #18362D",
                  color: "#FFFFFF",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#408A71";
                  e.target.style.boxShadow = "0 0 0 1px #408A71";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#18362D";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#9CA3AF" }} />
              <input
                type="email"
                name="email"
                autoComplete="new-email"
                placeholder="you@example.com"
                className="w-full rounded-xl pl-11 pr-4 py-3 text-sm transition-all outline-none"
                style={{
                  backgroundColor: "#050D0B",
                  border: "1px solid #18362D",
                  color: "#FFFFFF",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#408A71";
                  e.target.style.boxShadow = "0 0 0 1px #408A71";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#18362D";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#9CA3AF" }} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="Min 8 characters"
                className="w-full rounded-xl pl-11 pr-11 py-3 text-sm transition-all outline-none"
                style={{
                  backgroundColor: "#050D0B",
                  border: "1px solid #18362D",
                  color: "#FFFFFF",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#408A71";
                  e.target.style.boxShadow = "0 0 0 1px #408A71";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#18362D";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "#6B7280" }}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #1B3E33, #255244)",
              color: "#B0E4CC",
              boxShadow: "0 4px 15px rgba(27, 62, 51, 0.4)",
            }}
            whileHover={{
              background: "linear-gradient(135deg, #255244, #2e6453)",
              scale: 1.01,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Create Account
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(64, 138, 113, 0.15)" }} />
          <span className="text-[10px] uppercase tracking-wider" style={{ color: "#6B7280" }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(64, 138, 113, 0.15)" }} />
        </div>

        {/* Social Login */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            style={{
              backgroundColor: "#050D0B",
              border: "1px solid #18362D",
              color: "#FFFFFF",
            }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleAppleSignIn}
            className="w-full py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            style={{
              backgroundColor: "#050D0B",
              border: "1px solid #18362D",
              color: "#FFFFFF",
            }}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.1-.02-.2-.02-.3 0-1.14.534-2.36 1.207-3.08.817-.87 2.18-1.53 3.27-1.57.03.11.05.22.05.36zm4.565 17.71c-.04.08-.62 1.19-1.53 2.36-1.27 1.64-2.59 3.3-4.57 3.32-1.96.02-2.59-1.15-4.82-1.15-2.24 0-2.91 1.12-4.8 1.18-1.94.05-3.41-1.86-4.68-3.5C-2.04 19.28-3.12 13.61-1.28 10.48c.92-1.56 2.55-2.56 4.32-2.59 1.87-.03 3.63 1.26 4.78 1.26 1.15 0 3.31-1.56 5.57-1.33.95.04 3.64.38 5.37 2.88-.14.09-3.21 1.88-3.17 5.58.03 4.41 3.87 5.88 3.91 5.9z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        {/* Toggle */}
        <p className="text-center text-xs mt-6" style={{ color: "#6B7280" }}>
          Already have an account?{" "}
          <Link
            href="/account"
            className="font-medium transition-colors hover:underline"
            style={{ color: "#B0E4CC" }}
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

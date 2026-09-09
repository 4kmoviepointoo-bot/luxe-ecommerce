"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type Mode = "signin" | "signup";

function PasswordStrength({ password }: { password: string }) {
  const len = password.length;
  const strength = len === 0 ? 0 : len < 4 ? 1 : len < 8 ? 2 : 3;
  const labels = ["", "Weak", "Fair", "Strong"];
  const barColors = ["", "#EF4444", "#F59E0B", "#408A71"];
  if (len === 0) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-2 space-y-1.5"
    >
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: i <= strength ? barColors[strength] : "rgba(64,138,113,0.2)" }}
          />
        ))}
      </div>
      <p className="text-[11px]" style={{ color: "#6B7280" }}>
        {len < 8 ? "Use 8 characters or more" : labels[strength]}
      </p>
    </motion.div>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    console.log("Triggering Google OAuth Redirect...");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });
    if (error) console.error("OAuth Error:", error.message);
    else if (data?.url) window.location.href = data.url;
  };

  const handleAppleLogin = async () => {
    console.log("Triggering Apple OAuth Redirect...");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/account`,
      },
    });
    if (error) console.error("OAuth Error:", error.message);
    else if (data?.url) window.location.href = data.url;
  };

  useEffect(() => {
    console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Key Exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    supabase.auth.getSession().then((result: { data: unknown; error: { message: string } | null }) => {
      if (result.error) {
        console.error("Supabase Connection Error:", result.error.message);
      } else {
        console.log("Supabase Connected Successfully!", result.data);
      }
    });
  }, []);

  const inputClass = "w-full rounded-xl pl-11 pr-4 py-3 text-sm transition-all outline-none bg-[#050D0B] border border-[#18362D] text-white placeholder:text-[#6B7280] focus:border-[#408A71] focus:shadow-[0_0_0_1px_#408A71]";
  const inputClassErr = "w-full rounded-xl pl-11 pr-4 py-3 text-sm transition-all outline-none bg-[#050D0B] border border-[#EF4444] text-white placeholder:text-[#6B7280] focus:border-[#EF4444] focus:shadow-[0_0_0_1px_#EF4444]";

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === "signup" && !formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.password) errs.password = "Password is required";
    else if (formData.password.length < 6) errs.password = "Min 6 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const switchMode = (next: Mode) => {
    if (next === mode) return;
    setErrors({});
    setSubmitted(false);
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
    setMode(next);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-5 pt-20 pb-16" style={{ backgroundColor: "#081814" }}>
      <div className="w-full max-w-md">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors mb-8"
            style={{ color: "#6B7280" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#0A1613",
            border: "1px solid rgba(64,138,113,0.2)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(64,138,113,0.2)" }}>
                      <CheckCircle className="h-8 w-8" style={{ color: "#408A71" }} />
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#FFFFFF" }}>
                    {mode === "signin" ? "Welcome back!" : "Account created!"}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
                    {mode === "signin"
                      ? "You have been signed in successfully."
                      : "Your account has been created successfully."}
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all"
                    style={{ backgroundColor: "#1B3E33", color: "#FFFFFF", border: "1px solid rgba(64,138,113,0.3)" }}
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <>
                <motion.form
                  key={mode}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, delay: 0.12 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Header */}
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
                      {mode === "signin" ? "Welcome back" : "Create account"}
                    </h2>
                    <p className="text-sm" style={{ color: "#6B7280" }}>
                      {mode === "signin"
                        ? "Sign in to access your account"
                        : "Fill in the details to get started"}
                    </p>
                  </div>

                  {/* Name (signup only) */}
                  <AnimatePresence>
                    {mode === "signup" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <label className="text-[10px] font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-10" style={{ color: "#6B7280" }} />
                          <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className={errors.name ? inputClassErr : inputClass}
                          />
                        </div>
                        {errors.name && (
                          <p className="flex items-center gap-1 text-[11px] mt-1.5" style={{ color: "#EF4444" }}>
                            <AlertCircle className="h-3 w-3 shrink-0" />
                            {errors.name}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-10" style={{ color: "#6B7280" }} />
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className={errors.email ? inputClassErr : inputClass}
                      />
                    </div>
                    {errors.email && (
                      <p className="flex items-center gap-1 text-[11px] mt-1.5" style={{ color: "#EF4444" }}>
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-10" style={{ color: "#6B7280" }} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className={`${errors.password ? inputClassErr : inputClass} pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors z-10"
                        style={{ color: "#6B7280" }}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="flex items-center gap-1 text-[11px] mt-1.5" style={{ color: "#EF4444" }}>
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        {errors.password}
                      </p>
                    )}
                    {mode === "signup" && <PasswordStrength password={formData.password} />}
                  </div>

                  {/* CTA */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl py-3.5 text-sm font-semibold transition-all disabled:opacity-50"
                    style={{
                      backgroundColor: isSubmitting ? "#0D2820" : "#1B3E33",
                      color: "#FFFFFF",
                      border: "1px solid rgba(64,138,113,0.3)",
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="h-4 w-4 border-2 rounded-full"
                          style={{ borderColor: "#B0E4CC", borderTopColor: "transparent" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </span>
                    ) : mode === "signin" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </motion.button>

                </motion.form>

                {/* Social logins - OUTSIDE form to prevent submit interference */}
                <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(64,138,113,0.15)" }}>
                  <div className="relative flex justify-center mb-4">
                    <span className="px-3 text-xs" style={{ backgroundColor: "#0A1613", color: "#6B7280" }}>
                      or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: "#0A1613",
                        border: "1px solid #18362D",
                        color: "#FFFFFF",
                      }}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </button>
                    <button
                      type="button"
                      onClick={handleAppleLogin}
                      className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: "#0A1613",
                        border: "1px solid #18362D",
                        color: "#FFFFFF",
                      }}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                      Continue with Apple
                    </button>
                  </div>
                </div>

                {/* Toggle link */}
                <p className="text-center text-sm pt-4" style={{ color: "#6B7280" }}>
                  {mode === "signin" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className="font-medium transition-colors"
                        style={{ color: "#408A71" }}
                      >
                        Create an account
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("signin")}
                        className="font-medium transition-colors"
                        style={{ color: "#408A71" }}
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

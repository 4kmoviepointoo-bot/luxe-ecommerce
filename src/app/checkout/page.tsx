"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CreditCard, Truck, Check, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useCart } from "@/context/CartContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

interface FormErrors {
  [key: string]: string;
}

const REQUIRED_FIELDS: (keyof FormData)[] = ["name", "email", "phone", "address", "city"];

function validateField(name: string, value: string): string {
  if (!value.trim()) return "This field is required";
  if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
  if (name === "phone" && !/^[\d\s\-+()]{7,}$/.test(value)) return "Invalid phone number";
  if (name === "zip" && !value.trim()) return "ZIP is required";
  if (name === "cardNumber" && !/^\d{16}$/.test(value.replace(/\s/g, ""))) return "Enter 16 digits";
  if (name === "cardExpiry" && !/^\d{2}\/\d{2}$/.test(value)) return "Use MM/YY format";
  if (name === "cardCvc" && !/^\d{3,4}$/.test(value)) return "Invalid CVC";
  return "";
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Cart empty guard
  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#081814" }}>
        <motion.div
          className="text-center max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="h-16 w-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: "#0D2820", border: "1px solid rgba(64,138,113,0.2)" }}>
            <AlertCircle className="h-7 w-7" style={{ color: "#408A71" }} />
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: "#FFFFFF" }}>Your cart is empty</h1>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            Add some items to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all"
            style={{ backgroundColor: "#1B3E33", color: "#B0E4CC", border: "1px solid rgba(64,138,113,0.3)" }}
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateStep = (stepNum: number): boolean => {
    const stepFields: Record<number, string[]> = {
      1: ["name", "email", "phone"],
      2: ["address", "city", "zip"],
      3: ["cardNumber", "cardExpiry", "cardCvc"],
    };

    const fields = stepFields[stepNum] || [];
    const newErrors: FormErrors = {};
    let valid = true;

    fields.forEach((field) => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    setTouched((prev) => {
      const next = { ...prev };
      fields.forEach((f) => (next[f] = true));
      return next;
    });

    return valid;
  };

  const handleContinue = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePlaceOrder = useCallback(async () => {
    if (!validateStep(3)) return;
    if (items.length === 0) return;

    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    router.push("/order-success");
  }, [items, clearCart, router]);

  const inputStyle = (field: string): React.CSSProperties => ({
    backgroundColor: "#081914",
    border: `1px solid ${errors[field] && touched[field] ? "#EF4444" : "rgba(139,232,167,0.15)"}`,
    color: "#F7F7F3",
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#081814" }}>
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/cart" className="flex h-9 w-9 items-center justify-center rounded-full transition-colors" style={{ border: "1px solid rgba(139,232,167,0.15)" }}>
            <ArrowLeft className="h-4 w-4" style={{ color: "#AEB8B3" }} />
          </Link>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>Checkout</h1>
            <p className="text-[10px]" style={{ color: "#6B7280" }}>{items.length} item{items.length !== 1 ? "s" : ""} in cart</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Contact", "Shipping", "Payment"].map((s, i) => (
            <button
              key={s}
              onClick={() => {
                if (i + 1 < step) setStep(i + 1);
              }}
              className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: step === i + 1 ? "#1B3E33" : step > i + 1 ? "rgba(64,138,113,0.15)" : "#0D2820",
                color: step === i + 1 ? "#B0E4CC" : step > i + 1 ? "#408A71" : "#6B7280",
                border: `1px solid ${step === i + 1 ? "rgba(64,138,113,0.3)" : "rgba(64,138,113,0.1)"}`,
              }}
            >
              {step > i + 1 ? <Check className="h-3.5 w-3.5 mx-auto" /> : s}
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {step === 1 && (
              <>
                <InputField label="Full Name" name="name" type="text" placeholder="John Doe" value={formData.name} error={errors.name} touched={touched.name} onChange={handleChange} onBlur={handleBlur} />
                <InputField label="Email Address" name="email" type="email" placeholder="you@example.com" value={formData.email} error={errors.email} touched={touched.email} onChange={handleChange} onBlur={handleBlur} />
                <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} error={errors.phone} touched={touched.phone} onChange={handleChange} onBlur={handleBlur} />
              </>
            )}
            {step === 2 && (
              <>
                <InputField label="Street Address" name="address" type="text" placeholder="123 Luxury Ave" value={formData.address} error={errors.address} touched={touched.address} onChange={handleChange} onBlur={handleBlur} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="City" name="city" type="text" placeholder="New York" value={formData.city} error={errors.city} touched={touched.city} onChange={handleChange} onBlur={handleBlur} />
                  <InputField label="ZIP Code" name="zip" type="text" placeholder="10001" value={formData.zip} error={errors.zip} touched={touched.zip} onChange={handleChange} onBlur={handleBlur} />
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <InputField label="Card Number" name="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={formData.cardNumber} error={errors.cardNumber} touched={touched.cardNumber} onChange={handleChange} onBlur={handleBlur} icon={<CreditCard className="h-4 w-4" style={{ color: "#6B7280" }} />} />
                <div className="grid grid-cols-2 gap-3">
                  <InputField label="Expiry" name="cardExpiry" type="text" placeholder="MM/YY" value={formData.cardExpiry} error={errors.cardExpiry} touched={touched.cardExpiry} onChange={handleChange} onBlur={handleBlur} />
                  <InputField label="CVC" name="cardCvc" type="text" placeholder="123" value={formData.cardCvc} error={errors.cardCvc} touched={touched.cardCvc} onChange={handleChange} onBlur={handleBlur} />
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Order Summary */}
        <div className="mt-8 rounded-xl p-5" style={{ backgroundColor: "#0D2820", border: "1px solid rgba(64,138,113,0.15)" }}>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#408A71" }}>Order Summary</h3>
          <div className="space-y-2 mb-4">
            {items.slice(0, 3).map((item) => (
              <div key={item.productId} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#AEB8B3" }}>{item.title} × {item.quantity}</span>
                <span className="text-xs font-medium" style={{ color: "#FFFFFF" }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-[10px]" style={{ color: "#6B7280" }}>+{items.length - 3} more item{items.length - 3 > 1 ? "s" : ""}</p>
            )}
          </div>
          <div className="border-t pt-3" style={{ borderColor: "rgba(64,138,113,0.15)" }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>Total</span>
              <span className="text-lg font-bold" style={{ color: "#B0E4CC" }}>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          {step < 3 ? (
            <button
              onClick={handleContinue}
              className="w-full rounded-xl py-3.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor: "#1B3E33",
                color: "#FFFFFF",
                border: "1px solid rgba(64,138,113,0.3)",
              }}
            >
              Continue to {step === 1 ? "Shipping" : "Payment"}
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || items.length === 0}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isProcessing ? "#0D2820" : "#1B3E33",
                color: "#B0E4CC",
                border: "1px solid rgba(64,138,113,0.3)",
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Truck className="h-4 w-4" />
                  Complete Order
                </>
              )}
            </button>
          )}
        </div>

        {/* Back link */}
        <p className="text-center text-xs mt-6" style={{ color: "#6B7280" }}>
          <Link href="/cart" className="hover:underline" style={{ color: "#408A71" }}>← Back to cart</Link>
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  icon,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  error: string;
  touched: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (name: string) => void;
  icon?: React.ReactNode;
}) {
  const hasError = touched && error;
  return (
    <div>
      <label className="text-[10px] font-medium uppercase tracking-wider mb-1.5 block" style={{ color: "#9CA3AF" }}>
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => onBlur(name)}
          placeholder={placeholder}
          className="w-full rounded-xl px-4 py-3 text-sm transition-all outline-none"
          style={{
            backgroundColor: "#081914",
            border: `1px solid ${hasError ? "#EF4444" : "rgba(139,232,167,0.15)"}`,
            color: "#F7F7F3",
            paddingLeft: icon ? "2.75rem" : "1rem",
          }}
          onFocus={(e) => {
            if (!hasError) e.target.style.borderColor = "#408A71";
          }}
          onBlurCapture={() => {
            if (!hasError) {
              const el = document.querySelector(`[name="${name}"]`) as HTMLInputElement;
              if (el) el.style.borderColor = "rgba(139,232,167,0.15)";
            }
          }}
        />
      </div>
      {hasError && (
        <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: "#EF4444" }}>
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

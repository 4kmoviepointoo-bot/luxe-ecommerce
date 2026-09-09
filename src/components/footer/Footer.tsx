"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Globe, MessageCircle, Code2, Users, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: Code2, href: "#", label: "GitHub" },
  { icon: Users, href: "#", label: "Community" },
];

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Watches", href: "/category/watches" },
  { label: "Perfumes", href: "/category/perfumes" },
  { label: "Bags", href: "/category/bags" },
  { label: "Accessories", href: "/category/accessories" },
];

const careLinks = [
  { label: "Track Order", href: "/track-order" },
  { label: "Returns", href: "/returns" },
  { label: "Shipping", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
];

const accountLinks = [
  { label: "Sign In", href: "/account" },
  { label: "My Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => { setSubscribed(false); setEmail(""); }, 3000);
  };

  return (
    <footer className="bg-bg-deep text-luxe-white border-t border-border-custom">
      {/* Newsletter */}
      <div className="border-b border-border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-md mx-auto text-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted mb-3 block">Newsletter</span>
            <h2 className="text-xl font-bold mb-2">Join the Inner Circle</h2>
            <p className="text-xs text-muted mb-6">Get early access to new collections and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl bg-surface border border-border-custom px-4 py-2.5 text-sm text-luxe-white placeholder:text-muted outline-none focus:border-emerald transition-colors"
              />
              <motion.button
                type="submit"
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-medium transition-all shrink-0 ${
                  subscribed ? "bg-emerald/80 text-bg-deep" : "bg-emerald text-bg-deep hover:shadow-[0_0_12px_rgba(120,217,143,0.3)]"
                }`}
                whileHover={{ scale: subscribed ? 1 : 1.03 }}
                whileTap={{ scale: subscribed ? 1 : 0.97 }}
              >
                {subscribed ? <><Check className="h-3.5 w-3.5" /> Done</> : <><Send className="h-3.5 w-3.5" /></>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <span className="text-lg font-bold tracking-tight">LUXE<span className="text-emerald">.</span></span>
            </Link>
            <p className="text-xs text-muted leading-relaxed mb-4 max-w-xs">Premium minimalist essentials for modern living.</p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="flex h-8 w-8 items-center justify-center rounded-full border border-border-custom text-muted hover:text-luxe-white hover:border-emerald/30 transition-all">
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <h3 className="text-base sm:text-lg font-bold tracking-wider text-[#408A71] uppercase mb-4 block">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center">
                    <motion.span
                      className="text-sm sm:text-base font-medium text-zinc-300 group-hover:text-[#B0E4CC] transition-colors duration-200 cursor-pointer inline-block"
                      whileTap={{ scale: 0.96, x: 2 }}
                    >
                      {l.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
            <h3 className="text-base sm:text-lg font-bold tracking-wider text-[#408A71] uppercase mb-4 block">Support</h3>
            <ul className="space-y-2.5">
              {careLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center">
                    <motion.span
                      className="text-sm sm:text-base font-medium text-zinc-300 group-hover:text-[#B0E4CC] transition-colors duration-200 cursor-pointer inline-block"
                      whileTap={{ scale: 0.96, x: 2 }}
                    >
                      {l.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}>
            <h3 className="text-base sm:text-lg font-bold tracking-wider text-[#408A71] uppercase mb-4 block">Account</h3>
            <ul className="space-y-2.5">
              {accountLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center">
                    <motion.span
                      className="text-sm sm:text-base font-medium text-zinc-300 group-hover:text-[#B0E4CC] transition-colors duration-200 cursor-pointer inline-block"
                      whileTap={{ scale: 0.96, x: 2 }}
                    >
                      {l.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Trust + Bottom */}
      <div className="border-t border-border-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] text-muted/60">&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[10px] text-muted/60">
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link href="/terms" className="text-xs text-zinc-400 hover:text-[#B0E4CC] transition-colors duration-200 cursor-pointer">Terms</Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Link href="/privacy" className="text-xs text-zinc-400 hover:text-[#B0E4CC] transition-colors duration-200 cursor-pointer">Privacy</Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

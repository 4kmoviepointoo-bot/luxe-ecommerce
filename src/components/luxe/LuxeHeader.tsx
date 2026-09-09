"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, Search, User, ShoppingBag, X, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFlyToCart } from "@/context/FlyToCartContext";
import { PRODUCTS } from "@/data/products";
import MobileMenu from "./MobileMenu";

export default function LuxeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { itemCount } = useCart();
  const { cartIconRef } = useFlyToCart();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.badge?.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setMobileSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => mobileInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileSearchOpen]);

  const handleSelectResult = (id: string) => {
    router.push(`/products/${id}`);
    setSearchQuery("");
    setIsSearchOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "top-2 left-1/2 -translate-x-1/2 w-[92%] rounded-full"
            : "top-0 left-0 -translate-x-0 w-full rounded-none"
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-[#0A1613]/90 border border-[#18362D] backdrop-blur-md shadow-lg"
              : "bg-[#020908]/60 backdrop-blur-md border-b border-emerald/10"
          }`}
          style={{ borderRadius: "inherit" }}
        >
          {/* Top Row */}
          <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 max-w-7xl mx-auto py-2.5">
            {/* Mobile: hamburger + logo */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#F7F7F3]/70 hover:text-[#F7F7F3] hover:bg-white/5 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link href="/" className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full border border-[#D8A94A]/50 bg-[#020908] flex items-center justify-center shadow-[0_0_12px_rgba(216,169,74,0.15)]">
                  <span className="text-sm font-bold text-[#D8A94A]" style={{ fontFamily: "Georgia, serif" }}>L</span>
                </div>
                <span className="text-base font-semibold tracking-tight text-[#F7F7F3]">LUXE</span>
              </Link>
            </div>

            {/* Desktop: logo */}
            <Link href="/" className="hidden lg:flex items-center gap-2.5 shrink-0">
              <div className="h-10 w-10 rounded-full border border-[#D8A94A]/50 bg-[#020908] flex items-center justify-center shadow-[0_0_16px_rgba(216,169,74,0.15)]">
                <span className="text-base font-bold text-[#D8A94A]" style={{ fontFamily: "Georgia, serif" }}>L</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-[#F7F7F3]">LUXE</span>
            </Link>

            {/* Desktop: search bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8" ref={searchRef}>
              <div className="relative w-full group">
                <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-emerald/15 via-emerald/10 to-emerald/15 opacity-50 group-focus-within:opacity-100 transition-all duration-300" />
                <div className="relative flex items-center rounded-full bg-[#081914]/80 border border-emerald/15">
                  <Search className="ml-4 h-4 w-4 text-[#AEB8B3]/50 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setIsSearchOpen(true); }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Search products..."
                    className="w-full bg-transparent px-3 py-2.5 text-sm text-[#F7F7F3] placeholder:text-[#AEB8B3]/40 outline-none"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => { setSearchQuery(""); inputRef.current?.focus(); }}
                      className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg text-[#AEB8B3]/50 hover:text-[#AEB8B3] transition-colors shrink-0"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D2820]/60 border border-emerald/10 text-[#AEB8B3]/50 hover:text-[#AEB8B3] transition-colors shrink-0">
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Desktop Search Results */}
                {isSearchOpen && searchQuery.trim() && (
                  <div
                    className="absolute top-full mt-2 w-full rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
                    style={{
                      backgroundColor: "rgba(10, 22, 19, 0.95)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid #18362D",
                    }}
                  >
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleSelectResult(product.id)}
                            className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#18362D]/40 transition-colors text-left group"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: "#0D2820" }}>
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={40}
                                height={40}
                                quality={60}
                                loading="lazy"
                                className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate group-hover:text-[#B0E4CC] transition-colors">
                                {product.title}
                              </p>
                              <p className="text-[10px] text-[#6B7280] capitalize">{product.category}</p>
                            </div>
                            <span className="text-sm font-semibold shrink-0" style={{ color: "#B0E4CC" }}>
                              ${product.price}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-sm text-[#6B7280]">No products found for &lsquo;{searchQuery}&rsquo;</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-[#F7F7F3]/60 hover:text-[#F7F7F3] hover:bg-white/5 transition-colors"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </button>
              <Link href="/account" className="flex h-9 w-9 items-center justify-center rounded-full text-[#F7F7F3]/60 hover:text-[#F7F7F3] hover:bg-white/5 transition-colors" aria-label="Account">
                <User className="h-[18px] w-[18px]" />
              </Link>
              <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#F7F7F3]/60 hover:text-[#F7F7F3] hover:bg-white/5 transition-colors" aria-label="Cart">
                <div ref={cartIconRef} id="nav-cart-icon" className="flex items-center justify-center">
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald px-1 text-[9px] font-bold text-[#020908]">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop: Navigation Links */}
          {!scrolled && (
            <nav className="hidden lg:block border-t border-emerald/8">
              <div className="flex items-center gap-8 px-12 max-w-7xl mx-auto py-2.5">
                {[
                  { label: "Shop", href: "/products" },
                  { label: "Collections", href: "/collections", badge: "NEW" },
                  { label: "New Arrivals", href: "/new-arrivals" },
                  { label: "Sale", href: "/sale" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative text-sm font-medium text-[#F7F7F3]/60 hover:text-[#B0E4CC] transition-colors duration-200"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-emerald px-1.5 py-0.5 text-[8px] font-bold text-[#020908] leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[92px] lg:h-[120px]" />

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Mobile Search Modal */}
      {mobileSearchOpen && (
        <div className="fixed inset-x-0 top-0 z-50 md:hidden">
          <div
            className="w-full border-b"
            style={{
              backgroundColor: "rgba(8, 24, 20, 0.97)",
              backdropFilter: "blur(24px)",
              borderColor: "#18362D",
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <Search className="h-4 w-4 shrink-0" style={{ color: "#6B7280" }} />
              <input
                ref={mobileInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#6B7280]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
                    setMobileSearchOpen(false);
                    setSearchQuery("");
                  }
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="shrink-0">
                  <X className="h-4 w-4" style={{ color: "#6B7280" }} />
                </button>
              )}
              <button
                onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }}
                className="text-xs font-medium shrink-0"
                style={{ color: "#408A71" }}
              >
                Cancel
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="overflow-hidden border-t" style={{ borderColor: "#18362D" }}>
                <div className="max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleSelectResult(product.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left hover:bg-[#18362D]/30"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: "#0D2820" }}>
                            <Image
                              src={product.image}
                              alt={product.title}
                              width={48}
                              height={48}
                              quality={60}
                              loading="lazy"
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{product.title}</p>
                            <p className="text-[11px] capitalize" style={{ color: "#6B7280" }}>{product.category}</p>
                          </div>
                          <span className="text-sm font-semibold shrink-0" style={{ color: "#B0E4CC" }}>
                            ${product.price}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm" style={{ color: "#6B7280" }}>No products found for &lsquo;{searchQuery}&rsquo;</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

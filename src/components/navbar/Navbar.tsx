"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Search } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HamburgerButton from "./HamburgerButton";
import CartIcon from "./CartIcon";
import ProfileIcon from "./ProfileIcon";
import ThemeToggle from "./ThemeToggle";
import WishlistIcon from "./WishlistIcon";
import MobileMenu from "./MobileMenu";
import PillContainer from "./PillContainer";
import { useSearch } from "@/context/SearchContext";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Collections", href: "/menu", badge: "NEW" },
  { label: "New Arrivals", href: "/products" },
  { label: "Sale", href: "/products" },
];

export default function Navbar() {
  const { isScrolled } = useScrollDirection(50);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { query, setQuery } = useSearch();

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-30"
        initial={false}
        animate={{ y: 0 }}
      >
        {/* ─── Full-width top bar (initial state) ─── */}
        <motion.div
          className="absolute inset-0 transition-all duration-500 ease-out"
          animate={{
            opacity: isScrolled ? 0 : 1,
            pointerEvents: isScrolled ? ("none" as const) : ("auto" as const),
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-[#020605]/80 backdrop-blur-xl border-b border-[#18362D]/50">
            <div className="flex items-center gap-4 px-5 py-3 sm:px-8 lg:px-12 max-w-7xl mx-auto">
              {/* Mobile: hamburger + logo */}
              <div className="flex items-center gap-2 lg:hidden">
                <HamburgerButton
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
                <Logo collapsed={false} />
              </div>

              {/* Desktop: logo */}
              <div className="hidden lg:block">
                <Logo collapsed={false} />
              </div>

              {/* Desktop: nav links */}
              <nav className="hidden lg:flex items-center gap-1 ml-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white rounded-full hover:bg-white/8 transition-colors"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-1.5 inline-flex items-center rounded-full bg-[#36D399] px-1.5 py-0.5 text-[9px] font-bold text-[#0A1613] leading-none">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>

              {/* Desktop: search */}
              <div className="flex-1 flex justify-center px-4 hidden lg:flex">
                <SearchBar collapsed={false} />
              </div>

              {/* Mobile: search toggle + profile + wishlist + cart */}
              <div className="flex items-center gap-0.5 ml-auto lg:hidden">
                <button
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/8 transition-colors"
                >
                  <Search className="h-[18px] w-[18px]" />
                </button>
                <ProfileIcon />
                <WishlistIcon />
                <CartIcon />
              </div>

              {/* Desktop: profile + cart + theme */}
              <div className="hidden lg:flex items-center gap-0.5">
                <ProfileIcon />
                <CartIcon />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Pill navbar (scrolled state) ─── */}
        <motion.div
          className="flex justify-center px-4 pt-3 sm:px-8"
          initial={false}
          animate={{
            opacity: isScrolled ? 1 : 0,
            y: isScrolled ? 0 : -20,
            pointerEvents: isScrolled ? ("auto" as const) : ("none" as const),
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <PillContainer>
            <Logo collapsed={true} />

            {/* Desktop nav links in pill */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-3 py-1.5 text-[12px] font-medium text-white/50 hover:text-white rounded-full hover:bg-white/8 transition-colors whitespace-nowrap"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1 inline-flex items-center rounded-full bg-[#36D399] px-1 py-0.5 text-[8px] font-bold text-[#0A1613] leading-none">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>

            <SearchBar collapsed={false} />

            <div className="flex items-center gap-0.5 shrink-0">
              <ProfileIcon />
              <CartIcon />
              <span className="hidden lg:block">
                <ThemeToggle />
              </span>
              <HamburgerButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </PillContainer>
        </motion.div>
      </motion.header>

      {/* ─── Mobile expandable search bar ─── */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            className="fixed top-[60px] left-0 right-0 z-30 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-[#020605]/95 backdrop-blur-xl border-b border-[#18362D]/50 px-5 py-3">
              <div className="relative flex items-center rounded-full bg-[#0A1613] border border-[#18362D]">
                <Search className="ml-4 h-4 w-4 text-white/30 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none"
                />
                <button
                  onClick={() => setMobileSearchOpen(false)}
                  className="mr-2 px-3 py-1 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Mobile menu overlay ─── */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}

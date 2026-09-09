"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { FlyToCartProvider } from "@/context/FlyToCartContext";
import LuxeHeader from "@/components/luxe/LuxeHeader";
import MobileBottomNav from "@/components/luxe/MobileBottomNav";

const CartDrawer = dynamic(() => import("@/components/luxe/CartDrawer"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/Footer"), { ssr: false });

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <CartProvider>
        <WishlistProvider>
          <FlyToCartProvider>
            <LuxeHeader />
            <CartDrawer />
            <main className="flex-1 pb-20 lg:pb-0">{children}</main>
            <MobileBottomNav />
            <Footer />
          </FlyToCartProvider>
        </WishlistProvider>
      </CartProvider>
    </SearchProvider>
  );
}

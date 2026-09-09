"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, Package, User } from "lucide-react";

const NAV = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/shop", icon: LayoutGrid },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Orders", href: "/orders", icon: Package },
  { label: "Account", href: "/account", icon: User },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden pointer-events-auto">
      <div className="bg-bg-deep/90 backdrop-blur-md border-t border-border-custom py-2">
        <div className="flex items-center justify-around">
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-300 ${
                  isActive ? "text-emerald" : "text-muted hover:text-luxe-white/60"
                }`}
              >
                <item.icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="text-[9px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

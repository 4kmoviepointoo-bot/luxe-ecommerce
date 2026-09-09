"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3X3, Watch, Droplets, ShoppingBag, Gem } from "lucide-react";

const TABS: { href: string; label: string; icon: React.ElementType; category: string }[] = [
  { href: "/products", label: "All", icon: Grid3X3, category: "all" },
  { href: "/category/watches", label: "Watches", icon: Watch, category: "watches" },
  { href: "/category/perfumes", label: "Perfumes", icon: Droplets, category: "perfumes" },
  { href: "/category/bags", label: "Bags", icon: ShoppingBag, category: "bags" },
  { href: "/category/accessories", label: "Accessories", icon: Gem, category: "accessories" },
];

interface CategoryTabsProps {
  onSelect?: (category: string) => void;
  activeCategory?: string;
}

export default function CategoryTabs({ onSelect, activeCategory }: CategoryTabsProps) {
  const pathname = usePathname();

  const isActive = (tab: typeof TABS[number]) => {
    if (onSelect) {
      return activeCategory === tab.category;
    }
    if (tab.href === "/products") return pathname === "/products";
    return pathname === tab.href || pathname.startsWith(tab.href + "/");
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap px-1 max-w-full">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab);
        const content = (
          <>
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                backgroundColor: active ? "#B0E4CC" : "rgba(10, 22, 19, 0.6)",
                border: active ? "1px solid #B0E4CC" : "1px solid #18362D",
                boxShadow: active ? "0 0 16px rgba(176, 228, 204, 0.3)" : "none",
              }}
            />
            <Icon
              className="relative z-10 h-3.5 w-3.5 transition-colors duration-300"
              style={{ color: active ? "#081814" : "#9CA3AF" }}
            />
            <span
              className="relative z-10 transition-colors duration-300 whitespace-nowrap"
              style={{ color: active ? "#081814" : "#D4D4D8" }}
            >
              {tab.label}
            </span>
          </>
        );

        if (onSelect) {
          return (
            <button
              key={tab.href}
              onClick={() => onSelect(tab.category)}
              className="relative shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full transition-all duration-300"
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="relative shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full transition-all duration-300"
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}

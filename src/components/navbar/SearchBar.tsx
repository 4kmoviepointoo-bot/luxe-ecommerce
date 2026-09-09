"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export default function SearchBar({ collapsed }: { collapsed: boolean }) {
  const { query, setQuery } = useSearch();

  return (
    <div
      className="relative flex items-center transition-all duration-500 ease-out"
      style={{
        width: collapsed ? 0 : "100%",
        opacity: collapsed ? 0 : 1,
        maxWidth: collapsed ? 0 : 480,
        overflow: "hidden",
      }}
    >
      <div className="relative w-full group">
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-50 group-focus-within:opacity-100 group-focus-within:shadow-[0_0_20px_rgba(176,228,204,0.15)] transition-all duration-300" />
        <div className="relative flex items-center rounded-full bg-[#0A1613]/90 backdrop-blur-xl border border-[#18362D]">
          <Search className="ml-4 h-4 w-4 text-white/30 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none"
          />
          <button className="mr-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors shrink-0">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

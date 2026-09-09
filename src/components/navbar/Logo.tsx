"use client";

import Link from "next/link";

export default function Logo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#C9A84C] via-[#E2C66D] to-[#A68B3B] text-[#0A1613] font-bold shadow-[0_0_12px_rgba(201,168,76,0.3)] transition-all duration-500 ease-out"
        style={{
          width: collapsed ? 30 : 36,
          height: collapsed ? 30 : 36,
          fontSize: collapsed ? 13 : 15,
        }}
      >
        L
      </div>
      <span
        className="font-semibold tracking-tight text-white transition-all duration-500 ease-out overflow-hidden whitespace-nowrap"
        style={{
          opacity: collapsed ? 0 : 1,
          width: collapsed ? 0 : "auto",
          maxWidth: collapsed ? 0 : 120,
        }}
      >
        LUXE
      </span>
    </Link>
  );
}

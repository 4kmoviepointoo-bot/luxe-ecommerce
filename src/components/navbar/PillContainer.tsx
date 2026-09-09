"use client";

import { type ReactNode } from "react";

export default function PillContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 rounded-full px-4 py-2 w-full max-w-3xl transition-all duration-500 ease-out
        bg-[#0A1613]/80 border border-[#18362D]/80
        shadow-[0_4px_30px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]
        [backdrop-filter:blur(24px)_saturate(180%)]
        [-webkit-backdrop-filter:blur(24px)_saturate(180%)]"
    >
      {children}
    </div>
  );
}

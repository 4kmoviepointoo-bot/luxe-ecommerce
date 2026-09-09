"use client";

import { User } from "lucide-react";

export default function ProfileIcon() {
  return (
    <a
      href="/auth"
      className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/8 transition-colors"
    >
      <User className="h-[18px] w-[18px]" />
    </a>
  );
}

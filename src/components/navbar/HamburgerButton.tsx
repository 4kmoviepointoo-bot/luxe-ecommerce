"use client";

import { motion } from "framer-motion";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors lg:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="flex flex-col items-center justify-center gap-[5px] w-5">
        <motion.span
          className="block h-[1.5px] w-full origin-center bg-current rounded-full"
          animate={isOpen ? { rotate: 45, y: [0, -6.5, -6.5] } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="block h-[1.5px] w-full origin-center bg-current rounded-full"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[1.5px] w-full origin-center bg-current rounded-full"
          animate={isOpen ? { rotate: -45, y: [0, 6.5, 6.5] } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </button>
  );
}

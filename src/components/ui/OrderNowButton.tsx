"use client";

import { useState, useRef } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";

type Phase = "idle" | "expanding" | "driving" | "success";

function VanSVG({ animate }: { animate: boolean }) {
  return (
    <svg width="64" height="36" viewBox="0 0 64 36" fill="none" className="shrink-0">
      {/* Cargo body */}
      <rect x="16" y="4" width="36" height="22" rx="3" fill="#f59e0b" />
      <rect x="18" y="6" width="32" height="18" rx="2" fill="#fbbf24" />

      {/* Cargo lines */}
      <line x1="28" y1="6" x2="28" y2="24" stroke="#f59e0b" strokeWidth="1" />
      <line x1="40" y1="6" x2="40" y2="24" stroke="#f59e0b" strokeWidth="1" />

      {/* Package icon on side */}
      <rect x="30" y="11" width="8" height="7" rx="1" fill="#fff" fillOpacity="0.4" />
      <line x1="34" y1="11" x2="34" y2="18" stroke="#f59e0b" strokeWidth="0.8" />
      <line x1="30" y1="14.5" x2="38" y2="14.5" stroke="#f59e0b" strokeWidth="0.8" />

      {/* Cabin */}
      <rect x="52" y="10" width="12" height="16" rx="3" fill="#292524" />

      {/* Windshield */}
      <rect x="54" y="12" width="8" height="7" rx="1.5" fill="#7dd3fc" fillOpacity="0.6" />

      {/* Headlight */}
      <motion.circle
        cx="63"
        cy="20"
        r="2"
        fill="#fbbf24"
        animate={animate ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.6 }}
        transition={animate ? { duration: 0.6, repeat: Infinity, ease: "easeInOut" } : {}}
      />

      {/* Bumper */}
      <rect x="52" y="26" width="12" height="3" rx="1.5" fill="#44403c" />

      {/* Rear wheel */}
      <g style={{ transformOrigin: "24px 30px" }}>
        <motion.g
          animate={animate ? { rotate: 360 } : { rotate: 0 }}
          transition={animate ? { duration: 0.4, repeat: Infinity, ease: "linear" } : {}}
          style={{ transformOrigin: "24px 30px" }}
        >
          <circle cx="24" cy="30" r="5.5" fill="#1c1917" />
          <circle cx="24" cy="30" r="3" fill="#57534e" />
          <circle cx="24" cy="30" r="1" fill="#78716c" />
        </motion.g>
      </g>

      {/* Front wheel */}
      <g style={{ transformOrigin: "50px 30px" }}>
        <motion.g
          animate={animate ? { rotate: 360 } : { rotate: 0 }}
          transition={animate ? { duration: 0.4, repeat: Infinity, ease: "linear" } : {}}
          style={{ transformOrigin: "50px 30px" }}
        >
          <circle cx="50" cy="30" r="5.5" fill="#1c1917" />
          <circle cx="50" cy="30" r="3" fill="#57534e" />
          <circle cx="50" cy="30" r="1" fill="#78716c" />
        </motion.g>
      </g>
    </svg>
  );
}

function DepotShutter({ open }: { open: boolean }) {
  return (
    <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="shrink-0">
      {/* Building */}
      <rect x="2" y="2" width="44" height="36" rx="3" fill="#292524" />
      <rect x="4" y="4" width="40" height="32" rx="2" fill="#1c1917" />

      {/* Door frame */}
      <rect x="8" y="8" width="32" height="28" rx="1" fill="#44403c" />

      {/* Shutter slats */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <motion.rect
          key={i}
          x="8"
          y={8 + i * 4}
          width="32"
          height="3.5"
          rx="0.5"
          fill="#57534e"
          initial={{ y: 8 + i * 4 }}
          animate={open ? { y: -20 } : { y: 8 + i * 4 }}
          transition={{
            duration: 0.4,
            delay: i * 0.03,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      {/* "DEPOT" text */}
      <text
        x="24"
        y="6"
        textAnchor="middle"
        fill="#a8a29e"
        fontSize="5"
        fontWeight="bold"
        fontFamily="monospace"
        letterSpacing="1"
      >
        DEPOT
      </text>

      {/* Roof */}
      <path d="M0 2 L24 -4 L48 2" stroke="#44403c" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function OrderNowButton({ onOrderComplete }: { onOrderComplete?: () => void }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const controls = useAnimation();

  const handleClick = async () => {
    if (phase !== "idle") return;

    // Phase 1: Expand to road
    setPhase("expanding");
    await controls.start({
      width: 320,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    // Phase 2: Open shutter + drive van
    setPhase("driving");
    await new Promise((r) => setTimeout(r, 500)); // shutter opens

    // Phase 3: Van drives across
    await new Promise((r) => setTimeout(r, 1400)); // van drives

    // Phase 4: Success
    setPhase("success");
    await controls.start({
      width: 200,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    onOrderComplete?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      animate={controls}
      className="relative h-14 rounded-full overflow-hidden cursor-pointer select-none"
      initial={{ width: 200 }}
      style={{
        background:
          phase === "success"
            ? "#16a34a"
            : phase === "idle"
            ? "#18181b"
            : "#1c1917",
      }}
      whileHover={phase === "idle" ? { scale: 1.03 } : {}}
      whileTap={phase === "idle" ? { scale: 0.97 } : {}}
      transition={{ layout: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      {/* Road track (visible during driving) */}
      {(phase === "expanding" || phase === "driving") && (
        <div className="absolute inset-0 flex items-end pb-0">
          {/* Road surface */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-zinc-800 rounded-full" />

          {/* Road dashes */}
          <motion.div
            className="absolute bottom-[14px] left-0 right-0 flex gap-3 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="h-[2px] w-5 bg-zinc-600 rounded-full shrink-0"
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Phase: Idle — Order Now */}
      {phase === "idle" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-2 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-sm font-semibold tracking-wide text-shimmer">Order Now</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Phase: Expanding — text fades */}
      {phase === "expanding" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm font-semibold text-white tracking-wide">
            Order Now
          </span>
        </motion.div>
      )}

      {/* Phase: Driving — depot + van */}
      {phase === "driving" && (
        <div className="absolute inset-0 flex items-center overflow-hidden">
          {/* Depot shutter */}
          <motion.div
            className="absolute left-0 bottom-0 z-10"
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DepotShutter open={true} />
          </motion.div>

          {/* Van driving across */}
          <motion.div
            className="absolute bottom-1 z-20"
            initial={{ x: 30 }}
            animate={{ x: 280 }}
            transition={{
              duration: 1.4,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <VanSVG animate={true} />
          </motion.div>
        </div>
      )}

      {/* Phase: Success — checkmark */}
      {phase === "success" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-2 text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          >
            <motion.circle
              cx="9"
              cy="9"
              r="8"
              stroke="white"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.path
              d="M5.5 9.5L8 12L12.5 6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.svg>
          <span className="text-sm font-semibold tracking-wide">Order Placed</span>
        </motion.div>
      )}
    </motion.button>
  );
}

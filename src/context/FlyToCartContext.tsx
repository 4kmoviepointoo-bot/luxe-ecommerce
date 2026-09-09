"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import Image from "next/image";

interface FlyItem {
  id: string;
  image: string;
  startX: number;
  startY: number;
}

interface FlyToCartContextValue {
  triggerFly: (item: { id: string; image: string; startRect: DOMRect }) => void;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  isFlying: boolean;
}

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return ctx;
}

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const [flyItem, setFlyItem] = useState<FlyItem | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  const triggerFly = useCallback(
    (item: { id: string; image: string; startRect: DOMRect }) => {
      if (isFlying) return;

      const cartEl = cartIconRef.current;
      if (!cartEl) return;

      const cartRect = cartEl.getBoundingClientRect();
      const startX = item.startRect.left + item.startRect.width / 2;
      const startY = item.startRect.top + item.startRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;

      setFlyItem({
        id: item.id + "-" + Date.now(),
        image: item.image,
        startX,
        startY,
      });
      setIsFlying(true);

      // Animate using requestAnimationFrame for smooth parabolic path
      const duration = 800;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const ease = 1 - Math.pow(1 - progress, 3);

        const currentX = startX + (endX - startX) * ease;
        const peakY = Math.min(startY, endY) - 100;
        // Parabolic: y = a*t^2 + b*t + c
        const parabolicY =
          startY +
          (peakY - startY) * 4 * progress * (1 - progress) +
          (endY - startY) * progress;

        const scale = 1 - 0.8 * ease;
        const opacity = 1 - 0.7 * ease;

        // Update DOM directly for performance
        const el = document.getElementById("fly-to-cart-item");
        if (el) {
          el.style.transform = `translate(${currentX}px, ${parabolicY}px) scale(${scale})`;
          el.style.opacity = String(opacity);
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete - trigger cart bounce
          setCartBounce(true);
          setTimeout(() => setCartBounce(false), 400);
          setTimeout(() => {
            setFlyItem(null);
            setIsFlying(false);
          }, 100);
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [isFlying]
  );

  return (
    <FlyToCartContext.Provider value={{ triggerFly, cartIconRef, isFlying }}>
      {children}

      {/* Flying element overlay */}
      {flyItem && (
        <div
          id="fly-to-cart-item"
          className="fixed top-0 left-0 z-[9999] pointer-events-none"
          style={{
            transform: `translate(${flyItem.startX}px, ${flyItem.startY}px) scale(1)`,
            willChange: "transform, opacity",
          }}
        >
          <div className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-br from-deep-green to-bg-deep border border-emerald/30 shadow-[0_8px_30px_rgba(139,232,167,0.3)] overflow-hidden flex items-center justify-center">
            <Image
              src={flyItem.image}
              alt=""
              width={40}
              height={40}
              quality={60}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
              }}
            />
          </div>
        </div>
      )}

      {/* Cart bounce effect */}
      {cartBounce && (
        <style>{`
          @keyframes cartBounce {
            0% { transform: scale(1); }
            30% { transform: scale(1.35); }
            50% { transform: scale(0.9); }
            70% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          #nav-cart-icon {
            animation: cartBounce 0.4s ease-out;
          }
        `}</style>
      )}
    </FlyToCartContext.Provider>
  );
}

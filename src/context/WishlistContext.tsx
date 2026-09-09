"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase/client";
import { PRODUCTS } from "@/data/products";

interface WishlistContextType {
  ids: string[];
  toggle: (productId: string) => Promise<void>;
  has: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

function localLoad(): string[] {
  try {
    const raw = localStorage.getItem("luxe-wishlist");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function localSave(ids: string[]) {
  localStorage.setItem("luxe-wishlist", JSON.stringify(ids));
}

async function ensureProductInDB(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    console.warn("Product not found in local data:", productId);
    return;
  }

  console.log("Upserting product to DB:", product.id, product.title);
  const { data, error } = await supabase.from("products").upsert(
    {
      id: product.id,
      slug: product.slug,
      name: product.title,
      category: product.category,
      price: product.price,
      original_price: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge ?? null,
      image_url: product.image,
      colors: product.colors,
      sizes: product.sizes,
      description: product.description,
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Product Upsert Error:", error.message, error.details);
  } else {
    console.log("Product upserted OK:", data);
  }
}

function notifyWishlistChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("wishlist-changed"));
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const uid = data.session?.user?.id ?? null;
      console.log("WishlistContext: initial session user:", uid);
      setUserId(uid);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      console.log("WishlistContext: auth state changed, user:", uid);
      setUserId(uid);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("WishlistContext: hydrating from Supabase for user:", userId);
      supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", userId)
        .then(({ data, error }) => {
          if (error) {
            console.error("Wishlist Hydrate Error:", error.message);
          } else if (data) {
            console.log("Wishlist Hydrated:", data.length, "items");
            setIds(data.map((r) => r.product_id));
          }
          setLoaded(true);
        });
    } else {
      setIds(localLoad());
      setLoaded(true);
    }
  }, [userId]);

  useEffect(() => {
    if (!loaded) return;
    if (!userId) localSave(ids);
  }, [ids, loaded, userId]);

  useEffect(() => {
    mountedRef.current = true;
  }, []);

  const toggle = useCallback(
    async (productId: string) => {
      console.log("Toggling wishlist for product:", productId);

      const wasWishlisted = ids.includes(productId);
      setIds((prev) =>
        wasWishlisted
          ? prev.filter((i) => i !== productId)
          : [...prev, productId],
      );

      if (!userId) {
        console.log("No user logged in, localStorage only");
        notifyWishlistChanged();
        return;
      }

      if (wasWishlisted) {
        console.log("Removing from wishlist:", productId);
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", userId)
          .eq("product_id", productId);

        if (error) {
          console.error("Wishlist Delete Error:", error.message, error.details);
        } else {
          console.log("Wishlist item deleted OK");
        }
      } else {
        console.log("Adding to wishlist:", productId);
        await ensureProductInDB(productId);

        const { error } = await supabase.from("wishlist").insert({
          user_id: userId,
          product_id: productId,
        });

        if (error) {
          console.error("Wishlist Insert Error:", error.message, error.details);
        } else {
          console.log("Wishlist item inserted OK");
        }
      }

      notifyWishlistChanged();
    },
    [userId, ids],
  );

  const has = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, loading: !loaded }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx)
    throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

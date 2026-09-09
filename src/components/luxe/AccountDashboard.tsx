"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Mail,
  Edit3,
  Sparkles,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";

interface SupabaseUser {
  id: string;
  email?: string;
  last_sign_in_at?: string;
  created_at?: string;
  user_metadata?: Record<string, unknown>;
}

interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  email?: string;
}

interface Order {
  id: string;
  product_name: string;
  price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  quantity?: number;
}

interface DashboardData {
  orders: Order[];
}

const tabs = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusConfig: Record<
  string,
  { color: string; bg: string; icon: typeof CheckCircle; label: string }
> = {
  pending: {
    color: "#6B7280",
    bg: "rgba(107,114,128,0.15)",
    icon: Clock,
    label: "Pending",
  },
  processing: {
    color: "#D8A94A",
    bg: "rgba(216,169,74,0.15)",
    icon: Loader2,
    label: "Processing",
  },
  shipped: {
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.15)",
    icon: Truck,
    label: "Shipped",
  },
  delivered: {
    color: "#408A71",
    bg: "rgba(64,138,113,0.15)",
    icon: CheckCircle,
    label: "Delivered",
  },
  cancelled: {
    color: "#EF4444",
    bg: "rgba(239,68,68,0.15)",
    icon: X,
    label: "Cancelled",
  },
};

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div
        className="h-16 w-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: "#050D0B", border: "1px solid #18362D" }}
      >
        <Icon className="h-7 w-7" style={{ color: "#408A71" }} />
      </div>
      <h3
        className="text-lg font-bold mb-1"
        style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
      >
        {title}
      </h3>
      <p className="text-sm text-center mb-6 max-w-xs" style={{ color: "#6B7280" }}>
        {description}
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
        style={{
          backgroundColor: "#1B3E33",
          border: "1px solid rgba(64,138,113,0.3)",
          color: "#FFFFFF",
        }}
      >
        <ShoppingBag className="h-4 w-4" />
        Explore Collections
      </Link>
    </div>
  );
}

function LoadingSpinner({ color = "#408A71" }: { color?: string }) {
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin" style={{ color }} />
    </div>
  );
}

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-3 p-4 rounded-xl mb-6"
      style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
    >
      <AlertCircle className="h-5 w-5 shrink-0" style={{ color: "#EF4444" }} />
      <p className="text-sm flex-1" style={{ color: "#FCA5A5" }}>
        {message}
      </p>
      <button onClick={onDismiss} className="p-1 rounded-lg cursor-pointer" style={{ color: "#EF4444" }}>
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export default function AccountDashboard({
  user,
  profile,
}: {
  user: SupabaseUser;
  profile: Profile | null;
}) {
  const router = useRouter();
  const { ids: wishlistIds, toggle: toggleWishlist, loading: wishlistLoading } = useWishlist();
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData>({
    orders: [],
  });

  const displayName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    user.email?.split("@")[0] ||
    "there";

  const avatarUrl =
    profile?.avatar_url ||
    (user.user_metadata?.avatar_url as string) ||
    (user.user_metadata?.picture as string) ||
    null;

  const fetchUserData = useCallback(async () => {
    try {
      console.log("AccountDashboard: fetching orders for:", user.id);
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (ordersError) {
        console.error("Orders fetch error:", ordersError.message);
      }

      setData({
        orders: ordersData || [],
      });
      setError(null);
    } catch (err) {
      console.error("Failed to fetch account data:", err);
      setError("Failed to load your data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchUserData();

    const channel = supabase
      .channel("account-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` },
        (payload: { eventType: string }) => {
          console.log("Orders Realtime Event:", payload.eventType);
          fetchUserData();
        },
      )
      .subscribe((status: string) => {
        console.log("Realtime subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.id, fetchUserData]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-12" style={{ backgroundColor: "#06120e" }}>
      <div className="max-w-4xl mx-auto">
        {/* Error Banner */}
        <AnimatePresence>
          {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center overflow-hidden shrink-0"
              style={{ backgroundColor: "#1B3E33", border: "2px solid #408A71" }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6" style={{ color: "#B0E4CC" }} />
              )}
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
              >
                Welcome back, {displayName}
              </h1>
              <p className="text-sm" style={{ color: "#6B7280" }}>
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer hover:scale-[1.02]"
            style={{ backgroundColor: "#0A1613", border: "1px solid #18362D", color: "#EF4444" }}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 mb-8"
        >
          {[
            {
              label: "Orders",
              value: data.orders.length,
              icon: ShoppingBag,
              color: "#408A71",
              tab: "orders",
            },
            {
              label: "Wishlist",
              value: wishlistIds.length,
              icon: Heart,
              color: "#D8A94A",
              tab: "wishlist",
            },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setActiveTab(stat.tab)}
              className="rounded-xl p-4 sm:p-5 text-left transition-all cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: activeTab === stat.tab ? "#0D2820" : "#0A1613",
                border: `1px solid ${activeTab === stat.tab ? "#408A71" : "#18362D"}`,
              }}
            >
              <stat.icon className="h-5 w-5 mb-2" style={{ color: stat.color }} />
              <p className="text-xl sm:text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin inline" style={{ color: "#6B7280" }} />
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider" style={{ color: "#6B7280" }}>
                {stat.label}
              </p>
            </button>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer"
              style={{
                backgroundColor: activeTab === tab.id ? "#1B3E33" : "#0A1613",
                border: `1px solid ${activeTab === tab.id ? "#408A71" : "#18362D"}`,
                color: activeTab === tab.id ? "#B0E4CC" : "#6B7280",
              }}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#0A1613", border: "1px solid #18362D" }}
            >
              <div className="p-5 sm:p-6" style={{ borderBottom: "1px solid #18362D" }}>
                <h2 className="text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
                  My Orders
                </h2>
              </div>
              {loading ? (
                <LoadingSpinner />
              ) : data.orders.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="No orders yet"
                  description="Your order history will appear here after your first purchase."
                />
              ) : (
                <div>
                  {data.orders.map((order, i) => {
                    const status = statusConfig[order.status] || statusConfig.pending;
                    const StatusIcon = status.icon;
                    return (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-5 sm:p-6 transition-colors cursor-pointer hover:bg-[#0D2820]"
                        style={{
                          borderBottom: i < data.orders.length - 1 ? "1px solid #18362D" : "none",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: status.bg }}
                          >
                            <StatusIcon
                              className={`h-5 w-5 ${order.status === "processing" ? "animate-spin" : ""}`}
                              style={{ color: status.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
                              {order.product_name}
                            </p>
                            <p className="text-xs" style={{ color: "#6B7280" }}>
                              #{order.id.slice(0, 8)} &middot;{" "}
                              {new Date(order.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                              ${order.price.toFixed(2)}
                            </p>
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: status.bg, color: status.color }}
                            >
                              {status.label}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4" style={{ color: "#6B7280" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#0A1613", border: "1px solid #18362D" }}
            >
              <div className="p-5 sm:p-6" style={{ borderBottom: "1px solid #18362D" }}>
                <h2 className="text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}>
                  My Wishlist
                </h2>
              </div>
              {wishlistLoading ? (
                <LoadingSpinner color="#D8A94A" />
              ) : wishlistIds.length === 0 ? (
                <EmptyState
                  icon={Heart}
                  title="Your wishlist is empty"
                  description="Save items you love to revisit them later."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 sm:p-6">
                  {wishlistIds.map((productId) => {
                    const product = PRODUCTS.find((p) => p.id === productId);
                    return (
                      <Link
                        key={productId}
                        href={`/products/${productId}`}
                        className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-[#0D2820]"
                        style={{ backgroundColor: "#050D0B", border: "1px solid #18362D" }}
                      >
                        <div
                          className="h-16 w-16 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
                          style={{ backgroundColor: "#0A1613" }}
                        >
                          {product ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Heart className="h-6 w-6" style={{ color: "#D8A94A" }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: "#FFFFFF" }}>
                            {product?.title || productId}
                          </p>
                          <p className="text-sm font-semibold mt-1" style={{ color: "#D8A94A" }}>
                            ${product?.price || 0}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(productId);
                          }}
                          className="p-2 rounded-lg transition-colors hover:bg-red-500/10 cursor-pointer shrink-0"
                          title="Remove from wishlist"
                        >
                          <X className="h-4 w-4" style={{ color: "#EF4444" }} />
                        </button>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl p-5 sm:p-6"
              style={{ backgroundColor: "#0A1613", border: "1px solid #18362D" }}
            >
              <h2
                className="text-lg font-bold mb-6"
                style={{ color: "#FFFFFF", fontFamily: "Georgia, serif" }}
              >
                Account Settings
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Full Name",
                    value: profile?.full_name || (user.user_metadata?.full_name as string) || "Not set",
                    icon: User,
                  },
                  { label: "Email", value: user.email || "Not set", icon: Mail },
                  { label: "Phone", value: profile?.phone || "Not set", icon: Mail },
                  {
                    label: "User ID",
                    value: user.id.slice(0, 16) + "...",
                    icon: Settings,
                  },
                  {
                    label: "Member Since",
                    value: user.created_at
                      ? new Date(user.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A",
                    icon: Clock,
                  },
                  {
                    label: "Last Sign In",
                    value: user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleString()
                      : "N/A",
                    icon: CheckCircle,
                  },
                ].map((field) => (
                  <div
                    key={field.label}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ backgroundColor: "#050D0B", border: "1px solid #18362D" }}
                  >
                    <div className="flex items-center gap-3">
                      <field.icon className="h-4 w-4" style={{ color: "#6B7280" }} />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider" style={{ color: "#6B7280" }}>
                          {field.label}
                        </p>
                        <p className="text-sm font-mono" style={{ color: "#FFFFFF" }}>
                          {field.value}
                        </p>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded-lg transition-colors cursor-pointer hover:bg-[#0A1613]"
                      style={{ color: "#6B7280" }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Package, ChevronRight, CheckCircle, Clock, Truck, MapPin } from "lucide-react";

const MOCK_ORDERS = [
  {
    id: "LX-4K8J2P",
    date: "2026-08-15",
    total: 349.99,
    status: "Delivered",
    items: [
      { name: "Midnight Noir Chronograph", qty: 1, price: 289.99, image: "/products/watch-1.jpg" },
      { name: "Emerald Silk Pocket Square", qty: 1, price: 60.00, image: "/products/bag-3.jpg" },
    ],
  },
  {
    id: "LX-7M9N3R",
    date: "2026-08-28",
    total: 189.99,
    status: "In Transit",
    items: [
      { name: "Velvet Oud Eau de Parfum", qty: 1, price: 189.99, image: "/products/perfume-2.jpg" },
    ],
  },
  {
    id: "LX-2P5Q8T",
    date: "2026-09-01",
    total: 524.98,
    status: "Processing",
    items: [
      { name: "Heritage Leather Weekender", qty: 1, price: 349.99, image: "/products/bag-1.jpg" },
      { name: "Titanium Cuff Links", qty: 1, price: 174.99, image: "/products/accessory-1.jpg" },
    ],
  },
];

const STATUS_CONFIG = {
  Delivered: { icon: CheckCircle, color: "#408A71", bg: "rgba(64,138,113,0.15)" },
  "In Transit": { icon: Truck, color: "#F59E0B", bg: "rgba(245,158,11,0.15)" },
  Processing: { icon: Clock, color: "#8BE8A7", bg: "rgba(139,232,167,0.15)" },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function OrdersPage() {
  return (
    <div className="pt-4 pb-20 lg:pb-0" style={{ backgroundColor: "#081814" }}>
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-12 lg:max-w-7xl">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-luxe-white">My Orders</h1>
          <p className="text-xs text-muted mt-1">Track your purchases</p>
        </motion.div>

        {MOCK_ORDERS.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div
              className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: "rgba(64,138,113,0.12)" }}
            >
              <Package className="h-7 w-7" style={{ color: "#408A71" }} />
            </div>
            <p className="text-sm mb-1" style={{ color: "#FFFFFF" }}>
              No orders yet
            </p>
            <p className="text-xs" style={{ color: "#6B7280" }}>
              Your order history will appear here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order, idx) => {
              const statusCfg = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
              const StatusIcon = statusCfg.icon;
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "#0A1613",
                    border: "1px solid rgba(64,138,113,0.2)",
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(64,138,113,0.12)" }}>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                        Order {order.id}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                      style={{ backgroundColor: statusCfg.bg }}
                    >
                      <StatusIcon className="h-3 w-3" style={{ color: statusCfg.color }} />
                      <span className="text-[11px] font-medium" style={{ color: statusCfg.color }}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="h-12 w-12 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden"
                            style={{ backgroundColor: "#0D2820" }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={48}
                              height={48}
                              quality={60}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate" style={{ color: "#FFFFFF" }}>
                              {item.name}
                            </p>
                            <p className="text-[11px]" style={{ color: "#6B7280" }}>
                              Qty: {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-medium" style={{ color: "#B0E4CC" }}>
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between mt-4 pt-4 border-t"
                      style={{ borderColor: "rgba(64,138,113,0.12)" }}
                    >
                      <div>
                        <p className="text-[11px]" style={{ color: "#6B7280" }}>
                          Total
                        </p>
                        <p className="text-base font-bold" style={{ color: "#FFFFFF" }}>
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <button
                        className="flex items-center gap-1 text-xs font-medium transition-colors"
                        style={{ color: "#408A71" }}
                      >
                        View Details
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

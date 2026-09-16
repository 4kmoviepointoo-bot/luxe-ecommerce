import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap", preload: true });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap", preload: true });

const SITE_URL = "https://ecomerence-jade.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LUXE — Premium Luxury Shopping | Watches, Perfumes, Bags & Accessories",
    template: "%s | LUXE — Premium Luxury Shopping",
  },
  description:
    "Discover LUXE — your destination for premium luxury watches, perfumes, bags, and accessories. Curated collections, free express shipping, and 2-year warranty on every piece.",
  keywords: [
    "luxury watches",
    "premium perfumes",
    "designer bags",
    "luxury accessories",
    "premium e-commerce",
    "luxury shopping online",
    "high-end watches",
    "designer fragrance",
    "leather bags",
    "luxury gift shop",
  ],
  authors: [{ name: "LUXE" }],
  creator: "LUXE",
  publisher: "LUXE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "LUXE — Premium Luxury Shopping",
    title: "LUXE — Premium Luxury Shopping | Watches, Perfumes, Bags & Accessories",
    description:
      "Discover LUXE — your destination for premium luxury watches, perfumes, bags, and accessories. Curated collections, free express shipping, and 2-year warranty.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LUXE — Premium Luxury Shopping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE — Premium Luxury Shopping",
    description:
      "Discover LUXE — your destination for premium luxury watches, perfumes, bags, and accessories.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

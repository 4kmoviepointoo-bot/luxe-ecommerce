import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import ProductDetailClient from "@/components/luxe/ProductDetailClient";

const SITE_URL = "https://ecomerence-jade.vercel.app";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return { title: "Product Not Found | LUXE" };
  }
  const price = product.price;
  const title = `${product.title} — Premium ${product.category} | LUXE`;
  const description = `${product.description} Shop now at LUXE for $${price}. Free express shipping, 2-year warranty, and 30-day returns.`;
  return {
    title,
    description,
    keywords: [product.title, product.category, "luxury", "premium", "LUXE"],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${product.id}`,
      images: [{ url: product.image, width: 800, height: 800, alt: product.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
    alternates: { canonical: `${SITE_URL}/products/${product.id}` },
  };
}

export default function ProductPage() {
  return <ProductDetailClient />;
}

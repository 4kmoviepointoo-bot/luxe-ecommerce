import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/account", "/orders", "/wishlist", "/checkout", "/auth", "/cart", "/order-success"],
      },
    ],
    sitemap: "https://ecomerence-jade.vercel.app/sitemap.xml",
  };
}

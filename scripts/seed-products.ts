import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";
import { PRODUCTS } from "../src/data/products";

const envRaw = readFileSync(join(__dirname, "../.env.local"), "utf-8");
const env: Record<string, string> = {};
envRaw.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) env[key.trim()] = rest.join("=").trim();
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

async function seed() {
  console.log("Upserting products...");

  const rows = PRODUCTS.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.title,
    category: p.category,
    price: p.price,
    original_price: p.originalPrice,
    rating: p.rating,
    reviews: p.reviews,
    badge: p.badge ?? null,
    image_url: p.image,
    colors: p.colors,
    sizes: p.sizes,
    description: p.description,
  }));

  const { data, error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("Failed:", error.message);
    console.error("\n→ Run scripts/setup-tables.sql in Supabase SQL Editor first.");
    process.exit(1);
  }

  console.log(`✓ ${rows.length} products upserted.`);
}

seed();

export type Category = "all" | "watches" | "perfumes" | "bags" | "accessories";

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge?: "New Arrival" | "Best Seller" | "Trending" | "Sale";
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
}

export const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: "all", label: "All", icon: "grid" },
  { value: "watches", label: "Watches", icon: "watch" },
  { value: "perfumes", label: "Perfumes", icon: "droplets" },
  { value: "bags", label: "Bags", icon: "shopping-bag" },
  { value: "accessories", label: "Accessories", icon: "gem" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "rosegold-chronograph",
    title: "Rosegold Chronograph",
    category: "watches",
    price: 599,
    originalPrice: 750,
    rating: 4.9,
    reviews: 2400,
    badge: "Best Seller",
    image: "/products/WATCH 1.jpg",
    colors: ["#D8A94A", "#1a1a1a", "#C0C0C0"],
    sizes: ["One Size"],
    description:
      "Swiss-movement chronograph in a rosegold titanium case with sapphire crystal glass. Water-resistant to 100m with genuine leather strap.",
  },
  {
    id: "2",
    slug: "noir-intense-eau-de-parfum",
    title: "Noir Intense Eau de Parfum",
    category: "perfumes",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviews: 1850,
    badge: "Trending",
    image: "/products/PERFUME 1.jpg",
    colors: ["#1a1a1a", "#0D2820", "#D8A94A"],
    sizes: ["50ml", "100ml"],
    description:
      "A bold oriental fragrance with notes of black oud, amber, and vanilla. Long-lasting 12-hour formula in a hand-crafted crystal bottle.",
  },
  {
    id: "3",
    slug: "minimal-italian-tote",
    title: "Minimal Italian Tote",
    category: "bags",
    price: 289,
    originalPrice: 349,
    rating: 4.9,
    reviews: 3200,
    badge: "Best Seller",
    image: "/products/BAGS 1.jpg",
    colors: ["#1a1a1a", "#8B7355", "#D2B48C"],
    sizes: ["One Size"],
    description:
      "Handcrafted from premium Italian full-grain leather. Structured silhouette with reinforced handles and magnetic snap closure.",
  },
  {
    id: "4",
    slug: "titanium-diver-watch",
    title: "Titanium Diver Watch",
    category: "watches",
    price: 899,
    originalPrice: 1100,
    rating: 4.9,
    reviews: 980,
    badge: "New Arrival",
    image: "/products/WATCH 2.jpg",
    colors: ["#78716c", "#1a1a1a", "#d4d4d8"],
    sizes: ["One Size"],
    description:
      "Professional dive watch with 300m water resistance. Titanium case with ceramic bezel and superluminova indices.",
  },
  {
    id: "5",
    slug: "velvet-rose-eau-de-toilette",
    title: "Velvet Rose Eau de Toilette",
    category: "perfumes",
    price: 119,
    originalPrice: 149,
    rating: 4.7,
    reviews: 1420,
    badge: "Trending",
    image: "/products/PERFUME 2.jpg",
    colors: ["#8B4557", "#1a1a1a", "#D8A94A"],
    sizes: ["30ml", "50ml"],
    description:
      "An elegant floral fragrance with Bulgarian rose, peony, and white musk. Perfect for evening occasions.",
  },
  {
    id: "6",
    slug: "leather-crossbody-bag",
    title: "Leather Crossbody Bag",
    category: "bags",
    price: 199,
    originalPrice: 269,
    rating: 4.8,
    reviews: 1100,
    badge: "Trending",
    image: "/products/BAGS2.jpg",
    colors: ["#1a1a1a", "#8B7355", "#C4A882"],
    sizes: ["One Size"],
    description:
      "Compact crossbody in smooth calfskin leather. Adjustable strap, multiple compartments, and gold-tone hardware.",
  },
  {
    id: "7",
    slug: "heritage-dress-watch",
    title: "Heritage Dress Watch",
    category: "watches",
    price: 449,
    originalPrice: 550,
    rating: 4.8,
    reviews: 745,
    badge: "Best Seller",
    image: "/products/WATCH 3.jpg",
    colors: ["#D8A94A", "#1a1a1a", "#F7F7F3"],
    sizes: ["One Size"],
    description:
      "Classic dress watch with slim profile and enamel dial. Swiss quartz movement with genuine alligator strap.",
  },
  {
    id: "8",
    slug: "emerald-oud-parfum",
    title: "Emerald Oud Parfum",
    category: "perfumes",
    price: 249,
    originalPrice: 320,
    rating: 4.9,
    reviews: 890,
    badge: "Sale",
    image: "/products/PERUME 3.jpg",
    colors: ["#173C2D", "#1a1a1a", "#D8A94A"],
    sizes: ["50ml", "100ml", "150ml"],
    description:
      "Exclusive oud-based parfum with emerald moss, sandalwood, and bergamot. Presented in a hand-blown emerald glass bottle.",
  },
  {
    id: "9",
    slug: "executive-travel-bag",
    title: "Executive Travel Bag",
    category: "bags",
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    reviews: 620,
    badge: "New Arrival",
    image: "/products/BAGS 3.jpg",
    colors: ["#1a1a1a", "#292524", "#78716c"],
    sizes: ["One Size"],
    description:
      "Premium travel duffle in water-resistant nylon with leather trim. Padded laptop sleeve and brass hardware.",
  },
  {
    id: "10",
    slug: "leather-card-holder",
    title: "Leather Card Holder",
    category: "accessories",
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    reviews: 1200,
    badge: "Trending",
    image: "/products/ACCESORY 1.jpg",
    colors: ["#1a1a1a", "#8B7355", "#D8A94A"],
    sizes: ["One Size"],
    description:
      "Slim card holder in Saffiano leather with 6 card slots and a central compartment. Gold-tone LUXE logo.",
  },
  {
    id: "11",
    slug: "aviator-sunglasses",
    title: "Aviator Sunglasses",
    category: "accessories",
    price: 189,
    originalPrice: 249,
    rating: 4.8,
    reviews: 950,
    badge: "Best Seller",
    image: "/products/ACCESORY 2.jpg",
    colors: ["#D8A94A", "#C0C0C0", "#1a1a1a"],
    sizes: ["One Size"],
    description:
      "Classic aviator frame in titanium with polarized CR-39 lenses. UV400 protection with spring hinges.",
  },
  {
    id: "12",
    slug: "silk-pocket-square",
    title: "Silk Pocket Square",
    category: "accessories",
    price: 59,
    originalPrice: 79,
    rating: 4.5,
    reviews: 680,
    image: "/products/ACCESORY 3.jpg",
    colors: ["#D8A94A", "#173C2D", "#F7F7F3"],
    sizes: ["One Size"],
    description:
      "Hand-rolled Italian silk pocket square with geometric emerald and gold pattern. Adds a refined touch to any suit.",
  },
];

export const PRODUCT_IMAGES = {
  bubblegum: require("../assets/products/bubblegum.png"),
  sundae: require("../assets/products/sundae.png"),
  mango: require("../assets/products/mango.png"),
  hero: require("../assets/products/hero.png"),
};

export type FlavorId = "bubblegum" | "mango" | "sundae";

export type Flavor = {
  id: FlavorId;
  name: string;
  blurb: string;
  price: number;
  rating: number;
  reviews: number;
  tag?: string;
  image: number;
  bg: string;
};

export const FLAVORS: Flavor[] = [
  {
    id: "bubblegum",
    name: "Bubblegum Pink",
    blurb: "Sweet & a little nostalgic",
    price: 4.5,
    rating: 4.9,
    reviews: 128,
    tag: "FAN FAVORITE",
    image: PRODUCT_IMAGES.bubblegum,
    bg: "#FFE5EC",
  },
  {
    id: "mango",
    name: "Mango Sunshine",
    blurb: "A tropical little escape",
    price: 4.5,
    rating: 4.8,
    reviews: 96,
    image: PRODUCT_IMAGES.mango,
    bg: "#FFE6A5",
  },
  {
    id: "sundae",
    name: "Your signature sundae",
    blurb: "Strawberry + Vanilla",
    price: 7.25,
    rating: 4.9,
    reviews: 74,
    image: PRODUCT_IMAGES.sundae,
    bg: "#E0F0DE",
  },
];

export const SIZES = [
  { id: "mini", label: "Mini", detail: "1 small scoop", price: 3.0 },
  { id: "regular", label: "Regular", detail: "1 scoop", price: 4.5 },
  { id: "large", label: "Large", detail: "2 scoops", price: 6.5 },
] as const;

export const TOPPINGS = [
  { id: "sprinkles", label: "Rainbow sprinkles", price: 0.5, icon: "sparkles" },
  { id: "choco", label: "Choco drizzle", price: 0.75, icon: "droplet" },
  { id: "wafer", label: "Wafer roll", price: 0.5, icon: "cookie" },
] as const;

export const SCOOPS = [
  { id: "strawberry", label: "Strawberry", color: "#F79AAA" },
  { id: "vanilla", label: "Vanilla", color: "#F7E5BD" },
  { id: "mango", label: "Mango", color: "#FFC653" },
  { id: "chocolate", label: "Chocolate", color: "#9C6951" },
] as const;

export const HOME_FILTERS = ["All scoops", "Sundaes", "Vegan"] as const;

export const ADDRESS = "Home · 24 Maple Street";
export const DELIVERY_FEE = 1.5;
export const SERVICE_FEE = 0.5;

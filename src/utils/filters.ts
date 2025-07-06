import type { Product } from "../types/Product";

export function filterByPriceRange(
  products: Product[],
  min: number,
  max: number
): Product[] {
  return products.filter((p) => p.price >= min && p.price <= max);
}

export function searchProducts(
  products: Product[],
  query: string
): Product[] {
  return products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
}

export function sortProducts(
  products: Product[],
  key: "title" | "price" | "stock",
  direction: "asc" | "desc"
): Product[] {
  const sorted = [...products].sort((a, b) => {
    let compare = 0;
    if (key === "title") {
      compare = a.title.localeCompare(b.title);
    } else if (key === "price") {
      compare = a.price - b.price;
    } else if (key === "stock") {
      compare = a.stock - b.stock;
    }
    return direction === "asc" ? compare : -compare;
  });
  return sorted;
}
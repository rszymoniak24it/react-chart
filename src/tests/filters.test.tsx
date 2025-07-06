import { filterByPriceRange } from "../utils/filters";
import type { Product } from "../types/Product";

describe("filterByPriceRange", () => {
  const mockProducts: Product[] = [
    { id: 1, title: "Product A", price: 100, stock: 10 },
    { id: 2, title: "Product B", price: 500, stock: 5 },
    { id: 3, title: "Product C", price: 1500, stock: 2 },
  ];

  it("filters products within price range", () => {
    const result = filterByPriceRange(mockProducts, 100, 1000);
    expect(result).toEqual([
      { id: 1, title: "Product A", price: 100, stock: 10 },
      { id: 2, title: "Product B", price: 500, stock: 5 },
    ]);
  });

  it("returns empty array if no products match", () => {
    const result = filterByPriceRange(mockProducts, 2000, 3000);
    expect(result).toEqual([]);
  });

  it("returns all products if min and max cover all", () => {
    const result = filterByPriceRange(mockProducts, 0, 5000);
    expect(result).toEqual(mockProducts);
  });
});

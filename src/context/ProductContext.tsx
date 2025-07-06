import { createContext, useContext } from "react";
import type { Product } from "../types/Product";

export type ProductContextType = {
  products: Product[];
  filtered: Product[];
  setFiltered: (products: Product[]) => void;
  loading: boolean;
  error: string;
  search: string;
  setSearch: (search: string) => void;
};

export const ProductContext = createContext<ProductContextType | null>(null);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
import { useEffect, useState, type ReactNode } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";
import { ProductContext } from "./ProductContext";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFiltered(data);
      } catch (e) {
        setError(`Błąd pobierania danych. ${e}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, filtered, setFiltered, loading, error, search, setSearch }}
    >
      {children}
    </ProductContext.Provider>
  );
}
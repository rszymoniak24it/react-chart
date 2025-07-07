import { useState, useCallback, useMemo } from "react";
import { useProducts } from "../context/ProductContext";
import { searchProducts, sortProducts } from "../utils/filters";
import Pagination from "./Pagination";
import ProductTableSearch from "./ProductTableSearch";
import ProductTableTable from "./ProductTableTable";

export default function ProductTable() {
  const { filtered, loading, error, search, setSearch } = useProducts();
  const [localSearch, setLocalSearch] = useState(search);
  const [sortKey, setSortKey] = useState<"title" | "price" | "stock">("price");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const searched = useMemo(() => searchProducts(filtered, localSearch), [filtered, localSearch]);
  const sorted = useMemo(() => sortProducts(searched, sortKey, sortDirection), [searched, sortKey, sortDirection]);
  const paginated = useMemo(() => sorted.slice((page - 1) * 10, page * 10), [sorted, page]);

  const handleSort = useCallback((key: typeof sortKey) => {
    setSortKey(prev => (prev === key ? prev : key));
    setSortDirection(prev => (sortKey === key ? (prev === "asc" ? "desc" : "asc") : "asc"));
  }, [sortKey]);

  const handleUpdateChart = useCallback(() => setSearch(localSearch), [localSearch, setSearch]);

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ProductTableSearch
        value={localSearch}
        onChange={val => {
          setLocalSearch(val);
          setPage(1);
        }}
        onUpdate={handleUpdateChart}
      />
      <ProductTableTable
        products={paginated}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <Pagination
        page={page}
        totalItems={sorted.length}
        onPageChange={setPage}
      />
    </div>
  );
}
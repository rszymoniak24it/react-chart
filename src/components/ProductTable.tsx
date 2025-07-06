
import { useState, useCallback, useMemo } from "react";
import { useProducts } from "../context/ProductContext";
import { searchProducts, sortProducts } from "../utils/filters";
import Pagination from "./Pagination";
import styles from "../styles/ProductTable.module.scss";

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
      <div className={styles.tableWrapper}>
        <input
          className={styles.searchInput}
          placeholder="Wyszukaj..."
          value={localSearch}
          onChange={e => {
            setLocalSearch(e.target.value);
            setPage(1);
          }}
        />
        <button className={styles.updateButton} onClick={handleUpdateChart}>
          Aktualizuj wykres
        </button>
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>
              Nazwa
              {sortKey === "title" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th onClick={() => handleSort("price")}>
              Cena
              {sortKey === "price" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
            <th onClick={() => handleSort("stock")}>
              Stan magazynowy
              {sortKey === "stock" && (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalItems={sorted.length}
        onPageChange={setPage}
      />
    </div>
  );
}

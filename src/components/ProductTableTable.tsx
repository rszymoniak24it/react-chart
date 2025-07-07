import styles from "../styles/ProductTable.module.scss";
import type { Product } from "../types/Product";

type ProductTableTableProps = {
  products: Product[];
  sortKey: "title" | "price" | "stock";
  sortDirection: "asc" | "desc";
  onSort: (key: "title" | "price" | "stock") => void;
};

export default function ProductTableTable({
  products,
  sortKey,
  sortDirection,
  onSort,
}: ProductTableTableProps) {
  return (
    <table className={styles.productTable}>
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>
            Nazwa
            {sortKey === "title" && (sortDirection === "asc" ? " ▲" : " ▼")}
          </th>
          <th onClick={() => onSort("price")}>
            Cena
            {sortKey === "price" && (sortDirection === "asc" ? " ▲" : " ▼")}
          </th>
          <th onClick={() => onSort("stock")}>
            Stan magazynowy
            {sortKey === "stock" && (sortDirection === "asc" ? " ▲" : " ▼")}
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
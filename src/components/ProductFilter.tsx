import { useState, useCallback } from "react";
import { useProducts } from "../context/ProductContext";
import { filterByPriceRange } from "../utils/filters";
import styles from "../styles/ProductFilter.module.scss";

export default function ProductFilter({ onApply }: { onApply?: () => void }) {
  const { products, setFiltered } = useProducts();
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(5000);

  // useCallback prevents recreating this function on every render
  const applyFilter = useCallback(() => {
    setFiltered(filterByPriceRange(products, min, max));
    onApply?.();
  }, [products, min, max, setFiltered, onApply]);

  return (
    <div className={styles.filterContainer}>
      <h3>Filtr cenowy</h3>
      <label htmlFor="from">Od:</label>
      <input
        id="from"
        type="number"
        value={min}
        onChange={e => setMin(Number(e.target.value))}
      />
      <label htmlFor="to">Do:</label>
      <input
        id="to"
        type="number"
        value={max}
        onChange={e => setMax(Number(e.target.value))}
      />
      <button onClick={applyFilter}>Zastosuj</button>
    </div>
  );
}
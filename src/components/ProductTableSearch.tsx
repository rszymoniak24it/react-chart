import styles from "../styles/ProductTable.module.scss";

type ProductTableSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onUpdate: () => void;
};

export default function ProductTableSearch({
  value,
  onChange,
  onUpdate,
}: ProductTableSearchProps) {
  return (
    <div className={styles.tableWrapper}>
      <input
        className={styles.searchInput}
        placeholder="Wyszukaj..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button className={styles.updateButton} onClick={onUpdate}>
        Aktualizuj wykres
      </button>
    </div>
  );
}
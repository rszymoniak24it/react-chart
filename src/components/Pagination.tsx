import styles from "../styles/ProductTable.module.scss";

type PaginationProps = {
  page: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalItems, onPageChange }: PaginationProps) {
  return (
      <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Poprzednia
      </button>
      <button disabled={page * 10 >= totalItems} onClick={() => onPageChange(page + 1)}>
        Następna
      </button>
    </div>
  );
}
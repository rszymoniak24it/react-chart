import type { ReactNode } from "react";
import styles from "../styles/Sidebar.module.scss";

export default function Sidebar({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={onClose}></div>
      )}
      <aside
        className={`${styles.sidebar} ${open ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </aside>
    </>
  );
}
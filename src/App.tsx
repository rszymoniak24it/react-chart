import { useState } from "react";
import { ProductProvider } from "./context/ProductProvider";
import Sidebar from "./components/Sidebar";
import ProductFilter from "./components/ProductFilter";
import ProductTable from "./components/ProductTable";
import SalesChart from "./components/SalesChart";
import styles from "./styles/App.module.scss";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProductProvider>
      <div className={styles.app}>
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle Sidebar"
        >
          ☰
        </button>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <ProductFilter onApply={() => setSidebarOpen(false)} />
        </Sidebar>
        <main className={styles.mainContent}>
          <SalesChart />
          <ProductTable />
        </main>
      </div>
    </ProductProvider>
  );
}
import { Chart } from "react-chartjs-2";
import { useProducts } from "../context/ProductContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import styles from "../styles/SalesChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function SalesChart() {
  const { filtered, search } = useProducts();

  const dataToShow = filtered.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  );

  const averageStock =
    dataToShow.reduce((sum, p) => sum + p.stock, 0) / dataToShow.length || 0;

  const data = {
    labels: dataToShow.map(({ title }) => title),
    datasets: [
      {
        type: "line" as const,
        label: `Średnia ${averageStock.toFixed(0)}`,
        data: dataToShow.map(() => averageStock),
        borderColor: "red",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
      {
        type: "bar" as const,
        label: "Stan magazynowy",
        data: dataToShow.map(({ stock }) => stock),
        backgroundColor: "#007bff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: { display: false },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

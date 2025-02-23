import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Category } from "../data/settingsData";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  categories: Category[];
};

function DoughnutChart({ categories }: Props) {
  const activeCategories = categories.flat().filter((cat) => cat.amount != 0);

  const chartData =
    activeCategories.length > 0
      ? {
          labels: activeCategories.map((cat) => cat.name),
          datasets: [
            {
              data: activeCategories.map((cat) => cat.amount),
              backgroundColor: activeCategories.map((cat) => cat.color),
              borderWidth: 0,
              hoverBorderWidth: 0,
            },
          ],
        }
      : {
          labels: ["Sin ingresos"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#D1D5DB"],
              borderWidth: 0,
              hoverBorderWidth: 0,
            },
          ],
        };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}

export default DoughnutChart;

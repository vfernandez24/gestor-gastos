import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Category } from '../data/settingsData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  categories: Category[];
};

function BarChart({ categories }: Props) {
  const activeCategories = categories.filter(cat => cat.amount != 0);

  const chartData = activeCategories.length > 0
    ? {
        labels: activeCategories.map(cat => cat.name),
        datasets: [
          {
            data: activeCategories.map(cat => cat.amount),
            backgroundColor: activeCategories.map(cat => cat.color),
          },
        ],
      }
    : {
        labels: ['Sin ingresos'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#D1D5DB'],
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

  return <Bar data={chartData} options={options} />;
}

export default BarChart;
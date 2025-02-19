import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "../data/settingsData";

type Props = {
  amountRangos: {
    anios: Transaction[][];
    meses: Transaction[][];
    dias: Transaction[][];
  };
};

type YearlyData = {
  year: number;
  ingresos: number;
  gastos: number;
  ganancia: number;
  perdida: number;
};

const YearlyBarChart = ({ amountRangos }: Props) => {
  // Construcción de los datos para el gráfico
  const data: YearlyData[] = amountRangos.anios[0].map((rango, index) => {
    const ingresos =
      rango[0].reduce((acc, trans) => acc + trans.amount, 0) || 0;
    const gastos = rango[1].reduce((acc, trans) => acc + trans.amount, 0) || 0;

    const diferencia = ingresos - gastos;

    return {
      year: new Date().getFullYear() - index,
      ingresos,
      gastos,
      ganancia: diferencia > 0 ? diferencia : 0,
      perdida: diferencia < 0 ? Math.abs(diferencia) : 0,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ingresos" fill="green" />
        <Bar dataKey="gastos" fill="red" />
        <Bar dataKey="ganancia" fill="blue" />
        <Bar dataKey="perdida" fill="orange" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default YearlyBarChart;

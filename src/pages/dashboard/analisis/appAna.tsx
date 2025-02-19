import { useState, useEffect } from "react";
import BarChart from "../../../components/BarChart";
import { loadFromStorage } from "../../../storage";
import {
  initialCategories,
  initialTransactions,
  initialSettings,
  Transaction,
} from "../../../data/settingsData";
import YearlyBarChart from "../../../components/YearBarChart";

type Props = {};

function Analisis({}: Props) {
  const categories = loadFromStorage("categories", initialCategories);
  const transactions = loadFromStorage("transactions", initialTransactions);
  const settings = loadFromStorage("settings", initialSettings);

  const fechaActual = new Date();

  const [rangosAnios, setRangosAnios] = useState<number[]>([]);
  const [rangosMeses, setRangosMeses] = useState<string[]>([]);
  const [rangosDias, setRangosDias] = useState<string[]>([]);

  useEffect(() => {
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();

    setRangosAnios([anio, anio - 1, anio - 2, anio - 3, anio - 4]);

    const meses = [];
    for (let i = 0; i < 5; i++) {
      let mesCalc = mes - i;
      let anioCalc = anio;
      if (mesCalc <= 0) {
        mesCalc += 12;
        anioCalc -= 1;
      }
      meses.push(`${mesCalc.toString().padStart(2, "0")}/${anioCalc}`);
    }
    setRangosMeses(meses);

    const dias = [];
    for (let i = 0; i < 5; i++) {
      const fecha = new Date();
      fecha.setDate(dia - i);
      const diaFormateado = fecha.getDate().toString().padStart(2, "0");
      const mesFormateado = (fecha.getMonth() + 1).toString().padStart(2, "0");
      dias.push(`${diaFormateado}/${mesFormateado}`);
    }
    setRangosDias(dias);
  }, []);

  const [transactionsClass, setTransactionsClass] = useState<{
    anios: Transaction[][];
    meses: Transaction[][];
    dias: Transaction[][];
  }>({
    anios: [[], [], [], [], []],
    meses: [[], [], [], [], []],
    dias: [[], [], [], [], []],
  });

  const [amountRangos, setAmountRangos] = useState<{
    anios: { ingresos: number; gastos: number; balance: number }[];
    meses: { ingresos: number; gastos: number; balance: number }[];
    dias: { ingresos: number; gastos: number; balance: number }[];
  }>({
    anios: Array(5).fill({ ingresos: 0, gastos: 0, balance: 0 }),
    meses: Array(5).fill({ ingresos: 0, gastos: 0, balance: 0 }),
    dias: Array(5).fill({ ingresos: 0, gastos: 0, balance: 0 }),
  });

  useEffect(() => {
    const newTransactionsClass : {
      anios: Transaction[][],
      meses: Transaction[][],
      dias: Transaction[][],
    } = {
      anios: [[], [], [], [], []],
      meses: [[], [], [], [], []],
      dias: [[], [], [], [], []],
    };

    transactions.forEach((mov) => {
      const [anio, mes, dia] = mov.date.split("-");

      for (let i = 0; i < 5; i++) {
        if (anio === String(rangosAnios[i])) {
          newTransactionsClass.anios[i].push(mov);
        }
        if (`${mes}/${anio}` === rangosMeses[i]) {
          newTransactionsClass.meses[i].push(mov);
        }
        if (`${dia}/${mes}` === rangosDias[i]) {
          newTransactionsClass.dias[i].push(mov);
        }
      }
    });

    setTransactionsClass(newTransactionsClass);
  }, [rangosAnios, rangosMeses, rangosDias, transactions]);

  useEffect(() => {
    const newAmountRangos = {
      anios: transactionsClass.anios.map((rango) => calcularMontos(rango)),
      meses: transactionsClass.meses.map((rango) => calcularMontos(rango)),
      dias: transactionsClass.dias.map((rango) => calcularMontos(rango)),
    };

    setAmountRangos(newAmountRangos);
  }, [transactionsClass]);

  function calcularMontos(rango: Transaction[]) {
    let ingresos = 0;
    let gastos = 0;

    rango.forEach((mov) => {
      if (mov.amount >= 0) ingresos += mov.amount;
      else gastos += mov.amount;
    });

    return {
      ingresos,
      gastos,
      balance: ingresos + gastos,
    };
  }

  function showGrafico() {}

  return (
    <>
      <h1
        className="py-3 text-4xl font-semibold"
        style={{ color: settings.color }}
      >
        Análisis
      </h1>

      <nav className="flex items-center justify-center w-full gap-4">
        <button
          onClick={showGrafico}
          className="px-8 py-3 bg-gray-300 rounded-md"
        >
          General
        </button>
        <button
          onClick={showGrafico}
          className="px-8 py-3 bg-gray-300 rounded-md"
        >
          Ingresos
        </button>
        <button
          onClick={showGrafico}
          className="px-8 py-3 bg-gray-300 rounded-md"
        >
          Gastos
        </button>
      </nav>

      <nav className="flex items-center justify-center w-full gap-4 mt-4">
        <button className="flex items-center justify-center px-5 py-2 rounded-md bg-primary">
          Años
        </button>
        <button className="flex items-center justify-center px-5 py-2 rounded-md bg-primary">
          Meses
        </button>
        <button className="flex items-center justify-center px-5 py-2 rounded-md bg-primary">
          Semanas
        </button>
        <button className="flex items-center justify-center px-5 py-2 rounded-md bg-primary">
          Días
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center w-full h-full py-4">
        <section className="w-1/2">
        <YearlyBarChart amountRangos={amountRangos}></YearlyBarChart>
        </section>
      </div>
    </>
  );
}

export default Analisis;

import {
  initialTransactions,
  initialSettings,
  initialCategories,
} from "../../../data/settingsData";
import { useState } from "react";
import { loadFromStorage } from "../../../storage";
import Options from "../../../components/Options";
import DoughnutChart from "../../../components/Doughnut";
import { translations } from "./tranlations";

type Props = {
  functionEdit: () => void;
  functionDelete: () => void;
};

function Home({ functionEdit, functionDelete }: Props) {
  const categories = loadFromStorage("categories", initialCategories);
  const transactions = loadFromStorage("transactions", initialTransactions);
  const settings = loadFromStorage("settings", initialSettings);
  const lastTransactions = transactions.slice(-5).reverse();

  const t = (path: string) => {
    const idioma = settings.idioma as keyof typeof translations;
    const keys = path.split(".");
    let value: any = translations[idioma] ?? translations["en"];

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return "";
    }

    return value;
  };

  const [graficoGastos, setGraficoGastos] = useState(false);
  function changeGrafico() {
    graficoGastos == false ? setGraficoGastos(true) : setGraficoGastos(false);
  }

  return (
    <>
      <h1
        className="py-3 text-4xl font-semibold"
        style={{
          color: settings.tema == "light" ? settings.color : settings.colorDark,
        }}
      >
        {String(t("h1_1"))}
      </h1>
      <section
        className={`inicio min-w-full h-[150px] rounded-lg border-2 ${
          settings.tema == "light" ? "border-gray-300" : "border-gray-500"
        } grid grid-rows-[1fr_auto] font-semibold mb-4 select-auto`}
      >
        <div className="flex items-center justify-center min-w-full text-5xl inicio__balance">
          {settings.saldo}
          {settings.divisa}
        </div>
        <div className="flex justify-between min-w-full text-xl h-9 px-7">
          <h3 className="inicio__ingresos text-exito">
            {settings.ingresos}
            {settings.divisa}
          </h3>
          <h3 className="inicio__gastos text-alert">
            {settings.gastos}
            {settings.divisa}
          </h3>
        </div>
      </section>
      <div className="h-fit w-full grid lg:grid-cols-[1fr_1fr] max-lg:grid-rows-[1fr-1fr] gap-x-[5%]">
        <section className="relative mb-3">
          <nav className="absolute flex items-center justify-between h-5 gap-1 w-fit top-[25px] right-0">
            <button
              onClick={changeGrafico}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                settings.tema == "light"
                  ? "hover:bg-gray-200"
                  : "hover:bg-[#4d4d4da4]"
              }`}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={changeGrafico}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                settings.tema == "light"
                  ? "hover:bg-gray-200"
                  : "hover:bg-[#4d4d4da4]"
              }`}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </nav>
          {graficoGastos == false ? (
            <>
              <h1
                className="py-3 text-4xl font-semibold"
                style={{
                  color:
                    settings.tema == "light"
                      ? settings.color
                      : settings.colorDark,
                }}
              >
                {String(t("h1_2"))}
              </h1>
              <div
                className={`relative h-[268px] p-5 w-full border-2 rounded-lg flex items-center justify-center ${
                  settings.tema == "light"
                    ? "border-gray-300"
                    : "border-gray-500"
                }`}
              >
                <DoughnutChart
                  categories={categories.filter((cat) => cat.id > 8)}
                />
                <span className="absolute block top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  {settings.ingresos}
                  {settings.divisa}
                </span>
              </div>
            </>
          ) : (
            <>
              <h1
                className="py-3 text-4xl font-semibold"
                style={{
                  color:
                    settings.tema == "light"
                      ? settings.color
                      : settings.colorDark,
                }}
              >
                {String(t("h1_3"))}
              </h1>
              <div
                className={`relative h-[268px] p-5 w-full border-2 ${
                  settings.tema == "light"
                    ? "border-gray-300"
                    : "border-gray-500"
                } rounded-lg flex items-center justify-center`}
              >
                <DoughnutChart
                  categories={categories.filter((cat) => cat.id < 9)}
                />
                <span className="absolute block top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  {settings.gastos}
                  {settings.divisa}
                </span>
              </div>
            </>
          )}
        </section>
        <section>
          <h1
            className="py-3 text-4xl font-semibold"
            style={{
              color:
                settings.tema == "light" ? settings.color : settings.colorDark,
            }}
          >
            {String(t("h1_4"))}
          </h1>
          <ul
            className={`h-[268px] max-h-[calc()] w-full border-2 ${
              settings.tema == "light" ? "border-gray-300" : "border-gray-500"
            } rounded-lg p-3`}
          >
            {lastTransactions.map((mov, index) => (
              <li
                key={index}
                className="w-full mb-2 h-[40px] grid grid-cols-[2fr_8fr]"
              >
                <div className="max-h-[40px] icon flex items-center justify-center">
                  <span
                    className={`text-white flex h-[35px] w-[35px] items-center justify-center rounded-full ${
                      mov.category < 8 ? "bg-alert" : "bg-exito"
                    }`}
                  >
                    <i
                      className={`fa-solid fa-${
                        mov.category < 8 ? "minus" : "plus"
                      }`}
                    ></i>
                  </span>
                </div>
                <div className="info max-h-[40px] grid grid-cols-[1fr_auto]">
                  <div className="flex items-center">
                    <h2 className="h-[40px] w-[70%] py-3 text-xl font-normal flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                      {mov.description}
                    </h2>
                    <h3 className="h-[40px] w-[30%] py-3 text-xl font-normal flex items-center justify-end pr-[5%]">
                      {mov.amount}
                      {settings.divisa}
                    </h3>
                  </div>
                  <div className="relative w-[40px] h-full text-xl flex justify-center items-center">
                    <Options
                      editFunction={functionEdit}
                      deleteFunction={functionDelete}
                      indexMov={mov.id}
                    />
                  </div>
                </div>
              </li>
            ))}
            {transactions.length < 1 ? (
              <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                <div
                  className={`flex items-center justify-center w-10 h-10 p-6 border-2 ${
                    settings.tema == "light"
                      ? "border-gray-300"
                      : "border-gray-500"
                  } rounded-full`}
                >
                  <i className="fa-solid fa-question"></i>
                </div>
                <span className="text-xl">{String(t("no"))}</span>
              </div>
            ) : null}
          </ul>
        </section>
      </div>
    </>
  );
}

export function movimientoLi() {
  return (
    <li>
      <div>
        <i className="fa-solid fa-plus"></i>
      </div>
    </li>
  );
}

export default Home;

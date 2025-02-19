import { loadFromStorage } from "../../../storage";
import {
  initialCategories,
  initialTransactions,
  initialSettings,
} from "../../../data/settingsData";
import LiCat from "./LiCat";
import { translations } from "./translation";
type Props = {};

function Categorias({}: Props) {
  const categories = loadFromStorage("categories", initialCategories);
  const transactions = loadFromStorage("transactions", initialTransactions);
  const settings = loadFromStorage("settings", initialSettings);

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

  return (
    <>
      <h1
        className="py-3 text-4xl font-semibold"
        style={{
          color: settings.tema == "light" ? settings.color : settings.colorDark,
        }}
      >
        {String(t("h1"))}
      </h1>
      <div className="contenedor_categorias w-full grid max-lg:grid-rows-[1fr_1fr] lg:grid-cols-[1fr_1fr] gap-x-2.5 pb-16">
        <div className="catIngresos">
          <h2
            className="py-3 text-3xl font-semibold"
            style={{
              color:
                settings.tema == "light" ? settings.color : settings.colorDark,
            }}
          >
            {String(t("h2_1"))}
          </h2>
          <ul>
            {categories.map((cat, index) =>
              cat.id > 8 ? (
                <LiCat
                  key={index}
                  transactions={transactions}
                  cat={cat}
                  settings={settings}
                />
              ) : null
            )}
          </ul>
        </div>
        <div className="catGastos">
          <h2
            className="py-3 text-3xl font-semibold"
            style={{
              color:
                settings.tema == "light" ? settings.color : settings.colorDark,
            }}
          >
            {String(t("h2_2"))}
          </h2>
          <ul>
            {categories.map((cat, index) =>
              cat.id <= 8 ? (
                <LiCat
                  key={index}
                  transactions={transactions}
                  cat={cat}
                  settings={settings}
                />
              ) : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Categorias;

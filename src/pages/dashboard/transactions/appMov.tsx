import { loadFromStorage } from "../../../storage";
import {
  initialCategories,
  initialTransactions,
  initialSettings,
} from "../../../data/settingsData";
import { translations } from "./translations";
import Mov from "../../../components/Mov";

type Props = {
  functionEdit: () => void;
  functionDelete: () => void;
};

function TransacctionsPage({ functionDelete, functionEdit }: Props) {
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
      <ul className="w-full h-full">
        {transactions.map((mov, index) => (
          <Mov
            categories={categories}
            deleteFunction={functionDelete}
            editFunction={functionEdit}
            index={index}
            mov={mov}
            settings={settings}
          />
        ))}
        {transactions.length < 1 ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <div className="flex items-center justify-center w-10 h-10 p-6 border-2 border-gray-300 rounded-full">
              <i className="fa-solid fa-question"></i>
            </div>
            <span className="text-xl">{String(t("no"))}</span>
          </div>
        ) : null}
      </ul>
    </>
  );
}

export default TransacctionsPage;

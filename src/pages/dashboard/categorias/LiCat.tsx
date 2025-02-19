import { useState } from "react";
import { Category, Settings, Transaction } from "../../../data/settingsData";
import { translationsCat } from "../../../data/translationsCat";
import f from "../../../dates";

type Props = {
  transactions: Transaction[];
  cat: Category;
  settings: Settings;
};

function LiCat({ cat, settings, transactions }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const t = (path: string) => {
    const idioma = settings.idioma as keyof typeof translationsCat;
    const keys = path.split(".");
    let value: any = translationsCat[idioma] ?? translationsCat["en"];

    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return "";
    }

    return value;
  };

  return (
    <div
      className={`${
        isOpen == false ? "h-fit" : "max-h-fit"
      } overflow-visible h-fit`}
    >
      <li
        className={`p-2 mb-3 rounded-md cursor-pointer ${
          settings.tema == "light"
            ? "hover:bg-gray-100"
            : "hover:bg-[#4d4d4da4]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex">
          <div className="w-[20%] flex items-center justify-center">
            <span
              className={`flex h-[40px] w-[40px] rounded-full items-center justify-center text-xl ${
                settings.tema == "dark" ? "text-text" : ""
              }`}
              style={{ backgroundColor: cat.color }}
            >
              <i className={cat.icon}></i>
            </span>
          </div>
          <div className="flex items-center justify-start w-[60%] whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-xl font-normal">
              {String(t(String(cat.id)))}
            </span>
          </div>
          <div className="flex items-center justify-end w-[40%] whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-xl font-normal">
              {cat.amount}
              {settings.divisa}
            </span>
          </div>
        </div>
      </li>
      <div
        className={`${
          isOpen == false ? "" : "hidden"
        } w-full overflow-hidden p-2 h-fit`}
      >
        <ul className="w-full pl-4 ">
          {transactions.map((mov) =>
            cat.id === mov.category ? (
              <li
                className="flex items-center w-full gap-3 p-2 border-l-8"
                style={{ borderColor: cat.color }}
                key={mov.id}
              >
                <h2 className="flex-grow text-base text-left truncate">
                  {mov.description}
                </h2>

                <h2 className="w-auto text-sm text-gray-500">
                  {f(settings, String(mov.date))}
                </h2>

                <h2 className="flex items-center justify-end w-auto font-semibold">
                  {mov.amount}
                  {settings.divisa}
                </h2>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

export default LiCat;

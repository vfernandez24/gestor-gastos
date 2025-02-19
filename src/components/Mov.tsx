import { Category, Settings, Transaction } from "../data/settingsData";
import { translationsCat } from "../data/translationsCat";
import Options from "./Options";
import f from "../dates";

type Props = {
  mov: Transaction;
  index: number;
  settings: Settings;
  categories: Category[];
  editFunction: () => void;
  deleteFunction: () => void;
};

function Mov({
  mov,
  index,
  settings,
  categories,
  editFunction,
  deleteFunction,
}: Props) {
  const tCat = (path: string) => {
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
    <>
      {/* LG */}
      <li
        className="max-lg:hidden lg:grid w-full max-lg:h-[50px] lg:h-[60px] grid-cols-[1fr_5fr_9fr_1fr]"
      >
        <div className="flex items-center justify-center icon">
          <span
            className={`text-white flex h-[35px] w-[35px] items-center justify-center rounded-full ${
              mov.category <= 8 ? "bg-alert" : "bg-exito"
            }`}
          >
            <i
              className={`fa-solid fa-${mov.category <= 8 ? "minus" : "plus"}`}
            ></i>
          </span>
        </div>
        <div className="flex">
          <div className="w-[20%] flex items-center justify-center text-text">
            <span
              className={`flex h-[40px] w-[40px] rounded-full items-center justify-center text-xl text-text`}
              style={{ backgroundColor: categories[mov.category].color, color: "#212121" }}
            >
              <i className={categories[mov.category].icon + " text-text"}></i>
            </span>
          </div>
          <div className="flex items-center justify-start w-[80%] whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="text-xl font-normal">
              {String(tCat(String(categories[mov.category].id)))}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <h2 className="h-[40px] w-[40%] py-3 text-xl font-normal flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
            {mov.description}
          </h2>
          <h3 className="h-[40px] w-[30%] py-3 text-xl font-normal flex items-center justify-end pr-[5%]">
            {f(settings, String(mov.date))}
          </h3>
          <h3 className="h-[40px] w-[30%] py-3 text-xl font-normal flex items-center justify-end pr-[5%]">
            {mov.amount}
            {settings.divisa}
          </h3>
        </div>
        <div className=" relative w-[40px] h-full text-xl flex justify-center items-center">
          <Options
            deleteFunction={deleteFunction}
            editFunction={editFunction}
            indexMov={mov.id}
            key={index}
          />
        </div>
      </li>

      {/* MAX-LG */}
      <li
        className={`lg:hidden max-lg:grid max-lg:grid-rows-[auto_auto_auto] w-full p-4 rounded-lg mb-4 shadow-lg ${
          settings.tema == "light" ? "bg-white" : "bg-transparent shadow-gray-700"
        }`}
      >
        {/* Primera fila: Icono, Categoría y Opciones */}
        <div className="flex items-center justify-between">
          <span
            className={`text-white flex h-9 w-9 items-center justify-center rounded-full ${
              mov.category <= 8 ? "bg-alert" : "bg-exito"
            }`}
          >
            <i
              className={`fa-solid fa-${mov.category <= 8 ? "minus" : "plus"}`}
            ></i>
          </span>

          <div className="flex items-center gap-2">
            <span
              className={`flex items-center justify-center w-10 h-10 text-xl rounded-full text-text`}
              style={{ backgroundColor: categories[mov.category].color }}
            >
              <i className={categories[mov.category].icon}></i>
            </span>
            <span className={`text-lg font-medium ${settings.tema == "light" ? "text-gray-800" : "text-textDark"}`}>
              {String(tCat(String(categories[mov.category].id)))}
            </span>
          </div>

          <div className="relative flex items-center justify-center w-10 h-10">
            <Options
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              indexMov={mov.id}
              key={index}
            />
          </div>
        </div>

        <div className={`flex items-center justify-between mt-2 ${settings.tema == "light" ? "text-gray-700" : "text-gray-200"}`}>
          <h2 className="text-lg truncate">{mov.description}</h2>
          <h3 className={`text-sm ${settings.tema == "light" ? "text-gray-500" : "text-gray-300"}`}>
            {f(settings, String(mov.date))}
          </h3>
        </div>

        <div className="flex items-center justify-center mt-2">
          <h3
            className={`text-2xl font-semibold ${
              mov.amount < 0 ? "text-red-500" : mov.amount > 0 ? "text-green-500" : "text-gray-500"
            }`}
          >
            {mov.amount}
            {settings.divisa}
          </h3>
        </div>
      </li>
    </>
  );
}

export default Mov;

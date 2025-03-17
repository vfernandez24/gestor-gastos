import { loadFromStorage } from "../storage";
import { initialSettings } from "../data/settingsData";
import { Link } from "react-router-dom";

type Props = {
  functionHandle: () => void;
};

function Navigation({ functionHandle }: Props) {
  const settings = loadFromStorage("settings", initialSettings);

  return (
    <header
      className={`h-16 bg-white w-screen border-b-[1px] flex items-center justify-between px-[2.5%] overflow-hidden ${
        settings.tema == "light"
          ? "bg-white border-gray-300"
          : "bg-backgroundDark border-gray-500"
      }`}
    >
      <Link to="/" className="h-full ml-[2.5%]">
        <img
          src={
            settings.tema == "light"
              ? "/gestor-gastos/images/Imagologo.png"
              : "/gestor-gastos/images/imagologoDark.png"
          }
          className="h-[70px] max-md:h-20"
        />
      </Link>
      <div className="min-w-[25vw] w-fit flex justify-end gap-4 items-center h-full">
        <>
          <div>
            <p
              className={`max-md:hidden ${
                settings.tema == "dark" ? "text-textDark" : ""
              }`}
            >
              @{settings.userName}
            </p>
          </div>
          <div
            className={
              settings.saldo > 0
                ? `max-md:hidden ${
                    settings.tema == "light"
                      ? "bg-green-300"
                      : "bg-[#74d69aa2] text-white"
                  } w-[100px] h-[40px] rounded-lg flex justify-center items-center `
                : settings.saldo == 0
                ? `max-md:hidden ${
                    settings.tema == "light"
                      ? "bg-gray-300"
                      : "bg-[#d1d5db50] text-white"
                  } w-[100px] h-[40px] rounded-lg flex justify-center items-center`
                : `max-md:hidden ${
                    settings.tema == "light"
                      ? "bg-red-300"
                      : "bg-[#da6c6c8c] text-white"
                  } w-[100px] h-[40px] rounded-lg flex justify-center items-center`
            }
          >
            <p>
              {settings.saldo}
              {settings.divisa}
            </p>
          </div>
        </>
      </div>
      <button
        onClick={functionHandle}
        className={`md:hidden max-md:flex ${
          settings.tema == "light" ? "text-text" : "text-textDark"
        } text-4xl mr-5`}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
    </header>
  );
}

export default Navigation;

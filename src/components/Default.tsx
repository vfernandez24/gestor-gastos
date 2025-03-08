import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/dashboard/home/App";
import Search from "../pages/dashboard/busqueda/App";
import Categorias from "../pages/dashboard/categorias/AppCat";
import Header from "./Header";
import React, { useState, useEffect, useRef } from "react";
import { loadFromStorage, saveToStorage } from "../storage";
import {
  initialCategories,
  initialTransactions,
  initialSettings,
  Transaction,
  Settings,
} from "../data/settingsData";
import TransacctionsPage from "../pages/dashboard/transactions/appMov";
import AjustesApp, { resetData } from "../pages/dashboard/ajustes/AjustesApp";
import { translations } from "./translationsDefault";
import { translationsCat } from "../data/translationsCat";
import OtrasOpciones from "../pages/dashboard/otrasOpciones/OtrasOpciones";

type Props = {};

function Default({}: Props) {
  const [categories, setCategories] = useState(() =>
    loadFromStorage("categories", initialCategories)
  );
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage("transactions", initialTransactions)
  );
  const [settings, setSettings] = useState(() =>
    loadFromStorage("settings", initialSettings)
  );

  useEffect(() => {
    saveToStorage("categories", categories);
    saveToStorage("transactions", transactions);
    saveToStorage("settings", settings);
  }, [categories, transactions, settings]);

  const [overlay, setOverlay] = useState(true);

  function overlayShow() {
    if (overlay == false) {
      setOverlay(true);
    } else if (overlay == true) {
      setOverlay(false);
      defaultForm();
    }
  }

  function defaultForm() {
    setNameMov("");
    setTypeMov("");
    setCategoryMov(18);
    setAmountMov("");
    setDateMov("");
    setTypeForm("Añadir");
  }

  function showEdit() {
    const index = Number(localStorage.getItem("indexEdit"));

    overlayShow();
    setTypeForm("Editar");

    setNameMov(transactions[index].description);
    setCategoryMov(transactions[index].category);
    console.log(categoryMov);
    setTypeMov(transactions[index].category < 9 ? "gasto" : "ingreso");
    setAmountMov(String(transactions[index].amount));
    setDateMov(transactions[index].date);
  }

  const [nameMov, setNameMov] = useState("");
  const [typeMov, setTypeMov] = useState("");
  const [categoryMov, setCategoryMov] = useState(18);
  const [amountMov, setAmountMov] = useState("");
  const [dateMov, setDateMov] = useState("");
  const [typeForm, setTypeForm] = useState("Añadir");

  function addTransaction() {
    const newTransaction: Transaction = {
      id: transactions.length,
      type: typeMov == "gasto" ? "gasto" : "ingreso",
      description: nameMov,
      amount: typeMov == "gasto" ? -Number(amountMov) : Number(amountMov),
      category: categoryMov,
      date: dateMov,
    };

    setTransactions((prev) => [...prev, newTransaction]);

    const updatedCategories = categories.map((cat, index) => {
      if (index === categoryMov) {
        return {
          ...cat,
          amount:
            typeMov == "gasto"
              ? cat.amount - Number(amountMov)
              : cat.amount + Number(amountMov),
        };
      }
      return cat;
    });

    const updatedSettings = {
      ...settings,
      saldo:
        typeMov == "gasto"
          ? parseFloat((settings.saldo - Number(amountMov)).toFixed(2))
          : parseFloat((settings.saldo + Number(amountMov)).toFixed(2)),
      gastos:
        typeMov == "gasto"
          ? parseFloat((settings.gastos - Number(amountMov)).toFixed(2))
          : settings.gastos,
      ingresos:
        typeMov == "ingreso"
          ? parseFloat((settings.ingresos + Number(amountMov)).toFixed(2))
          : settings.ingresos,
    };

    setCategories(updatedCategories);
    setSettings(updatedSettings);
    console.log(updatedCategories, updatedSettings);
    console.log("Transacción añadida");
  }

  function editTransaction() {
    const indexEdit = Number(localStorage.getItem("indexEdit"));

    const editTransaction: Transaction = {
      amount: typeMov == "gasto" ? -Number(amountMov) : Number(amountMov),
      description: nameMov,
      date: dateMov,
      category: categoryMov,
      type: typeMov == "gasto" ? "gasto" : "ingreso",
      id: indexEdit,
    };

    const updatedTransactions = transactions.map((mov) => {
      if (indexEdit === mov.id) {
        return editTransaction;
      }
      return mov;
    });

    const updatedCategories = categories.map((cat, index) => {
      if (index === categoryMov) {
        return {
          ...cat,
          amount:
            cat.amount -
            Number(transactions[indexEdit].amount) -
            Number(amountMov),
        };
      }
      return cat;
    });

    const updatedSettings = {
      ...settings,
      saldo: parseFloat(
        (
          settings.saldo -
          Number(transactions[indexEdit].amount) +
          (typeMov == "gasto" ? -Number(amountMov) : Number(amountMov))
        ).toFixed(2)
      ),
      gastos:
        typeMov == "gasto"
          ? Number(
              (
                settings.gastos -
                Number(transactions[indexEdit].amount) -
                Number(amountMov)
              ).toFixed(2)
            )
          : settings.gastos,
      ingresos:
        typeMov == "ingreso"
          ? Number(
              (
                settings.ingresos -
                Number(transactions[indexEdit].amount) +
                Number(amountMov)
              ).toFixed(2)
            )
          : settings.ingresos,
    };

    setTransactions(updatedTransactions);
    setCategories(updatedCategories);
    setSettings(updatedSettings);
  }

  function showDelete() {
    const confirmation = confirm("¿Estás seguro de eliminar este movimiento?");
    if (confirmation) {
      deleteTransaction();
    }
  }

  function deleteTransaction() {
    const indexDel = Number(localStorage.getItem("indexDelete"));

    const updatedTransactions = transactions
      .filter((mov) => mov.id !== indexDel)
      .map((mov) => {
        if (mov.id > indexDel) {
          return {
            ...mov,
            id: mov.id - 1,
          };
        }
        return mov;
      });

    const updatedCategories = categories.map((cat, index) => {
      if (index === transactions[indexDel].category) {
        return {
          ...cat,
          amount: cat.amount - Number(transactions[indexDel].amount),
        };
      }
      return cat;
    });

    const updatedSettings = {
      ...settings,
      saldo: parseFloat(
        (settings.saldo - Number(transactions[indexDel].amount)).toFixed(2)
      ),
      gastos:
        transactions[indexDel].type == "gasto"
          ? Number(
              (settings.gastos - Number(transactions[indexDel].amount)).toFixed(
                2
              )
            )
          : settings.gastos,
      ingresos:
        transactions[indexDel].type == "ingreso"
          ? Number(
              (
                settings.ingresos - Number(transactions[indexDel].amount)
              ).toFixed(2)
            )
          : settings.ingresos,
    };

    setTransactions(updatedTransactions);
    setCategories(updatedCategories);
    setSettings(updatedSettings);
    window.location.reload();
  }

  const [divPresentation, setDivPresentation] = useState(
    localStorage.getItem("firstTime") == null ? 0 : 4
  );
  const [overlayIni, setOverlayIni] = useState(
    localStorage.getItem("firstTime") == null ? false : true
  );

  const [userName, setUserName] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [divisa, setDivisa] = useState("EUR");

  function addNombre(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newSettings: Settings = {
      ...settings,
      userName: userName,
    };

    setSettings(newSettings);
    setDivPresentation(2);
  }

  function addSaldoDivisa(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newSettings: Settings = {
      ...settings,
      saldo: saldo,
      ingresos: saldo < 0 ? 0 : saldo,
      gastos: saldo < 0 ? saldo : 0,
      divisa: divisa,
    };

    setSettings(newSettings);
    setDivPresentation(3);
  }

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

  const [overlayPin, setOverlayPin] = useState(true);
  const [pinCorrect, setPinCorrect] = useState(false);
  const [pinDiv, setPinDiv] = useState(0);
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (String(settings.pinActive) == "true") {
      const sessionStarted = sessionStorage.getItem("session_started");

      if (sessionStarted == null) {
        setOverlayPin(false);
      }
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyUp = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  function checkPin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pin.join("") == settings.pin) {
      sessionStorage.setItem("session_started", "");
      window.location.reload();
    } else {
      setPinCorrect(true);
    }
  }

  const [leftNav, setLeftNav] = useState("-100%");
  const [overlayLeft, setOverlayLeft] = useState(true);

  function handleNav() {
    leftNav == "0" ? setLeftNav("-100%") : setLeftNav("0");
    setOverlayLeft(!overlayLeft);
    console.log(leftNav);
  }

  return (
    <>
      <Header functionHandle={handleNav} />
      {/* OVERLAY INICIO DE SESION */}
      <div
        className={
          overlayIni == false
            ? "overlay h-screen w-screen fixed top-0 left-0 z-10 bg-[#0000003d] flex items-center justify-center"
            : "overlay hidden h-screen w-screen fixed top-0 left-0 z-10 bg-[#0000002c]"
        }
      ></div>

      {/* DIV PARA "INICIO DE SESION" */}
      <div
        className={`fixed z-40 -translate-x-1/2 -translate-y-1/2 ${
          settings.tema == "light"
            ? "bg-white"
            : "bg-backgroundDark text-textDark"
        } top-1/2 left-1/2 w-[750px] h-[550px] rounded-2xl grid grid-cols-[1fr] grid-rows-[1fr] ${
          divPresentation == 4 ? "hidden" : ""
        }`}
      >
        {/* PRESENTACIÓN */}
        <div
          className={`presentacion flex flex-col items-center justify-center ${
            divPresentation == 0 ? "" : "hidden"
          }`}
        >
          <img
            src={
              settings.tema == "light"
                ? "/gestor-gastos/simbolo.png"
                : "/gestor-gastos/images/simboloDark.png"
            }
            className="w-14 h-14"
          />
          <h1 className="py-3 text-4xl font-semibold">
            {String(t("presentacion.h1_1"))}
          </h1>
          <h2 className="py-3 text-3xl font-medium">
            {String(t("presentacion.h2_1"))}
          </h2>
          <button
            onClick={() => setDivPresentation(1)}
            className="flex items-center justify-center w-10 h-10 pt-2 text-5xl rounded-full"
            style={{ color: settings.color }}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        {/* NOMBRE */}
        <div
          className={`presentacion1 p-4 ${
            divPresentation == 1 ? "" : "hidden"
          }`}
        >
          <h1 className="py-3 text-4xl font-semibold text-center">
            {String(t("presentacion.h1_2"))}
          </h1>
          <form className="h-full" onSubmit={addNombre}>
            <div className="flex flex-col items-center justify-center w-full gap-3 h-3/4">
              <h2 className="py-3 text-2xl font-medium text-center">
                {String(t("presentacion.h2_2"))}
              </h2>
              <label htmlFor="apodo">
                {String(t("presentacion.label_1"))}
                <input
                  required
                  id="apodo"
                  className={`block w-[450px] border-none ${
                    settings.tema == "light" ? "bg-gray-200" : "bg-[#424242]"
                  } h-[45px] p-3 rounded-md outline-none`}
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </label>
            </div>
            <div className="flex justify-center w-full gap-10">
              <button
                type="button"
                onClick={() => setDivPresentation(0)}
                className="flex items-center justify-center w-10 h-10 pt-2 text-5xl rounded-full"
                style={{ color: settings.color }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 pt-2 text-5xl rounded-full"
                style={{ color: settings.color }}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        {/* SALDO Y DIVISA */}
        <div
          className={`presentacion1 p-4 ${
            divPresentation == 2 ? "" : "hidden"
          }`}
        >
          <h1 className="py-3 text-4xl font-semibold text-center">
            {String(t("presentacion.h1_3"))}
          </h1>
          <form className="h-full" onSubmit={addSaldoDivisa}>
            <div className="flex flex-col items-center justify-center w-full gap-3 h-3/4">
              <h2 className="py-3 text-2xl font-medium text-center">
                {String(t("presentacion.h2_3"))}
              </h2>
              <label htmlFor="saldo">
                {String(t("presentacion.label_2"))}
                <div className="block w-[450px] border-none  h-[45px] rounded-md">
                  <input
                    required
                    id="saldo"
                    className={`w-4/5 h-full p-3 ${
                      settings.tema == "light"
                        ? "bg-gray-200 border-gray-300"
                        : "bg-[#424242] border-[#d1d5db50]"
                    } border-r-2 outline-none rounded-s-md`}
                    type="number"
                    step="0.01"
                    onChange={(e) => setSaldo(Number(e.target.value))}
                  />
                  <select
                    required
                    onChange={(e) => setDivisa(e.target.value)}
                    defaultValue={settings.divisa}
                    className={`w-1/5 h-full p-3 ${
                      settings.tema == "light" ? "bg-gray-200" : "bg-[#424242]"
                    } outline-none rounded-e-md`}
                  >
                    <option value="EUR">
                      {String(t("presentacion.optionsDivisa.0"))} (EUR)
                    </option>
                    <option value="USD">
                      {String(t("presentacion.optionsDivisa.1"))} (USD)
                    </option>
                    <option value="GBP">
                      {String(t("presentacion.optionsDivisa.2"))} (GBP)
                    </option>
                    <option value="JPY">
                      {String(t("presentacion.optionsDivisa.3"))} (JPY)
                    </option>
                    <option value="CAD">
                      {String(t("presentacion.optionsDivisa.4"))} (CAD)
                    </option>
                    <option value="CHF">
                      {String(t("presentacion.optionsDivisa.5"))} (CHF)
                    </option>
                    <option value="CNY">
                      {String(t("presentacion.optionsDivisa.6"))} (CNY)
                    </option>
                    <option value="AUD">
                      {String(t("presentacion.optionsDivisa.7"))} (AUD)
                    </option>
                    <option value="MXN">
                      {String(t("presentacion.optionsDivisa.8"))} (MXN)
                    </option>
                    <option value="BRL">
                      {String(t("presentacion.optionsDivisa.9"))} (BRL)
                    </option>
                    <option value="RUB">
                      {String(t("presentacion.optionsDivisa.10"))} (RUB)
                    </option>
                    <option value="INR">
                      {String(t("presentacion.optionsDivisa.11"))} (INR)
                    </option>
                    <option value="KRW">
                      {String(t("presentacion.optionsDivisa.12"))} (KRW)
                    </option>
                  </select>
                </div>
              </label>
            </div>
            <div className="flex justify-center w-full gap-10">
              <button
                type="button"
                onClick={() => setDivPresentation(1)}
                className="flex items-center justify-center w-10 h-10 pt-2 text-5xl rounded-full"
                style={{ color: settings.color }}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 pt-2 text-5xl rounded-full"
                style={{ color: settings.color }}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
        {/* FINAL */}
        <div
          className={`presentacion flex flex-col items-center justify-center ${
            divPresentation == 3 ? "" : "hidden"
          }`}
        >
          <img
            src={
              settings.tema == "light"
                ? "/gestor-gastos/simbolo.png"
                : "/gestor-gastos/images/simboloDark.png"
            }
            className="w-14 h-14"
          />
          <h1 className="py-3 text-4xl font-semibold">
            {String(t("presentacion.h1_4"))}
          </h1>
          <button
            onClick={() => {
              setOverlayIni(false);
              setDivPresentation(4);
              localStorage.setItem("firstTime", "false");
              window.location.reload();
            }}
            className="flex items-center justify-center w-10 h-10 pt-2 text-5xl rounded-full"
            style={{ color: settings.color }}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>

      {/* OVERLAY PIN */}
      <div
        className={
          overlayPin == false
            ? "overlay h-screen w-screen fixed top-0 left-0 z-10 bg-[#0000003d] flex items-center justify-center"
            : "overlay hidden h-screen w-screen fixed top-0 left-0 z-10 bg-[#0000002c]"
        }
      ></div>

      {/* DIV PIN */}
      <div
        className={
          overlayPin == false
            ? `create fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:w-[400px] h-[350px] max-md:w-[80vw] ${
                settings.tema == "light"
                  ? "bg-white"
                  : "bg-backgroundDark text-textDark"
              } z-40 rounded-2xl p-6`
            : `create hidden w-[500px] h-[550px] bg-white z-40 rounded-2xl p-6`
        }
      >
        {pinDiv == 0 ? (
          <form
            className="relative flex flex-col items-center justify-center md:w-[352px] h-[302px] max-md:w-[calc(80vw-24px)] gap-3"
            onSubmit={checkPin}
          >
            <h1 className="py-3 text-3xl font-semibold text-center">
              {String(t("pin.h1"))}
            </h1>
            <label htmlFor="pinInput">
              {String(t("pin.label"))}
              <div className="flex justify-around w-full mt-4">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    className={`block w-1/5 border-2 bg-transparent ${
                      settings.tema == "light"
                        ? `border-gray-200 text-text]`
                        : `border-[#d1d5db50] text-textDark]`
                    } h-[65px] p-3 rounded-md outline-none text-center`}
                    type="text"
                    maxLength={1}
                    value={pin[i]}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyUp={(e) => handleKeyUp(i, e)}
                  />
                ))}
              </div>
              <span
                className={`block ${
                  pinCorrect == true
                    ? "text-red-500"
                    : settings.tema == "light"
                    ? "text-white"
                    : "text-backgroundDark"
                }`}
              >
                {String(t("pin.incorrecto"))}
              </span>
            </label>
            <button
              type="button"
              className="w-full text-lg text-left"
              style={{
                color:
                  settings.tema == "light"
                    ? settings.color
                    : settings.colorDark,
              }}
              onClick={() => setPinDiv(1)}
            >
              {String(t("pin.buttonReset"))}
            </button>
            <button
              type="submit"
              className="flex items-center justify-center px-8 py-2 text-white rounded-xl"
              style={{
                backgroundColor:
                  settings.tema == "light"
                    ? settings.color
                    : settings.colorDark,
                opacity: pin.every((num) => num) ? 1 : 0,
                pointerEvents: pin.every((num) => num) ? "auto" : "none",
              }}
            >
              {String(t("pin.button"))}
            </button>
          </form>
        ) : (
          <div className="relative flex flex-col items-center w-full h-full gap-5">
            <button
              className="absolute flex items-center justify-center w-10 h-10 text-4xl rounded-full top-4 left-4"
              onClick={() => setPinDiv(0)}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1
              className="py-3 text-4xl font-semibold"
              style={{
                color:
                  settings.tema == "light"
                    ? settings.color
                    : settings.colorDark,
              }}
            >
              {String(t("pin.h1Reset"))}
            </h1>
            <p className="text-center text-balance">
              {String(t("pin.pReset"))}
            </p>
            <div className="flex items-center h-full jusitify-center">
              <button
                className="flex items-center justify-center px-8 py-2 text-white rounded-xl"
                style={{
                  backgroundColor:
                    settings.tema == "light"
                      ? settings.color
                      : settings.colorDark,
                }}
                onClick={resetData}
              >
                {String(t("pin.buttonDelete"))}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OVERLAY TRANSACCION */}
      <div
        onClick={overlayShow}
        className={
          overlay == false
            ? "overlay h-screen w-screen fixed top-0 left-0 z-10 bg-[#0000003d] flex items-center justify-center"
            : "overlay hidden h-screen w-screen fixed top-0 left-0 z-10 bg-[#0000002c]"
        }
      ></div>

      {/* FORMULARIO TRANSACCION */}
      <div
        className={
          overlay == false
            ? `create fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 md:w-[500px] max-md:w-[80%] max-md:h-[90%] md:h-[550px] ${
                settings.tema == "light"
                  ? "bg-white"
                  : "bg-backgroundDark text-textDark"
              } z-40 rounded-2xl p-6`
            : `create hidden w-[500px] h-[550px] bg-white z-40 rounded-2xl p-6`
        }
      >
        <form
          className="relative w-full h-full"
          onSubmit={typeForm == "Añadir" ? addTransaction : editTransaction}
        >
          <h1 className="py-3 text-3xl font-semibold text-center">
            {typeForm == "Añadir"
              ? String(t("form.typeForm.0"))
              : String(t("form.typeForm.1"))}
            {String(t("form.h1"))}
          </h1>
          {/* NOMBRE */}
          <label
            className="block mb-2 font-semibold overlayLabel"
            htmlFor="nombreMov"
          >
            {String(t("form.label_1"))}
            <input
              required
              value={nameMov}
              className={`block font-normal w-full ${
                settings.tema == "light" ? "bg-gray-200" : "bg-[#d1d5db50]"
              } h-[40px] p-3 outline-none rounded-md`}
              type="text"
              id="nombreMov"
              onChange={(e) => setNameMov(e.target.value)}
            />
          </label>
          {/* CANTIDAD */}
          <label
            className="block font-semibold overlayLabel"
            htmlFor="amountMov"
          >
            {String(t("form.label_2"))}
            <input
              required
              value={amountMov}
              type="number"
              step="0.01"
              id="amountMov"
              className={`block font-normal w-full ${
                settings.tema == "light" ? "bg-gray-200" : "bg-[#d1d5db50]"
              } h-[40px] p-3 outline-none rounded-md`}
              onChange={(e) => setAmountMov(e.target.value)}
            />
          </label>
          {/* TIPO */}
          <label
            className="block mb-2 font-semibold overlayLabel"
            htmlFor="tipoMov"
          >
            {String(t("form.label_3"))}
            <select
              required
              value={typeMov}
              className={`block w-full p-3 font-normal border-2 ${
                settings.tema == "light" ? "bg-gray-200" : "bg-[#d1d5db50]"
              } rounded-md h-fit outline-none border-none`}
              id="tipoMov"
              onChange={(e) => setTypeMov(e.target.value)}
            >
              <option
                className={settings.tema == "dark" ? "text-text" : ""}
                selected
                value=""
              >
                {String(t("form.subLabel_3"))}
              </option>
              <option
                className={settings.tema == "dark" ? "text-text" : ""}
                value="gasto"
              >
                {String(t("form.options_3.0"))}
              </option>
              <option
                className={settings.tema == "dark" ? "text-text" : ""}
                value="ingreso"
              >
                {String(t("form.options_3.1"))}
              </option>
            </select>
          </label>
          {/* CATEGORIA */}
          <label
            className="block mb-2 font-semibold overlayLabel"
            htmlFor="catMov"
          >
            {String(t("form.label_4"))}
            <select
              required
              value={categoryMov}
              className={`flex items-center w-full p-3 font-normal border-2 ${
                settings.tema == "light" ? "bg-gray-200" : "bg-[#d1d5db50]"
              } rounded-md h-[50px] outline-none border-none`}
              id="catMov"
              onChange={(e) => setCategoryMov(parseFloat(e.target.value))}
            >
              <option
                className={settings.tema == "dark" ? "text-text" : ""}
                selected
                value={18}
              >
                --
              </option>
              {typeMov == "gasto" ? (
                <>
                  {categories.map((cat, index) =>
                    cat.id <= 8 ? (
                      <option
                        className={settings.tema == "dark" ? "text-text" : ""}
                        key={index}
                        value={cat.id}
                      >
                        {String(tCat(String(cat.id)))}
                      </option>
                    ) : null
                  )}
                </>
              ) : null}
              {typeMov == "ingreso" ? (
                <>
                  {categories.map((cat, index) =>
                    cat.id > 8 ? (
                      <option
                        className={settings.tema == "dark" ? "text-text" : ""}
                        key={index}
                        value={cat.id}
                      >
                        {String(tCat(String(cat.id)))}
                      </option>
                    ) : null
                  )}
                </>
              ) : null}
            </select>
          </label>
          {/* FECHA */}
          <label
            className="block mb-2 font-semibold overlayLabel"
            htmlFor="catMov"
          >
            {String(t("form.label_5"))}
            <input
              required
              value={dateMov}
              type="date"
              id="dateMov"
              className={`block font-normal w-full ${
                settings.tema == "light" ? "bg-gray-200" : "bg-[#d1d5db50]"
              } h-[40px] p-3 outline-none rounded-md`}
              onChange={(e) => setDateMov(e.target.value)}
            />
          </label>
          {/* SUBMIT */}
          <button
            className="absolute bottom-3 left-[50%] translate-x-[-50%] bg-primary px-10 py-2 rounded-lg text-white text-xl font-semibold tracking-wider"
            type="submit"
          >
            {typeForm == "Añadir"
              ? String(t("form.typeForm.0"))
              : String(t("form.typeForm.1"))}
          </button>
        </form>
      </div>

      {/* OVERLAY LEFT */}
      <div
        className={`fixed top-0 z-10 w-screen h-screen overlayLeft ${
          settings.tema == "light" ? "bg-[#0000003d]" : "bg-[#0000002c]"
        } ${overlayLeft == false ? "flex" : "hidden"} left 0`}
        onClick={() => {
          setOverlayLeft(!overlayLeft);
          handleNav();
        }}
      ></div>

      {/* CONTENEDOR */}
      <div className="contenedor max-h-none max-w-none w-screen h-[calc(100vh-80px)] grid md:grid-cols-[auto_1fr] max-md:grid-cols-[1fr]">
        {/* LEFT */}
        <div
          className={`left transition-all duration-[0.3s] ease-[ease-out] w-[300px] border-r-2 ${
            settings.tema == "light"
              ? "bg-white"
              : "bg-backgroundDark text-textDark border-r-gray-500"
          } border-solid py-3 pt-4 flex flex-col justify-between items-center md:*:relative max-md:z-20 max-md:fixed max-md:top-0 max-md:pt-[80px] max-md:h-screen max-md:pb-2`}
          style={{ left: leftNav }}
        >
          <div className="flex flex-col items-center w-full gap-10">
            <div className="items-center justify-between w-full h-10 px-3 max-md:flex md:hidden">
              <div>
                <p
                  className={`${
                    settings.tema == "dark" ? "text-textDark" : ""
                  }`}
                >
                  @{settings.userName}
                </p>
              </div>
              <div
                className={
                  settings.saldo > 0
                    ? `${
                        settings.tema == "light"
                          ? "bg-green-300"
                          : "bg-[#74d69aa2] text-white"
                      } w-[100px] h-[40px] rounded-lg flex justify-center items-center `
                    : settings.saldo < 0
                    ? `${
                        settings.tema == "light"
                          ? "bg-red-300"
                          : "bg-[#da6c6c8c] text-white"
                      } w-[100px] h-[40px] rounded-lg flex justify-center items-center`
                    : `${
                        settings.tema == "light"
                          ? "bg-gray-300"
                          : "bg-[#d1d5db50] text-white"
                      } w-[100px] h-[40px] rounded-lg flex justify-center items-center`
                }
              >
                <p>
                  {settings.saldo}
                  {settings.divisa}
                </p>
              </div>
            </div>
            <nav className="left__nav h-fit w-[250px]">
              <LeftLi
                aHref="/gestor-gastos/dashboard/home"
                liInner={String(t("a.0"))}
                classLi="Resumen"
                iClass="fa-solid fa-chart-pie"
              ></LeftLi>
              <LeftLi
                aHref="/gestor-gastos/dashboard/busqueda"
                liInner={String(t("a.1"))}
                classLi="Búsqueda"
                iClass="fa-solid fa-search"
              ></LeftLi>
              <LeftLi
                aHref="/gestor-gastos/dashboard/transactions"
                liInner={String(t("a.2"))}
                classLi="Transacciones"
                iClass="fa-solid fa-exchange-alt"
              ></LeftLi>
              <LeftLi
                aHref="/gestor-gastos/dashboard/categorias"
                liInner={String(t("a.4"))}
                classLi="Categorias"
                iClass="fa-solid fa-folder"
              ></LeftLi>
              <LeftLi
                aHref="/gestor-gastos/dashboard/otrasOpciones"
                liInner={String(t("a.5"))}
                classLi="OtrasOpciones"
                iClass="fa-solid fa-ellipsis"
              ></LeftLi>
            </nav>
          </div>
          <nav className="left__nav h-fit w-[250px]">
            <LeftLi
              aHref="/gestor-gastos/dashboard/ajustes"
              liInner={String(t("a.6"))}
              classLi="Ajustes"
              iClass="fa-solid fa-gear"
            ></LeftLi>
          </nav>
        </div>

        {/* RIGHT */}
        <div
          className={`${
            settings.tema == "dark"
              ? "bg-backgroundDark text-textDark dark"
              : ""
          } p-6 pb-[151px] overflow-x-hidden overflow-y-auto right`}
        >
          <Routes>
            <Route
              path="home"
              element={
                <Home functionEdit={showEdit} functionDelete={showDelete} />
              }
            />
            <Route
              path="busqueda/"
              element={
                <Search functionEdit={showEdit} functionDelete={showDelete} />
              }
            />
            <Route
              path="transactions/"
              element={
                <TransacctionsPage
                  functionDelete={showDelete}
                  functionEdit={showEdit}
                />
              }
            />
            <Route path="categorias" element={<Categorias />} />
            <Route path="ajustes/" element={<AjustesApp />} />
            <Route path="otrasOpciones/" element={<OtrasOpciones />} />
          </Routes>
        </div>
        <button
          onClick={overlayShow}
          className="absolute h-[60px] w-[60px] rounded-xl bg-secondary bottom-9 right-9"
        >
          <i className="text-2xl text-white fa-solid fa-plus"></i>
        </button>
      </div>
    </>
  );
}

type PropsLeft = {
  iClass: string;
  liInner: string;
  aHref: string;
  classLi: string;
};

export function LeftLi({ iClass, liInner, aHref, classLi }: PropsLeft) {
  const settings = loadFromStorage("settings", initialSettings);

  return (
    <li
      className={`leftLi ${classLi} list-none h-[50px] rounded-md text-xl mb-1 ${
        settings.tema == "light"
          ? "hover:bg-[#ebebeb]"
          : "hover:bg-[#4d4d4da4] dark"
      }`}
    >
      <Link to={aHref}>
        <div className="w-[75px] h-[50px] flex items-center justify-center">
          <i className={iClass}></i>
        </div>
        <div className="w-[175px] h-[50x] flex items-center">{liInner}</div>
      </Link>
    </li>
  );
}

export default Default;

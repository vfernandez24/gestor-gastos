import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Default from "./components/Default";
import {
  initialCategories,
  initialTransactions,
  initialSettings,
} from "./data/settingsData";
import { loadFromStorage, saveToStorage } from "./storage";

function App() {
  const categories = loadFromStorage("categories", initialCategories);
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage("transactions", initialTransactions)
  );
  const [settings, setSettings] = useState(() =>
    loadFromStorage("settings", initialSettings)
  );

  useEffect(() => {
    saveToStorage("transactions", transactions);
    saveToStorage("settings", settings);
  }, [categories, transactions, settings]);
  const location = useLocation();

  return (
    <>
      <Default></Default>
    </>
  );
}

export default App;

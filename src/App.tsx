import { useEffect } from "react";
import Default from "./components/Default";
import {
  initialCategories,
  initialTransactions,
  initialSettings,
} from "./data/settingsData";
import { loadFromStorage, saveToStorage } from "./storage";

function App() {
  const categories = loadFromStorage("categories", initialCategories);
  const transactions = loadFromStorage("transactions", initialTransactions);
  const settings = loadFromStorage("settings", initialSettings);

  useEffect(() => {
    saveToStorage("transactions", transactions);
    saveToStorage("settings", settings);
  }, [categories, transactions, settings]);
  
  return (
    <>
      <Default></Default>
    </>
  );
}

export default App;

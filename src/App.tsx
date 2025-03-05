import Default from "./components/Default";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/home/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gestor-gastos/" element={<Index />} />

          <Route path="/gestor-gastos/dashboard/*" element={<Default />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

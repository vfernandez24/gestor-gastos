import Default from "./components/Default";
import { HashRouter , Routes, Route, createHashRouter } from "react-router-dom";
import Index from "./pages/home/Index";

const router = createHashRouter([
  {
    path: "/",
    element: <Index />
  }
])

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/dashboard/*" element={<Default />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

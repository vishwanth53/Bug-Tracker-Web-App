
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Bugs from "./pages/Bugs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bugs" element={<Bugs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

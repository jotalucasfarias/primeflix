import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Filme from "./pages/Filme";
import Favoritos from "./pages/Favoritos";

import Header from "./components/Header";
import Erro from "./pages/Erro";
function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<Filme />} />
        <Route path="/favoritos" element={<Favoritos />} />
        {/* Rota para página de erro 404 */}
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;

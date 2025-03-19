import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacto from "./Pages/Contacto";
import Pintura from "./Pages/Pintura";
import Noticias from "./Pages/Noticias";
import Loging from "./Pages/Loging/Index";
import Nosotros from "./Pages/Nosotros/Index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App/>} />
        <Route path="/Pintura" element={<Pintura/>} />
        <Route path="/Contacto" element={<Contacto/>} />
        <Route path="/Noticias" element={<Noticias/>} />
        <Route path="Loging" element={<Loging/>}/>
        <Route path="Nosotros" element={<Nosotros/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

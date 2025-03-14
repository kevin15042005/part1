import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacto from "./Pages/Contacto/Index";
import Pintura from "./Pages/Pintura/Index";
import Noticias from "./Pages/Noticias/Index";
import Add from "./Pages/Noticias/Add";
import Update from "./Pages/Noticias/Update";
// import Nosotros from "";
// import Login from "";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/Pintura" element={<Pintura />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="Noticias/Add" element={<Add />} />
        <Route path="Noticias/update" element={<Update />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

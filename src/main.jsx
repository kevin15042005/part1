import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Contacto from "./Pages/Contacto";
import Pintura from "./Pages/Pintura";
import Noticias from "./Pages/Noticias";
import Loging from "./Pages/Loging/index.jsx";
import Nosotros from "./Pages/Nosotros/Index";
import Compra from "./Pages/Compra/index.jsx";

import CrudNoticias from "./Pages/Crud/Noticia.jsx";
import CrudNoticiasPintura from "./Pages/Crud/Pintura1.jsx";
import Shop from "./Pages/Crud/Shop1.jsx";

// 🔐 Ruta protegida
import ProtectedRoute from "./Components/ProtectedRoute/index";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route index path="/" element={<App />} />
        <Route path="/Pintura" element={<Pintura />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="/Loging" element={<Loging />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Compra" element={<Compra />} />

        {/* Rutas protegidas (solo si está logueado) */}
        <Route
          path="/CrudNoticias"
          element={
            <ProtectedRoute>
              <CrudNoticias />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CrudNoticiasPintura"
          element={
            <ProtectedRoute>
              <CrudNoticiasPintura />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contacto from "./Pages/Contacto";
import Pintura from "./Pages/Pintura";
import Noticias from "./Pages/Noticias";
import Loging from "./Pages/Loging/Index";
import Nosotros from "./Pages/Nosotros/Index";
import CrudNoticias from "./Pages/CrudNoticias/index"
import CrudNoticiasPintura from "./Pages/CrudNoticiasPintura/index";
import Shop from "./Pages/Shop/index"
import Shop1 from "./Pages/Shop1/index"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/Pintura" element={<Pintura />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Noticias" element={<Noticias />} />
        <Route path="Loging" element={<Loging />} />
        <Route path="Nosotros" element={<Nosotros />} />
        <Route path="/CrudNoticias" element={<CrudNoticias />} />
        <Route path="/CrudNoticiasPintura" element={<CrudNoticiasPintura/>}/>
        <Route path="/Shop" element={<Shop/>}/>
        <Route path= "/Shop1" element={<Shop1/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

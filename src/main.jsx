import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Pintura from "./Pages/Pintura/Index";
import Contacto from "./Pages/Contacto/Index";
// import Nosotros from "";
// import Login from "";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route  path="/Pintura" element={<Pintura/>} />
          <Route path="/Contacto" element={<Contacto/>} />
  {/* {        <Route path="/Nostros" element={<Nosotros/>} />
          <Route path="/Login" element={<Login/>} />} */}
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)

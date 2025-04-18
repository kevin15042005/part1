// src/Components/Slider.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function Slider() {
  const [aliados, setAliados] = useState([]);

  useEffect(() => {
    obtenerAliados();
  }, []);

  const obtenerAliados = () => {
    axios
      .get("http://localhost:8080/api/aliados")
      .then((res) => setAliados(res.data))
      .catch((err) => console.error("Error al cargar aliados", err));
  };

  return (
    <div className="slider-container-aliados">
      <div className="slider">
        {[...aliados, ...aliados, ...aliados].map((aliado, index) => (
          <div key={index} className="aliado-card">
            <img
              src={`http://localhost:8080/uploads/${aliado.imagen_Marcas_Aliadas}`}
              alt={aliado.nombre_Aliado_Marca}
            />
            <p>{aliado.nombre_Aliado_Marca}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;

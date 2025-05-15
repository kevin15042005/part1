import React, { useState, useEffect } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Noticias.css";

const BienvenidaNoticia = () => {
  const texto = "Noticias relevante "
  const letraAnimada = texto.split("").map((letra, index) => (
    <span key={index} className="letra" style={{ animationDelay: `${index * 0.05}s` }}>{ letra === " " ? "\u00A0":letra}</span>
  ))
  return <h1>{ letraAnimada}</h1>
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/noticias")
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div id="main-container">
        <Layout />
        <div className="Menu-Principal-Noticias">
          <div className="Informacion-Noticia">
            <h3><BienvenidaNoticia/> </h3>
            <p>
              No te pierdas los detalles respecto sobre los siguientes eventos{" "}
            </p>
          </div>
          <div className="Container-Noticia">
            <div className="Contenedor-principal">
              <ul className="grid-container-noticias">
                {noticias.map((noticia) => (
                  <li key={noticia.id_Noticia} className="grid-item-noticias">
                    <h2>{noticia.nombre_Noticias}</h2>
                    <p>{noticia.contenido_Noticia}</p>
                    {noticia.cover && (
                      <img
                        src={`http://localhost:8080/uploads/${noticia.cover}`}
                        alt={noticia.nombre_Noticias}
                        className="imagen"
                      />
                    )}
                    <span className="num-Id">{noticia.id_Noticia} </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

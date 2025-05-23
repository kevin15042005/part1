import React, { useState, useEffect } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Noticias.css";
import ScrollAnimation from "../../Components/ScrollAnimationCrud/index";

const BienvenidaNoticia = () => {
  const texto = "Noticias relevante ";
  const letraAnimada = texto.split("").map((letra, index) => (
    <span
      key={index}
      className="letraNoticia"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {letra === " " ? "\u00A0" : letra}
    </span>
  ));
  return <h1>{letraAnimada}</h1>;
};
function CarruselImagenes({ cover, nombre_Noticias, contenido_Noticia }) {
  const images = cover ? cover.split(",") : [];
  const [indexActual, setIndexActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexActual((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="carrusel-container">
      <div className="imagen-contenedor">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:8080/uploads/${img}`}
            alt={`${nombre_Noticias} - imagen ${idx + 1}`}
            className={`imagen-fondo ${
              idx === indexActual ? "visible" : "oculto"
            }`}
          />
        ))}
      </div>
      <div className="texto-hover">
        <h2>{nombre_Noticias}</h2>
        <p>{contenido_Noticia}</p>
      </div>
    </div>
  );
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
            <div className="titulo-Bienvenida">
              <BienvenidaNoticia />{" "}
            </div>
            <div className="Texto-Informativo-Noticia"><p >
              No te pierdas los detalles respecto sobre los siguientes eventos ,
              noticias de lo que pasa en la motovelocidad y en los eventos
              aliados de nuestra comunidad{" "}
            </p></div>
            
          </div>
          <div className="Container-Noticia">
            <div className="Contenedor-principal">
              <ul className="grid-container-noticias">
                {noticias.map((noticia, index) => (
                  <ScrollAnimation key={noticia.id_Noticia} delay={index * 0.2}>
                    <CarruselImagenes
                      cover={noticia.cover}
                      nombre_Noticias={noticia.nombre_Noticias}
                      contenido_Noticia={noticia.contenido_Noticia}
                    />
                  </ScrollAnimation>
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

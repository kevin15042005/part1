import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout/index.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import "./Pintura.css";
import ScrollAnimadoCrud from "../../Components/ScrollAnimationCrud/index.jsx";
import moto from "../../assets/cf1.jpeg";
import moto1 from "../../assets/cf2.jpeg";
import moto2 from "../../assets/cf3.jpeg";
const BienvenidaPintura = () => {
  const texto = "Diseños creados";
  const letrasAnimadas = texto.split("").map((letra, index) => (
    <span
      key={index}
      className="letraPintura"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {letra === " " ? "\u00A0" : letra}
    </span>
  ));
  return <h1>{letrasAnimadas}</h1>;
};

function CarruselImagenes({
  cover,
  nombre_Noticia_Pintura,
  contenido_Noticia_Pintura,
}) {
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
            alt={`${nombre_Noticia_Pintura} - imagen ${idx + 1}`}
            className={`imagen-fondo ${
              idx === indexActual ? "visible" : "oculto"
            }`}
          />
        ))}
      </div>
      <div className="texto-hover">
        <h2>{nombre_Noticia_Pintura}</h2>
        <p>{contenido_Noticia_Pintura}</p>
      </div>
    </div>
  );
}

function CarruselImagenesFijas() {
  const imagenes = [moto, moto1, moto2];
  const [indexActual, setIndexActual] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndexActual((prev) => (prev + 1) % imagenes.length);
        setFade(false);
      }, 1000); 
    }, 4000); 
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  return (
    <img
      src={imagenes[indexActual]}
      alt={`Imagen ${indexActual + 1}`}
      className={`imagen-fija ${fade ? "oculto" : ""}`}
    />
  );
}

export default function Pintura() {
  const [noticiasPintura, setNoticiasPintura] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/pintura")
      .then((res) => res.json())
      .then((data) => setNoticiasPintura(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div id="main-container">
        <Layout />
        <div className="Contenido-Principal">
          <div className="Informacion-Pintura">
            <div className="titulo-Pintura">
              <BienvenidaPintura />
            </div>
            <div className="Informacion-RelevanteGeneral-Pintura">
              <section className="Imagen-Relevante-Pintura">
                <CarruselImagenesFijas />
              </section>
              <section className="InformacionRelevantePintura">
                <h2>Información Relevante</h2>
                <p>
                  Aca se visualizara los diseños relizados por parte de la
                  compañia , de igual forma veran que marca es , cual fue la
                  motivacion de diseñarlo
                </p>
              </section>
            </div>
          </div>
          <div className="Container-Pintura">
            <div className="Contenedor-principal">
              <ul className="grid-container-pintura">
                {noticiasPintura.map((noticia, index) => (
                  <ScrollAnimadoCrud
                    key={noticia.id_Noticias_Pintura}
                    delay={index * 0.2}
                  >
                    <li className="grid-item-pintura">
                      <CarruselImagenes
                        cover={noticia.cover}
                        nombre_Noticia_Pintura={noticia.nombre_Noticia_Pintura}
                        contenido_Noticia_Pintura={
                          noticia.contenido_Noticia_Pintura
                        }
                      />
                      <span>{noticia.id_Noticias_Pintura}</span>
                    </li>
                  </ScrollAnimadoCrud>
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

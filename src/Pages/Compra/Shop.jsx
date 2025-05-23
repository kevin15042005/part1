import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Shop.css";
import ScrollAnimadoCrud from "../../Components/ScrollAnimationCrud/index";
const BienvenidaCompra = () => {
  const texto = "Acá se publicarán los artículos";
  const letraAnimada = texto.split("").map((letra, index) => (
    <span
      key={index}
      className="letraShop"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {letra === " " ? "\u00A0" : letra}
    </span>
  ));
  return <h1>{letraAnimada}</h1>;
};

function CarruselImagenes({ cover, nombre_Shop, contenido_Shop }) {
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
      <div className="imagen-contenedorshop">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:8080/uploads/${img}`}
            alt={`${nombre_Shop} - imagen ${idx + 1}`}
            className={`imagen-fondo ${
              idx === indexActual ? "visible" : "oculto"
            }`}
          />
        ))}
      </div>
      <div className="texto-hover">
        <h2>{nombre_Shop}</h2>
        <p>{contenido_Shop}</p>
      </div>
    </div>
  );
}

export default function Shop1() {
  const [shop, setShop] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/Shop")
      .then((res) => res.json())
      .then((data) => setShop(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div id="main-container">
        <Layout />
        <div className="Informacion-Pintura">
          <div className="titulo-Compra">
            <BienvenidaCompra />
          </div>
          <div className="Texto-Informativo-Noticia">
            <p>
              En esta sesion veras reflejado que diseño se han relializado, a
              que motos tipo de moto y de que nos dio inspircacion
            </p>
          </div>
        </div>

        <div className="Container-Artiuclo">
          <div className="Contenedor-principal">
            <ul className="grid-container-shop">
              {shop.map((articulo, index) => (
                <ScrollAnimadoCrud key={articulo.id_Shop} delay={index * 0.2}>
                  <li className="grid-item-shop">
                    <CarruselImagenes
                      cover={articulo.cover}
                      nombre_Shop={articulo.nombre_Shop}
                      contenido_Shop={articulo.contenido_Shop}
                    />
                    <div className="contenedor-precio">
                      <span>${articulo.precio_Shop}</span>
                      <button>Dirigir a productos</button>
                    </div>
                  </li>
                </ScrollAnimadoCrud>
              ))}
            </ul>
          </div>
        </div>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

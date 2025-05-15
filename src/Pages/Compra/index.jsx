import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Shop.css";

const BienvenidaCompra = () => {
  const texto = "Acá se publicarán los artículos";
  const letraAnimada = texto.split("").map((letra, index) => (
    <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
      {letra === " " ? "\u00A0" : letra}
    </span>
  ));
  return <h1>{letraAnimada}</h1>;
};

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
          <h3><BienvenidaCompra/></h3>
          <p className="Informacion-Pintura-P">
            Aquí veremos reflejados los diseños que hemos creado. ¡Disfruta
            estas maravillosas motos diseñadas con la pasión de Duart-Studio!
          </p>
        </div>

        <div className="Container-Artiuclo">
          <div className="Contenedor-principal">
            <ul className="grid-container-shop">
              {shop.map((articulo) => (
                <li key={articulo.id_Shop} className="grid-item-shop">
                  <h2>{articulo.nombre_Shop}</h2>
                  <p>{articulo.contenido_Shop}</p>
                  {articulo.cover && (
                    <img
                      src={`http://localhost:8080/uploads/${articulo.cover}`}
                      alt={articulo.nombre_Shop}
                      className="imagen"
                    />
                  )}
                  <h3>${articulo.precio_Shop}</h3>
                  <button>Dirigir a productos</button>
                  <span className="num-Id">{articulo.id_Shop}</span>
                </li>
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

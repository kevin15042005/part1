import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Pintura.css";
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
            <h3>
              Veremos la informacion relevante que diseños de pinutras se han
              creados{" "}
            </h3>
            <p>
              Aca veremos reflejado que dieseños hemos creado asi que disfruta
              de esta maravillosa motos diseñadas con la pasion de Duart-Studio{" "}
            </p>
          </div>
          <div className="Container-Pintura">
            <div className="Contenedor-principal">
              <ul className="grid-container-pintura">
                {noticiasPintura.map((noticia) => (
                  <li
                    key={noticia.id_Noticias_Pintura}
                    className="grid-item-pintura"
                  >
                    <h2>{noticia.nombre_Noticia_Pintura}</h2>
                    <p>{noticia.contenido_Noticia_Pintura}</p>
                    {noticia.cover && (
                      <img
                        src={`http://localhost:8080/uploads/${noticia.cover}`}
                        alt={noticia.nombre_Noticia_Pintura}
                        className="imagen"
                      />
                    )}
                    <span>{noticia.id_Noticias_Pintura}</span>
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

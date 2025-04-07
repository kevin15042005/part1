import React from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Pintura.css";
export default function Pintura() {
  return (
    <>
      <div id="main-container">
        <Layout />
        <div className="Informacion-Pintura">
          <h3 className="Informacion-Pintura-H3">
            Veremos la informacion relevante que diseños de pinutras se han
            creados{" "}
          </h3>
          <p className="Informacion-Pintura-P"> 
            Aca veremos reflejado que dieseños hemos creado asi que disfruta de
            esta maravillosa motos diseñadas con la pasion de Duart-Studio{" "}
          </p>
        </div>
        <div className="Container-Pintura">
          <div className="Contenedor-principal">
            <label htmlFor="">Contenedor 1</label>
            <div className="Contenedor-1"></div>
            ul.pintura
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

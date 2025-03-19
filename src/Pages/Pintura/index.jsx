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
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

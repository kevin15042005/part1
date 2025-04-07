import React from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./noticias.css";
export default function Noticias() {
    return (
      <>
      <div id="main-container">
      <Layout/>
        <div className="Menu-Noticia">
          <h1 className="Menu-Titulo">Lista Noticias</h1>
        </div>
       
      <footer>
          <Footer />
        </footer>
        </div>
      </>
    );
  }
import React from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
export default function Noticias() {
    return (
      <>
      <div id="main-container">
      <Layout/>
        <div className="Menu-Noticia">
          <h1>Lista Noticias</h1>
        </div>
       
      <footer>
          <Footer />
        </footer>
        </div>
      </>
    );
  }
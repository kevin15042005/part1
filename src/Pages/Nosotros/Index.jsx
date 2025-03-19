import React from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Nosotros.css";
export default function Ubicacion() {
  return (
    <div id="main-container">
      <Layout />
      <div className="Menu-Ubicacion">
        <div className="InformacioNosotros">
          <div className="Menu-Mision">
            <h2>Mision</h2>
            <p>efdffffff</p>
          </div>
          <div className="Menu-Vision">
            <h2>Vision</h2>
            <p>cscs</p>
          </div>
          <div className="Menu-Obejtivo">
            <h2>Objetivos</h2>
            <p>innxsx</p>
          </div>
          <div className="Ubicacion">
            <p>
              Nos encontramos ubicados en la ciudad Bogota D.C Colombia
              nosestablecimos aqui por el gran comercio y inspiracion a la gran
              mayoria de motos ya que es una de las ciudades con mayor cantidad
              de motos{" "}
            </p>
          </div>
          <div className="ubicacionMaps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15908.15966063447!2d-74.16315452327753!3d4.586858863649104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9f23409b4f75%3A0xef8a79a5e02535a9!2sDU-ART%20STUDIO!5e0!3m2!1ses-419!2sco!4v1742415082521!5m2!1ses-419!2sco"
              width="800"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

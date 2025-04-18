import "./App.css";
import Layout from "./Components/layout";
import Footer from "./Components/Footer/footer";
import Slider from "./Components/Slider/Slider";

function App() {
  return (
    <>
      <Layout />
      <div className="General">
        <div className="BienvenidaApp">
          <h1>Bienvenido a Duart-Studio</h1>
        </div>
        <div className="InformacionRelevante">
          <h2>Información Relevante</h2>

          <p>
            Esta es una compañia dedicada y apasionada a las motos donde veran
            todo lo relacionado a la pintura accerios y diseño exclusivos de
            motos fabricado en pintura de la mas alta calidad si quieres ver mas
            navega y descubre que tenemos para ti{" "}
          </p>
        </div>

        <div className="Introduccion_Duart">
          <p>
            Disfruta de este agradable video donde veras lo que tenemos para ti
          </p>
          <iframe
            width="600"
            height="335"
            src="https://www.youtube.com/embed/XXFsHCSR4Cw?si=0MstQ_GNyGUm_U5u"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div className="MarcasAliadas">
          <h1>Nuestra Marcas Aliadas</h1>
        </div>
        <div className="slider-container">
          <div className="slider">
            <Slider />
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

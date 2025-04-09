import React ,{useState,useEffect}from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./noticias.css";
export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/noticias")
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.log(err));
  }, []);
  return(
      <>
       <div id="main-container">
        <Layout />
        <div className="Informacion-Noticia">
          <h3 className="Informacion-Noticia-H3">
            Veremos la informacion relevante que diseños de pinutras se han
            creados{" "}
          </h3>
          <p className="Informacion-Noticia-P">
            Aca veremos reflejado que dieseños hemos creado asi que disfruta de
            esta maravillosa motos diseñadas con la pasion de Duart-Studio{" "}
          </p>
        </div>
        <div className="Container-Noticia">
          <div className="Contenedor-principal">
            <label htmlFor="">Contenedor 1</label>
            <div className="Contenedor-1">
              {noticias.map((noticia) => (
                <div key={noticia.id_Noticia}>
                  <h2>{noticia.nombre_Noticias}</h2>
                  <p>{noticia.contenido_Noticia}</p>
                  {noticia.cover && (
                   <img
                   src={`http://localhost:8080/uploads/${noticia.cover}`}
                   alt={noticia.nombre_Noticias}
                   className="imagen"
                 />
                 
                  )}
                </div>
              ))}
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
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer-inicio"> @Copyright</div>
      <div className="footer-nav">
        <ul className="nav-footer">
          <li>
            <Link to="/contacto" className="nav-link">
              Inicio
            </Link>
          </li>

          <li>
            <a href="tel:+573204916831" className="nav-link">{/*tel para poder llamar */}
              {" "}
              Llamanos: 3204916831
            </a>
          </li>
          <li>
            <a href="mailto:kevin2013118@gmail.com" className="nav-link">{/*mailto sirve para enviar correo desde que el cliente quiera sea gmail.outlok u otro*/}
              {" "}
              Eviar Correo
            </a>
          </li>

          <li>
            <Link to="/noticias" className="nav-link">
              Noticias
            </Link>
          </li>

          <li>
            <a
              href="https://maps.app.goo.gl/CiQJoSiT85ts1jsK9"
              target="_blank"
              rel="noopener noreferrer" className="nav-link"
            >{/*_Blank para abrir otra pagina y rel es buena practica y seguridad*/}
              Ubicacion
            </a>
          </li>
          <li>
            <p>Horario: L-V: 9AM-5PM</p>
          </li>
          <li>
            <Link to="/pintura" className="nav-link">
              Pintura
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="nav-link">
              Accesorios
            </Link>
          </li>

          <li>
            <p>S: 9AM-2PM</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/LogoPrincipal.jpg";
const Navbar = () => {
  return (
    <>
      <div></div>
      <div className="nav">
        <ul className="nav-menu">
          <li>
            <Link to="/" className="colorTexto">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/pintura" className="colorTexto">
              Pintura
            </Link>
          </li>
          <li>
            <Link to="/noticias" className="colorTexto">
              Noticias
            </Link>
          </li>
          <div className="nav-logo">
            <img src={Logo} className="navLogo" alt="" />
          </div>
          <li>
            <Link to="/Nosotros" className="colorTexto">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/Contacto" className="colorTexto">
              Contacto
            </Link>
          </li>

          <li>
            <Link to="/loging" className="colorTexto">
              Ingreso
            </Link>
          </li>

          {/* <li>
          <Link to="/nosotros">Nosotros</Link>
        </li> */}
          {/* <li className="nav-contact">
          <Link to="/login">Login</Link>
        </li> */}

          <li>
            <Link to="/CrudNoticias" className="colorTexto">
              Crud Noticias
            </Link>
          </li>
          <li>
            <Link to="/CrudNoticiasPintura" className="colorTexto">
              Crud Noticias Pintura
            </Link>
          </li>
          <li>
            <Link to="/Shop" className="colorTexto">
            Shop
            </Link>
          </li>
          <li>
            <Link to="/Shop1" className="colorTexto">
            Shop1
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;

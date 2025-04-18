import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/LogoPrincipal.jpg";
const NavbarNoticia = () => {
  return (
    <>
      <div></div>
      <div className="nav">
        <ul className="nav-menu">
          <li>
            <Link to="/Aliados" className="colorTexto">
              Aliados
            </Link>
          </li>
          <li>
            <Link to="/CrudNoticias" className="colorTexto">
              Noticias
            </Link>
          </li>
          <li>
            <Link to="/CrudNoticiasPintura" className="colorTexto">
              Pintura
            </Link>
          </li>
          <li>
            <Link to="/Shop" className="colorTexto">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/Registrar" className="colorTexto">
              Registrar
            </Link>
          </li>
          <li>
            <button className="Cerrar-Sesion" onClick={()=>{localStorage.clear()
              window.location.href="/"
            }}> Cerrar Sesion</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarNoticia;

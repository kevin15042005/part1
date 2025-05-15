import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/LogoPrincipal.jpg";
const Navbar = () => {
  return (
    <>
      <div className="General-Navbar">
        <div className="Fondo-Navbar">
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
            </ul>
            <ul className="nav-menu">
              <div className="nav-logo">
                <img src={Logo} className="navLogo" alt="" />
              </div>
            </ul>
            <ul className="nav-menu">
              <li>
                <Link to="/Compra" className="colorTexto">
                  Shop
                </Link>
              </li>

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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

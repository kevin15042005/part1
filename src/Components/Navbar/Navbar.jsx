import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/LogoPrincipal.jpg";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="General-Navbar">
      <div className="Fondo-Navbar">
        <div className="nav">
          <ul className="nav-menu">
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/" className="colorTexto">
                Inicio
              </Link>
            </li>
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/pintura" className="colorTexto">
                Pintura
              </Link>
            </li>
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/noticias" className="colorTexto">
                Noticias
              </Link>
            </li>
          </ul>

          <ul className="nav-menu">
            <div className="nav-logo">
              <img src={Logo} className="navLogo" alt="Logo" />
            </div>
          </ul>

          <ul className="nav-menu">
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/Compra" className="colorTexto">
                Shop
              </Link>
            </li>
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/Nosotros" className="colorTexto">
                Nosotros
              </Link>
            </li>
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/Contacto" className="colorTexto">
                Contacto
              </Link>
            </li>
            <li className="Transicion-navbar" onClick={handleClick}>
              <Link to="/loging" className="colorTexto">
                Ingreso
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

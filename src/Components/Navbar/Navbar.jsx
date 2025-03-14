import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/LogoPrincipal.jpg";
const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo"><img src={Logo} className="navLogo" alt="" /></div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Inicio</Link> 
        </li>
        <li>
          <Link to="/pintura">Pintura</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        <li>
          <Link to="/noticias">Noticias</Link>
        </li>
        {/* <li>
          <Link to="/nosotros">Nosotros</Link>
        </li> */}
        {/* <li className="nav-contact">
          <Link to="/login">Login</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;


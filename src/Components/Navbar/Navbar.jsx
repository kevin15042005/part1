import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">DUART-STUDIO</div>
      <ul className="nav-menu">
        <li>
          <Link to="/pintura">Pintura</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        <li>
          <Link to="/loging">Login</Link>
        </li>
        <li>
          <Link to = "/Ventas">Ventas</Link>
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


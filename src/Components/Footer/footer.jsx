import React from "react";
import {Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer-inicio"> @Copye Rigth</div>
      <div className="footer-nav">
      <ul className="nav-footer">
        <li>
          <Link to="/pintura">Inicio</Link>
        </li>
        <li>
          <Link to="/contacto">Inicio</Link>
        </li>
        <li>
          <Link to="/loging">Loging</Link>
        </li>
        <li>
          <Link to = "/Ventas">Ventas</Link>
        </li>
        <li>
          <Link to="/pintura">Inicio</Link>
        </li>
        <li>
          <Link to="/contacto">Inicio</Link>
        </li>
        <li>
          <Link to="/loging">Loging</Link>
        </li>
        <li>
          <Link to = "/Ventas">Ventas</Link>
        </li>
      </ul>
      </div>
    </div>
  );
};

export default Footer;

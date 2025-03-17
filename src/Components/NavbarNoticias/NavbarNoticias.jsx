import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavbarNoticias.css"; // Asegúrate de importar los estilos
function NavbarNoticias() {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <nav>
      <ul>
        <li
          onMouseEnter={() => setSubmenuOpen(true)}
          onMouseLeave={() => setSubmenuOpen(false)}
        >
          <Link to="/noticias">Noticias</Link>
          {submenuOpen && (
            <ul className="submenu">
              <li>
                <Link to="/noticias/add">Add</Link>
              </li>
              <li>
                <Link to="/noticias/update">Update</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavbarNoticias;

import { Outlet } from "react-router-dom";
import NavbarNoticias from "../NavbarNoticias/NavbarNoticias";

const NoticiasLayout = () => {
  return (
    <div className="Main">
      {/*<NavbarNoticias />*/}
      <Outlet /> {/* Esto renderiza el contenido de las rutas anidadas */}
    </div>
  );
}

export default NoticiasLayout;

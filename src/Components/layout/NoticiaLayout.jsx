import { Outlet } from "react-router-dom";
import NavbarNoticias from "../NavbarNoticias/NavbarNoticias";

const NoticiasLayout=()=>{
return(
<div>
    <NavbarNoticias/>
    <Outlet/>{/*Con esto mostrara la subpaginas*/}
</div>

)
}
export default NoticiasLayout;
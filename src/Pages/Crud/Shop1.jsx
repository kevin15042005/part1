import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout";
import "./Shop1.css"
export default function Shop() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [id_Shop, setIdShop] = useState("");
  const [precio_Shop, setPrecio_Shop] = useState("");
  const [noticiasPublicadas, setNoticiasPublicadas] = useState(0);


  const [tituloActualizar, setTituloActualizar] = useState("");
  const [descripcionActualizar, setDescripcionActualizar] = useState("");
  const [imagenActualizar, setImagenActualizar] = useState(null);
  const [id_ShopActualizar, setIdShopActualizar] = useState("");
  const [precio_ShopActualizar, setPrecio_ShopActualizar] = useState("");

  const [id_ShopEliminar,setShopIdEliminar]= useState("");


  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setImagen(null);
    setIdShop("");
    setPrecio_Shop("");
    document.getElementById("fileInput").value="";
  };

  const limpiarCamposActualizar = () => {
    setTituloActualizar("");
    setDescripcionActualizar("");
    setImagenActualizar(null);
    setIdShopActualizar("");
    setPrecio_ShopActualizar("");
    document.getElementById("fileInputActualizar").value="";
  };
    const limpiarCampoEliminar=()=>{
      setShopIdEliminar("");
    }

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch("http://localhost:8080/Shop");
        const data = await res.json();
        setNoticiasPublicadas(data.length)
      } catch (err) {
        console.error("Error al obtener la noticia", err);
      }
    };
    obtenerNoticias();
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); //
    limpiarCampos();
    const formData = new FormData();
    if (noticiasPublicadas >= 9) {
      alert("LLegaste a el limite de la publicacion");
      return;
    }
    if(!titulo||!descripcion||!precio_Shop||!imagen){
      alert("Ingrese todos los campos")
      return
    }
    formData.append("nombre_Shop", titulo);
    formData.append("contenido_Shop", descripcion);
    formData.append("precio_Shop", precio_Shop);
    formData.append("cover", imagen);

    try {
      const res = await fetch("http://localhost:8080/Shop", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Articulo Creado");
      limpiarCampos();
      setNoticiasPublicadas(noticiasPublicadas + 1);
    } catch (err) {
      console.error(err);
      alert("Error al crear la Articulo");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); 
    limpiarCamposActualizar();
    const formData = new FormData();
    formData.append("id_Shop", id_ShopActualizar);
    formData.append("nombre_Shop", tituloActualizar);
    formData.append("contenido_Shop", descripcionActualizar);
    formData.append("precio_Shop", precio_ShopActualizar);
    if (imagen) formData.append("cover", imagenActualizar);

    try {
      const res = await fetch("http://localhost:8080/Shop", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Articulo actualizada");
      limpiarCampos();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la Articulo");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    limpiarCampoEliminar();
    try {
      const res = await fetch(`http://localhost:8080/Shop/${id_Shop}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message || "Articulo eliminado");
      limpiarCampos();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar Articulo");
    }
  };

  return (
    <div className="Menu-Principal">
    <Layout>
      <div className="Titulo">
        <h1>Crud Shop</h1>
      </div>
      <section className="Formularios">
        <form onSubmit={handleSubmit}>
          <h2>Crear Articulo</h2>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Costo"
            value={precio_Shop}
            onChange={(e) => setPrecio_Shop(e.target.value)}
          />
          <input type="file" id="fileInput" onChange={(e) => setImagen(e.target.files[0])} />
          <button type="submit">Crear Noticia</button>
        </form>

        <form onSubmit={handleUpdate}>
          <h2>Actualizar Noticia</h2>
          <input
            type="text"
            placeholder="Título"
            value={tituloActualizar}
            onChange={(e) => setTituloActualizar(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcionActualizar}
            onChange={(e) => setDescripcionActualizar(e.target.value)}
          />
          <input type="file" id="fileInputActualizar" onChange={(e) => setImagenActualizar(e.target.files[0])} />
          <input
            type="text"
            placeholder="Costo"
            value={precio_ShopActualizar}
            onChange={(e) => setPrecio_ShopActualizar(e.target.value)}
          />
          <input
            type="text"
            placeholder="ID Noticia"
            value={id_ShopActualizar}
            onChange={(e) => setIdShopActualizar(e.target.value)}
          />
          <button type="submit">Actualizar</button>
        </form>

        <form onSubmit={handleDelete}>
          <h2>Eliminar Noticia</h2>
          <input
            type="text"
            placeholder="Título de la noticia"
            value={id_ShopEliminar}
            onChange={(e) => setShopIdEliminar(e.target.value)}
          />
          <button type="submit">Eliminar</button>
        </form>
      </section>
    </Layout>
    </div>
  );
}

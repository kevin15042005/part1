import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout";

export default function Shop() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [id_Shop, setIdShop] = useState("");
  const [precio_Shop, setPrecio_Shop] = useState("");
  const [noticiasPublicadas, setNoticiasPublicadas] = useState(0);

  //Limpair los campos

  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setImagen(null);
    setIdShop("");
    setPrecio_Shop("")
  };

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch("http://localhost:8080/Shop");
        const data = await res.json();
      } catch (err) {
        console.error("Error al obtener la noticia", err);
      }
    };
    obtenerNoticias();
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); //
    const formData = new FormData();
    if (noticiasPublicadas >= 5) {
      alert("LLegaste a el limite de la publciacion");
      return;
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
    e.preventDefault(); // 👈 Error corregido
    const formData = new FormData();
    formData.append("id_Shop", id_Shop);
    formData.append("nombre_Shop", titulo);
    formData.append("contenido_Shop", descripcion);
    formData.append("precio_Shop", precio_Shop);
    if (imagen) formData.append("cover", imagen);

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
    try {
      const res = await fetch(`http://localhost:8080/Shop/${titulo}`, {
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
    <Layout>
      <div>
        <h1>CRUD Shop</h1>
      </div>

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
          placeholder="Cosot"
          value={precio_Shop}
          onChange={(e) => setPrecio_Shop(e.target.value)}
        />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        <button type="submit">Crear Noticia</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h2>Actualizar Noticia</h2>
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
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        <input
          type="text"
          placeholder="Cosot"
          value={precio_Shop}
          onChange={(e) => setPrecio_Shop(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID Noticia"
          value={id_Shop}
          onChange={(e) => setIdShop(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>

      <form onSubmit={handleDelete}>
        <h2>Eliminar Noticia</h2>
        <input
          type="text"
          placeholder="Título de la noticia"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <button type="submit">Eliminar</button>
      </form>
    </Layout>
  );
}

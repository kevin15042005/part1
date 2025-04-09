import React, { useState } from "react";
import Layout from "../../Components/layout";

export default function CrudNoticias() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [idNoticia, setIdNoticia] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre_Noticias", titulo);
    formData.append("contenido_Noticia", descripcion);
    formData.append("cover", imagen);

    try {
      const res = await fetch("http://localhost:8080/noticias", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Noticia Incorrecta");
    } catch (err) {
      console.error(err);
      alert("Error al crear la noticia");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_Noticia", idNoticia);
    formData.append("nombre_Noticias", titulo);
    formData.append("contenido_Noticia", descripcion);
    if (imagen) formData.append("cover", imagen);

    try {
      const res = await fetch("http://localhost:8080/noticias", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Noticia actualizada");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la noticia");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/noticias/${titulo}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message || "Noticia eliminada");
      setTitulo("");
      setDescripcion("");
      setImagen(null);
      setIdNoticia("");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la noticia");
    }
  };

  return (
    <Layout>
      <div>
        <h1>CRUDNoticias</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Crear Noticia</h1>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        <button type="submit">Crear Noticia</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h1>Actualizar Noticia</h1>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        <input type="text" placeholder="ID Noticia" value={idNoticia} onChange={(e) => setIdNoticia(e.target.value)} />
        <button type="submit">Actualizar</button>
      </form>

      <form onSubmit={handleDelete}>
        <h1>Eliminar Noticia</h1>
        <input type="text" placeholder="Título de la noticia" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <button type="submit">Eliminar</button>
      </form>
    </Layout>
  );
}

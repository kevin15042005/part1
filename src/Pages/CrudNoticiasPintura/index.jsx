import React, { useState } from "react";
import Layout from "../../Components/layout";

export default function CrudNoticiasPintura() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [idNoticia, setIdNoticia] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👈 Estaba mal escrito como "preventDefautl"
    const formData = new FormData();
    formData.append("nombre_Noticia_Pintura", titulo);
    formData.append("contenido_Noticia_Pintura", descripcion);
    formData.append("cover", imagen);

    try {
      const res = await fetch("http://localhost:8080/noticiaspintura/crear", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Noticia creada");
    } catch (err) {
      console.error(err);
      alert("Error al crear la noticia");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // 👈 Error corregido
    const formData = new FormData();
    formData.append("id_Noticias_Pintura", idNoticia);
    formData.append("nombre_Noticia_Pintura", titulo);
    formData.append("contenido_Noticia_Pintura", descripcion);
    if (imagen) formData.append("cover", imagen);

    try {
      const res = await fetch("http://localhost:8080/noticiaspintura", {
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
      const res = await fetch(`http://localhost:8080/noticiaspintura/${titulo}`, {
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
        <h1>CRUD Noticias Pintura</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Crear Noticia</h2>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        <button type="submit">Crear Noticia</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h2>Actualizar Noticia</h2>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
        <input type="text" placeholder="ID Noticia" value={idNoticia} onChange={(e) => setIdNoticia(e.target.value)} />
        <button type="submit">Actualizar</button>
      </form>

      <form onSubmit={handleDelete}>
        <h2>Eliminar Noticia</h2>
        <input type="text" placeholder="Título de la noticia" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <button type="submit">Eliminar</button>
      </form>
    </Layout>
  );
}

import React, { useState, useEffect } from "react";
import Layout from "../../Components/layout";

export default function CrudNoticias() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [idNoticia, setIdNoticia] = useState("");
  const [noticiasPublicadas, setNoticiasPublicadas] = useState(0);


  //Limpiar los campos apenas se inserte un valor

  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setImagen(null);
    setIdNoticia("");
  };

  //Cuando llegue a un limte de 5 noticias dira que reinciie la noticia

  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch("http://localhost:8080/noticias");
        const data = await res.json();
        setNoticiasPublicadas(data.length); // Aquí también corregí el nombre de la función
      } catch (err) {
        console.error("Error al obtener las noticias:", err);
      }
    };

    obtenerNoticias();
  }, []); // <-- aquí cerramos correctamente el useEffect

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noticiasPublicadas >= 5) {
      alert("Ya llegaste al límite de 5 noticias publicadas.Elimina o Actualiza");
      return;
    }
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
      alert(data.message || "Noticia Correctamente");
      limpiarCampos();
      setNoticiasPublicadas(noticiasPublicadas + 1);
    } catch (err) {
      console.error(err);
      alert("Error al crear la noticia");
    }
  };
//Actualizar Noticia
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
      limpiarCampos();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la noticia");
    }
  };
//Eliminar Noticia
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/noticias/${idNoticia}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message || "Noticia eliminada");
      limpiarCampos();
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
        <button type="submit">Crear Noticia</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h1>Actualizar Noticia</h1>
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
          placeholder="ID Noticia"
          value={idNoticia}
          onChange={(e) => setIdNoticia(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>

      <form onSubmit={handleDelete}>
        <h1>Eliminar Noticia</h1>
        <input
          type="text"
          placeholder="Id a eliminar"
          value={idNoticia}
          onChange={(e) => setIdNoticia(e.target.value)}
        />
        <button type="submit">Eliminar</button>
      </form>
    </Layout>
  );
}

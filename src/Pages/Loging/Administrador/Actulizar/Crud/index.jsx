import React, { useState } from "react";
import Layout from "../../../../../Components/layout";

export default function Actulizar() {
  
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",titulo);
    formData.append("descripcion",descripcion);
    formData.append("cover",imagen);
    try {
      const res = await fetch("http://localhost:8080/noticias", {
        method: "POST",
        body:formData

      });

      const data = await res.json();
      alert(data.message || "Noticia creada");
    } catch (err) {
      console.error(err);
      alert("Error al crear la noticia");
    }
  };

  return (
    <Layout>
      <div>
        <h1>CRUD</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <h1 className="Crear-Noticia">Crear Noticia</h1>
        <input
          type="text"
          className="inputCrear-Noticia"
          placeholder="Agregar Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="text"
          className="inputCrear-Noticia"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="file"
          className="inputimagenes"
          placeholder="URL o Imagen"
          onChange={(e) => setImagen(e.target.files[0])}
        />
        {preview && <img src={preview} alt="Vista previa" style={{ width: "200px" }} />}
        <button type="submit">Crear Noticia </button>
      </form>
      
    </Layout>
  );
}

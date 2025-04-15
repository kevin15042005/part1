import React, { useState, useEffect } from "react";
import Layout from "../../Components/layout/index";
import "./Noticia.css"

export default function CrudNoticias() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [idNoticia, setIdNoticia] = useState("");
  const [noticiasPublicadas, setNoticiasPublicadas] = useState(0);

  const [tituloActualizar, setTituloActualizar] = useState("");
  const [descripcionActualizar, setDescripcionActualizar] = useState("");
  const [imagenActualizar, setImagenActualizar] = useState(null);
  const [idNoticiaActualizar, setIdNoticiaActualizar] = useState("");


  const [idNoticiaEliminar, setIdNoticiaEliminar] = useState("");

  //Limpiar los campos apenas se inserte un valor

  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setImagen(null);
    setIdNoticia("");
    document.getElementById("fileInput").value="";
  };
  const limpiarCamposActualizar = ()=>{
    setDescripcionActualizar("");
    setDescripcionActualizar("");
    setImagenActualizar(null);
    setIdNoticiaActualizar("");
    document.getElementById("fileInputActualizar").value="";
  }
  const limpiarCamposEliminar=()=>{
    setIdNoticiaEliminar("");
  }
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch("http://localhost:8080/noticias");
        const data = await res.json();
        setNoticiasPublicadas(data.length); 
      } catch (err) {
        console.error("Error al obtener las noticias:", err);
      }
    };

    obtenerNoticias();
  }, []); 

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (noticiasPublicadas >= 9) {
      alert("Ya llegaste al límite de 9 noticias publicadas.Elimina o Actualiza");
      return;
    }

    if(!titulo||!descripcion||!imagen){
      alert("Ingresa los 3 campos")
      return
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
    if(!tituloActualizar||!descripcionActualizar||!imagenActualizar){
      alert("Ingresa los 3 campos")
      return
    }
    limpiarCamposActualizar();

    const formData = new FormData();
    formData.append("id_Noticia", idNoticiaActualizar);
    formData.append("nombre_Noticias", tituloActualizar);
    formData.append("contenido_Noticia", descripcionActualizar);
    if (imagen) formData.append("cover", imagenActualizar);

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
      const res = await fetch(`http://localhost:8080/noticias/${idNoticiaEliminar}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message || "Noticia eliminada");
      limpiarCamposEliminar();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la noticia");
    }
  };

  return (
    <div className="Menu-Principal">
    <Layout>
      <div className="Titulo">
        <h1>CrudNoticias</h1>
      </div>

    <section className="Formularios"> 
      <form onSubmit={handleSubmit}>
        <h1>Crear Noticia</h1>
        <input
        className="Titulos"
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          autoComplete="off"
          />
        <textarea
        className="Descripcion-Formulario1"
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          autoComplete="off"

        />
        <input  className="Hola"type="file" id= "fileInput" onChange={(e) => setImagen(e.target.files[0])} />

        <button type="submit">Crear Noticia</button>
      </form>


{/*Actuailizar Noticia*/}
      <form onSubmit={handleUpdate}>
        <h1>Actualizar Noticia</h1>
        <input
          type="text"
          placeholder="Título"
          value={tituloActualizar}
          onChange={(e) => setTituloActualizar(e.target.value)}
          autoComplete="off"

        />
        <textarea
         className="Descripcion-Formulario1"
          type="text"
          placeholder="Descripción"
          value={descripcionActualizar}
          onChange={(e) => setDescripcionActualizar(e.target.value)}
          autoComplete="off"

        />
        <input type="file" id="fileInputActualizar"onChange={(e) => setImagenActualizar(e.target.files[0])} />
        <input
          type="text"
          placeholder="ID Noticia"
          value={idNoticiaActualizar}
          onChange={(e) => setIdNoticiaActualizar(e.target.value)}
        />
        <button type="submit">Actualizar</button>
      </form>

      <form onSubmit={handleDelete}>
        <h1>Eliminar Noticia</h1>
        <input
          type="text"
          placeholder="Id a eliminar"
          value={idNoticiaEliminar  }
          onChange={(e) => setIdNoticiaEliminar(e.target.value)}
        />
        <button type="submit">Eliminar</button>
      </form>
      </section>
    </Layout>
    </div>
  );
}

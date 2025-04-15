import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout";
import "./Pintura.css";
export default function CrudNoticiasPintura() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [idNoticia, setIdNoticia] = useState("");
  const [noticiasPublicadas, setNoticiasPublicadas] = useState(0);

  const[tituloActualizar,setTituloActualizar]= useState("");
  const[descripcionActualizar, setDescripcionActualizar]= useState("");
  const[imagenActualizar,setImagenActualizar]=useState(null);
  const[idNoticiaActualizar,setIdNoticiaActualizar]=useState("");

  const[idNoticiaEliminar,setIdNoticiaEliminar]=useState("");

  //Limpiar los campos
  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setImagen(null);
    setIdNoticia("");
    document.getElementById("fileInput").value = ""; 
  };
  //Limpiar los campos Actualizr

  const limpiarCamposActualizar=()=>{
    setTituloActualizar("");
    setDescripcionActualizar("");
    setImagenActualizar(null);
    setIdNoticiaActualizar("");
    document.getElementById("fileInputActualizar").value = ""; 
  };

  const limpiarCampoEliminar=()=>{
    setIdNoticiaEliminar("");
  }
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const res = await fetch("http://localhost:8080/pintura");
        const data = await res.json();
        setNoticiasPublicadas(data.length);
      } catch (err) {
        console.error("Error al obtener noticias", err);
      }
    };
    obtenerNoticias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    limpiarCampos(); 
    if(!titulo||!descripcion||!imagen){
      alert("Ingrese los 3 campos requeridos")
      return
    }
    if (noticiasPublicadas >= 9) {
      alert("Llegaste a el limite de la publicaicones");
      return;
    }
    const formData = new FormData();
    formData.append("nombre_Noticia_Pintura", titulo);
    formData.append("contenido_Noticia_Pintura", descripcion);
    formData.append("cover", imagen);

    //Subir Noticias
    try {
      const res = await fetch("http://localhost:8080/pintura/crear", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Noticia creada");
      limpiarCampos();
      setNoticiasPublicadas(noticiasPublicadas + 1);
    } catch (err) {
      console.error(err);
      alert("Error al crear la noticia");
    }
  };
  //Actualizar Noticias
  const handleUpdate = async (e) => {
    e.preventDefault();
    if(!tituloActualizar||!descripcionActualizar||!imagenActualizar){
      alert("Ingrese los campos requeridos")
      return 
    }
    limpiarCamposActualizar();
    const formData = new FormData();
    limpiarCamposActualizar();
    formData.append("id_Noticias_Pintura", idNoticiaActualizar);
    formData.append("nombre_Noticia_Pintura", tituloActualizar);
    formData.append("contenido_Noticia_Pintura", descripcionActualizar);
    if (imagenActualizar) formData.append("cover", imagenActualizar);

    try {
      const res = await fetch("http://localhost:8080/pintura", {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      alert(data.message || "Noticia actualizada");
      limpiarCamposActualizar();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar la noticia");
    }
  };
  //Eliminar Noticias
  const handleDelete = async (e) => {
    e.preventDefault();
    limpiarCampoEliminar
    try {
      const res = await fetch(
        `http://localhost:8080/pintura/${idNoticiaEliminar}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      alert(data.message || "Noticia eliminada");
      limpiarCampos();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la noticia");
    }
  };

  return (
    <div className="menu-Pricipal-Pintura">
      <Layout>
        <div className="Titulo">
          <h1>Crud Noticias Pintura</h1>
        </div>
        <section className="Fomularios">
          <form onSubmit={handleSubmit}>
            <h2>Crear Noticia</h2>
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
              className="Descripcion-Formulario"
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
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
            <textarea
              className="Descripcion-Formulario"
              type="text"
              placeholder="Descripción"
              value={descripcionActualizar}
              onChange={(e) => setDescripcionActualizar(e.target.value)}
            />
            <input type="file"id="fileInputActualizar" onChange={(e) => setImagenActualizar(e.target.files[0])} />
            <input
              type="text"
              placeholder="ID Noticia"
              value={idNoticiaActualizar}
              onChange={(e) => setIdNoticiaActualizar(e.target.value)}
            />
            <button type="submit">Actualizar</button>
          </form>

          <form onSubmit={handleDelete}>
            <h2>Eliminar Noticia</h2>
            <input
              type="text"
              placeholder="Id"
              value={idNoticiaEliminar}
              onChange={(e) => setIdNoticiaEliminar(e.target.value)}
            />
            <button type="submit">Eliminar</button>
          </form>
        </section>
      </Layout>
    </div>
  );
}

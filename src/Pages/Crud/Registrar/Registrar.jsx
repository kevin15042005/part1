import React, { useState } from "react";
import axios from "axios";
import Footer from "../../../Components/Footer/footer";
import "./Registrar.css";
import Layout from "../../../Components/layout";

const Registrar = () => {
  const [nombreCrear, setNombreCrear] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [nombreEliminar, setNombreEliminar] = useState("");

  const limpiarCampos = () => {
    setNombreCrear("");
    setCorreo("");
    setContrasena("");
    setNombreEliminar("");
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/admin/register", {
        nombre_Administrador: nombreCrear,
        correo_Administrador: correo,
        contraseña_Administrador: contrasena,
        rol_Administrador: "admin",
      });

      alert("✅ Registro exitoso");
      limpiarCampos();
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("❌ Hubo un error al registrar el usuario");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8080/admin/${nombreEliminar}`
      );
      alert("✅ Administrador eliminado correctamente");
      limpiarCampos();
    } catch (err) {
      alert("❌ Error al eliminar usuario: ya se eliminó o no existe");
    }
  };

  return (
    <>
      <div className="main-container">
        <Layout />
        <div className="Contenedor-Registrar">
          <section className="FormulariosRegistar">
            <div className="Form">
            <form onSubmit={handleRegistrar}>
            <h2 className="title-Registro">Crear nuevo administrador</h2>
              <input
                type="text"
                placeholder="Nombre"
                value={nombreCrear}
                onChange={(e) => setNombreCrear(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <button type="submit" className="boton-Registro">
                Registrar
              </button>
            </form>
            </div>
            <div className="Form1">
            <form onSubmit={handleDelete}>
            <h2 className="title-Registro">Eliminar Usuario</h2>
              <input
                type="text"
                className="usuario-Eliminar"
                placeholder="Usuario Registrado"
                value={nombreEliminar}
                onChange={(e) => setNombreEliminar(e.target.value)}
              />
              <button className="Eliminar">Eliminar</button>
            </form>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registrar;

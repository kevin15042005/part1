import React, { useState, useEffect } from "react";
import Layout from "../../../Components/layout";
import Footer from "../../../Components/Footer/footer";
import axios from "axios";

function Aliados() {
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);
  const [aliados, setAliados] = useState([]);
  const [preview, setPreview] = useState(null);

  // Cargar aliados al inicio
  useEffect(() => {
    obtenerAliados();
  }, []);

  // Función para cargar aliados desde el backend
  const obtenerAliados = () => {
    axios
      .get("http://localhost:8080/api/aliados")
      .then((res) => setAliados(res.data))
      .catch((err) => console.error("Error al cargar aliados", err));
  };

  // Limpiar campos del formulario
  const limpiarCampos = () => {
    setNombre("");
    setImagen(null);
    setPreview(null);
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !imagen) {
      alert("Ingrese los dos campos");
      return;
    }

    const formData = new FormData();
    formData.append("nombre_Marcas_Aliadas", nombre);
    formData.append("cover", imagen);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/aliados",
        formData
      );
      alert(res.data.message);
      limpiarCampos();
      obtenerAliados(); // actualizar lista automáticamente
    } catch (error) {
      console.error("Error al crear el aliado:", error);
      alert("Error al crear el aliado");
    }
  };

  return (
    <>
      <div className="Pagina-Principal">
        <Layout />
        <div className="AliadosLista">
          <h2>Aliados Registrados</h2>
          <div className="slider-container-aliados">
            <div className="slider">
              {[...aliados, ...aliados, ...aliados].map((aliado, index) => (
                <div key={index} className="aliado-card">
                  <img
                    src={`http://localhost:8080/uploads/${aliado.imagen_Marcas_Aliadas}`}
                    alt={aliado.nombre_Aliado_Marca}
                  />
                  <p>{aliado.nombre_Aliado_Marca}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h1>Aliados</h1>
        <div className="Formulario">
          <form onSubmit={handleSubmit}>
            <h2>Crear Aliado</h2>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del aliado"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImagen(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            {preview && (
              <div>
                <h4>Vista previa:</h4>
                <img
                  src={preview}
                  alt="Vista previa"
                  style={{ maxWidth: "200px", margin: "10px 0" }}
                />
              </div>
            )}
            <button type="submit">Crear Aliado</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Aliados;

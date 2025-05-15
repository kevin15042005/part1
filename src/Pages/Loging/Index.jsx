import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Loging.css";

export default function Login() {
  const navigate = useNavigate();

  const [registrarData, setRegistrarData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "Administrador",
  });

  const [currentForm, setCurrentForm] = useState(() => {
    return localStorage.getItem("currentForm") || "loging";
  });

  const [showPassword, setShowPassword] = useState(false);

  const changeForm = (formName) => {
    setCurrentForm(formName);
    localStorage.setItem("currentForm", formName);
  };

  // Registrar
  const handleRegistrar = async (e) => {
    e.preventDefault();

    const { nombre, correo, contraseña } = registrarData;

    if (!nombre || !correo || !contraseña) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_Administrador: nombre,
          correo_Administrador: correo,
          contraseña_Administrador: contraseña,
        }),
      });

      const data = await res.json();
      console.log(data);
      alert(data.message);

      setRegistrarData({
        nombre: "",
        correo: "",
        contraseña: "",
        rol: "Administrador",
      });

      changeForm("loging");
    } catch (err) {
      console.error("Error al registrarse", err);
      alert("Error al registrarse");
    }
  };

  // Iniciar sesión
  const handleIniciar = async (e) => {
    e.preventDefault();

    const email = e.target.usuario.value;
    const password = e.target.contraseña.value;

    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_Administrador: email,
          contraseña_Administrador: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("user", JSON.stringify(data.usuario));
        localStorage.setItem("isLoging", "true");
        navigate("/CrudNoticias");
      } else {
        alert(data.message || "Credenciales inválidas");
        localStorage.setItem("isLogign", "false");
      }
    } catch {
      console.log("Error al iniciar sesión");
      alert("Error al iniciar sesión");
      localStorage.setItem("isLogign", "false");
    }
  };

  // Actualizar contraseña
  const handleActualizar = async (e) => {
    e.preventDefault();

    const correo = e.target.correo.value;
    const oldPassword = e.target.forgetPassword.value;
    const newPassword = e.target.newPassword.value;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id_Administrador) {
      alert("Usuario no identificado");
      return;
    }

    if (correo !== user.correo_Administrador) {
      alert("El correo no coincide con el del usuario actual.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/admin/${user.id_Administrador}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contraseñaAnterior: oldPassword,
            nuevaContraseña: newPassword,
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error("Error al convertir respuesta a JSON:", jsonError);
        alert("Respuesta inválida del servidor.");
        return;
      }

      if (res.ok) {
        alert("Contraseña actualizada");
        console.log(data);
        changeForm("loging");
      } else {
        alert(data.message || "Error al actualizar contraseña");
      }
    } catch (err) {
      console.error("Error al actualizar contraseña", err);
      alert("Error al actualizar contraseña");
    }
  };

  return (
    <>
      <div id="main-container">
        <Layout />
        <main className="formulararioPrincipal">
          {/* Login */}
          {currentForm === "loging" && (
            <div className="Menu-Loging">
              <form className="Texto" onSubmit={handleIniciar}>
                <h2>Ingreso</h2>
                <div className="input-box">
                  <label>Usuario</label>
                  <input
                    type="text"
                    className="field"
                    placeholder="Email"
                    name="usuario"
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Contraseña</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="field"
                    placeholder="Password"
                    name="contraseña"
                    required
                  />
                  <div className="input-check">
                    <h4>Mostrar contraseña</h4>
                    <input
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </div>
                <div className="button-ingresar">
                  <button type="submit" className="ingresarButton">
                    Ingresar
                  </button>
                  <div className="usuarioNewRegister">
                    <a href="#" onClick={() => changeForm("forgotPassword")}>
                      Olvidé mi contraseña
                    </a>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Recuperar Contraseña */}
          {currentForm === "forgotPassword" && (
            <div className="Menu-Password">
              <form className="Texto" onSubmit={handleActualizar}>
                <h2>Olvidar Contraseña</h2>
                <div className="input-box">
                  <label>Correo</label>
                  <input
                    type="text"
                    className="field"
                    placeholder="correo"
                    name="correo"
                    required
                  />
                  <label>Contraseña Actual</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="field"
                    placeholder="Antigua contraseña"
                    name="forgetPassword"
                    required
                  />
                </div>
                <div className="input-box">
                  <label>Nueva Contraseña</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="field"
                    placeholder="Nueva contraseña"
                    name="newPassword"
                    required
                  />
                  <div className="input-check">
                    <input
                      type="checkbox"
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <h4> Mostrar contraseña</h4>
                  </div>
                </div>
                <div className="button-contraseña">
                  <button type="submit" className="registerButton">
                    Cambiar Contraseña
                  </button>
                </div>
                <div className="VolverInicio">
                  <button type="button" onClick={() => changeForm("loging")}>
                    Volver al inicio de sesión
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

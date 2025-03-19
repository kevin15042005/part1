import React, { useState, useEffect } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
import "./Loging.css";

export default function Loging() {
  const [currentForm, setCurrentForm] = useState(() => {
    return localStorage.getItem("currentForm") || "loging";
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem("currentForm", currentForm);
  }, [currentForm]);

  return (
    <>
      <div id="main-container">
        <Layout />
        <main className="formulararioPrincipal">
          <div className="Menu-Loging">
            <section className="nombreUsuario">
              {currentForm === "loging" && (
                <form>
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
                      <input
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                    </div>
                    <p>{}</p>
                  </div>
                  <div className="button-ingresar">
                    <button type="submit" className="ingresarButton">
                      Ingresar
                    </button>
                    <div className="usuarioNewRegister">
                      <a
                        className="linkOlvidarContraseña"
                        href="#"
                        onClick={() => setCurrentForm("forgotPassword")}
                      >
                        Olvide mi contraseña
                      </a>
                    </div>
                    <div className="NewUsuario">
                      Nuevo Aqui?{" "}
                      <a href="#" onClick={() => setCurrentForm("register")}>
                        Registrarse
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </section>
          </div>
        </main>
        <main className="formulararioPrincipal">
          <div className="Menu-Register">
            <section className="nombreUsuario">
              {currentForm === "register" && (
                <form>
                  <h2>Registro</h2>

                  <div className="input-box">
                    <label>Registrarse</label>
                    <input
                      type="text"
                      className="field"
                      placeholder="Ingrese su usuario"
                      name="newUser"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label>Contraseña</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="field"
                      name="newPassword"
                      placeholder="Escribe tu contraseña"
                      required
                    />
                    <div className="input-check">
                      
                    </div>
                  </div>
                  <div className="button-contraseña">
                    <button type="submit" className="registerButton">
                      Registrar
                    </button>
                  </div>
                  <div className="VolverInicio">
                    <button
                      type="button"
                      onClick={() => setCurrentForm("loging")}
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </main>
        <main className="formulararioPrincipalOlvidar">
          <div className="Menu-Password">
            <section className="nombreUsuario">
              {currentForm === "forgotPassword" && (
                <form>
                  <h2>Olvidar Contraseña</h2>
                  <div className="input-box">
                    <label>Olvide Contraseña</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="field"
                      placeholder="Ingrese su antigua contraseña"
                      name="forgetPassword"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label>Nueva Contraseña</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="field"
                      placeholder="Ingresa tu nueva contraseña"
                      name="newPassword"
                      required
                    />
                    <div className="input-check">
                      <input
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                    </div>
                  </div>
                  <div className="button-contraseña">
                    <button type="submit" className="registerButton">
                      Cambiar Contraseña
                    </button>
                  </div>
                  <div className="VolverInicio">
                    <button
                      type="button"
                      onClick={() => setCurrentForm("loging")}
                    >
                      Volver al inicio de sesión
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

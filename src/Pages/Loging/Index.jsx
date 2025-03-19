import React, { useState } from "react";
import Layout from "../../Components/layout";
import Footer from "../../Components/Footer/footer";
export default function Loging() {
  const [currentForm, setCurrentForm] = useState("loging");
  const [showPassword, setShowPassword] = useState(false)
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
                      placeholder="Ingresa tu usuario"
                      name="usuario"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label>Contraseña</label>
                    <input
                      type={showPassword ? "text": "password"}
                      className="field"
                      placeholder="Ingresa tu Contraseña"
                      name="contraseña"
                      required
                    />
                    <div className="input-check">
                      <input type="checkbox" 
                      onChange={()=>setShowPassword(!showPassword)}
                      />

                    </div>
                    <p>{}</p>
                  </div>
                  <button type="submit">Ingresar</button>
                  <a href="#" onClick={() => setCurrentForm("forgotPassword")}>
                    Olvide mi contraseña
                  </a>
                  <div className="NewUsuario">
                    Nuevo Aqui?{" "}
                    <a href="#" onClick={() => setCurrentForm("register")}>
                      Registrarse
                    </a>
                  </div>
                </form>
              )}
            </section>
          </div>
          <div className="main-register">
            <section>
              {currentForm === "register" && (
                <form>
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
                      type={showPassword?"text":"password"}
                      className="field"
                      name="newPassword"
                      placeholder="Escribe tu contraseña"
                      required
                    />
                    <div className="input-check">
                      <input type="checkbox"
                      onChange={()=>setShowPassword(!showPassword)} />
                    </div>
                  </div>
                  <button type="submit">Registrarse</button>
                  <a href="#" onClick={() => setCurrentForm("loging")}>
                    Volver al inicio de sesión
                  </a>
                </form>
              )}
            </section>
          </div>
          <div className="OlvidePassword">
            <section>
              {currentForm === "forgotPassword" && (
                <form>
                  <div className="input-box">
                    <label>Olvide Contraseña</label>
                    <input
                      type={showPassword?"text":"password"}
                      className="field"
                      placeholder="Ingrese su antigua contraseña"
                      name="forgetPassword"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <label>Nueva Contraseña</label>
                    <input
                      type={showPassword?"text":"password"}
                      className="field"
                      placeholder="Ingresa tu nueva contraseña"
                      name="newPassword"
                      required
                    />
                    <div className="input-check">
                      <input type="checkbox" 
                      onChange={()=>setShowPassword(!showPassword)}/>

                    </div>
                  </div>
                  <button type="submit">Recuperar</button>
                  <a href="#" onClick={() => setCurrentForm("loging")}>
                    Volver al inicio de sesión
                  </a>
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

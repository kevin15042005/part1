// index.js
import express from "express";
import cors from "cors";
import fs from "fs";
import db from "./db.js";
import noticiasRoutes from "./routes/noticias.js";
import noticiasPinturaRoutes from "./routes/noticiaspintura.js";
import ShopRoutes from "./routes/Shop.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Carpeta de imágenes
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("📂 Carpeta 'uploads' creada");
}
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/noticias", noticiasRoutes);
app.use("/noticiaspintura", noticiasPinturaRoutes);
app.use("/Shop",ShopRoutes);

// Rutas de administrador (puedes ponerlas en otro archivo también)
app.post("/register", (req, res) => {
  const { nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador } = req.body;
  const q = `INSERT INTO Administrador (nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador) VALUES (?, ?, ?, ?)`;
  db.query(q, [nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "✅ Usuario registrado exitosamente" });
  });
});

app.post("/login", (req, res) => {
  const { correo_Administrador, contraseña_Administrador } = req.body;
  const q = `SELECT * FROM Administrador WHERE correo_Administrador = ? AND contraseña_Administrador = ?`;
  db.query(q, [correo_Administrador, contraseña_Administrador], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.json({ message: "✅ Inicio de sesión exitoso", usuario: data[0] });
    return res.status(401).json({ message: "❌ Credenciales incorrectas" });
  });
});

app.put("/olvidar_contraseña", (req, res) => {
  const { correo_Administrador, contraseña_Administrador } = req.body;
  const q = `UPDATE Administrador SET contraseña_Administrador = ? WHERE correo_Administrador = ?`;
  db.query(q, [contraseña_Administrador, correo_Administrador], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "🔁 Contraseña actualizada exitosamente" });
  });
});

// Iniciar servidor
app.listen(8080, () => {
  console.log("🚀 Servidor corriendo en http://localhost:8080");
});

// Cerrar conexión limpia
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) console.error("❌ Error cerrando conexión a MySQL:", err);
    else console.log("🔌 Conexión a MySQL cerrada");
    process.exit();
  });
});

  

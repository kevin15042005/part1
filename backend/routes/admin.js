// routes/admin.js
import express from "express";
import db from "../db.js";
import { data } from "react-router-dom";

const router = express.Router();

// Registro de administrador
router.post("/register", (req, res) => {
  const {
    nombre_Administrador,
    contraseña_Administrador,
    correo_Administrador,
    rol_Administrador
  } = req.body;

  const chekUsuario = `SELECT * FROM Administrador WHERE nombre_Administrador = ? OR correo_Administrador = ?`;

  db.query(chekUsuario, [nombre_Administrador, correo_Administrador], (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "❌ Error al verificar duplicado",
        error: err
      });
    }

    if (data.length > 0) {
      return res.status(400).json({
        message: "❌ Usuario o correo ya registrado"
      });
    }

    const q = `
      INSERT INTO Administrador 
      (nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador) 
      VALUES (?, ?, ?, ?)`;

    db.query(q, [nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador], (err) => {
      if (err) {
        return res.status(500).json({
          message: "❌ Error al registrar",
          error: err
        });
      }

      return res.json({
        message: "✅ Usuario registrado exitosamente"
      });
    });
  });
});

// Inicio de sesión
router.post("/login", (req, res) => {
  const { correo_Administrador, contraseña_Administrador } = req.body;
  const q = `SELECT * FROM Administrador WHERE correo_Administrador = ? AND contraseña_Administrador = ?`;

  db.query(q, [correo_Administrador, contraseña_Administrador], (err, data) => {
    if (err) return res.status(500).json({ message: "❌ Error en el servidor", error: err });

    if (data.length > 0) {
      return res.json({ message: "✅ Inicio de sesión exitoso", usuario: data[0] });
    }

    return res.status(401).json({ message: "❌ Credenciales incorrectas" });
  });
});



/// Actualizar contraseña mediante ID
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { contraseñaAnterior, nuevaContraseña } = req.body;

  const verificarQuery = `SELECT contraseña_Administrador FROM Administrador WHERE id_Administrador = ?`;

  db.query(verificarQuery, [id], (err, data) => {
    if (err) return res.status(500).json({ message: "❌ Error al verificar contraseña", error: err });

    if (data.length === 0) {
      return res.status(404).json({ message: "❌ Administrador no encontrado" });
    }

    const contraseñaActual = data[0].contraseña_Administrador;

    if (contraseñaAnterior !== contraseñaActual) {
      return res.status(400).json({ message: "❌ La contraseña actual no coincide" });
    }

    const actualizarQuery = `UPDATE Administrador SET contraseña_Administrador = ? WHERE id_Administrador = ?`;

    db.query(actualizarQuery, [nuevaContraseña, id], (err) => {
      if (err) return res.status(500).json({ message: "❌ Error al actualizar contraseña", error: err });

      return res.json({ message: "🔁 Contraseña actualizada exitosamente" });
    });
  });
});
//Eliminar Usuario
router.delete("/:nombre_Administrador", (req, res) => {
  const nombre_Administrador = req.params.nombre_Administrador;
  const getUsuario = "SELECT * FROM Administrador WHERE nombre_Administrador = ?";
  

  db.query(getUsuario, [nombre_Administrador], (err, results) => {
    if (err) return res.status(500).json({ error: "Error buscando Usuario" });
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "❌ Administrador no encontrado" });
    }
    
    const deleteQuery = "DELETE FROM Administrador WHERE nombre_Administrador = ?";

    db.query(deleteQuery, [nombre_Administrador], (err) => {
      if (err) return res.status(500).json({ error: "Error al eliminar usuario" });
      return res.json({ message: "✅ Administrador eliminado correctamente" });
    });
  });
});

export default router;


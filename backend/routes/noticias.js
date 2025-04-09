// routes/noticias.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import db from "../db.js";

const router = express.Router();
// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Obtener noticias
router.get("/", (req, res) => {
  const q = "SELECT * FROM noticias";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "Error en la consulta" });
    return res.json(data);
  });
});

// Crear noticia
router.post("/", upload.single("cover"), (req, res) => {
  const { nombre_Noticias, contenido_Noticia } = req.body;
  const cover = req.file?.filename || null;

  const q = `INSERT INTO noticias (nombre_Noticias, contenido_Noticia, fecha_Publicacion, id_Administrador, cover) VALUES (?, ?, NOW(), ?, ?)`;
  db.query(q, [nombre_Noticias, contenido_Noticia, 1, cover], (err) => {
    if (err) return res.status(500).json({ error: "Error al insertar noticia" });
    return res.json({ message: "✅ Noticia publicada correctamente" });
  });
});

// Actualizar noticia
router.put("/", upload.single("cover"), (req, res) => {
  const { id_Noticia, nombre_Noticias, contenido_Noticia } = req.body;
  const cover = req.file?.filename;

  let q = cover
    ? `UPDATE noticias SET nombre_Noticias=?, contenido_Noticia=?, cover=? WHERE id_Noticia=?`
    : `UPDATE noticias SET nombre_Noticias=?, contenido_Noticia=? WHERE id_Noticia=?`;

  const valores = cover
    ? [nombre_Noticias, contenido_Noticia, cover, id_Noticia]
    : [nombre_Noticias, contenido_Noticia, id_Noticia];

  db.query(q, valores, (err, result) => {
    if (err) return res.status(500).json({ error: "Error al actualizar noticia" });
    if (result.affectedRows === 0) return res.status(404).json({ message: "❌ Noticia no encontrada" });
    return res.json({ message: "✅ Noticia actualizada correctamente" });
  });
});

// Eliminar noticia por título
router.delete("/:titulo", (req, res) => {
  const nombre_Noticias = req.params.titulo;
  const getImageQuery = `SELECT cover FROM noticias WHERE nombre_Noticias = ?`;

  db.query(getImageQuery, [nombre_Noticias], (err, results) => {
    if (err) return res.status(500).json({ error: "Error buscando imagen" });
    if (!results.length) return res.status(404).json({ message: "❌ Noticia no encontrada" });

    const imagen = results[0].cover;
    const deleteQuery = `DELETE FROM noticias WHERE nombre_Noticias=?`;

    db.query(deleteQuery, [nombre_Noticias], (err) => {
      if (err) return res.status(500).json({ error: "Error al eliminar noticia" });
      if (imagen) fs.unlink(`uploads/${imagen}`, () => {});
      return res.json({ message: "✅ Noticia eliminada correctamente" });
    });
  });
});

export default router;



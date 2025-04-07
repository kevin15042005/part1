import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Servir imágenes desde "uploads"
app.use("/uploads", express.static("uploads"));

// Crear carpeta "uploads" si no existe
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("📂 Carpeta 'uploads' creada");
}

// Configurar multer para subir archivos
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, "uploads/");
  },
  filename: ( req,file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Edi9708*",
  database: "DUARTSTUDIO",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos MySQL");
});



// Registro de administrador
app.post("/register", (req, res) => {
  const {
    nombre_Administrador,
    contraseña_Administrador,
    correo_Administrador,
    rol_Administrador,
  } = req.body;

  const q = `
    INSERT INTO Administrador 
    (nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador) 
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    q,
    [nombre_Administrador, contraseña_Administrador, correo_Administrador, rol_Administrador],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({ message: "✅ Usuario registrado exitosamente" });
    }
  );
});

// Login del administrador
app.post("/login", (req, res) => {
  const { correo_Administrador, contraseña_Administrador } = req.body;
  const q = `
    SELECT * FROM Administrador 
    WHERE correo_Administrador = ? AND contraseña_Administrador = ?
  `;

  db.query(q, [correo_Administrador, contraseña_Administrador], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      return res.json({
        message: "✅ Inicio de sesión exitoso",
        usuario: data[0],
      });
    } else {
      return res.status(401).json({ message: "❌ Credenciales incorrectas" });
    }
  });
});

// Actualizar contraseña
app.put("/olvidar_contraseña", (req, res) => {
  const { correo_Administrador, contraseña_Administrador } = req.body;
  const q = `
    UPDATE Administrador 
    SET contraseña_Administrador = ? 
    WHERE correo_Administrador = ?
  `;

  db.query(q, [contraseña_Administrador, correo_Administrador], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "🔁 Contraseña actualizada exitosamente" });
  });
});

// Obtener noticias pintura
app.get("/noticias", (req, res) => {
  const q = "SELECT * FROM noticias";

  db.query(q, (err, data) => {
    if (err) {
      console.log("❌ Error ejecutando la consulta", err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    return res.json(data);
  });
});

// Publicar noticia  con imagen
app.post("/noticias", upload.single("cover"), (req, res) => {
    const { nombre_Noticias, contenido_Noticia } = req.body;
    const cover = req.file ? req.file.filename : null;
  
    const q = `
      INSERT INTO noticias (nombre_Noticias, contenido_Noticia, fecha_Publicacion, id_Administrador, cover)
      VALUES (?, ?, NOW(), ?, ?)
    `;
    const valores = [nombre_Noticias, contenido_Noticia, 1, cover];
  
    db.query(q, valores, (err, data) => {
      if (err) {
        console.log("❌ Error al insertar noticia:", err);
        return res.status(500).json({ error: "Error al insertar noticia" });
      }
      return res.json({ message: "✅ Noticia publicada correctamente" });
    });
  });
  
 

  
  // Actualizar noticia 
  app.put("/noticias", upload.single("cover"), (req, res) => {
    const { id_Noticia, nombre_Noticias, contenido_Noticia } = req.body;
    const cover = req.file ? req.file.filename : null;
  
    if (!id_Noticia || !nombre_Noticias || !contenido_Noticia) {
      return res.status(400).json({ message: "❌ Datos incompletos" });
    }
  
    let q = "";
    let parametros = [];
  
    if (cover) {
      q = `UPDATE noticias SET nombre_Noticias=?, contenido_Noticia=?, cover=? WHERE id_Noticia=?`;
      parametros = [nombre_Noticias, contenido_Noticia, cover, id_Noticia];
    } else {
      q = `UPDATE noticias SET nombre_Noticias=?, contenido_Noticia=? WHERE id_Noticia=?`;
      parametros = [nombre_Noticias, contenido_Noticia, id_Noticia];
    }
  
    db.query(q, parametros, (err, result) => {
      if (err) {
        console.error("❌ Error al actualizar noticia:", err);
        return res.status(500).json({ error: "Error al actualizar noticia" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "❌ Noticia no encontrada" });
      }
      return res.json({ message: "✅ Noticia actualizada correctamente" });
    });
  });
  
  // Eliminar noticia  por título
  app.delete("/noticias/:titulo", (req, res) => {
    const nombre_Noticias = req.params.titulo;
  
    // Obtener la noticia
    const getImageQuery = `SELECT cover FROM noticias WHERE nombre_Noticias = ?`;
    db.query(getImageQuery, [nombre_Noticias], (err, results) => {
      if (err) return res.status(500).json({ error: "Error buscando la imagen" });
  
      if (results.length === 0) {
        return res.status(404).json({ message: "❌ Noticia no encontrada" });
      }
  
      const imagen = results[0].cover;
  
      const deleteQuery = `DELETE FROM noticias WHERE nombre_Noticias=?`;
      db.query(deleteQuery, [nombre_Noticias], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al eliminar noticia" });
  
        if (imagen) {
          const imagePath = path.join("uploads", imagen);
          fs.unlink(imagePath, (err) => {
            if (err) console.warn("⚠️ No se pudo borrar la imagen:", err);
          });
        }
  
        return res.json({ message: "✅ Noticia eliminada correctamente" });
      });
    });
  });
  



  //Noticias principal de pintura

  app.post("/noticiaspintura", upload.single("cover"),(req,res)=>{

    const {nombre_Noticias_Pintura, contenido_Noticia_Pintura}= req.body;
    const cover = req.file ? req.file.filename :null;

    const q = `INSERT INTO Noticias_Pintura(nombre_Noticias_Pintura, contenido_Noticias_Pintura,cover) VALUES (?,?,?)`;
    const valores = [nombre_Noticias_Pintura,contenido_Noticia_Pintura,cover];
    db.query(q,valores,(err,data)=>{
        if(err){
            console.log("❌ Error al insertar noticia:",err);
            return res.status(500).json({error:"Error al insertar noticia"});
        }
        return res.json({message:"✅ Noticia publicada correctamente"});
    })
  })

  //Actualizar noticia pintura 
  app.put("/noticiaspintura", upload.single("cover"),(req,res)=>{
    const {id_Noticia_Pintura,nombre_Noticias_Pintura,contenido_Noticia_Pintura}= req.body;
    const cover = req.file ? req.file.filename : null;
    const q = `UPDATE noticiaspintura SET nombre_Noticias_Pintura= ?, contenido_Noticias_Pintura=?, cover=? WHERE id_Noticia_Pintura=?`;
    const valores = [nombre_Noticias_Pintura,contenido_Noticia_Pintura,cover,id_Noticia_Pintura];
    db.query(q,valores,(err,data)=>{
        if(err){
            console.log("❌ Error al actualizar noticia:",err);
            return res.status(500).json({error:"Error al actualizar noticia"});
        }
        return res.json({message:"✅ Noticia actualizada correctamente"});
    })
  })

  //Eliminar noticia pintura por nombre
  app.delete("/noticiaspintura/:titulo",(req,res)=>{
    const nombre_Noticias_Pintura = req.params.titulo;
    //Obtener la noticia 
    const getImageQuery = `SELECT cover FROM noticiaspintura WHERE nombre_Noticias_Pintura = ?`;
    db.query(getImageQuery,[nombre_Noticias_Pintura],(err,results)=>{
        if(err)return res.json({error:"Error buscandi imagen"});
        if(results.length ===0){
            console.log("❌ Noticia no encontrada");
            return res.status(404).json({message:"❌ Noticia no encontrada"});
        }
        const imagen = results [0 ].cover;
        const deleteQuery = `DELETE FROM noticiaspintura WHERE nombre_Noticias_Pintura=?`;


        db.query(deleteQuery,[nombre_Noticias_Pintura],(err,result)=>{
            if(err)return res.status(500).json({error:"Error al eliminar noticia"});
            
        if (imagen) {
            const imagePath = path.join("uploads", imagen);
            fs.unlink(imagePath, (err) => {
              if (err) console.warn("⚠️ No se pudo borrar la imagen:", err);
            });
          }
            return res.json({ message: "✅ Noticia eliminada correctamente" });
        });
    });
    });

  
// Iniciar servidor
app.listen(8080, () => {
  console.log("🚀 Servidor corriendo en http://localhost:8080");
});

// Cerrar conexión limpia al salir
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("❌ Error cerrando conexión a MySQL:", err);
    } else {
      console.log("🔌 Conexión a MySQL cerrada");
    }
    process.exit();
  });
});
  

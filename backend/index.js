import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express();

// Middleware para permitir JSON (opcional pero recomendado)
app.use(express.json());
app.use(cors())

// Configurar conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "duartstudio"
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    console.log("Conectado a la base de datos MySQL");
});

// Ruta de prueba
app.get("/", (req, res) => {
    res.json("Hello, este es mi sitio backend");
});

app.get("/noticias", (req, res) => {
    const q = "SELECT * FROM noticias";
    db.query(q, (err, data) => {
        if (err) {
            console.log("Erro ejecutando la consulta", err);
            return res.status(500).json({ error: "Error en la consulta" });
        }
        return res.json(data);
    })  
})

app.post("/noticias", (req, res) => {
    const q = "INSERT INTO noticias (`title`, `descripcion`, `cover`) VALUES (?, ?, ?)";
    const valores = [req.body.title, req.body.descripcion, req.body.cover];

    db.query(q, (valores), (err, data) => {
        if (err) return res.json(err);
        return res.json("Corrriendo noticias");
    })
})


// Iniciar servidor
app.listen(8080, () => {
    console.log("Servidor corriendo en http://localhost:8080");
});


process.on("SIGINT", () => {
    db.end((err) => {
        if (err) {
            console.error("Error cerrando conexión a MySQL:", err);
        } else {
            console.log("Conexión a MySQL cerrada");
        }
        process.exit();
    })
});
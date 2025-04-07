import mysql from "mysql2";


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
  
  export default db;
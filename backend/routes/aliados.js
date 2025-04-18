import express from "express";
import db from "../db.js"
import multer from "multer";
import path from "path"

const router = express.Router ();

//Configigurar multer para subir imagenes

const storage = multer.diskStorage({
  destination:(req,file,cb)=>cb(null,"uploads/"),
  filename:(req,file,cb)=> cb(null,Date.now()+path.extname(file.originalname)),
});

const upload = multer ({storage});


router.get("/",(req,res)=>{
  const q = "SELECT * FROM Marcas_Aliadas";
  db.query(q,(err,data)=>{
    if(err) return res.status(500).json({error:"Error en consulta"});
    return res.json(data)
  })
})
//Publciar Aliado

router.post("/",upload.single("cover"),(req,res)=>{
  const cover = req.file?.filename||null;
  const {nombre_Marcas_Aliadas}=req.body;

  if(!cover||!nombre_Marcas_Aliadas){
    return res
    .status(400)
    .json({message:"Requiere nombre e imagen del aliado"})
  }
const q = `INSERT INTO Marcas_Aliadas(nombre_Marcas_Aliadas, imagen_Marcas_Aliadas) VALUES (?,?)`
db.query(q,[nombre_Marcas_Aliadas,cover],(err)=>{
  if(err)
    return res.status(500).json({error:"Error al insertar aliados"})
    return res.json({message:"Aliado publicado correvtamente"})
})
})

//Actualizar Aliado
router.put("/:id",upload.single("cover"),(req,res)=>{
  const{id}=req.params;
  const cover = req.file?.filename;
  const {nombre_Marcas_Aliadas}=req.body

  if(!cover||!nombre_Marcas_Aliadas){
    return res.status(400).json({message:"Falttan campos para actualizar"})
  }
  const q =` UPDATE Marcas_Aliadas SET nombre_Marcas_Aliadas  =?, imagen_Marcas_Aliadas =? WHERE id_Marcas_Aliadas=?`
  const valores = [nombre_Marcas_Aliadas,cover,id]
  db.query(q,valores,(err,result)=>{
    if(err) return res.status(500).json({error:"Error al actualziar aliados"});
    if(result.affectedRows===0){
      return res.status(404).json({message:"Aliado no ecnontrado"})
    }
    return res.json({message:"Aliado actualizado"})
  })
})

//Eliminar aliado

router.delete("/:nombre_Aliado_Marca",(req,res)=>{
const {nombre_Marcas_Aliadas}= req.params;

const q = "DELETE FROM Marcas_Aliadas WHERE nombre_Marcas_Aliadas=?"

db.query(q,[nombre_Marcas_Aliadas],(err,result)=>{
  if(err)
    return res.status(500).json({error:"Error al eliminar aliad"});
    if(result.affectedRows===0){
      return res.status(404).json({message:"Aliado no encontrado"})
    }
    return res.json ({message:"Aliado elimoinado correctamente"})
})
})
export default router;
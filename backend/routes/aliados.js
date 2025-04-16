router.put("/:nombre_Aliado_Marca", upload.single("cover"), (req, res) => {
    const { nombre_Aliado_Marca } = req.params;
    const { nuevo_nombre } = req.body;
    const cover = req.file?.filename;
  
    if (!nuevo_nombre && !cover) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }
  
    // Armamos dinámicamente la consulta dependiendo de lo que se quiera actualizar
    let q = "UPDATE Marcas_Aliadas SET ";
    const valores = [];
  
    if (nuevo_nombre) {
      q += "nombre_Aliado_Marca = ?";
      valores.push(nuevo_nombre);
    }
  
    if (cover) {
      if (valores.length > 0) q += ", ";
      q += "imagen_Marcas_Aliadas = ?";
      valores.push(cover);
    }
  
    q += " WHERE nombre_Aliado_Marca = ?";
    valores.push(nombre_Aliado_Marca);
  
    db.query(q, valores, (err, result) => {
      if (err)
        return res.status(500).json({ error: "Error al actualizar el aliado" });
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Aliado no encontrado con ese nombre" });
      }
      return res.json({ message: "Aliado actualizado correctamente" });
    });
  });
  

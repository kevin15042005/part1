import React , {useState}from 'react'
import Layout from '../../Components/layout'


export default  function CrudNoticiaPintura() {
    const [titulo,setTitulo]= useState("");
    const [descripcion,setDescripcion]= useState("");
    const [imagen, setImagen]= useState(null);
    const [idNoticia,setIdNoticia]= useState("");

    //Funcion Creacion de noticia
    const handleSubmit = async (e)=>{
        e.preventDefautl();
        const formData = new FormData();
        formData.append("nombre_Noticia_Pintura",titulo);
        formData.append("contenido_Noticia_Pintura",descripcion);
        formData.append("cover",imagen);

        try{
            const res = await fetch("http://localhost:8080/noticiaspintura",{
                method:"POST",
                body:formData,
            })
            const data = await res.json();
            alert(data.messge|| "Noticia creada")
        }catch(err){
            console.error(err);
            alert("Error ale crear la noticia")
        }
    }
//Funcion actualizar

const handleUpdate = async (e)=>{
    e.preventDefautl();
    const formData = new FormData();
    formData.append("id_Noticias_Pintura",idNoticia);
    formData.append("nombre_Noticias_Pintura",titulo);
    formData.append("contenid_Noticias_Pintura",descripcion);
    if(imagen)formData.append("cover",imagen);

    try{
        const res=await fetch ("http://localhost:8080/noticiaspintura",{
            method:"PUT",
            body:formData,
        })
        const dat = await res.json();
        alert(data.message|| "Noticia actualizada")
    }catch(err){
        console.error(err);
        alert("Error al actualizar la noticia")
    }
}
//Funcion eliminar noticia
const hanldeDelete = async(e)=>{
    e.preventDefault();
    try{
        const res = await fetch("http://localhost:8080/noticiaspintura",{
            methog:"DELETE",

        })
        const data = await res.json();
        alert(data.message|| "Noticia eliminada")
        setTitulo("");
        setDescripcion("");
        setImagen(null);
        setIdNoticia("");
    }catch(err){
        console.error(err);
        alert("Error al eliminar la noticia")
    }
}


  return (
    <Layout>
    <div>
      <h1>CRUDPintura</h1>
    </div>

    <form onSubmit={handleSubmit}>
            <h1>Crear Noticias</h1>
            <input type="text "placeholder='Titulo' value = {titulo} onChange={(e)=> setTitulo(e.target.value)}/>
            <input type= " text" placeholder = "Descripcion" value={descipcion} onChange={(e)=> setDescripcion(e.target.value)}/>
            <input type = "file" onChange={(e)=>setImagen(e.target.file[0])}/>
            <button type="submit">Crear noticias</button>
    </form>

    <form onSubmit={handleUpdate}>
        <h1>Actualziar Noticia</h1>
        <input type="text" placeholder='Titulo' value = {titulo} onChange={(e)=>setTitulo(e.target.value)} />
        <input type="text" placeholder='Descripcion' value = {descripcion} onChange={(e)=>setDescripcion(e.target.value)} />
        <input type="file" onChange={(e)=>setImagen(e.target.file[0])} />
        <button type="submit">Actualizar</button>
    </form>

    <form onSubmit={hanldeDelete}>
        <h1>Eliminar Noticia</h1>
        <input type="text " placeholder='Titulo de la noticia' value={titulo}onChange={(e)=>setTitulo(e.target.value)} />
        <button type="submit">Eliminar</button>
    </form>
    </Layout>
  )
}


import multer from 'multer' // Importamos multer para manejar la subida de archivos
import path from 'node:path'
import * as modelo from './modelo-alfajores.mjs'
import mime from 'mime-types' // Importamos mime-types para detectar la extension real del archivo
import { nanoid } from 'nanoid' // Importamos nanoid para generar nombres unicos y aleatorios

// //-------- Multer Nuevo ---------------

// Configuracion personalizada de como multer guarda los archivos
const storage = multer.diskStorage({

    // Define la carpeta donde se guardan los archivos
  destination: function (req, file, cb) {
    // Verificamos datos? -> throw y atrapa el callback error
    // if(mime.extension(file.mimetype) !== 'pdf'){
    //     throw new Error('Extension incorrecta')
    // }
    cb(null, './archivos')
  },
   // Define el nombre con el que se guarda el archivo
  filename: function (req, file, cb) {
    // genera un nombre unico + la extension real del archivo
    const fileName = nanoid() + '.' + mime.extension(file.mimetype)
    cb(null, fileName)
  }
})


// Creamos el middleware de multer con nuestra configuracion
// .single('archivo') indica que espera un solo archivo en el campo 'archivo'
const upload = multer({
    storage:storage
}).single('archivo')


// // -----------------------







// //-------- Multer Viejo ---------------
// const subirArchivo = multer({
//     dest: path.join('archivos')
// })

// const manejarArchivo = subirArchivo.single('CampoArchivo') // <--- devuelve una funcion

// // -----------------------





export async function obtenerTodos(req, res){
    // Obtener la consulta a BD de la capa modelo
    const respuesta = await modelo.obtenerTodos() //<--- funcion asincrona
    // Respuesta tiene todos los datos de la consulta
    const respuestaDatos = respuesta.rows
    /*
    respuesta:
    consulta
    Campos,
    datos de la tabla --> rows <-- Arreglo
    */
    console.log(respuestaDatos)
    res.json(respuestaDatos) //<-- ese Arreglo


}

export async function obtenerUno(req, res){
    const id = req.params.id;
    const resultado = await modelo.obtenerUno(id);
    res.json(resultado.rows[0]); // respondemos con el primer (y unico) resultado
}

//POST
export async function crearUno(req, res){
    // llamamos upload manualmente para procesar el archivo antes de seguir
    upload(req, res, async (error)=>{
        //console.log(req)
        if (error) return res.status(500).json({mensaje: 'Error en el servidor'});

        // armamos el objeto con los datos del formulario y el archivo
        const datos = {
            nombreProducto: req.body.nombre,  // campo de texto del form
            precio: req.body.precio,          // campo de texto del form
            img: req.file.filename            // nombre del archivo guardado por multer
        }
        //console.log(req.file)
        //console.log(req.body)
        const resultado = await modelo.crearUno(datos); // insertamos en la BD
        res.status(201).json({mensaje: 'Registro creado'});
    })
}


//PUT
export async function actualizarUno(req, res){
    upload(req, res, async (error)=>{
        if (error) return res.status(500).json({mensaje: 'Error en el servidor'});

        const datos = {
            id: req.params.id,                  // id del producto a actualizar
            nombreProducto: req.body.nombre,
            precio: req.body.precio,
            img: req.file ? req.file.filename : req.body.imgActuals // si se subio imagen nueva usa su nombre, sino mantiene la imagen actual
             
        }

        const resultado = await modelo.actualizarUno(datos);
        res.status(200).json({mensaje: 'Registro actualizado'});
    })
} 

//DELETE
export async function eliminarUno(req, res){
    const id = req.params.id;
    const resultado = await modelo.eliminarUno(id);
    res.status(200).json({mensaje: 'Registro eliminado'});
}   

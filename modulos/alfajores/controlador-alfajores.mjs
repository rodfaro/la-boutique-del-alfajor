import multer from 'multer'
import path from 'node:path'
import * as modelo from './modelo-alfajores.mjs'
import mime from 'mime-types'
import { nanoid } from 'nanoid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Verificamos datos? -> throw y atrapa el callback error
    // if(mime.extension(file.mimetype) !== 'pdf'){
    //     throw new Error('Extension incorrecta')
    // }
    cb(null, './archivos')
  },
  filename: function (req, file, cb) {
    const fileName = nanoid() + '.' + mime.extension(file.mimetype)
    cb(null, fileName)
  }
})

const upload = multer({
    storage:storage
}).single('archivo')


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

//POST
export async function crearUno(req, res){
    upload(req, res, async (error)=>{
        //console.log(req)
        if (error) return res.status(500).json({mensaje: 'Error en el servidor'});

        const datos = {
            nombreProducto: req.body.nombre,
            precio: req.body.precio,
            img: req.file.filename  
        }
        //console.log(req.file)
        //console.log(req.body)
        const resultado = await modelo.crearUno(datos);
        res.status(201).json({mensaje: 'Registro creado'});
    })

//PUT


//DELETE
    
}
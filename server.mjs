import express from 'express'
import path from 'path'

import './iniciar.env.mjs'

//importamos rutas de los alfajores
import rutasModuloAlfajores from './modulos/alfajores/rutas-alfajores.mjs'

//Variable de entorno
const PUERTO = process.env.PUERTO || 3000;
const app = express();

app.use(rutasModuloAlfajores)

//Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (Frontend)
app.use(express.static("public"));

app.use('/admin', express.static(path.resolve('./frontend-crud')));

//Carpeta para servir archivos(imagenes)
app.use('/archivos', express.static(path.resolve('./archivos')));


app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})
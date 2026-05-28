import express from 'express'

import './iniciar.env.mjs'

//importamos rutas de los alfajores
import rutasModuloAlfajores from './modulos/alfajores/rutas-alfajores.mjs'

//Variable de entorno





const PUERTO = process.env.PUERTO || 3000;
console.log(process.env.PUERTO)

const app = express();

app.use(rutasModuloAlfajores)

//Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (Frontend)
app.use(express.static("public"));

app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})
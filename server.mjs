import express from 'express'

//importamos rutas de los alfajores
import rutasModuloAlfajores from './public/recursos/modulos/alfajores/rutas-alfajores.mjs'


const PUERTO = 3000;
const app = express();

app.use(rutasModuloAlfajores)

//Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (Frontend)
app.use(express.static("public"));

app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})
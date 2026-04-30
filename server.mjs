import express from 'express'

const PUERTO = 3000;
const app = express();

//Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (Frontend)
app.use(express.static("public"));

app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})
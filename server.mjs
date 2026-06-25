import './iniciar.env.mjs'
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as controladorLogin from './modulos/login/controlador-login.js';

//importamos rutas de los alfajores
import rutasModuloAlfajores from './modulos/alfajores/rutas-alfajores.mjs'
import { verificarAcceso } from './modulos/middlewares/jwtAutenticar.js';


//Variable de entorno
const PUERTO = process.env.PUERTO || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(rutasModuloAlfajores);
app.use(cookieParser(process.env.COOKIE_FIRMA)); //Lee la cabecera de las cookies y transforma a un obj JS


//Middleware para leer JSON

// Servir archivos estáticos (Frontend)
app.use('/', express.static("public"));

app.use('/admin', verificarAcceso, express.static(path.resolve('./frontend-crud')));  //para probar el prueba.html, usar esta ruta en el navegador: http://localhost:3000/admin/prueba.html
app.use('/login', express.static(path.resolve('./public/login')))

//Carpeta para servir archivos(imagenes)
app.use('/archivos', express.static(path.resolve('./archivos')));


//Ruta autenticar
app.post('/autenticar', controladorLogin.verificarLogin)

//Ruta para borrar cookie y desloguearse
app.get('/cerrar-sesion', (req, res)=>{
    res.clearCookie('token');
    res.redirect('/login');
})

//faltan rutas fetch


app.listen(PUERTO, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})
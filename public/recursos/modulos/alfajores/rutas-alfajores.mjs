//Clase para trabajar con agrupanmiento de rutas
import { Router } from "express";
//Importamos las funciones del controlador  
import * as controlador from './controlador-alfajores.mjs'

const rutasAlfajores = new Router()

rutasAlfajores.get('/api/v1/productos', controlador.obtenerTodos)

export default rutasAlfajores 
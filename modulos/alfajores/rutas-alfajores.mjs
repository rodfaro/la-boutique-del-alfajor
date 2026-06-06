//Clase para trabajar con agrupanmiento de rutas
import { Router } from "express";
//Importamos las funciones del controlador  
import * as controlador from './controlador-alfajores.mjs'

const rutasAlfajores = new Router()

rutasAlfajores.get('/api/v1/productos', controlador.obtenerTodos)
rutasAlfajores.get('/api/v1/productos/:id', controlador.obtenerUno)
rutasAlfajores.post('/api/v1/productos', controlador.crearUno)
rutasAlfajores.put('/api/v1/productos/:id', controlador.actualizarUno)
rutasAlfajores.delete('/api/v1/productos/:id', controlador.eliminarUno)

export default rutasAlfajores

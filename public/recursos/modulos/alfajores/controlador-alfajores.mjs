import * as modelo from './modelo-alfajores.mjs'

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

    res.json(respuestaDatos) //<-- ese Arreglo


}
import pool from '../../bd/conexion-bd.mjs'

export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM Productos')//<-- promesa
    return resultado
}


import pool from '../../bd/conexion-bd.mjs'

export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM Productos')//<-- promesa
    return resultado
}

//POST
export async function crearUno(datos){
    const {nombreProducto, precio, img} = datos;
    const resultado = await pool.query('INSERT INTO Productos(nombre, precio, img) VALUES($1, $2, $3) RETURNING idproducto, nombre, precio, img', [nombreProducto, precio, img])//<-- promesa
    return resultado 
}

//
import pool from '../../bd/conexion-bd.mjs'

// GET - obtenerTodos
// Sin ORDER BY, PostgreSQL no garantiza ningún orden en los resultados,
// y después de un UPDATE puede devolver las filas en cualquier orden.
// Con ASC siempre van a aparecer ordenadas por ID de menor a mayor.
export async function obtenerTodos(){
    const resultado = await pool.query('SELECT * FROM Productos ORDER BY idproducto ASC')//<-- promesa
    return resultado
}


// GET - obtenerUno

// $1 es un placeholder para evitar SQL injection
export async function obtenerUno(id){
    const resultado = await pool.query('SELECT * FROM Productos WHERE idproducto=$1', [id])
    return resultado
}

//POST
// RETURNING devuelve el registro recien creado con todos sus campos
export async function crearUno(datos){
    const {nombreProducto, precio, img} = datos;
    const resultado = await pool.query('INSERT INTO Productos(nombre, precio, img) VALUES($1, $2, $3) RETURNING idproducto, nombre, precio, img', [nombreProducto, precio, img])//<-- promesa
    return resultado 
}

//PUT
//NULLIF convierte '' en NULL, COALESCE usa el valor viejo si es NULL
//asi si un campo viene vacio, mantiene el valor que ya tenia en la BD
export async function actualizarUno(datos){
    const {id, nombreProducto, precio, img} = datos;
    const resultado = await pool.query(
        `UPDATE Productos 
         SET 
            nombre = COALESCE(NULLIF($1, ''), nombre),
            precio = COALESCE(NULLIF($2, ''), precio::text)::numeric,
            img    = COALESCE(NULLIF($3, ''), img)
         WHERE idproducto=$4 
         RETURNING idproducto, nombre, precio, img`,
        [nombreProducto, precio, img, id]
    )
    return resultado
}

//DELETE
// RETURNING devuelve el id del registro eliminado para confirmar que se borro
export async function eliminarUno(id){
    const resultado = await pool.query(
        'DELETE FROM Productos WHERE idproducto=$1 RETURNING idproducto',
        [id]
    )
    return resultado
}
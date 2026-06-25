import pool from '../../bd/conexion-bd.mjs'

export async function verificarLogin(usuario){
    try{
        const resultado = await pool.query('SELECT password_hash FROM admin WHERE username = $1', [usuario])
        return resultado;
    }catch(error){
        console.log(error)
        throw new Error("Error al leer el archivo de productos");
    }
}
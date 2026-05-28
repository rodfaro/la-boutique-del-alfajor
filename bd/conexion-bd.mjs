import pg from 'pg'

//Clase pool --> hacer consultas simples

const pool = new pg.Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE,
    port: process.env.DB_PORT
})
//Exportamos para hacerlo vicible desde otro modulo
//default es no nombrado --> se importa en las llaves

console.log(process.env.BD_PASSWORD)

export default pool
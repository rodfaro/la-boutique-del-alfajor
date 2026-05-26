import pg from 'pg'

//Clase pool --> hacer consultas simples

const pool = new pg.Pool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'tienda_alfajores',
    port: 5432
})
//Exportamos para hacerlo vicible desde otro modulo
//default es no nombrado --> se importa en las llaves
export default pool
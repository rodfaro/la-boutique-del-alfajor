import { renderizarProductos } from "./render.js";
import { obtenerAlfajores } from "./api.js";

const url = '/recursos/data/alfajores.json'; //ruta para el fetch


//index.html

const $catalogoIndex = document.getElementById('catalogo-index'); //Contiene el elemento/caja del catalogo del html

//obtener datos desde una api/json
const alfajores = await obtenerAlfajores(url)

//funciones para renderizar
renderizarProductos(alfajores, $catalogoIndex)

//funciones botones del index
const $botones = document.querySelectorAll('.botonCatalogo')
let alfajoresSeleccionados = [];

$botones.forEach(($boton) => {
    $boton.addEventListener('click', (e) => {
        const idSeleccionado = e.target.dataset.id //guarda el id del elemento seleccionado que esta en el boton
        alfajoresSeleccionados.push(idSeleccionado) // agrega al final del aray el Id del elemento seleccionado

        console.log(alfajoresSeleccionados)
    })
});
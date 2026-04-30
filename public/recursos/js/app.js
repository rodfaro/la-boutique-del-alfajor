import { renderizarProductos } from "./render.js";
import { obtenerAlfajores } from "./api.js";

const url = '/recursos/data/alfajores.json'; //ruta para el fetch


//index.html

const $catalogoIndexMain = document.getElementById('catalogo-index-main'); 
const $catalogoIndex = document.getElementById('catalogo-index'); //Contiene el elemento/caja del catalogo del html

//obtener datos desde una api/json

const alfajores = await obtenerAlfajores(url)



if ($catalogoIndex) {
  // Página productos → mostrar TODOS
  renderizarProductos(alfajores, $catalogoIndex);
}

if ($catalogoIndexMain != null) {
  // Página productos → mostrar TODOS
  const alfajoresIndex = alfajores.slice(0,3)
  renderizarProductos(alfajoresIndex, $catalogoIndexMain);
}


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
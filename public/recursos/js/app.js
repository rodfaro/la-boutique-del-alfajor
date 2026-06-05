import { renderizarProductos } from "./render.js";
import { obtenerAlfajores } from "./api.js";

//const url = 'https://69f3c243bd2396bf5310593e.mockapi.io/api/laBoutique/Productos'; //ruta para el fetch

const PUERTO = 3000;
const url = 'http://localhost:3000/api/v1/productos'; //


//index.html

const $catalogoIndexMain = document.getElementById('catalogo-index-main'); 
const $catalogoIndex = document.getElementById('catalogo-index'); //Contiene el elemento/caja del catalogo del html

//obtener datos desde una api/json

//ejecuta un fetch que trae toda la data (alfajores)
const data = await obtenerAlfajores(url)

const alfajores = data.map((item) =>({
  ...item,
  img: `http://localhost:${PUERTO}/archivos/${item.img}`
}));
//console.log(alfajores)

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
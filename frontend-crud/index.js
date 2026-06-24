const dialog = document.getElementById('dialogProducto');
const formulario = document.getElementById('formProducto')
const tabla = document.getElementById('tabla-productos');

//botones
const btnCrear = document.getElementById('btnCrear'); //Btn q abre el dialog
const btnCancelar = document.getElementById('btnCancelar'); //btn q cierra dialog
const btnCrearAlfajor = document.getElementById('btnCrearAlfajor'); //btn q envia el fetch


//Inputs del dialog
const InputNombre = document.getElementById('nombre');
const InputPrecio = document.getElementById('precio');
const inputId = document.getElementById('productoId');
const InputFile = document.getElementById('imagen');

const tituloDialog = document.getElementById('TituloDialog')
let alfajores = [];

async function renderizarAlfajores(){
    //#region renderizado alfajores
    //renderice todo alfajores (front)
    const data = await fetch('/api/v1/productos')
    alfajores = await data.json();

    let html = `
        <!-- FILA ENCABEZADOS -->
        <tr>
            <td>
                Id
            </td>
            <td>
                Nombre
            </td>
            <td>
                Precio
            </td>
            <td>
                Imágen
            </td>
            <td>
                Acciones
            </td>
        </tr>
    `;
    alfajores.forEach((alfajor) => {
        const plantilla = `
            <!-- FILA DE REGISTROS/DATOS -->
            <tr data-id="${alfajor.idproducto}"> <!--Fila -->
                <td>
                    ${alfajor.idproducto}
                </td>
                <td>
                    ${alfajor.nombre}
                </td>
                <td>
                    ${alfajor.precio}
                </td>
                <td>
                    ${alfajor.img}
                </td>
                <!-- BOTONES -->
                <td>
                    <button class="btnEditar" id="btnEditar" type="button">Editar</button>
                    <button class="btnEliminar" id="btnEliminar" type="button">Eliminar</button>
                </td>
            </tr>`

            html += plantilla
    });

    tabla.innerHTML = html;
    //#endregion
}

//#region Dialog controlador
btnCrear.addEventListener('click', ()=>{
    formulario.reset();

    //Ajustes
    inputId.value = ''; // --->  para saber que se trata de crear un nuevo producto
    tituloDialog.textContent = 'Agregar nuevo producto';
    dialog.showModal();
});

btnCancelar.addEventListener('click', ()=>{
    dialog.close();
});

//cuando se envia la creacion
btnCrearAlfajor.addEventListener('click', async ()=>{
    const idAlfajor = Number(inputId.value);
    const datosAlfajor = {
        nombre: InputNombre.value,
        precio: InputPrecio.value
        // img: InputFile
    }

    //Se trata de una edicion
    if (idAlfajor != 0){
        const respuesta = await fetch(`/api/v1/productos/${idAlfajor}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datosAlfajor)
        })
    }
    //Se trata de un nuevo producto si el id es 0
    else{
        const respuesta = await fetch('/api/v1/productos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datosAlfajor)
        })
    }

    renderizarAlfajores();
    dialog.close();
});
//#endregion

renderizarAlfajores();

//Botones de la tabla (Editar/Eliminar)
tabla.addEventListener('click', async (e)=>{
    //para el btnEditar
    if (e.target.classList.contains('btnEditar'))
    {
        const fila = e.target.closest('tr');
        const idAlfajor = Number(fila.dataset.id);

        const alfajor = alfajores.find(a => a.idproducto === idAlfajor)

        //Ajustes
        tituloDialog.textContent = 'Editar producto existente';
        inputId.value = alfajor.idproducto; // --->  para saber que se trata de editar un nuevo producto

        InputNombre.value = alfajor.nombre;
        InputPrecio.value = alfajor.precio;
        

        dialog.showModal();
    }
     //para el btnEliminar
    if(e.target.classList.contains('btnEliminar')){
        const fila = e.target.closest('tr');
        const idAlfajor = Number(fila.dataset.id);

        const confirmar = confirm('¿Seguro que querés eliminar este alfajor?');
        if (!confirmar) return;

        const respuesta = await fetch(`/api/v1/productos/${idAlfajor}`, {
            method: 'DELETE'
        });

        renderizarAlfajores();
    }
})


const dialog = document.getElementById('dialogProducto');
const formulario = document.getElementById('formProducto')
const tabla = document.getElementById('tabla-productos');

//botones
const btnCrear = document.getElementById('btnCrear');         // Btn q abre el dialog
const btnCancelar = document.getElementById('btnCancelar');   // Btn q cierra dialog
const btnCrearAlfajor = document.getElementById('btnCrearAlfajor'); // Btn q envia el fetch

//Inputs del dialog
const InputNombre = document.getElementById('nombre');
const InputPrecio = document.getElementById('precio');
const inputId = document.getElementById('productoId');
const InputFile = document.getElementById('imagen');

const tituloDialog = document.getElementById('TituloDialog')
let alfajores = [];

// Guarda la imagen actual del producto que se está editando
// Se usa en el PUT para no perder la imagen si el usuario no sube una nueva
let imgActual = '';

async function renderizarAlfajores(){
    const data = await fetch('/api/v1/productos')
    alfajores = await data.json();

    // Arma el encabezado de la tabla
    let html = `
        <tr>
            <td>Id</td>
            <td>Nombre</td>
            <td>Precio</td>
            <td>Imágen</td>
            <td>Acciones</td>
        </tr>
    `;

    // Por cada producto genera una fila con sus datos y botones de acción
    alfajores.forEach((alfajor) => {
        const plantilla = `
            <tr data-id="${alfajor.idproducto}">
                <td>${alfajor.idproducto}</td>
                <td>${alfajor.nombre}</td>
                <td>${alfajor.precio}</td>
                <td>${alfajor.img}</td>
                <td>
                    <button class="btnEditar" type="button">Editar</button>
                    <button class="btnEliminar" type="button">Eliminar</button>
                </td>
            </tr>`

        html += plantilla
    });

    tabla.innerHTML = html;
}

// ========================= 
// Dialog controlador
// =========================

btnCrear.addEventListener('click', () => {
    formulario.reset(); // Limpia todos los inputs del form
    imgActual = ''; // no hay imagen previa al crear

    inputId.value = ''; // id vacío indica que es un producto nuevo
    tituloDialog.textContent = 'Agregar nuevo producto';
    dialog.showModal();
});

// Cierra el dialog sin hacer nada
btnCancelar.addEventListener('click', () => {
    dialog.close();
});

// Cuando se envía la creación o edición
// Envía los datos al servidor al hacer click en Guardar
btnCrearAlfajor.addEventListener('click', async () => {
    const idAlfajor = Number(inputId.value);

    // FormData permite enviar texto e imágenes juntos (multipart)
    // A diferencia de JSON, esto sí soporta archivos
    const formData = new FormData();

    formData.append('nombre', InputNombre.value);
    formData.append('precio', InputPrecio.value);

    // Si el usuario seleccionó una imagen nueva, la agregamos
    const archivo = InputFile.files[0];
    if (archivo) {
        formData.append('archivo', archivo);
    }

    // Se trata de una edición
    if (idAlfajor != 0) {
        // Enviamos la imagen actual para que el servidor no la pierda
        // si el usuario no subió una nueva
        formData.append('imgActual', imgActual);

        await fetch(`/api/v1/productos/${idAlfajor}`, {
            method: 'PUT',
            // Sin 'Content-Type': el navegador lo setea solo con el boundary correcto
            body: formData
        });
    }
    // Se trata de un producto nuevo si el id es 0
    else {
        await fetch('/api/v1/productos', {
            method: 'POST',
            body: formData
        });
    }

    renderizarAlfajores(); // Refresca la tabla con los datos actualizados
    dialog.close();
});

// Renderiza la tabla al cargar la página
renderizarAlfajores();

// ========================= 
// Botones dentro de la tabla
// =========================

// Botones de la tabla (Editar / Eliminar)
tabla.addEventListener('click', async (e) => {

    // Editar
    if (e.target.classList.contains('btnEditar')) {
        const fila = e.target.closest('tr');
        const idAlfajor = Number(fila.dataset.id);

        const alfajor = alfajores.find(a => a.idproducto === idAlfajor);

        //Ajustes
        tituloDialog.textContent = 'Editar producto existente';
        inputId.value = alfajor.idproducto; // id con valor indica que es una edición

        InputNombre.value = alfajor.nombre;
        InputPrecio.value = alfajor.precio;

        // Guardamos el nombre de imagen actual por si el usuario no sube una nueva
        imgActual = alfajor.img;

        formulario.reset(); // limpia el file input
        // Volvemos a cargar nombre y precio porque reset() los borró
        InputNombre.value = alfajor.nombre;
        InputPrecio.value = alfajor.precio;
        inputId.value = alfajor.idproducto;

        dialog.showModal();
    }

    // Eliminar
    if (e.target.classList.contains('btnEliminar')) {
        const fila = e.target.closest('tr');
        const idAlfajor = Number(fila.dataset.id);

        const confirmar = confirm('¿Seguro que querés eliminar este alfajor?');
        if (!confirmar) return;

        await fetch(`/api/v1/productos/${idAlfajor}`, {
            method: 'DELETE'
        });

        renderizarAlfajores();
    }
});

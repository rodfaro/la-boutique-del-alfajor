function renderizarProductos(productos, $elementoDOM){
    
    let html = ''
    
    productos.forEach((alfajor) => {
        const plantilla = `
            <div class="carta-producto">
                <img src="${alfajor.img}" alt="alfajor clasico con DDL">
                <h3>${alfajor.nombre}</h3>
                <p>$${alfajor.precio}</p>
                <button data-id = "${alfajor.id}" class="botonCatalogo">Añadir al carrito</button>
            </div>
        ` 

        html += plantilla
    });

    $elementoDOM.innerHTML = html
}

export {renderizarProductos}
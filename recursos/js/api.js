async function obtenerAlfajores(url){
    const res = await fetch(url);

    return await res.json()
}

export {obtenerAlfajores}
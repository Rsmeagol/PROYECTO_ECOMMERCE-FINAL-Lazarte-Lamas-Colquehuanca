

export function agregarAlCarrito(product) {
    const memoria = JSON.parse(localStorage.getItem("carrito"));
     if(!memoria){
        const nuevoProducto = product;
        nuevoProducto.count = 1;
        localStorage.setItem("carrito",JSON.stringify([nuevoProducto]))
     } else {
        const indiceProducto = memoria.findIndex(p => p.id === product.id);
        const nuevaMemoria = memoria;
        
        if(indiceProducto === -1) {
            nuevaMemoria.push(getNuevoProductoParaMemoria(product))
            localStorage.setItem("carrito",JSON.stringify(nuevaMemoria))
        } else {

            nuevaMemoria[indiceProducto].count ++;
            
        }
        localStorage.setItem("carrito",JSON.stringify(nuevaMemoria))
     }
     actualizarNumeroCarrito();
     actualizarTotales();
}

export function restarAlCarrito(product){
    const memoria = JSON.parse(localStorage.getItem("carrito"));
    const indiceProducto = memoria.findIndex(p => p.id === product.id);
    if(memoria[indiceProducto].count === 1){
        memoria.splice(indiceProducto,1);
        
    } else {
        memoria[indiceProducto].count--;

    }
    localStorage.setItem("carrito",JSON.stringify(memoria))
}

export function quitarDeCarrito(product){

    const memoria = JSON.parse(localStorage.getItem("carrito"));
    const indiceProducto = memoria.findIndex(p => p.id === product.id);
    if(memoria[indiceProducto]){
        memoria.splice(indiceProducto,1);
        localStorage.setItem("carrito",JSON.stringify(memoria))
    }
}

export function actualizarTotales() {
    const memoria = JSON.parse(localStorage.getItem("carrito"));
    let unidades = 0;
    let precio = 0;
    let precio_dos_decimales = 0;
    if (memoria && memoria.length > 0){
        memoria.forEach(producto => {
            unidades += producto.count;
            precio += producto.price * producto.count;
            precio_dos_decimales = precio.toFixed(2);
        });
       return precio_dos_decimales;
    }
}

function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto;
    nuevoProducto.count = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("cantidad-en-carrito");
export function actualizarNumeroCarrito() {
    const memoria = JSON.parse(localStorage.getItem("carrito"));
    let cuenta = 0;
    if(memoria){
        cuenta = memoria.reduce((acum, current) => acum + current.count, 0);
    }
    cuentaCarritoElement.innerText= cuenta;
}

export function readStorage() {
    const products = JSON.parse(localStorage.getItem("carrito"));
    return products;
}

export function ModificarCantidadStorage(product) {
    const productoStorage = JSON.parse(localStorage.getItem("carrito"));
    const indice = productoStorage.findIndex((p) => p.id === product.id);
    productoStorage[indice] = product;
    localStorage.setItem("carrito", JSON.stringify(productoStorage));
    
}

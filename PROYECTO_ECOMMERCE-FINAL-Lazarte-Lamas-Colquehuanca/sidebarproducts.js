import { readStorage, actualizarNumeroCarrito, agregarAlCarrito,restarAlCarrito, actualizarTotales, quitarDeCarrito } from "./storage.js";


export function sidebar() {

    const sidebarContent = renderProductsInSidebar() || "<p> No hay Productos en la lista ... </p>";
    const precioFinal = actualizarTotales() || 0;
   
    const sidebarCart = `<div class="offcanvas-header">
                             <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Lista de Productos</h5>
                             <button type="button" class="btn-close" id="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                         </div>
                         <div class="offcanvas-body">
                         ${sidebarContent}
                         </div>
                         <button type="button" class="btn btn-warning mb-2 mx-3">Vaciar Carrito</button>
                         <div class="navbar">
                         <div class="container-fluid ">
                         <h6 id="Precio-Final">Precio Final: $ ${precioFinal}</h6>
                         <button type="button" class="btn btn-dark mb-3">Finalizar Compra</button>
                         </div>
                         </div>`;
        
     const sidebarElement = document.querySelector("#offcanvasNavbar");
     sidebarElement.innerHTML = sidebarCart;

     
     setTimeout(() => {
        const btnComprar = document.querySelector(".btn.btn-dark.mb-3");
        btnComprar.addEventListener("click",() => {
            alert("Gracias por tu compra"),
            localStorage.clear();
            sidebar();
            });
            const btnVaciar = document.querySelector(".btn.btn-warning.mb-2.mx-3");
            btnVaciar.addEventListener("click",() => {
            localStorage.clear();
            sidebar();
            });
            const btnClose = document.querySelector(`#btn-close`);
            btnClose.addEventListener("click", () => {
                actualizarNumeroCarrito();
            });
            
            document.addEventListener("click", (e) => {
                if(!e.target.matches("#offcanvasNavbar")){
                    actualizarNumeroCarrito();
                }
            });

     }, 0);
    
}

function renderProductsInSidebar() {
    const products = readStorage();
    
    let cardsHorizontal = "";
    if (products) {
        products.forEach((p) => {
            cardsHorizontal += `
    
            <div class="card mb-2" >
            <img src="${p.image}" class="card-img-top" alt="${p.title}">
            <div class="card-body">
                <div class="text-section">
                <h5 class="card-title">${p.title}</h5>
                <p class="card-text">${p.description}</p>
                </div>
                <div class="cta-section">
                <button class="btn btn-outline-danger mb-2"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" id="btn-quitar-${p.id}">X</button>
                <div><h6 id="text-price-${p.id}">$${p.price}</h6></div>
                <div><h6 id="text-count-${p.id}">${p.count}</h6></div>
                <div>
                    <button id="btn-decrease-${p.id}" class="btn btn-danger"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" disabled>-</button>
                    <button id="btn-increase-${p.id}" href="#" class="btn btn-primary"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">+</button>
                </div>
                
                </div>
                
                </div>
                </div>`;
            
            setTimeout(() => {
                const btnSumar = document.querySelector(`#btn-increase-${p.id}`);

                if(p.count > 1) {
                    const btnRestar = document.querySelector(`#btn-decrease-${p.id}`);
                    btnRestar.removeAttribute("disabled");
                    
                }

                btnSumar.addEventListener("click", () => {
                agregarAlCarrito(p);
                actualizarTotales();
                sidebar();

                if(p.count > 1) {
                    const btnRestar = document.querySelector(`#btn-decrease-${p.id}`);
                    btnRestar.removeAttribute("disabled");
                    
                }
                
                });

                const btnQuitar = document.querySelector(`#btn-quitar-${p.id}`);
                btnQuitar.addEventListener("click", () =>{
                    quitarDeCarrito(p)
                    actualizarTotales();
                    sidebar();
                });
                
                const btnRestar = document.querySelector(`#btn-decrease-${p.id}`);
                btnRestar.addEventListener("click", () => { 
                    restarAlCarrito(p);
                    actualizarTotales();
                    sidebar();

                    if(p.count == 1) {
                        btnRestar.setAttribute("disabled", true);
                    }
                });
                
            }, 0);
            
        });
        
    } else {
        cardsHorizontal = "<p> No hay Productos en la lista ... </p>";
        
    }
    
    return cardsHorizontal;
}

import { getProducts } from "./api.js"; 
import { agregarAlCarrito } from "./storage.js";


export function renderCards() {
     const $ = document;
     const cardContainer = $.querySelector('#row');

     const modalContainer = $.querySelector('.modal-content');
     let modal = ` `
     
    getProducts().then((data) => {
        data.forEach(product => {
            let card = `<div class="col-12 col-md-6 col-lg-6 col-xl-4 mb-4 ">
                            <div class="card h-100" >
                            
                                <img src="${product.image}" class="card-img-top my-3" alt="${product.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.title}</h5>
                                    <p class="card-text">${product.description}</p>
                                    <h5><span>$${product.price}</span></h5>
                                    <button id="btn-${product.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar</button>
                                </div>
                            </div>
                        </div>  <!--. Fin Tarjeta--> `
            cardContainer.innerHTML += card;

            setTimeout(() => {
                let btnProduct = $.querySelector(`#btn-${product.id}`);
                btnProduct.addEventListener("click", () => { 

                     modal =`<div class="modal-header">
                                <h1 class="modal-title fs-5 card-title" id="exampleModalLabel">${product.title}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body card h-100">
                            <img src="${product.image}" class="card-img-top my-3" alt="${product.title}">
                            <p class="card-text">${product.description}</p>
                            <h5><span>Precio: $ ${product.price}</span></h5>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" id="btn-modal-${product.id}" class="btn btn-primary">Comprar</button>
                            </div>`;
                        
                     modalContainer.innerHTML = modal;       

                     let btnProductModal = $.querySelector(`#btn-modal-${product.id}`);
                     btnProductModal.addEventListener("click", () => {
                        agregarAlCarrito(product);

                     })
                    
                    
                    
                });
                
                
            }, 0);
        });
        
        
        
    });
    
    
}



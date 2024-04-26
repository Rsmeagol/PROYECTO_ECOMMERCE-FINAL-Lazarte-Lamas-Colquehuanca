import { sidebar } from "./js/sidebarproducts.js"; 
import { renderCards } from "./js/cards.js";    
import {actualizarNumeroCarrito} from "./js/storage.js"

const btnSidebar = document.querySelector("#btn-sidebar");
btnSidebar.onclick = sidebar;


renderCards();

actualizarNumeroCarrito();

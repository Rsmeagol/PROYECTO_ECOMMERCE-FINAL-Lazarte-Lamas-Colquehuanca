const URL = "https://fakestoreapi.com/products";

export function getProducts () {

   return fetch(URL)
            .then(res=>res.json())
            .then(json=>json)
}
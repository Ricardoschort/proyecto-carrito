// abrir el modal de la cart
const shopIcon = document.querySelector(".shopping-icon");
const shopCart = document.querySelector(".shopping-cart");
const deleteAllBtn = document.querySelector("#empty-cart");
const listCartAdd= document.querySelector("#table-cart tbody");
const cards = document.querySelector("#list-Courses");
let shoppingCart = [];

// local storage 

document.addEventListener("DOMContentLoaded",() =>{
  shoppingCart = JSON.parse(localStorage.getItem("products")) || [];
  builcart();
})

// abrir el modal del menu 
shopIcon.addEventListener("click",()=>{
  shopCart.classList.toggle("show")
})

// Eventos 
cards.addEventListener("click",addCart);
listCartAdd.addEventListener("click", deleteProduct);
deleteAllBtn.addEventListener("click", deleteAll)

// adicionar la informacion al carrito
function addCart(e) {
  e.preventDefault()
  const addBtn= e.target.classList.contains("add-btn");
 
  const courseSelection= e.target.parentElement.parentElement;
  if (addBtn){
      readCart(courseSelection)
 }

} 

// leer la informacion y transformarla en un objeto

function readCart(course){
  const cours ={
    imagen: course.querySelector("img").src,
    nombre: course.querySelector("h5").textContent,
    precio: course.querySelector(".price").textContent,
    cantidad:1,
    id: course.querySelector("a").getAttribute("data-id")
    
  }

//chequear que el objeto no se repita
  

  const thereIs = shoppingCart.some(course => course.id === cours.id);
  if (thereIs) {
      const courses = shoppingCart.map( course =>{
      if (course.id === cours.id) {
        course.cantidad++;
        return course;
      }else {
        return course;
      }

    })
    shoppingCart =[...courses]
  }else{
    shoppingCart =[...shoppingCart,cours]
  }
 
  builcart();
}

// construir el html y colocarlo

function builcart(){
  clearCart();
  shoppingCart.forEach(course => {
    const rowCart = document.createElement("tr");
    rowCart.innerHTML =
    `
     <td> <img src="${course.imagen}" width="60"</td>
     <td><p>${course.nombre}</p></td>
     <td><p>${course.precio}</p></td>
     <td><p>${course.cantidad}</p></td>
     <td> <a href="#" class="delete-product" data-id="${course.id}">x</a></td>
    `;
    listCartAdd.appendChild(rowCart);
    
  });
  sincronizar()
  
}
// sincronizar con local storage

function sincronizar(){
  localStorage.setItem("products",JSON.stringify(shoppingCart));
}


//borrar listado completo

function clearCart(){
  while (listCartAdd.firstChild) {
    listCartAdd.removeChild(listCartAdd.firstChild);
  }
}

//borrar de la lista un producto

function deleteProduct(e){
  if(e.target.classList.contains("delete-product")){
    const productId = e.target.getAttribute("data-id")
      shoppingCart = shoppingCart.filter( product => product.id !== productId
    
    )
    builcart();
    
  }

}

//borrar de la lista todos los productos

function deleteAll(e){
  if ( e.target.classList.contains("empty-cart--button")){
    clearCart();
  }
}


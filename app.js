// abrir el modal de la cart
const shopIcon = document.querySelector(".shopping-icon");
const shopCart = document.querySelector(".shopping-cart");

shopIcon.addEventListener("click",()=>{
  shopCart.classList.toggle("show")
})
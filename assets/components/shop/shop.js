
const iconCart = document.querySelector('.fa-shopping-bag')
const body = document.querySelector('.cartTab');
const closeCart = document.querySelector('.close')
const listProductHTML = document.querySelector('.pro-container')
const listCart = document.querySelector('.listCart')
const Pro = document.querySelector('.pro')
const shoppingCart = document.querySelector('.fa-shopping-cart')
const iconCartSpan = document.querySelector('.lg-bag span')
let listProducts = []
let carts = []

console.log(iconCart)
iconCart.addEventListener('click', () => {
    body.classList.toggle('activeShowCart')
})

closeCart.addEventListener('click', () => {
   body.classList.remove('activeShowCart')
})
const addDataToHTML = () =>{
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct  = document.createElement('div');
            newProduct.classList.add('pro');
            newProduct.dataset.id = product.id
            newProduct.innerHTML = `
            <img src="/assets/img/products/${product.image}" alt="" />
            <div  class="des item">
              <span>${product.name}</span>
              <h5>Cartoon Astronout T-shirt</h5>
              <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <h4>${product.price}$</h4>
            </div>
            <a href="#"  class="icon"><i " class="fa fa-shopping-cart"></i></a>
         `;
         
         listProductHTML.appendChild(newProduct)
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target
    console.log(positionClick);
    if(positionClick.classList.contains('fa-shopping-cart')){
        let product_id = positionClick.parentElement.parentElement.dataset.id
        addToCart(product_id);
    }
})

let addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id === product_id)
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    } else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1
    }
    addToCartHTML()
    console.log(carts)
}

const addToCartHTML = () => {
    listCart.innerHTML = ''
    if(carts.length > 0){
        carts.forEach(cart => {
            let newCart = document.createElement('div');
            newCart.classList.add('pro');
            newCart.innerHTML = `
            <div class="item">
            <div class="image">
              <img src="/assets/img/products/f4.jpg" alt="" />
            </div>
            <div class="name">Name</div>
            <div class="totalPrice"></div>
            <div class="quantity">
              <span class="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus"></span>
            </div>
          </div>`
          listCart.appendChild(newCart)
        })
    }
}
const initApp = () => {
fetch('/assets/components/shop/products.json')
.then(response => response.json())
.then(data =>{
     listProducts = data ;
     addDataToHTML();

    console.log(listProducts)
    })
    .catch(err => console.log(`error message:${err}`))
}
initApp()


const iconCart = document.querySelector('.fa-shopping-bag')
const body = document.querySelector('.cartTab');
const closeCart = document.querySelector('.close')
const listProductHTML = document.querySelector('.pro-container')
const listCart = document.querySelector('.listCart')
const Pro = document.querySelector('.pro')
const shoppingCart = document.querySelector('.fa-shopping-cart')
const iconCartSpan = document.querySelector('.iconCartSpan')
let listProducts = []
let carts = []

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
    addCartMemory()
}

const addCartMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts))
}
const addToCartHTML = () => {
    listCart.innerHTML = ''
    let totalQuantity = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id
            let positionProduct = listProducts.findIndex(( value) => value.id == cart.product_id)
            let info = listProducts[positionProduct]
            newCart.innerHTML = `
            <div class="image">
              <img src="/assets/img/products/${info.image}" alt="" />
            </div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">${info.price * cart.quantity}$</div>
            <div class="quantity">
              <span class="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus">+</span>
            </div>

            
     `;
          listCart.appendChild(newCart)
        })
    }
    iconCartSpan.innerHTML = totalQuantity;
}

listCart.addEventListener('click', (event) => {
    let positionClick = event.target;
    console.log(positionClick)
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id
        console.log(product_id);
        let type = 'minus'
        if(positionClick.classList.contains('plus')){
            type = 'plus'
        }
        changeQuantity(product_id, type)
    }
})

const changeQuantity = (product_id, type) => {
 let positionItemInCarts = carts.findIndex((value) => value.product_id == product_id);

 if(positionItemInCarts >= 0){
    switch(type){
        case 'plus':
            carts[positionItemInCarts].quantity = carts[positionItemInCarts].quantity + 1;
            break;

            default:
                let valueChange = carts[positionItemInCarts].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCarts].quantity = valueChange;
                } else{
                    carts.splice(positionItemInCarts, 1);
                }
                break;
    }
 }
 addCartMemory();
 addDataToHTML();
}
const initApp = () => {
fetch('/assets/components/shop/products.json')
.then(response => response.json())
.then(data =>{
     listProducts = data ;
     addDataToHTML();

    //  get cart from memory\
    if(localStorage.getItem('cart')){
        carts = JSON.parse(localStorage.getItem('cart'));
        addDataToHTML()
    }

    })
    .catch(err => console.log(`error message:${err}`))
}
initApp()


const bar = document.getElementById('bar')
const closed = document.getElementById('close')
const nav = document.getElementById('navbar')

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active')
    })
}

if(closed){
    closed.addEventListener('click', ()=>{
        nav.classList.remove('active')
    })
}

var iconCart = document.querySelectorAll('.fa-shopping-cart')
var body = document.querySelector('.cartTab');

console.log(iconCart)
iconCart.forEach(icon => {
    console.log(icon)
    icon.addEventListener('click', () => {
        body.classList.toggle('active')
    })
})


const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
items.addEventListener('click', e => {
    addCarrito(e)
})
const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}
 
const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}

const addCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        
        setCarro(e.target.parentElement)
    }
    e.stopPropagation()
}
const setCarro = objeto =>{
    //console.log(objeto)
    const producto ={
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }

    carrito[producto.id] = {...producto}
    console.log(carrito)
}
import { changeBalance, animateOnce } from "./functions.js";

let items = [
    { name: "1", price: 500, num: "one" },
    { name: "2", price: 800, num: "two" },
    { name: "3", price: 1200, num: "three" }
]

let balance = document.querySelector('.balance')
let cardCont = document.querySelector('.shop')

balance.innerHTML = localStorage.getItem('balance_pair')

for (let item of items) {
    let card = document.createElement('div')
    card.classList.add('card')

    let pic = document.createElement('img')
    pic.classList.add('pic')
    pic.src = '../png/card_' + item.name + '.png'
    card.appendChild(pic)

    let priceCont = document.createElement('div')
    priceCont.classList.add('price_cont')
    card.appendChild(priceCont)

    let price = document.createElement('div')
    price.classList.add('price')
    price.innerHTML = item.price
    priceCont.appendChild(price)

    let coin = document.createElement('img')
    coin.src = '../png/currency.png'
    priceCont.appendChild(coin)

    let button = document.createElement('img')
    button.src = '../png/button_buy.png'
    button.classList.add('button')
    button.dataset.item = item.name

    card.appendChild(button)

    button.onclick = () => {
        let price = Number(button.parentElement.querySelector('.price').innerHTML)

        if (Number(balance.innerHTML) <= price) {
            animateOnce('.balance', 'red')
            return
        }

        changeBalance(-price)

        localStorage.setItem(button.dataset.item + '_pair', Number(localStorage.getItem(button.dataset.item + '_pair')) + 1)
    }

    cardCont.appendChild(card)
}
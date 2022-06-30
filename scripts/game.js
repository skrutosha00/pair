import { animateOnce, changeBalance, randInt, shuffle } from "./functions.js"

let balance = document.querySelector('.balance')
let side = document.querySelector('.side')
let field = document.querySelector('.field')
let betAmount = document.querySelector('.bet_amount')
let warning = document.querySelector('.warning')

balance.innerHTML = localStorage.getItem('balance_pair')

let active = true
let bonus = false
let slotList = []

for (let i = 0; i < 3; i++) {
    let sideBlock = document.createElement('div')
    sideBlock.classList.add('side_block')

    let cardPic = document.createElement('img')
    cardPic.src = '../png/card_' + (i + 1) + '.png'

    let cfCont = document.createElement('div')
    cfCont.innerHTML = (localStorage.getItem(i + 1 + '_pair') ?? 0) + 'x'

    sideBlock.append(cardPic, cfCont)
    side.appendChild(sideBlock)

    sideBlock.onclick = () => {
        if (!Number(cfCont.innerHTML.replace('x', '')) || !active) { return }

        for (let s of document.querySelectorAll('.side_block')) {
            s.classList.remove('chosen')
        }

        bonus = i + 1
        sideBlock.classList.add('chosen')
    }
}

for (let i = 0; i < 9; i++) {
    let cardCont = document.createElement('div')
    cardCont.classList.add('card_cont')

    let closedCard = document.createElement('div')
    closedCard.classList.add('card', 'block', 'closed')

    let closedCardPic = document.createElement('img')
    closedCardPic.classList.add('hidden')
    closedCard.appendChild(closedCardPic)

    let openedCard = document.createElement('div')
    openedCard.classList.add('card', 'block', 'opened')

    let openedCardPic = document.createElement('img')
    openedCard.appendChild(openedCardPic)

    cardCont.append(openedCard, closedCard)
    field.appendChild(cardCont)
}

setSlots()

document.querySelector('.spin').onclick = () => {
    if (!active || Number(balance.innerHTML) < Number(betAmount.innerHTML) || !Number(betAmount.innerHTML)) { return }
    active = false

    changeBalance(-Number(betAmount.innerHTML))

    if (bonus) {
        for (let i = 0; i < bonus; i++) {
            document.querySelectorAll('.closed img')[i].src = '../png/slot_' + slotList[0][i] + '.png'
            slotList[1][i] = slotList[0][i]
        }

        localStorage.setItem(bonus + '_pair', Number(localStorage.getItem(bonus + '_pair')) - 1)
        document.querySelectorAll('.side_block div')[bonus - 1].innerHTML = localStorage.getItem(bonus + '_pair') + 'x'
    }

    for (let pic of document.querySelectorAll('.closed img')) {
        pic.classList.remove('hidden')
    }

    for (let closedCard of document.querySelectorAll('.closed')) {
        closedCard.classList.add('flip')
    }

    setTimeout(() => {
        gameOver()
    }, 1000);
}

document.querySelector('.again').onclick = () => {
    warning.style.left = '-50%'

    for (let sideBlock of document.querySelectorAll('.side_block')) {
        sideBlock.classList.remove('chosen')
    }
    bonus = false

    for (let pic of document.querySelectorAll('.closed img')) {
        pic.classList.add('hidden')
    }

    for (let closedCard of document.querySelectorAll('.closed')) {
        closedCard.classList.remove('flip')
    }

    setSlots()
    active = true
}

document.querySelector('.plus').onclick = () => {
    if (Number(betAmount.innerHTML) + 10 > Number(balance.innerHTML) || !active) { return }

    betAmount.innerHTML = Number(betAmount.innerHTML) + 50
}

document.querySelector('.minus').onclick = () => {
    if (!active || Number(betAmount.innerHTML) - 50 < 0) { return }

    betAmount.innerHTML = Number(betAmount.innerHTML) - 50
}

function setSlots() {
    slotList = []

    for (let type of ['.opened img', '.closed img']) {
        let rList = []

        for (let j = 0; j < 9; j++) {
            let r = randInt(1, 5)
            document.querySelectorAll(type)[j].src = '../png/slot_' + r + '.png'
            rList.push(r)
        }

        slotList.push(rList)
    }
}

function getFinalCf() {
    let match = 0
    for (let i = 0; i < 9; i++) {
        if (slotList[0][i] == slotList[1][i]) {
            match++
        }
    }

    return match * 0.75
}

function gameOver() {
    let reward = Math.round(Number(betAmount.innerHTML) * getFinalCf())

    warning.querySelector('.reward').innerHTML = Math.round(reward - Number(betAmount.innerHTML))
    warning.querySelector('.outcome').innerHTML = Math.round(reward - Number(betAmount.innerHTML) > 0) ? 'You win' : 'You lose'
    warning.style.left = '50%'

    changeBalance(reward)
    animateOnce('.balance', 'green')
}
function animateOnce(selector, animClass = 'anim') {
    for (let node of document.querySelectorAll(selector)) {
        node.classList.add(animClass)
        setTimeout(() => {
            node.classList.remove(animClass)
        }, 500);
    }
}

function changeBalance(amount) {
    let balance = document.querySelector('.balance')
    localStorage.setItem('balance_pair', Number(localStorage.getItem('balance_pair')) + amount)
    balance.innerHTML = localStorage.getItem('balance_pair')
}

function shuffle(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function randElem(arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { animateOnce, shuffle, changeBalance, randInt, randElem }
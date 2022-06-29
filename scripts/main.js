if (!localStorage.getItem('balance_pair')) {
    localStorage.setItem('balance_pair', 1500)
}

document.querySelector('.balance').innerHTML = localStorage.getItem('balance_pair')
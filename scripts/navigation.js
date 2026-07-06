const menuButton = document.querySelector('#menu');
const navElement = document.querySelector('nav');

menuButton.addEventListener('click', () => {
    navElement.classList.toggle('show');
    menuButton.classList.toggle('open');
    
    if (menuButton.classList.contains('open')) {
        menuButton.innerHTML = '&#10006;';
    } else {
        menuButton.innerHTML = '&#9776;';
    }
});
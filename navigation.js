const burgerIcon = document.querySelector('.burger-icon');
const navMenu = document.querySelector('.navigation ul');


burgerIcon.addEventListener('click', () => {
    burgerIcon.classList.toggle('active'); 
    navMenu.classList.toggle('active');   
});


document.querySelectorAll('.navigation ul li a').forEach(link => {
    link.addEventListener('click', () => {
        burgerIcon.classList.remove('active');
        navMenu.classList.remove('active');
    });
});
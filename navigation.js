// Отримуємо елементи
const burgerIcon = document.querySelector('.burger-icon');
const navMenu = document.querySelector('.navigation ul');

// Додаємо обробник події для кліку на бургер-іконку
burgerIcon.addEventListener('click', () => {
    burgerIcon.classList.toggle('active'); // Перемикаємо іконку на хрестик
    navMenu.classList.toggle('active');   // Показуємо/ховаємо меню
});

// Закриття меню при кліку на пункт
document.querySelectorAll('.navigation ul li a').forEach(link => {
    link.addEventListener('click', () => {
        burgerIcon.classList.remove('active'); // Повертаємо іконку до початкового стану
        navMenu.classList.remove('active');   // Ховаємо меню
    });
});
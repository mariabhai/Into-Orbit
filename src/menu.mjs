const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('closeBtn');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
})

closeBtn.addEventListener('click', () => {
    menu.classList.add('hidden');
})
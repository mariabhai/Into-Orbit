const cookies = document.getElementById('cookies');

window.onload = document.body.classList.add('no-scroll');

cookies.addEventListener('click', () => {
  cookies.classList.add('hidden');
  document.body.classList.remove('no-scroll');
})

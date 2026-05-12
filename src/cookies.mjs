const cookies = document.getElementById('cookies');
const acceptCookies = document.getElementById('acceptCookies')

window.onload = document.body.classList.add('no-scroll');

acceptCookies.addEventListener('click', () => {
  cookies.classList.add('hidden');
  document.body.classList.remove('no-scroll');
})

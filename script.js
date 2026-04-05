const hamburger = document.querySelector('.header__hamburger');
const drawer = document.querySelector('.drawer');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.drawer__close');

function openDrawer() {
  drawer.classList.add('is-open');
  overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
  drawer.classList.remove('is-open');
  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', openDrawer);
closeBtn.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

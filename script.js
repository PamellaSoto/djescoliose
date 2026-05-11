const nav = document.querySelector('.nav');
const menuBtn = document.querySelector('.nav__menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuClose = document.querySelector('.mobile-menu__close');
const menuOverlay = document.querySelector('.mobile-menu__overlay');
const mobileLinks = document.querySelectorAll('.mobile-menu__link');

function abrirMenu() {
  mobileMenu.classList.add('aberto');
  mobileMenu.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  menuClose.focus();
}

function fecharMenu() {
  mobileMenu.classList.remove('aberto');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  menuBtn.focus();
}

menuBtn?.addEventListener('click', abrirMenu);
menuClose?.addEventListener('click', fecharMenu);
menuOverlay?.addEventListener('click', fecharMenu);

mobileLinks.forEach(link => {
  link.addEventListener('click', fecharMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('aberto')) {
    fecharMenu();
  }
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = y;
}, { passive: true });

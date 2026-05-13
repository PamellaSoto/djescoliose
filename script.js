// ─── Nav ────────────────────────────────────────────────────────────────────

const nav       = document.querySelector(".nav");
const menuBtn   = document.querySelector(".nav__menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".mobile-menu__close");
const menuOverlay = document.querySelector(".mobile-menu__overlay");
const mobileLinks = document.querySelectorAll(".mobile-menu__link");

// ─── Mobile menu ────────────────────────────────────────────────────────────

/** Retorna todos os elementos focáveis dentro do painel do menu. */
function getFocusableEls() {
  return Array.from(
    mobileMenu.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

function abrirMenu() {
  mobileMenu.classList.add("aberto");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  menuClose.focus();
}

function fecharMenu({ returnFocus = false } = {}) {
  mobileMenu.classList.remove("aberto");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  if (returnFocus) menuBtn.focus();
}

menuBtn?.addEventListener("click", abrirMenu);
menuClose?.addEventListener("click", () => fecharMenu({ returnFocus: true }));
menuOverlay?.addEventListener("click", () => fecharMenu());

mobileLinks.forEach((link) =>
  link.addEventListener("click", () => fecharMenu({ returnFocus: false }))
);

// Fechar com Escape + trap de foco
document.addEventListener("keydown", (e) => {
  if (!mobileMenu.classList.contains("aberto")) return;

  if (e.key === "Escape") {
    fecharMenu({ returnFocus: true });
    return;
  }

  // Trap de foco dentro do menu
  if (e.key === "Tab") {
    const focusable = getFocusableEls();
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// ─── Scroll: nav background ─────────────────────────────────────────────────

window.addEventListener(
  "scroll",
  () => nav.classList.toggle("scrolled", window.scrollY > 60),
  { passive: true }
);
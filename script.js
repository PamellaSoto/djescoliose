const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".nav__menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const menuClose = document.querySelector(".mobile-menu__close");
const menuOverlay = document.querySelector(".mobile-menu__overlay");
const mobileLinks = document.querySelectorAll(".mobile-menu__link");

function abrirMenu() {
  mobileMenu.classList.add("aberto");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  menuClose.focus();
}

function fecharMenu() {
  mobileMenu.classList.remove("aberto");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  menuBtn.focus();
}

menuBtn?.addEventListener("click", abrirMenu);
menuClose?.addEventListener("click", fecharMenu);
menuOverlay?.addEventListener("click", fecharMenu);

mobileLinks.forEach((link) => {
  link.addEventListener("click", fecharMenu);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("aberto")) {
    fecharMenu();
  }
});

let lastScroll = 0;
window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    if (y > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    lastScroll = y;
  },
  { passive: true },
);

const lancamentosGrid = document.querySelector(".lancamentos__grid");

if (lancamentosGrid) {
  const desktopMedia = window.matchMedia("(min-width: 768px)");
  let isDragging = false;
  let movedDuringDrag = false;
  let startX = 0;
  let startScrollLeft = 0;
  let suppressClick = false;

  const finishDrag = (pointerId) => {
    if (!isDragging) return;
    isDragging = false;
    lancamentosGrid.classList.remove("is-dragging");
    if (
      typeof pointerId === "number" &&
      lancamentosGrid.hasPointerCapture(pointerId)
    ) {
      lancamentosGrid.releasePointerCapture(pointerId);
    }
    if (movedDuringDrag) {
      suppressClick = true;
      requestAnimationFrame(() => {
        suppressClick = false;
      });
    }
  };

  const onPointerDown = (e) => {
    if (!desktopMedia.matches) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDragging = true;
    movedDuringDrag = false;
    startX = e.clientX;
    startScrollLeft = lancamentosGrid.scrollLeft;
    lancamentosGrid.classList.add("is-dragging");
    lancamentosGrid.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging || !desktopMedia.matches) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 3) {
      movedDuringDrag = true;
    }
    lancamentosGrid.scrollLeft = startScrollLeft - deltaX;
    if (movedDuringDrag) {
      e.preventDefault();
    }
  };

  const onPointerUp = (e) => {
    finishDrag(e.pointerId);
  };

  const onPointerCancel = (e) => {
    finishDrag(e.pointerId);
  };

  const onClickCapture = (e) => {
    if (!suppressClick) return;
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragStart = (e) => {
    if (desktopMedia.matches) {
      e.preventDefault();
    }
  };

  lancamentosGrid.addEventListener("pointerdown", onPointerDown);
  lancamentosGrid.addEventListener("pointermove", onPointerMove);
  lancamentosGrid.addEventListener("pointerup", onPointerUp);
  lancamentosGrid.addEventListener("pointercancel", onPointerCancel);
  lancamentosGrid.addEventListener("click", onClickCapture, true);
  lancamentosGrid.addEventListener("dragstart", onDragStart);

  desktopMedia.addEventListener("change", (event) => {
    if (!event.matches) {
      isDragging = false;
      movedDuringDrag = false;
      lancamentosGrid.classList.remove("is-dragging");
    }
  });
}

// =========================================================
// ACTIVIDAD 2.6 · SOLARIS
// Interacciones ligeras para navegación y presentación
// =========================================================

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const printBtn = document.getElementById("printBtn");
const backToTop = document.getElementById("backToTop");
const readingProgress = document.getElementById("readingProgress");


// ---------------------------------------------------------
// Menú móvil
// ---------------------------------------------------------

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  document.body.classList.toggle("menu-open", isOpen);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});


// ---------------------------------------------------------
// Guardar / imprimir PDF
// ---------------------------------------------------------

printBtn.addEventListener("click", () => {
  window.print();
});


// ---------------------------------------------------------
// Barra de progreso y botón volver arriba
// ---------------------------------------------------------

function updateScrollUI() {
  const scrollTop =
    window.scrollY ||
    document.documentElement.scrollTop;

  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress =
    scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

  readingProgress.style.width = `${progress}%`;

  navbar.classList.toggle(
    "scrolled",
    scrollTop > 20
  );

  backToTop.classList.toggle(
    "visible",
    scrollTop > 550
  );
}

window.addEventListener(
  "scroll",
  updateScrollUI,
  { passive: true }
);

updateScrollUI();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// ---------------------------------------------------------
// Animación suave al entrar en pantalla
// ---------------------------------------------------------

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

revealElements.forEach(element => {
  revealObserver.observe(element);
});


// ---------------------------------------------------------
// Menú activo según sección visible
// ---------------------------------------------------------

const sections = [
  document.getElementById("plan"),
  document.getElementById("foda"),
  document.getElementById("implementacion"),
  document.getElementById("prompt")
].filter(Boolean);

const navAnchors =
  Array.from(
    document.querySelectorAll(".nav-links a")
  );

const sectionObserver =
  new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navAnchors.forEach(link => {
          const matches =
            link.getAttribute("href") ===
            `#${entry.target.id}`;

          link.classList.toggle(
            "active",
            matches
          );
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

sections.forEach(section => {
  sectionObserver.observe(section);
});


// ---------------------------------------------------------
// Cerrar menú si cambia el ancho de pantalla
// ---------------------------------------------------------

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

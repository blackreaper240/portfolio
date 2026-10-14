// Año del footer
document.getElementById("year").textContent = new Date().getFullYear();

// Barra de navegación con fondo al bajar
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Colores de cada tecnología: a = acento, t = acento para texto, on = texto sobre botones
const techs = {
  dart:   { a: "#0ea5c6", t: "#0b7f99", on: "#ffffff" },
  csharp: { a: "#9b4fc9", t: "#7b32a8", on: "#ffffff" },
  html:   { a: "#e5532d", t: "#c4401d", on: "#ffffff" },
  css:    { a: "#2f6df6", t: "#2556cc", on: "#ffffff" },
  js:     { a: "#f2b705", t: "#946c00", on: "#1c1840" },
};

function setTech(name) {
  const t = techs[name];
  const root = document.documentElement.style;
  root.setProperty("--accent", t.a);
  root.setProperty("--accent-text", t.t);
  root.setProperty("--on-accent", t.on);
  document.querySelectorAll(".node").forEach((n) =>
    n.classList.toggle("active", n.dataset.tech === name)
  );
}

// Efecto de escritura: cada frase usa el color de su tecnología (cambia las frases a tu gusto)
const words = [
  { text: "apps con Flutter", tech: "dart" },
  { text: "APIs con ASP.NET Core", tech: "csharp" },
  { text: "estructuras con HTML", tech: "html" },
  { text: "diseños con CSS", tech: "css" },
  { text: "interactividad con JavaScript", tech: "js" },
];
const typed = document.getElementById("typed");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

setTech(words[0].tech);
if (reduceMotion) {
  typed.textContent = words[0].text;
} else {
  let w = 0, c = 0, deleting = false;
  const tick = () => {
    const word = words[w].text;
    typed.textContent = word.slice(0, c);
    if (!deleting && c === word.length) {
      deleting = true;
      return setTimeout(tick, 1600);
    }
    if (deleting && c === 0) {
      deleting = false;
      w = (w + 1) % words.length;
      setTech(words[w].tech);
    }
    c += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 35 : 75);
  };
  tick();
}

// Aparición de tarjetas al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 80}ms`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Luz que sigue al mouse
const glow = document.querySelector(".glow");
window.addEventListener("pointermove", (e) => {
  glow.style.setProperty("--x", e.clientX + "px");
  glow.style.setProperty("--y", e.clientY + "px");
});

// Visor modal de imágenes (Lightbox)
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Captura ampliada";
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
  setTimeout(() => {
    if (!lightbox.classList.contains("active")) {
      lightboxImg.src = "";
    }
  }, 250);
}

document.querySelectorAll(".shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    const img = shot.querySelector("img");
    if (img) openLightbox(img.src, img.alt);
  });
});

if (lightbox) {
  lightbox.addEventListener("click", () => {
    closeLightbox();
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

// Prevenir cualquier desplazamiento horizontal involuntario
window.addEventListener("scroll", () => {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
}, { passive: true });
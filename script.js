// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  })
);


// Scroll reveal animations, with alternating entrance directions.
// Elements become visible again when scrolling back, so the effect works up and down.
const revealTargets = document.querySelectorAll(
  ".section-title, .hero-text, .hero-photo, .about-grid .card, .project-grid .project, .social, .contact-text, .email-link"
);
revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  if (index % 3 === 1) element.classList.add("reveal-left");
  else if (index % 3 === 2) element.classList.add("reveal-right");
  if (element.classList.contains("card") || element.classList.contains("social")) {
    element.style.transitionDelay = `${(index % 4) * 75}ms`;
  }
});
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
      else entry.target.classList.remove("is-visible");
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

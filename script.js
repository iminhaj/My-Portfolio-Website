const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.textContent = isOpen ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.textContent = "☰";
}));

// Typing effect for the hero subtitle.
const role = document.getElementById("typed-role");
const phrases = ["software development", "creative editing", "solving problems", "learning every day"];
let phraseIndex = 0, charIndex = phrases[0].length, deleting = true;
function typeRole() {
  const phrase = phrases[phraseIndex];
  role.textContent = deleting ? phrase.slice(0, charIndex--) : phrase.slice(0, charIndex++);
  let delay = deleting ? 48 : 82;
  if (!deleting && charIndex > phrase.length) {
    deleting = true; delay = 1250;
  } else if (deleting && charIndex < 0) {
    deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; charIndex = 0; delay = 250;
  }
  window.setTimeout(typeRole, delay);
}
window.setTimeout(typeRole, 1300);

// Reveal cards smoothly as they enter the viewport.
const revealTargets = document.querySelectorAll(".section-heading, .info-card, .project-card, .social-card, .contact-inner");
revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.transitionDelay = `${(index % 3) * 90}ms`;
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => observer.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add("visible"));
}

// Reading progress indicator.
const progress = document.getElementById("scroll-progress");
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// Highlight the section currently being viewed in the navigation.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.querySelectorAll("a[href^='#']").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
}

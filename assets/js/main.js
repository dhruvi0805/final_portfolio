function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initActiveNav();
  if (window.AppAnimations) {
    window.AppAnimations.initStarCanvas();
    window.AppAnimations.initRevealAnimations();
  }
});

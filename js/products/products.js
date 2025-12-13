document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.getElementById("hamburger-button");
  const navMenu = document.getElementById("nav-menu");
  const scrollIndicator = document.getElementById("scroll-indicator");

  // ----------------------------
  // Mobile Navigation Toggle
  // ----------------------------
  if (hamburgerButton && navMenu) {
    // Ensure correct initial state on mobile:
    // if you WANT it hidden by default on mobile, keep "hidden-mobile" on the nav in HTML.
    // This line is defensive in case it's missing.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      navMenu.classList.add("hidden-mobile");
      hamburgerButton.setAttribute("aria-expanded", "false");
    }

    const toggleNavMenu = () => {
      const isExpanded = hamburgerButton.getAttribute("aria-expanded") === "true";
      navMenu.classList.toggle("hidden-mobile");
      hamburgerButton.setAttribute("aria-expanded", String(!isExpanded));
    };

    hamburgerButton.addEventListener("click", toggleNavMenu);

    // Close menu when clicking a link (mobile UX)
    navMenu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      if (window.matchMedia("(max-width: 1023px)").matches) {
        navMenu.classList.add("hidden-mobile");
        hamburgerButton.setAttribute("aria-expanded", "false");
      }
    });

    // If screen resized to desktop, reset mobile hidden state
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        navMenu.classList.remove("hidden-mobile");
        hamburgerButton.setAttribute("aria-expanded", "false");
      } else {
        // keep it hidden by default on mobile resize down
        navMenu.classList.add("hidden-mobile");
        hamburgerButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ----------------------------
  // Scroll Down Indicator
  // ----------------------------
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.getElementById("nano-loans");
      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ----------------------------
  // Lazy Loading for Images (data-src)
  // ----------------------------
  const lazyImages = document.querySelectorAll(".logo-image, .app-screenshot-image");

  const loadImage = (img) => {
    const src = img.getAttribute("data-src");
    if (src) {
      img.src = src;
      img.removeAttribute("data-src");
    }
  };

  if ("IntersectionObserver" in window) {
    const imgObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadImage(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    lazyImages.forEach((img) => imgObserver.observe(img));
  } else {
    lazyImages.forEach(loadImage);
  }

  // ----------------------------
  // In-view animation: is-inview
  // ----------------------------
  const inviewTargets = document.querySelectorAll(
    ".features-list li, .steps-list li, .nano-loans-image-content"
  );

  if ("IntersectionObserver" in window) {
    const inviewObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    inviewTargets.forEach((el) => inviewObserver.observe(el));
  } else {
    inviewTargets.forEach((el) => el.classList.add("is-inview"));
  }

  // ----------------------------
  // Reveal animation: is-visible
  // ----------------------------
  const revealTargets = document.querySelectorAll(".reveal, .reveal-step");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
});

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     HERO – DESKTOP IMAGE REVEAL
  ========================================================= */
  const revealCards = document.querySelectorAll(".reveal-card");

  if ("IntersectionObserver" in window && revealCards.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    revealCards.forEach((el) => io.observe(el));
  } else {
    revealCards.forEach((el) => el.classList.add("is-inview"));
  }

  /* =========================================================
     HERO – MOBILE SLIDER
  ========================================================= */
  const slider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  const dotsWrap = document.getElementById("heroDots");
  const sliderContainer = document.querySelector(".hero-slider-container");

  const isMobileSliderMode = () =>
    window.matchMedia("(max-width: 991px)").matches;

  if (slider && slides.length && prevBtn && nextBtn && dotsWrap && sliderContainer) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    dotsWrap.innerHTML = "";
    const dots = [];

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.className = "hero-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    function updateHeroSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateHeroSlider();
      resetAutoPlay();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateHeroSlider();
      resetAutoPlay();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateHeroSlider();
      resetAutoPlay();
    }

    function startAutoPlay() {
      clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        if (!isMobileSliderMode()) return;
        nextSlide();
      }, 6000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    sliderContainer.addEventListener("mouseenter", () =>
      clearInterval(autoPlayInterval)
    );
    sliderContainer.addEventListener("mouseleave", startAutoPlay);

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    });

    updateHeroSlider();
    startAutoPlay();
  }

  /* =========================================================
     MOBILE NAVBAR HIDE ON SCROLL
  ========================================================= */
  const nav = document.querySelector("nav.navbar");
  const navMQ = window.matchMedia("(max-width: 750px)");
  let lastScrollY = window.scrollY;

  function handleNavScroll() {
    if (!nav) return;

    if (!navMQ.matches) {
      nav.classList.remove("is-hidden");
      lastScrollY = window.scrollY;
      return;
    }

    const currentY = window.scrollY;

    if (currentY <= 5) {
      nav.classList.remove("is-hidden");
    } else if (currentY > lastScrollY) {
      nav.classList.add("is-hidden");
    } else {
      nav.classList.remove("is-hidden");
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  window.addEventListener("resize", handleNavScroll);
  handleNavScroll();

  /* =========================================================
     ✅ FIXED STATS DRAWER (CTA BUTTON)
  ========================================================= */
  const toggleBtn = document.getElementById("toggle-stats-btn");
  const drawer = document.getElementById("stats-drawer");

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      // make it renderable first
      drawer.classList.remove("hidden");

      // slide in / out
      drawer.classList.toggle("active");
    });

    // close when clicking outside
    document.addEventListener("click", (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
        drawer.classList.remove("active");
      }
    });
  }

});

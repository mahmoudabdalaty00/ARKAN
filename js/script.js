document.addEventListener("DOMContentLoaded", function () {
  // Desktop reveal (3 images)
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

  // Mobile slider
  const slider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  const dotsWrap = document.getElementById("heroDots");
  const sliderContainer = document.querySelector(".hero-slider-container");

  const isMobileSliderMode = () => window.matchMedia("(max-width: 991px)").matches;

  if (slider && slides.length && prevBtn && nextBtn && dotsWrap && sliderContainer) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    dotsWrap.innerHTML = "";
    const dots = [];
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.className = "hero-dot" + (i === 0 ? " active" : "");
      dot.dataset.index = String(i);
      dot.addEventListener("click", () => goToSlide(i));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    }

    function updateHeroSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle("active", idx === currentIndex));
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
        currentIndex = (currentIndex + 1) % totalSlides;
        updateHeroSlider();
      }, 6000);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    sliderContainer.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
    sliderContainer.addEventListener("mouseleave", () => startAutoPlay());

    document.addEventListener("keydown", (e) => {
      if (!isMobileSliderMode()) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) (diff > 0 ? nextSlide() : prevSlide());
    });

    updateHeroSlider();
    startAutoPlay();
  }

  // =========================================================
  // ✅ Hide NAVBAR on scroll (mobile <= 750px)
  // Target your real navbar: <nav class="navbar ...">
  // =========================================================
  const nav = document.querySelector("nav.navbar");
  const mqNav = window.matchMedia("(max-width: 750px)");
  let lastYNav = window.scrollY;

  function handleNavScroll() {
    if (!nav) return;

    if (!mqNav.matches) {
      nav.classList.remove("is-hidden");
      lastYNav = window.scrollY;
      return;
    }

    const y = window.scrollY;

    // show at top
    if (y <= 5) {
      nav.classList.remove("is-hidden");
      lastYNav = y;
      return;
    }

    // hide when scrolling down, show when scrolling up
    if (y > lastYNav) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");

    lastYNav = y;
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  window.addEventListener("resize", handleNavScroll);
  handleNavScroll();
});

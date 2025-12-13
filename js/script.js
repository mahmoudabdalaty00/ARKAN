// ============================================
// HERO SLIDER - COMPLETE FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const slider = document.querySelector('.hero-slider');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');

    // Exit if slider doesn't exist on this page
    if (!slides.length || !slider || !prevBtn || !nextBtn) {
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // ============================================
    // UPDATE SLIDER FUNCTION
    // ============================================
    function updateHeroSlider() {
        // Move slider
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update dots
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ============================================
    // NAVIGATION FUNCTIONS
    // ============================================
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

    // ============================================
    // AUTO-PLAY FUNCTIONALITY
    // ============================================
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateHeroSlider();
        }, 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swiped left
            } else {
                prevSlide(); // Swiped right
            }
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    updateHeroSlider();
    startAutoPlay();

    // Log for debugging
    console.log('Hero slider initialized with', totalSlides, 'slides');
});






// The primary functionality (fixed positioning and the 'ping' animation)
// is handled entirely by the CSS file (styles3.css).

// JavaScript would be needed here if the "ping" needed to be toggled
// (e.g., stopping after a few seconds or starting only on certain conditions).
 
document.addEventListener('DOMContentLoaded', () => {
    const pingEffect = document.querySelector('.ping-effect');

    // Example: Stop the ping animation after 10 seconds
    setTimeout(() => {
        pingEffect.style.animation = 'none';
        // Or remove the element entirely: pingEffect.remove();
    }, 10000); 
});
 


















// ============================================
// CALL TO ACTION BUTTON - SCROLL TO Appear Section
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const pingEffect = document.querySelector('.ping-effect');
    const ctaButton = document.querySelector('.cta-button'); // The one for scrolling to #download
    
    // Elements for the new Stats Drawer functionality
    const toggleStatsBtn = document.getElementById('toggle-stats-btn');
    const statsDrawer = document.getElementById('stats-drawer');

    // --- 1. Ping Effect Stop Logic ---
    setTimeout(() => {
        if (pingEffect) {
            pingEffect.style.animation = 'none';
        }
    }, 10000);

    // --- 2. Original CTA Scroll Behavior ---
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            // Check if the click event came from the button we're using to toggle the panel
            if (e.currentTarget.id !== 'toggle-stats-btn') {
                const target = document.querySelector('#download');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
    
    // --- 3. Stats Drawer Toggle Logic (Primary Function) ---
    if (toggleStatsBtn && statsDrawer) {
        // Function to show the drawer and remove 'hidden'
        function openStatsDrawer() {
            statsDrawer.classList.remove('hidden');
            // Use a slight delay to ensure 'hidden' is removed before adding 'active'
            // which allows the CSS transition (translateX) to work.
            setTimeout(() => {
                statsDrawer.classList.add('active');
            }, 10);
        }

        // Function to hide the drawer
        function closeStatsDrawer() {
            statsDrawer.classList.remove('active');
            // Add 'hidden' after the transition finishes (0.3s)
            setTimeout(() => {
                statsDrawer.classList.add('hidden');
            }, 300); // Wait for the CSS transition (0.3s) to complete
        }
        
        // Toggle the drawer when the button is clicked
        toggleStatsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents this click from triggering the document listener immediately
            
            if (statsDrawer.classList.contains('active')) {
                closeStatsDrawer();
            } else {
                openStatsDrawer();
            }
        });

        // Close the drawer when the user clicks anywhere else on the screen
        document.addEventListener('click', (e) => {
            // Check if the click is outside the drawer AND the drawer is currently active
            if (statsDrawer.classList.contains('active') && !statsDrawer.contains(e.target) && e.target !== toggleStatsBtn) {
                closeStatsDrawer();
            }
        });
    }
});

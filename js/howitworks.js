document.addEventListener('DOMContentLoaded', () => {
    // 1. Feature Card Animation (from the How It Works section)
    const featureCards = document.querySelectorAll('.how-section .feature-card');

    if (featureCards.length > 0) {
        
        // Function to apply the animation classes
        const triggerAnimation = (elements) => {
            elements.forEach((card, index) => {
                // Set initial hidden state
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                // Animate to visible state with a staggered delay
                setTimeout(() => {
                    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200); // Staggered delay: 0ms, 200ms, 400ms, etc.
            });
        };

        // Use IntersectionObserver to start the animation when the section scrolls into view
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    // Check if the target (the first card) is intersecting
                    if (entry.isIntersecting) {
                        triggerAnimation(featureCards);
                        obs.unobserve(entry.target); // Stop observing once animated
                    }
                });
            }, { 
                threshold: 0.1 // Trigger when 10% of the target is visible
            });
            
            // Observe the first feature card
            observer.observe(featureCards[0]);
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            triggerAnimation(featureCards);
        }
    }


    // 2. Hero Slider Logic (using the classes from the Hero section)
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    let currentSlide = 0;
    let slideInterval;

    if (heroSlider && slides.length > 0) {
        
        const goToSlide = (index) => {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }

            heroSlider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const prevSlide = () => {
            goToSlide(currentSlide - 1);
        };

        // Event Listeners for navigation
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                goToSlide(index);
                resetInterval();
            });
        });

        // Auto-slide functionality
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        // Start the automatic slideshow
        startInterval();
    }


    // 3. Testimonials Slider (basic logic, assuming horizontal scroll)
    const sliderTrack = document.querySelector('.slider-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const tPrevBtn = document.getElementById('prevBtn');
    const tNextBtn = document.getElementById('nextBtn');
    let currentTestimonialIndex = 0;

    if (sliderTrack && testimonialCards.length > 0 && tPrevBtn && tNextBtn) {
        
        const updateTestimonialSlider = () => {
            const cardWidth = testimonialCards[0].offsetWidth; // Get the width of one card
            // Calculate the amount to shift the track
            sliderTrack.style.transform = `translateX(-${currentTestimonialIndex * cardWidth}px)`;
        };

        tNextBtn.addEventListener('click', () => {
            if (currentTestimonialIndex < testimonialCards.length - 1) {
                currentTestimonialIndex++;
            } else {
                currentTestimonialIndex = 0; // Loop back to the start
            }
            updateTestimonialSlider();
        });

        tPrevBtn.addEventListener('click', () => {
            if (currentTestimonialIndex > 0) {
                currentTestimonialIndex--;
            } else {
                currentTestimonialIndex = testimonialCards.length - 1; // Loop back to the end
            }
            updateTestimonialSlider();
        });

        // Recalculate position on window resize
        window.addEventListener('resize', updateTestimonialSlider);
    }
});


 
// TESTIMONIALS SECTION - Staggered Reveal on Scroll
const track = document.querySelector(".slider-track");
const cards = document.querySelectorAll(".testimonial-card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
const visibleCards = 3;

function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 32;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    
    // Update button visibility
    updateButtonVisibility();
}

function updateButtonVisibility() {
    // Hide prev button if at start
    if (index === 0) {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
    } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
    }
    
    // Hide next button if at end
    if (index >= cards.length - visibleCards) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
    } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
    }
}

nextBtn.addEventListener("click", () => {
    if (index < cards.length - visibleCards) {
        index++;
        updateSlider();
    }
});

prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        updateSlider();
    }
});

// Stagger fade-in when section enters view
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.classList.add("show");
            }, i * 200);
        });
        observer.disconnect();
    }
}, { threshold: 0.3 });

observer.observe(document.querySelector("#testimonials"));

// Initialize button visibility
updateButtonVisibility();

// Handle window resize
window.addEventListener("resize", () => {
    updateSlider();
});


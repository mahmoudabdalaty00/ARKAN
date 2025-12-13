document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-menu');
    const scrollIndicator = document.getElementById('scroll-indicator');

    // --- Mobile Navigation Toggle ---
    if (hamburgerButton && navMenu) {
        // Function to toggle the navigation menu visibility
        function toggleNavMenu() {
            const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';

            // Toggle visibility by removing/adding the 'hidden-mobile' class (which uses display: none)
            // Note: On large screens (lg+), the CSS forces nav-menu to display: block!important, overriding this.
            navMenu.classList.toggle('hidden-mobile'); 
            
            // Update ARIA attributes
            hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        }

        // Event listener for the hamburger button
        hamburgerButton.addEventListener('click', toggleNavMenu);
    }
    
    // --- Scroll Down Indicator Functionality ---
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Scroll to the next logical section after the hero (Nano Loans section)
            const targetSection = document.getElementById('nano-loans');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Simple Lazy Loading for Images (mimicking a Gatsby-like behavior with data-src) ---
    const lazyImages = document.querySelectorAll('.logo-image, .app-screenshot-image');

    const loadImage = (image) => {
        if (image.dataset.src) {
            image.src = image.dataset.src;
            // Optionally remove the data-src attribute after loading
            image.removeAttribute('data-src');
        }
    };

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // load when 10% visible
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(loadImage);
    }

    // Note: Complex Tailwind/Gatsby animations and detailed image loading logic are simplified/omitted.
});


 
  // Add "is-inview" when elements enter viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-inview");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(
    ".features-list li, .steps-list li, .nano-loans-image-content"
  ).forEach((el) => observer.observe(el));
 
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".reveal, .reveal-step");

  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.2 });

  targets.forEach(el => io.observe(el));
});

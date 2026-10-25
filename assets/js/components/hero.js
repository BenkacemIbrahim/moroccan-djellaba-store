// Button Actions
    function exploreCollection() {
      console.log('Exploring collection...');
      // Add smooth scroll to products section or redirect to catalog
      // window.location.href = '#products';
    }

    // Smooth scroll for scroll indicator
    document.querySelector('.scroll-indicator').addEventListener('click', function () {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });

    // Add parallax effect to decorative pattern
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      const pattern = document.querySelector('.decorative-pattern');
      if (pattern) {
        pattern.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.1}deg)`;
      }
    });

    // Initialize animations on load
    document.addEventListener('DOMContentLoaded', function () {
      console.log('Premium Moroccan Jellaba Hero Page Loaded');
    });

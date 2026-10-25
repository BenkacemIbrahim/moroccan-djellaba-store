// The footer is rendered both by the home page (at the project root) and by the
// standalone component preview (one folder deeper), so every link and asset is
// resolved from the location of this script instead of being hard-coded.
const FOOTER_ROOT = (function () {
    const script = document.querySelector('script[src$="js/components/footer.js"]');
    const src = script ? script.getAttribute('src') : '';
    return src.replace(/assets\/js\/components\/footer\.js.*$/, '');
})();

// Footer content data with women's djellaba focus
const footerContent = {
    block1: `
      <!-- Logo Image from Header (Same as header logo) -->
      <div class="logo-container">
         <a href="${FOOTER_ROOT}index.html"> <img src="${FOOTER_ROOT}assets/images/logo.png" alt="Moroccan Djellaba Shop Logo" class="logo-image-footer"></a>
      </div>
      
      <h2 class="text-xl font-semibold logo-text mb-4 playfair">
          Women's Djellaba Collection
      </h2>
      
      <p class="text-gray-400 leading-relaxed mb-4 inter text-sm">
          Exquisite women's djellabas crafted with traditional Moroccan artistry. 
          Elegant designs that celebrate feminine grace and cultural heritage.
      </p>
      
      <div class="text-sm text-gray-500 inter">
          <span class="text-custom-gold">Established 2015</span> • Authentic Moroccan Fashion
      </div>
  `,
    block2: `
      <h3 class="text-lg font-medium mb-4 text-custom-gold inter">Quick Links</h3>
      <ul class="space-y-2 text-sm">
          <li>
              <a href="${FOOTER_ROOT}index.html" class="footer-link inter">
                  <i class="fas fa-home mr-3 text-custom-gold"></i>
                  Home 
              </a>
          </li>
          <li>
              <a href="${FOOTER_ROOT}pages/products.html" class="footer-link inter">
                  <i class="fas fa-box mr-3 text-custom-gold"></i>
                 Women's Collection  
              </a>
          </li>
          <li>
              <a href="#" class="footer-link inter">
                  <i class="fas fa-users mr-3 text-custom-gold"></i>
                About Us
              </a>
          </li>
          <li>
              <a href="${FOOTER_ROOT}pages/contact.html" class="footer-link inter">
                  <i class="fas fa-envelope mr-3 text-custom-gold"></i>
                   Contact Us
              </a>
          </li>
          <li>
              <a href="#" class="footer-link inter">
                  <i class="fas fa-shield-alt mr-3 text-custom-gold"></i>
                  Privacy & Policy 
              </a>
          </li>
      </ul>
  `,
    block3: `
      <h3 class="text-lg font-medium mb-4 text-custom-gold inter">Contact</h3>
      <div class="space-y-2 text-sm text-gray-400 mb-6">
          <div class="contact-info inter">
              <i class="fas fa-envelope"></i>
              your-email@gmail.com
          </div>
          <div class="contact-info inter">
              <i class="fas fa-phone-alt"></i>
              +212 (Your number)
          </div>
          <div class="contact-info inter">
              <i class="fas fa-clock"></i>
              Mon-Fri: 9AM-6PM (your time)
          </div>
      </div>
      
      <!-- App Store and Google Play Store Buttons - FIXED TEXT ALIGNMENT -->
      <div class="store-buttons">
          <!-- App Store Button -->
          <a href="#" class="store-btn">
              <svg class="store-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="white"/>
              </svg>
              <div class="store-text">
                  <span class="store-text-top">Download on the</span>
                  <span class="store-text-bottom">App Store</span>
              </div>
          </a>
          
          <!-- Google Play Store Button -->
          <a href="#" class="store-btn">
              <svg class="store-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186C2.807 21.908 2.25 21.133 2.25 20.25V3.75C2.25 2.867 2.807 2.092 3.609 1.814Z" fill="#4285F4"/>
                  <path d="M14.902 13.112L3.609 22.186C3.893 22.327 4.214 22.406 4.55 22.406C5.101 22.406 5.621 22.222 6.038 21.896L17.952 14.918L14.902 13.112Z" fill="#34A853"/>
                  <path d="M19.95 12C19.95 11.532 19.827 11.089 19.611 10.703L14.902 13.112L17.952 14.918L19.611 13.297C19.827 12.911 19.95 12.468 19.95 12Z" fill="#FBBC04"/>
                  <path d="M3.609 1.814C3.893 1.673 4.214 1.594 4.55 1.594C5.101 1.594 5.621 1.778 6.038 2.104L17.952 9.082L14.902 10.888L3.609 1.814Z" fill="#EA4335"/>
              </svg>
              <div class="store-text">
                  <span class="store-text-top">GET IT ON</span>
                  <span class="store-text-bottom">Google Play</span>
              </div>
          </a>
      </div>
      
      <!-- Social Media -->
      <div class="flex space-x-3">
          <a href="#facebooklink" class="footer-social-icon" aria-label="Facebook">
              <i class="fab fa-facebook-f text-sm"></i>
          </a>
          <a href="#instagramlink" class="footer-social-icon" aria-label="Instagram">
              <i class="fab fa-instagram text-sm"></i>
          </a>
          <a href="#whatssaplink" class="footer-social-icon" aria-label="WhatsApp">
              <i class="fab fa-whatsapp text-sm"></i>
          </a>
          <a href="#emaillink" class="footer-social-icon" aria-label="Email">
              <i class="fas fa-envelope text-sm"></i>
          </a>
      </div>
  `,
    bottom: `
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-sm text-gray-500 inter">
              © 2025 Djellaba Shop. All rights reserved.
          </div>
          
          <div class="flex space-x-6 text-sm">
              <a href="#" class="footer-link inter">Privacy</a>
              <a href="#" class="footer-link inter">Terms</a>
              <a href="${FOOTER_ROOT}pages/contact.html" class="footer-link inter">Support</a>
          </div>
      </div>
      
      <!-- Payment Methods -->
      <div class="mt-6 flex items-center justify-center md:justify-end space-x-4">
          <span class="text-xs text-gray-500 inter">Secure Payment:</span>
          <div class="flex items-center space-x-3">
              <i class="fab fa-cc-visa text-gray-400"></i>
              <i class="fab fa-cc-mastercard text-gray-400"></i>
              <i class="fab fa-cc-paypal text-gray-400"></i>
          </div>
      </div>
  `
};

// Load footer content
function loadFooterContent() {
    // Load footer blocks with staggered animation
    setTimeout(() => {
        const block1 = document.getElementById('footer-block-1');
        if (block1) {
            block1.innerHTML = footerContent.block1;
            block1.classList.remove('loading');
            block1.classList.add('show');
        }
    }, 200);

    setTimeout(() => {
        const block2 = document.getElementById('footer-block-2');
        if (block2) {
            block2.innerHTML = footerContent.block2;
            block2.classList.remove('loading');
            block2.classList.add('show');
        }
    }, 400);

    setTimeout(() => {
        const block3 = document.getElementById('footer-block-3');
        if (block3) {
            block3.innerHTML = footerContent.block3;
            block3.classList.remove('loading');
            block3.classList.add('show');
        }
    }, 600);

    setTimeout(() => {
        const footerBottom = document.getElementById('footer-bottom');
        if (footerBottom) {
            footerBottom.innerHTML = footerContent.bottom;
            footerBottom.classList.remove('loading');
            footerBottom.classList.add('show');
        }
    }, 800);

    // Add event listeners to footer links
    setTimeout(() => {
        addFooterEventListeners();
    }, 1000);
}

// Links that point at a real page must be allowed to navigate, only the
// placeholder targets are neutralised.
function addFooterEventListeners() {
    const selectors = ['.footer-link', '.footer-social-icon', '.store-btn'];
    selectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((link) => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (event) => event.preventDefault());
            }
        });
    });
}

// Initialize footer with intersection observer
document.addEventListener('DOMContentLoaded', function () {
    const footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Auto-load footer content after 2 seconds for demo
                setTimeout(() => {
                    loadFooterContent();
                }, 2000);
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const footer = document.querySelector('.footer-section');
    if (footer) {
        footerObserver.observe(footer);
    }
});

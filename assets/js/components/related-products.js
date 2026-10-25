let currentCarouselPosition = 0;

    function scrollCarousel(direction) {
      const carousel = document.getElementById('products-carousel');
      const cardWidth = 220; // Card width + gap
      const visibleCards = Math.floor(carousel.parentElement.offsetWidth / cardWidth);
      const totalCards = carousel.children.length;
      const maxPosition = Math.max(0, totalCards - visibleCards);

      if (direction === 'next' && currentCarouselPosition < maxPosition) {
        currentCarouselPosition++;
      } else if (direction === 'prev' && currentCarouselPosition > 0) {
        currentCarouselPosition--;
      }

      const translateX = -currentCarouselPosition * cardWidth;
      carousel.style.transform = `translateX(${translateX}px)`;

      updateCarouselButtons();
    }

    function updateCarouselButtons() {
      const carousel = document.getElementById('products-carousel');
      const prevBtn = document.getElementById('carousel-prev');
      const nextBtn = document.getElementById('carousel-next');

      if (!carousel || !prevBtn || !nextBtn) return;

      const cardWidth = 220;
      const visibleCards = Math.floor(carousel.parentElement.offsetWidth / cardWidth);
      const totalCards = carousel.children.length;
      const maxPosition = Math.max(0, totalCards - visibleCards);

      prevBtn.disabled = currentCarouselPosition <= 0;
      nextBtn.disabled = currentCarouselPosition >= maxPosition;
    }

    function addToCartFromCard(event, productName) {
      event.stopPropagation();
      showAlert(`${productName} added to cart!`, 'success');
    }

    function toggleWishlistCard(event, element) {
      event.stopPropagation();
      const icon = element.querySelector('i');
      const isActive = element.classList.contains('active');

      if (isActive) {
        element.classList.remove('active');
        icon.classList.remove('fas');
        icon.classList.add('far');
        showAlert('Removed from wishlist', 'success');
      } else {
        element.classList.add('active');
        icon.classList.remove('far');
        icon.classList.add('fas');
        showAlert('Added to wishlist!', 'success');
      }
    }

    function quickViewProduct(event, productName) {
      event.stopPropagation();
      showAlert(`Quick view for ${productName} - Opening product preview...`, 'success');
    }

    let currentAlertTimeout = null;
    function showAlert(message, type = 'success') {
      const alertContainer = document.getElementById('alert-container');

      // Remove existing alert
      const existingAlert = alertContainer.querySelector('.alert-message');
      if (existingAlert) {
        if (existingAlert.parentNode) {
          existingAlert.parentNode.removeChild(existingAlert);
        }
      }
      if (currentAlertTimeout) {
        clearTimeout(currentAlertTimeout);
        currentAlertTimeout = null;
      }

      const alertDiv = document.createElement('div');
      alertDiv.className = `alert-message ${type}`;

      alertDiv.innerHTML = `
                <div class="alert-icon">
                    <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'}"></i>
                </div>
                <div class="alert-text">${message}</div>
                <button class="alert-close" onclick="closeAlert(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;

      alertContainer.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.add('show');
      }, 100);

      currentAlertTimeout = setTimeout(() => {
        closeAlert(alertDiv.querySelector('.alert-close'));
      }, 4000);
    }

    function closeAlert(closeButton) {
      let alertDiv;
      if (closeButton.classList.contains('alert-close')) {
        alertDiv = closeButton.closest('.alert-message');
      } else {
        alertDiv = closeButton;
      }
      if (!alertDiv) return;

      alertDiv.classList.remove('show');
      setTimeout(() => {
        if (alertDiv.parentNode) {
          alertDiv.parentNode.removeChild(alertDiv);
        }
      }, 400);

      if (currentAlertTimeout) {
        clearTimeout(currentAlertTimeout);
        currentAlertTimeout = null;
      }
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function () {
      updateCarouselButtons();
    });

    // Update buttons on window resize
    window.addEventListener('resize', function () {
      updateCarouselButtons();
    });

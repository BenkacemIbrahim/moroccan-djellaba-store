// Modal state variables
    let modalCurrentImageIndex = 0;
    let modalSelectedColor = 'Brown';
    let modalSelectedSizes = [];

    // Modal image functions
    function getModalProductImages() {
      const imageContainer = document.getElementById('modal-product-images');
      const images = imageContainer.querySelectorAll('img');
      const imageArray = [];

      images.forEach(img => {
        imageArray.push({
          index: parseInt(img.getAttribute('data-index')),
          src: img.src,
          alt: img.alt
        });
      });

      return imageArray.sort((a, b) => a.index - b.index);
    }

    function modalChangeMainImage(index) {
      const mainImage = document.getElementById('modal-main-gallery');
      const thumbnails = document.querySelectorAll('#modal-thumbnails .thumbnail-item');
      const productImages = getModalProductImages();

      if (!mainImage || !productImages[index]) return;

      modalCurrentImageIndex = index;
      mainImage.style.backgroundImage = `url('${productImages[index].src}')`;

      thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }

    function modalNextImage(event) {
      if (event) event.stopPropagation();
      const productImages = getModalProductImages();
      const nextIndex = (modalCurrentImageIndex + 1) % productImages.length;
      modalChangeMainImage(nextIndex);
    }

    function modalPrevImage(event) {
      if (event) event.stopPropagation();
      const productImages = getModalProductImages();
      const prevIndex = (modalCurrentImageIndex - 1 + productImages.length) % productImages.length;
      modalChangeMainImage(prevIndex);
    }

    function openModalImageZoom() {
      // Modal image zoom functionality would be implemented here
      console.log('Modal image zoom clicked');
    }

    // Size selection
    function modalToggleSize(element, size) {
      const isSelected = element.classList.contains('active');

      if (isSelected) {
        element.classList.remove('active');
        modalSelectedSizes = modalSelectedSizes.filter(s => s !== size);
      } else {
        element.classList.add('active');
        modalSelectedSizes.push(size);
      }
    }

    // Color selection
    function modalToggleColorDropdown() {
      const dropdown = document.getElementById('modal-color-dropdown');
      dropdown.classList.toggle('active');
      event.stopPropagation();
    }

    function modalSelectColor(color, colorClass) {
      document.querySelectorAll('.modal-color-option-item').forEach(item => {
        item.classList.remove('selected');
      });

      const clickedItem = event.currentTarget || event.target.closest('.modal-color-option-item');
      if (clickedItem) {
        clickedItem.classList.add('selected');
      }

      document.getElementById('modal-selected-color').textContent = color;
      const selectedColorCircle = document.getElementById('modal-selected-color-circle');
      selectedColorCircle.className = `modal-color-circle ${colorClass}`;

      modalSelectedColor = color;

      const dropdown = document.getElementById('modal-color-dropdown');
      dropdown.classList.remove('active');

      if (event) {
        event.stopPropagation();
      }
    }

    // Quantity functions
    function modalDecreaseQuantity() {
      let quantityInput = document.getElementById('modal-quantity');
      let quantity = parseInt(quantityInput.value);
      if (quantity > 1) {
        quantityInput.value = quantity - 1;
      }
    }

    function modalIncreaseQuantity() {
      let quantityInput = document.getElementById('modal-quantity');
      let quantity = parseInt(quantityInput.value);
      quantityInput.value = quantity + 1;
    }

    // Action functions
    function modalAddToCart() {
      if (modalSelectedSizes.length === 0) {
        showAlert('Please select a size before adding to cart', 'error');
        return;
      }

      showAlert('Product added to cart successfully!', 'success');
    }

    function modalBuyNow() {
      if (modalSelectedSizes.length === 0) {
        showAlert('Please select a size before proceeding to checkout', 'error');
        return;
      }

      showAlert('Redirecting to WhatsApp for instant purchase...', 'success');
    }

    // Share functions
    function modalShareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent('Premium Royal Heritage Djelaba');
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    }

    function modalShareOnInstagram() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showAlert('Link copied! Share it on Instagram', 'success');
      });
    }

    function modalShareOnWhatsApp() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Check out this Premium Royal Heritage Djelaba!');
      window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    }

    function modalShareOnPinterest() {
      const url = encodeURIComponent(window.location.href);
      const description = encodeURIComponent('Premium Royal Heritage Djelaba - Moroccan Traditional Fashion');
      const media = encodeURIComponent('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crepe-djellaba-with-kmiss.jpg-3sqclnMfJoAvDUXFLMGCvHsoxsSBuL.jpeg');
      window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${media}`, '_blank', 'width=600,height=400');
    }

    // Modal control functions
    function openQuickView(event) {
      if (event) {
        event.stopPropagation();
      }
      const modal = document.getElementById('quickViewModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Reset modal state
      modalCurrentImageIndex = 0;
      modalSelectedSizes = [];
      modalSelectedColor = 'Brown';
      modalChangeMainImage(0);

      // Reset quantity
      document.getElementById('modal-quantity').value = '1';
    }

    function closeQuickView() {
      const modal = document.getElementById('quickViewModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    // Alert system
    let currentAlertTimeout = null;
    function showAlert(message, type = 'success') {
      const alertContainer = document.getElementById('alert-container');

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

    // Event listeners
    document.getElementById('quickViewModal').addEventListener('click', function (e) {
      if (e.target === this) {
        closeQuickView();
      }
    });

    document.getElementById('quickViewClose').addEventListener('click', function (e) {
      closeQuickView();
    });

    document.addEventListener('click', function (event) {
      const modalDropdown = document.getElementById('modal-color-dropdown');
      if (modalDropdown && !modalDropdown.contains(event.target)) {
        modalDropdown.classList.remove('active');
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (event) {
      const modal = document.getElementById('quickViewModal');
      if (modal.classList.contains('active')) {
        if (event.key === 'Escape') {
          closeQuickView();
        } else if (event.key === 'ArrowLeft') {
          modalPrevImage();
        } else if (event.key === 'ArrowRight') {
          modalNextImage();
        }
      }
    });

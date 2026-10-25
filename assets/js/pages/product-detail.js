function getProductImages() {
        const imageContainer = document.getElementById('product-images');
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

      let selectedColor = 'Brown';
      let selectedSizes = [];
      let isWishlisted = false;
      let countdownInterval;
      let currentImageIndex = 0;
      let currentRating = 0;
      let selectedReviewItems = [];
      let isSubmittingReview = false;

      function handleImageLoad(img) {
        img.classList.remove('loading');
        img.classList.add('loaded');
      }

      function handleImageError(img) {
        img.classList.remove('loading');
        img.style.backgroundColor = '#f8f9fa';
        img.style.minHeight = '400px';
      }

      function showContent() {
        const skeletonLoader = document.getElementById('skeleton-loader');
        const skeletonBanner = document.getElementById('skeleton-banner');
        const mainContent = document.getElementById('main-content');
        const offerBanner = document.getElementById('offer-banner');

        skeletonLoader.style.display = 'none';
        skeletonBanner.style.display = 'none';
        mainContent.classList.add('loaded');
        offerBanner.classList.add('loaded');
      }

      document.addEventListener('DOMContentLoaded', function () {
        initializeEnhancedReviewSystem();
        setTimeout(() => {
          showContent();
        }, 3000);
        startCountdown();
      });

      function initializeEnhancedReviewSystem() {
        const starContainer = document.getElementById('review-star-rating');
        const reviewText = document.getElementById('review-text');
        const uploadInput = document.getElementById('review-image-upload');

        starContainer.addEventListener('mouseover', (event) => {
          const hoveredStar = event.target.closest('i');
          if (hoveredStar && hoveredStar.dataset.value) {
            const value = parseInt(hoveredStar.dataset.value);
            updateStars(value, false);
            updateRatingFeedback(value);
          }
        });

        starContainer.addEventListener('mouseout', () => {
          updateStars(currentRating, true);
          updateRatingFeedback(currentRating);
        });

        starContainer.addEventListener('click', (event) => {
          const clickedStar = event.target.closest('i');
          if (clickedStar && clickedStar.dataset.value) {
            currentRating = parseInt(clickedStar.dataset.value);
            document.getElementById('selected-rating').value = currentRating;
            updateStars(currentRating, true);
            updateRatingFeedback(currentRating);
            updateFormProgress();

            clickedStar.style.transform = 'scale(1.3)';
            setTimeout(() => {
              clickedStar.style.transform = 'scale(1)';
            }, 200);
          }
        });

        reviewText.addEventListener('input', (event) => {
          updateCharacterCounter(event.target.value.length);
          updateFormProgress();
        });

        const reviewItemsContainer = document.getElementById('review-items-selection');
        reviewItemsContainer.addEventListener('click', (event) => {
          const clickedButton = event.target.closest('.review-item-tag');
          if (clickedButton) {
            const item = clickedButton.dataset.item;
            const isSelected = clickedButton.classList.contains('selected');

            if (isSelected) {
              clickedButton.classList.remove('selected');
              selectedReviewItems = selectedReviewItems.filter(i => i !== item);
            } else {
              clickedButton.classList.add('selected');
              selectedReviewItems.push(item);
            }
            updateFormProgress();
          }
        });

        uploadInput.addEventListener('change', (event) => {
          handleFileUpload(event.target.files[0]);
          updateFormProgress();
        });
      }

      function updateStars(rating, permanent) {
        const starContainer = document.getElementById('review-star-rating');
        starContainer.querySelectorAll('i').forEach((star, index) => {
          const starValue = index + 1;
          if (starValue <= rating) {
            star.classList.remove('far', 'text-gray-400');
            star.classList.add('fas', 'text-yellow-400');
          } else {
            star.classList.remove('fas', 'text-yellow-400');
            star.classList.add('far', 'text-gray-400');
          }
        });
      }

      function updateRatingFeedback(rating) {
        const feedback = document.getElementById('rating-feedback');
        const messages = {
          0: 'Please select a rating',
          1: 'Poor - We\'ll work to improve',
          2: 'Fair - Tell us how to do better',
          3: 'Good - Thank you for your feedback',
          4: 'Great - We\'re glad you enjoyed it!',
          5: 'Excellent - You made our day! 🌟'
        };

        feedback.textContent = messages[rating] || messages[0];
        feedback.className = `text-sm text-center mt-2 font-medium ${rating >= 4 ? 'text-green-600' : rating >= 3 ? 'text-blue-600' : rating >= 1 ? 'text-orange-600' : 'text-gray-600'}`;
      }

      function updateCharacterCounter(length) {
        const charCount = document.querySelector('.char-count');
        const charStatus = document.getElementById('char-status');

        charCount.textContent = `${length} / 500 characters`;

        if (length === 0) {
          charStatus.textContent = 'Share your thoughts...';
          charStatus.className = 'char-limit';
        } else if (length < 50) {
          charStatus.textContent = 'Tell us more!';
          charStatus.className = 'char-limit';
        } else if (length < 200) {
          charStatus.textContent = 'Great detail!';
          charStatus.className = 'char-limit';
        } else if (length < 450) {
          charStatus.textContent = 'Perfect length!';
          charStatus.className = 'char-limit';
        } else if (length < 500) {
          charStatus.textContent = 'Almost at limit';
          charStatus.className = 'char-warning';
        } else {
          charStatus.textContent = 'Character limit reached';
          charStatus.className = 'char-warning';
        }
      }

      function handleFileUpload(file) {
        if (!file) return;

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          showAlert('File size must be less than 5MB', 'error');
          return;
        }

        if (!file.type.startsWith('image/')) {
          showAlert('Please upload an image file', 'error');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = document.getElementById('image-preview');
          const previewImg = document.getElementById('preview-img');
          const previewFilename = document.getElementById('preview-filename');
          const previewFilesize = document.getElementById('preview-filesize');

          previewImg.src = e.target.result;
          previewFilename.textContent = file.name;
          previewFilesize.textContent = formatFileSize(file.size);

          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }

      function removeImagePreview() {
        const preview = document.getElementById('image-preview');
        const uploadInput = document.getElementById('review-image-upload');

        preview.style.display = 'none';
        uploadInput.value = '';
        updateFormProgress();
      }

      function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      }

      function updateFormProgress() {
        const rating = currentRating;
        const reviewText = document.getElementById('review-text').value.trim();
        const hasImage = document.getElementById('image-preview').style.display !== 'none';
        const hasReviewItems = selectedReviewItems.length > 0;

        let progress = 0;

        if (rating > 0) progress += 40;
        if (reviewText.length >= 10) progress += 40;
        if (hasReviewItems) progress += 10;
        if (hasImage) progress += 10;

        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        progressFill.style.width = progress + '%';
        progressText.textContent = progress + '%';

        const submitBtn = document.getElementById('submit-review-btn');
        const buttonText = submitBtn.querySelector('.button-text');

        if (progress >= 80) {
          buttonText.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Post Review';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        } else {
          buttonText.innerHTML = '<i class="fas fa-edit mr-2"></i>Complete Form';
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.6';
        }
      }

      function postReview() {
        if (isSubmittingReview) return;

        const rating = document.getElementById('selected-rating').value;
        const reviewText = document.getElementById('review-text').value.trim();
        const uploadedFile = document.getElementById('review-image-upload').files[0];

        if (rating === '0') {
          showAlert('Please select a rating', 'error');
          return;
        }

        if (reviewText.length < 10) {
          showAlert('Please write at least 10 characters in your review', 'error');
          return;
        }

        isSubmittingReview = true;
        const submitBtn = document.getElementById('submit-review-btn');
        const buttonText = submitBtn.querySelector('.button-text');

        buttonText.innerHTML = '<span class="loading-spinner"></span>Posting Review...';
        submitBtn.disabled = true;

        setTimeout(() => {
          showSuccessAnimation();

          setTimeout(() => {
            resetReviewForm();
            closeReviewPanel();
            showAlert('Your review has been posted successfully! Thank you for your feedback.', 'success');
            isSubmittingReview = false;
          }, 1500);

        }, 2000);
      }

      function showSuccessAnimation() {
        const successAnimation = document.getElementById('success-animation');
        successAnimation.style.display = 'block';

        setTimeout(() => {
          successAnimation.style.display = 'none';
        }, 1500);
      }

      function resetReviewForm() {
        currentRating = 0;
        document.getElementById('selected-rating').value = '0';
        updateStars(0, true);
        updateRatingFeedback(0);

        document.getElementById('review-text').value = '';
        updateCharacterCounter(0);

        selectedReviewItems = [];
        document.querySelectorAll('.review-item-tag').forEach(tag => tag.classList.remove('selected'));

        removeImagePreview();
        updateFormProgress();

        const submitBtn = document.getElementById('submit-review-btn');
        const buttonText = submitBtn.querySelector('.button-text');
        buttonText.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Complete Form';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }

      function startCountdown() {
        let hours = 12;
        let minutes = 34;
        let seconds = 56;

        countdownInterval = setInterval(() => {
          seconds--;

          if (seconds < 0) {
            seconds = 59;
            minutes--;

            if (minutes < 0) {
              minutes = 59;
              hours--;

              if (hours < 0) {
                hours = 12;
                minutes = 34;
                seconds = 56;
              }
            }
          }

          document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
          document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
          document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
      }

      function changeMainImage(index) {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        const productImages = getProductImages();

        if (!mainImage || !productImages[index]) return;

        mainImage.classList.add('transitioning');
        currentImageIndex = index;

        setTimeout(() => {
          mainImage.src = productImages[index].src;
          mainImage.alt = productImages[index].alt;

          mainImage.onload = () => {
            mainImage.classList.remove('transitioning');
          };
        }, 200);

        thumbnails.forEach((thumb, i) => {
          thumb.classList.toggle('active', i === index);
        });
      }

      function openImageZoom() {
        // Image zoom functionality would be implemented here
      }

      function toggleSize(element, size) {
        const isSelected = element.classList.contains('selected');

        if (isSelected) {
          element.classList.remove('selected');
          selectedSizes = selectedSizes.filter(s => s !== size);
        } else {
          element.classList.add('selected');
          selectedSizes.push(size);
        }
      }

      function toggleColorDropdown() {
        const dropdown = document.getElementById('color-dropdown');
        dropdown.classList.toggle('active');
        event.stopPropagation();
      }

      function decreaseQuantity() {
        let quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
          quantityInput.value = quantity - 1;
        }
      }

      function increaseQuantity() {
        let quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
      }

      function selectColor(color, colorClass) {
        document.querySelectorAll('.color-option-item').forEach(item => {
          item.classList.remove('selected');
        });

        const clickedItem = event.currentTarget || event.target.closest('.color-option-item');
        if (clickedItem) {
          clickedItem.classList.add('selected');
        }

        document.getElementById('selected-color').textContent = color;
        const selectedColorCircle = document.getElementById('selected-color-circle');
        selectedColorCircle.className = `color-circle ${colorClass}`;

        selectedColor = color;

        const dropdown = document.getElementById('color-dropdown');
        dropdown.classList.remove('active');

        if (event) {
          event.stopPropagation();
        }
      }

      function toggleWishlist() {
        const wishlistBtn = document.getElementById('wishlist-btn');
        const wishlistIcon = document.getElementById('wishlist-icon');

        isWishlisted = !isWishlisted;

        if (isWishlisted) {
          wishlistBtn.classList.add('active');
          wishlistIcon.classList.remove('far');
          wishlistIcon.classList.add('fas');
          showAlert('Added to wishlist!', 'success');
        } else {
          wishlistBtn.classList.remove('active');
          wishlistIcon.classList.remove('fas');
          wishlistIcon.classList.add('far');
          showAlert('Removed from wishlist', 'success');
        }
      }

      function nextImage(event) {
        if (event) {
          event.stopPropagation();
        }
        const productImages = getProductImages();
        const nextIndex = (currentImageIndex + 1) % productImages.length;
        changeMainImage(nextIndex);
      }

      function prevImage(event) {
        if (event) {
          event.stopPropagation();
        }
        const productImages = getProductImages();
        const prevIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
        changeMainImage(prevIndex);
      }

      document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'ArrowRight') {
          nextImage();
        }
      });

      function toggleHelpful(button) {
        const isVoted = button.classList.contains('voted');

        if (isVoted) {
          button.classList.remove('voted');
        } else {
          button.classList.add('voted');
        }
      }

      function shareOnFacebook() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Premium Royal Heritage Djelaba');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
      }

      function shareOnInstagram() {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showAlert('Link copied! Share it on Instagram', 'success');
        });
      }

      function shareOnWhatsApp() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('Check out this Premium Royal Heritage Djelaba!');
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
      }

      function shareOnPinterest() {
        const url = encodeURIComponent(window.location.href);
        const description = encodeURIComponent('Premium Royal Heritage Djelaba - Moroccan Traditional Fashion');
        const media = encodeURIComponent('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crepe-djellaba-with-kmiss.jpg-3sqclnMfJoAvDUXFLMGCvHsoxsSBuL.jpeg');
        window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${media}`, '_blank', 'width=600,height=400');
      }

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

      function addToCart() {
        if (selectedSizes.length === 0) {
          showAlert('Please select a size before adding to cart', 'error');
          return;
        }

        showAlert('Product added to cart successfully!', 'success');
      }

      function buyNow() {
        if (selectedSizes.length === 0) {
          showAlert('Please select a size before proceeding to checkout', 'error');
          return;
        }

        showAlert('Redirecting to WhatsApp for instant purchase...', 'success');
      }

      function openReviewPanel() {
        const backdrop = document.getElementById('review-panel-backdrop');
        const panel = document.getElementById('review-panel');

        backdrop.classList.add('show');
        panel.classList.add('show');
        document.body.style.overflow = 'hidden';
        updateFormProgress();
      }

      function closeReviewPanel() {
        const backdrop = document.getElementById('review-panel-backdrop');
        const panel = document.getElementById('review-panel');

        backdrop.classList.remove('show');
        panel.classList.remove('show');
        document.body.style.overflow = 'auto';
      }

      // Close panel when clicking on backdrop
      document.getElementById('review-panel-backdrop').addEventListener('click', function (e) {
        if (e.target === this) {
          closeReviewPanel();
        }
      });

      document.addEventListener('click', function (event) {
        const dropdown = document.getElementById('color-dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          dropdown.classList.remove('active');
        }
      });

      function viewAllReviews() {
        document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' });
      }

      window.addEventListener('beforeunload', function () {
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
      });
    // Function to move reviews section under product details on mobile
    function moveReviewsOnMobile() {
      const reviewsSection = document.querySelector('.reviews-section');
      const mainContainer = document.querySelector('.main-container');
      const rightSection = document.querySelector('.right-section');
      
      // Check if we're on mobile view
      if (window.innerWidth <= 768) {
        // Check if reviews section exists and hasn't been moved yet
        if (reviewsSection && !document.querySelector('.mobile-reviews-section')) {
          // Clone the reviews section
          const mobileReviewsSection = reviewsSection.cloneNode(true);
          mobileReviewsSection.classList.add('mobile-reviews-section');
          
          // Insert after the right section
          mainContainer.appendChild(mobileReviewsSection);
        }
      } else {
        // Remove mobile reviews section if we're not on mobile
        const mobileReviewsSection = document.querySelector('.mobile-reviews-section');
        if (mobileReviewsSection) {
          mobileReviewsSection.remove();
        }
      }
    }

    // Run on page load and window resize
    window.addEventListener('load', moveReviewsOnMobile);
    window.addEventListener('resize', moveReviewsOnMobile);

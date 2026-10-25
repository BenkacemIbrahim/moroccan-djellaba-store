// Skeleton Loading Control
    function showSkeletons() {
      document.body.classList.add('loading');
    }

    function hideSkeletons() {
      document.body.classList.remove('loading');
    }

    // Simulate loading - Remove this in production and call hideSkeletons() when your data is loaded
    setTimeout(() => {
      hideSkeletons();
    }, 2000); // Show skeleton for 2 seconds, then show actual content

    // Add click handlers for action buttons
    document.addEventListener('DOMContentLoaded', function () {
      // Cart button handlers
      document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          const icon = this.querySelector('i');

          if (icon.classList.contains('fa-shopping-cart')) {
            console.log('Add to cart clicked');
            // Add your cart functionality here
          } else if (icon.classList.contains('fa-heart')) {
            // Toggle wishlist
            const isActive = this.classList.contains('active');
            if (isActive) {
              this.classList.remove('active');
              icon.classList.remove('fas');
              icon.classList.add('far');
              console.log('Removed from wishlist');
            } else {
              this.classList.add('active');
              icon.classList.remove('far');
              icon.classList.add('fas');
              console.log('Added to wishlist');
            }
          }
        });
      });

      // Product card click handlers
      document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function () {
          const title = this.querySelector('.product-title').textContent;
          console.log('Product clicked:', title);
          // Add your product detail navigation here
        });
      });
    });

    // Public functions for controlling skeleton loading
    window.showSkeletons = showSkeletons;
    window.hideSkeletons = hideSkeletons;

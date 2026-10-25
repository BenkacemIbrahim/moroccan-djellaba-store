// ===== DOM ELEMENT REFERENCES =====
    const elements = {
      // Cart
      cartBtn: document.getElementById('cart-btn'),
      cartSidebar: document.getElementById('cart-sidebar'),
      closeCart: document.getElementById('close-cart'),

      // Wishlist
      wishlistBtn: document.getElementById('wishlist-btn'),
      wishlistSidebar: document.getElementById('wishlist-sidebar'),
      closeWishlist: document.getElementById('close-wishlist'),

      // Utility
      overlay: document.getElementById('overlay'),
      body: document.body
    };

    // ===== UTILITY FUNCTIONS =====
    function closeAllMenus() {
      elements.cartSidebar.classList.remove('active');
      elements.wishlistSidebar.classList.remove('active');
      elements.overlay.classList.remove('active');
      elements.body.classList.remove('no-scroll');
      elements.body.style.overflow = '';
    }

    function animateItems(container, selector) {
      const items = container.querySelectorAll(selector);
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.transition = 'all 0.3s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }

    // ===== MENU FUNCTIONS =====
    function openCart() {
      closeAllMenus();
      elements.cartSidebar.classList.add('active');
      elements.overlay.classList.add('active');
      elements.body.classList.add('no-scroll');
      animateItems(elements.cartSidebar, '.product-card-professional');
    }

    function openWishlist() {
      closeAllMenus();
      elements.wishlistSidebar.classList.add('active');
      elements.overlay.classList.add('active');
      elements.body.classList.add('no-scroll');
      animateItems(elements.wishlistSidebar, '.product-card-professional');
    }

    function closeCart() {
      closeAllMenus();
    }

    function closeWishlist() {
      closeAllMenus();
    }

    // ===== EVENT LISTENERS =====

    // Cart Events
    elements.cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCart();
    });

    elements.closeCart.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus();
    });

    // Wishlist Events
    elements.wishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openWishlist();
    });

    elements.closeWishlist.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus();
    });

    // Overlay Events
    elements.overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeAllMenus();
    });

    // Prevent sidebar content clicks from closing
    [elements.cartSidebar, elements.wishlistSidebar].forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // ===== STATE MANAGEMENT =====
    function updateWishlistState() {
      const wishlistItems = document.querySelectorAll('#wishlist-items .product-card-professional');
      const wishlistBadge = document.getElementById('wishlist-badge');
      const wishlistCount = document.getElementById('wishlist-count');
      const wishlistItemsContainer = document.getElementById('wishlist-items-container');
      const wishlistEmptyState = document.getElementById('wishlist-empty-state');
      const wishlistFooter = document.getElementById('wishlist-footer');

      if (wishlistItems.length === 0) {
        wishlistItemsContainer.classList.add('hidden');
        wishlistEmptyState.classList.remove('hidden');
        wishlistFooter.classList.add('hidden');
        wishlistBadge.style.display = 'none';
      } else {
        wishlistItemsContainer.classList.remove('hidden');
        wishlistEmptyState.classList.add('hidden');
        wishlistFooter.classList.remove('hidden');
        wishlistBadge.style.display = 'flex';
        wishlistBadge.textContent = wishlistItems.length;
        wishlistCount.textContent = `You have ${wishlistItems.length} item${wishlistItems.length !== 1 ? 's' : ''} in your wishlist.`;
      }
    }

    function updateCartState() {
      const cartItems = document.querySelectorAll('#cart-items .product-card-professional');
      const cartBadge = document.getElementById('cart-badge');
      const cartItemsContainer = document.getElementById('cart-items-container');
      const cartEmptyState = document.getElementById('cart-empty-state');
      const cartFooter = document.getElementById('cart-footer');

      if (cartItems.length === 0) {
        cartItemsContainer.classList.add('hidden');
        cartEmptyState.classList.remove('hidden');
        cartFooter.classList.add('hidden');
        cartBadge.style.display = 'none';
      } else {
        cartItemsContainer.classList.remove('hidden');
        cartEmptyState.classList.add('hidden');
        cartFooter.classList.remove('hidden');
        cartBadge.style.display = 'flex';
        cartBadge.textContent = cartItems.length;
      }
    }

    // ===== GLOBAL EVENT LISTENERS =====

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    });

    // Initialize states on page load
    document.addEventListener('DOMContentLoaded', function () {
      updateWishlistState();
      updateCartState();
    });

// Application State
        const AppState = {
            modal: {
                selectedColor: 'Brown',
                selectedSizes: [],
                currentImageIndex: 0,
                currentCarouselPosition: 0
            },
            alerts: {
                currentTimeout: null
            },
            viewMode: 'grid' // Track current view mode
        };

        // SKELETON LOADING CONTROL
        function showContent() {
            const skeletonLoader = document.getElementById('skeleton-loader');
            const mainContent = document.getElementById('main-content');

            // Hide skeleton
            skeletonLoader.style.display = 'none';

            // Show content with fade in
            mainContent.classList.add('loaded');
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function () {
            console.log("DOM content loaded - Starting skeleton loading");

            // Show content after 2.5 seconds (simulate loading)
            setTimeout(() => {
                showContent();
            }, 2500);
        });

        // View Toggle Functions
        const ViewToggle = {
            switchToGrid() {
                const container = document.getElementById('productsContainer');
                const gridBtn = document.getElementById('gridViewBtn');
                const listBtn = document.getElementById('listViewBtn');

                // Update classes
                container.classList.remove('list-view');
                container.classList.add('grid-view');

                // Update button states
                gridBtn.classList.add('active');
                listBtn.classList.remove('active');

                // Update app state
                AppState.viewMode = 'grid';

                // Save preference to localStorage
                localStorage.setItem('preferredViewMode', 'grid');
            },

            switchToList() {
                const container = document.getElementById('productsContainer');
                const gridBtn = document.getElementById('gridViewBtn');
                const listBtn = document.getElementById('listViewBtn');

                // Update classes
                container.classList.remove('grid-view');
                container.classList.add('list-view');

                // Update button states
                gridBtn.classList.remove('active');
                listBtn.classList.add('active');

                // Update app state
                AppState.viewMode = 'list';

                // Save preference to localStorage
                localStorage.setItem('preferredViewMode', 'list');
            },

            initializeView() {
                // Check for saved preference
                const savedPreference = localStorage.getItem('preferredViewMode');
                if (savedPreference === 'list') {
                    this.switchToList();
                } else {
                    this.switchToGrid(); // Default to grid
                }
            }
        };

        // Global function assignments for view toggle
        window.switchToGridView = () => ViewToggle.switchToGrid();
        window.switchToListView = () => ViewToggle.switchToList();

        // Utility Functions
        const Utils = {
            showAlert(message, type = 'success') {
                const alertContainer = document.getElementById('alert-container');

                // Clear existing alerts
                const existingAlert = alertContainer.querySelector('.alert-message');
                if (existingAlert) existingAlert.remove();

                if (AppState.alerts.currentTimeout) {
                    clearTimeout(AppState.alerts.currentTimeout);
                    AppState.alerts.currentTimeout = null;
                }

                // Create new alert
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert-message ${type}`;
                alertDiv.innerHTML = `
                    <div class="alert-icon">
                        <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'}"></i>
                    </div>
                    <div class="alert-text">${message}</div>
                    <button class="alert-close" onclick="Utils.closeAlert(this)">
                        <i class="fas fa-times"></i>
                    </button>
                `;

                alertContainer.appendChild(alertDiv);
                setTimeout(() => alertDiv.classList.add('show'), 100);

                // Auto remove after 4 seconds
                AppState.alerts.currentTimeout = setTimeout(() => {
                    Utils.closeAlert(alertDiv.querySelector('.alert-close'));
                }, 4000);
            },

            closeAlert(closeButton) {
                const alertDiv = closeButton.closest('.alert-message');
                if (!alertDiv) return;

                alertDiv.classList.remove('show');
                setTimeout(() => alertDiv.remove(), 400);

                if (AppState.alerts.currentTimeout) {
                    clearTimeout(AppState.alerts.currentTimeout);
                    AppState.alerts.currentTimeout = null;
                }
            },

            updatePriceSlider(slider, display) {
                if (!slider || !display) return;

                display.textContent = slider.value + ' MAD';
                const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
                slider.style.background = `linear-gradient(to right, var(--accent-gold) 0%, var(--accent-gold) ${percentage}%, var(--border-light) ${percentage}%, var(--border-light) 100%)`;
            }
        };

        // Modal Functions
        const Modal = {
            getProductImages() {
                const imageContainer = document.getElementById('modal-product-images');
                const images = imageContainer.querySelectorAll('img');
                return Array.from(images).map(img => ({
                    index: parseInt(img.getAttribute('data-index')),
                    src: img.src,
                    alt: img.alt
                })).sort((a, b) => a.index - b.index);
            },

            changeMainImage(index) {
                const mainImage = document.getElementById('modal-main-gallery');
                const thumbnails = document.querySelectorAll('#modal-thumbnails .thumbnail-item');
                const productImages = this.getProductImages();

                if (!mainImage || !productImages[index]) return;

                AppState.modal.currentImageIndex = index;
                mainImage.style.backgroundImage = `url('${productImages[index].src}')`;

                thumbnails.forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === index);
                });
            },

            nextImage(event) {
                if (event) event.stopPropagation();
                const productImages = this.getProductImages();
                const nextIndex = (AppState.modal.currentImageIndex + 1) % productImages.length;
                this.changeMainImage(nextIndex);
            },

            prevImage(event) {
                if (event) event.stopPropagation();
                const productImages = this.getProductImages();
                const prevIndex = (AppState.modal.currentImageIndex - 1 + productImages.length) % productImages.length;
                this.changeMainImage(prevIndex);
            },

            toggleSize(element, size) {
                const isSelected = element.classList.contains('active');

                if (isSelected) {
                    element.classList.remove('active');
                    AppState.modal.selectedSizes = AppState.modal.selectedSizes.filter(s => s !== size);
                } else {
                    element.classList.add('active');
                    AppState.modal.selectedSizes.push(size);
                }
            },

            toggleColorDropdown() {
                const dropdown = document.getElementById('modal-color-dropdown');
                dropdown.classList.toggle('active');
                event.stopPropagation();
            },

            selectColor(color, colorClass) {
                document.querySelectorAll('#modal-color-dropdown .color-option-item').forEach(item => {
                    item.classList.remove('selected');
                });

                const clickedItem = event.currentTarget || event.target.closest('.color-option-item');
                if (clickedItem) clickedItem.classList.add('selected');

                document.getElementById('modal-selected-color').textContent = color;
                const selectedColorCircle = document.getElementById('modal-selected-color-circle');
                selectedColorCircle.className = `color-circle ${colorClass}`;

                AppState.modal.selectedColor = color;
                document.getElementById('modal-color-dropdown').classList.remove('active');

                if (event) event.stopPropagation();
            },

            adjustQuantity(increment) {
                const quantityInput = document.getElementById('modal-quantity');
                let quantity = parseInt(quantityInput.value);

                if (increment && quantity < 99) {
                    quantityInput.value = quantity + 1;
                } else if (!increment && quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            },

            addToCart() {
                if (AppState.modal.selectedSizes.length === 0) {
                    Utils.showAlert('Please select a size before adding to cart', 'error');
                    return;
                }
                Utils.showAlert('Product added to cart successfully!', 'success');
            },

            buyNow() {
                if (AppState.modal.selectedSizes.length === 0) {
                    Utils.showAlert('Please select a size before proceeding to checkout', 'error');
                    return;
                }
                Utils.showAlert('Redirecting to WhatsApp for instant purchase...', 'success');
                setTimeout(() => console.log('Would redirect to WhatsApp now'), 1500);
            },

            shareOnFacebook() {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
            },

            shareOnInstagram() {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    Utils.showAlert('Link copied! Share it on Instagram', 'success');
                });
            },

            shareOnWhatsApp() {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Check out this Premium Royal Heritage Djelaba!');
                window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
            },

            shareOnPinterest() {
                const url = encodeURIComponent(window.location.href);
                const description = encodeURIComponent('Premium Royal Heritage Djelaba - Moroccan Traditional Fashion');
                const media = encodeURIComponent('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/crepe-djellaba-with-kmiss.jpg-3sqclnMfJoAvDUXFLMGCvHsoxsSBuL.jpeg');
                window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${media}`, '_blank', 'width=600,height=400');
            }
        };
        // Filter Functions
        const Filters = {
            toggleSection(headerElement) {
                const contentWrapper = headerElement.nextElementSibling;
                const chevronIcon = headerElement.querySelector('i');

                if (contentWrapper.classList.contains('expanded')) {
                    contentWrapper.classList.remove('expanded');
                    contentWrapper.classList.add('collapsed');
                    chevronIcon.classList.add('rotated');
                } else {
                    contentWrapper.classList.remove('collapsed');
                    contentWrapper.classList.add('expanded');
                    chevronIcon.classList.remove('rotated');
                }
            },

            clearAll() {
                document.querySelectorAll('.size-option.active').forEach(option => {
                    option.classList.remove('active');
                });

                const priceRange = document.getElementById('priceRange');
                const currentPrice = document.getElementById('currentPrice');
                const desktopPriceRange = document.getElementById('desktopPriceRange');
                const desktopCurrentPrice = document.getElementById('desktopCurrentPrice');

                if (priceRange) {
                    priceRange.value = 1000;
                    Utils.updatePriceSlider(priceRange, currentPrice);
                }
                if (desktopPriceRange) {
                    desktopPriceRange.value = 1000;
                    Utils.updatePriceSlider(desktopPriceRange, desktopCurrentPrice);
                }

                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });

                document.querySelectorAll('.search-input').forEach(input => {
                    if (input.type === 'text') input.value = '';
                });
            }
        };

        // UI Functions
        const UI = {
            openMobileFilter() {
                document.getElementById('mobileFilterSidebar').classList.add('active');
                document.getElementById('mobileFilterOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
            },

            closeMobileFilter() {
                document.getElementById('mobileFilterSidebar').classList.remove('active');
                document.getElementById('mobileFilterOverlay').classList.remove('active');
                document.body.style.overflow = '';
            },

            openQuickView() {
                document.getElementById('quickViewModal').classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset modal state
                AppState.modal.currentImageIndex = 0;
                AppState.modal.selectedSizes = [];
                AppState.modal.selectedColor = 'Brown';
                Modal.changeMainImage(0);
            },

            closeQuickView() {
                document.getElementById('quickViewModal').classList.remove('active');
                document.body.style.overflow = '';
            },

            handleMenuOption(option) {
                const dropdownMenu = document.getElementById('dropdownMenu');

                if (option === 'support') {
                    alert('Support functionality would be implemented here');
                } else if (option === 'help') {
                    alert('Help functionality would be implemented here');
                }

                if (dropdownMenu) dropdownMenu.classList.remove('show');
            },

            handleSearch(searchInput) {
                if (searchInput) {
                    const searchTerm = searchInput.value.toLowerCase();
                    console.log('Searching for:', searchTerm);
                }
            }
        };

        // Global function assignments for HTML onclick handlers
        window.modalChangeMainImage = (index) => Modal.changeMainImage(index);
        window.modalNextImage = (event) => Modal.nextImage(event);
        window.modalPrevImage = (event) => Modal.prevImage(event);
        window.modalToggleSize = (element, size) => Modal.toggleSize(element, size);
        window.modalToggleColorDropdown = () => Modal.toggleColorDropdown();
        window.modalSelectColor = (color, colorClass) => Modal.selectColor(color, colorClass);
        window.modalDecreaseQuantity = () => Modal.adjustQuantity(false);
        window.modalIncreaseQuantity = () => Modal.adjustQuantity(true);
        window.modalAddToCart = () => Modal.addToCart();
        window.modalBuyNow = () => Modal.buyNow();
        window.modalShareOnFacebook = () => Modal.shareOnFacebook();
        window.modalShareOnInstagram = () => Modal.shareOnInstagram();
        window.modalShareOnWhatsApp = () => Modal.shareOnWhatsApp();
        window.modalShareOnPinterest = () => Modal.shareOnPinterest();
        window.openModalImageZoom = () => console.log('Image zoom requested');
        window.toggleFilterSection = (headerElement) => Filters.toggleSection(headerElement);
        window.handleMenuOption = (option) => UI.handleMenuOption(option);
        window.handleSearch = (searchInput) => UI.handleSearch(searchInput);

        // Event Listeners
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize view toggle
            ViewToggle.initializeView();

            // Mobile filter functionality
            const mobileFilterToggle = document.getElementById('mobileFilterToggle');
            const mobileFilterClose = document.getElementById('mobileFilterClose');
            const mobileFilterOverlay = document.getElementById('mobileFilterOverlay');

            mobileFilterToggle?.addEventListener('click', UI.openMobileFilter);
            mobileFilterClose?.addEventListener('click', UI.closeMobileFilter);
            mobileFilterOverlay?.addEventListener('click', UI.closeMobileFilter);

            // Quick view modal functionality
            const quickViewClose = document.getElementById('quickViewClose');
            const quickViewModal = document.getElementById('quickViewModal');

            quickViewClose?.addEventListener('click', UI.closeQuickView);
            quickViewModal?.addEventListener('click', function (e) {
                if (e.target === quickViewModal) UI.closeQuickView();
            });

            // Close modal color dropdown if clicked outside
            document.addEventListener('click', function (event) {
                const dropdown = document.getElementById('modal-color-dropdown');
                if (dropdown && !dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                }
            });

            // Size selection functionality for filter
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            });

            // Price range functionality
            const priceRange = document.getElementById('priceRange');
            const currentPrice = document.getElementById('currentPrice');
            const desktopPriceRange = document.getElementById('desktopPriceRange');
            const desktopCurrentPrice = document.getElementById('desktopCurrentPrice');

            if (priceRange && currentPrice) {
                priceRange.addEventListener('input', () => Utils.updatePriceSlider(priceRange, currentPrice));
                Utils.updatePriceSlider(priceRange, currentPrice);
            }

            if (desktopPriceRange && desktopCurrentPrice) {
                desktopPriceRange.addEventListener('input', () => Utils.updatePriceSlider(desktopPriceRange, desktopCurrentPrice));
                Utils.updatePriceSlider(desktopPriceRange, desktopCurrentPrice);
            }

            // Clear filters functionality
            document.getElementById('clearFilters')?.addEventListener('click', Filters.clearAll);
            document.getElementById('desktopClearFilters')?.addEventListener('click', Filters.clearAll);

            // Product card interactions
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const icon = this.querySelector('i');

                    if (icon.classList.contains('fa-shopping-cart')) {
                        console.log('Add to cart clicked');
                    } else if (icon.classList.contains('fa-heart')) {
                        const isActive = this.classList.contains('active');
                        if (isActive) {
                            this.classList.remove('active');
                            icon.classList.remove('fas');
                            icon.classList.add('far');
                        } else {
                            this.classList.add('active');
                            icon.classList.remove('far');
                            icon.classList.add('fas');
                        }
                    } else if (icon.classList.contains('fa-eye')) {
                        UI.openQuickView();
                    }
                });
            });

            // List view button interactions
            document.querySelectorAll('.list-icon-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    const icon = this.querySelector('i');

                    if (icon.classList.contains('fa-heart')) {
                        const isActive = this.classList.contains('active');
                        if (isActive) {
                            this.classList.remove('active');
                            icon.classList.remove('fas');
                            icon.classList.add('far');
                        } else {
                            this.classList.add('active');
                            icon.classList.remove('far');
                            icon.classList.add('fas');
                        }
                    } else if (icon.classList.contains('fa-eye')) {
                        UI.openQuickView();
                    }
                });
            });

            // List add to cart button interactions
            document.querySelectorAll('.list-add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    console.log('Add to cart clicked from list view');
                });
            });

            // Three-dots menu functionality
            const menuButton = document.getElementById('menuButton');
            const dropdownMenu = document.getElementById('dropdownMenu');

            if (menuButton && dropdownMenu) {
                menuButton.addEventListener('click', function (e) {
                    e.stopPropagation();
                    dropdownMenu.classList.toggle('show');
                });

                const scrollToTopBtn = document.getElementById('scrollToTop');

                // Show/hide button based on scroll position
                window.addEventListener('scroll', function () {
                    if (window.pageYOffset > 300) {
                        scrollToTopBtn.classList.add('show');
                    } else {
                        scrollToTopBtn.classList.remove('show');
                    }
                });

                // Smooth scroll to top when button is clicked
                scrollToTopBtn.addEventListener('click', function () {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });

                document.addEventListener('click', function (e) {
                    if (!menuButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
                        dropdownMenu.classList.remove('show');
                    }
                });
            }
        });

        document.addEventListener('DOMContentLoaded', function () {
            // Handle both search inputs
            const searchInputs = document.querySelectorAll('.search-input');

            searchInputs.forEach(input => {
                const searchBtn = input.nextElementSibling;

                // Add active class when input is focused
                input.addEventListener('focus', function () {
                    searchBtn.classList.add('active');
                });

                // Remove active class when input loses focus
                input.addEventListener('blur', function () {
                    searchBtn.classList.remove('active');
                });
            });
        });

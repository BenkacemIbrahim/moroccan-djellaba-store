// ===== DOM ELEMENT REFERENCES =====
        const elements = {
            // Mobile Menu
            mobileMenuBtn: document.getElementById('mobile-menu-btn'),
            mobileMenu: document.getElementById('mobile-menu'),
            closeMobileMenu: document.getElementById('close-mobile-menu'),

            // Cart
            cartBtn: document.getElementById('cart-btn'),
            cartSidebar: document.getElementById('cart-sidebar'),
            closeCart: document.getElementById('close-cart'),

            // Wishlist
            wishlistBtn: document.getElementById('wishlist-btn'),
            wishlistSidebar: document.getElementById('wishlist-sidebar'),
            closeWishlist: document.getElementById('close-wishlist'),

            // Search
            desktopSearchBtn: document.getElementById('desktop-search-btn'),
            fullScreenSearch: document.getElementById('full-screen-search'),
            fullScreenCloseSearch: document.getElementById('full-screen-close-search'),
            fullScreenSearchInput: document.querySelector('.full-screen-search-input'),

            // Dropdowns
            currencyDropdownBtn: document.getElementById('currency-dropdown-btn'),
            currencyDropdownMenu: document.getElementById('currency-dropdown-menu'),
            selectedCurrencySpan: document.getElementById('selected-currency'),
            currencyOptions: document.querySelectorAll('.currency-option'),
            currencyChevron: document.getElementById('currency-chevron'),

            languageDropdownBtn: document.getElementById('language-dropdown-btn'),
            languageDropdownMenu: document.getElementById('language-dropdown-menu'),
            selectedLanguageSpan: document.getElementById('selected-language'),
            languageOptions: document.querySelectorAll('.language-option'),
            languageChevron: document.getElementById('language-chevron'),
            languageFlagIcon: document.getElementById('language-flag-icon'),

            authDropdownBtn: document.getElementById('auth-dropdown-btn'),
            authDropdownMenu: document.getElementById('auth-dropdown-menu'),

            // Utility
            overlay: document.getElementById('overlay'),
            body: document.body,
            header: document.querySelector('header')
        };

        // ===== UTILITY FUNCTIONS =====
        function closeAllMenus() {
            // Close all menus and sidebars
            elements.mobileMenu.classList.remove('active');
            elements.cartSidebar.classList.remove('active');
            elements.wishlistSidebar.classList.remove('active');
            elements.fullScreenSearch.classList.remove('active');
            elements.overlay.classList.remove('active');

            // Restore body scroll
            elements.body.classList.remove('no-scroll');
            elements.body.style.overflow = '';

            // Close dropdowns and reset chevrons
            closeDropdown(elements.currencyDropdownMenu, elements.currencyChevron);
            closeDropdown(elements.languageDropdownMenu, elements.languageChevron);
            closeDropdown(elements.authDropdownMenu);
        }

        function closeDropdown(menu, chevron = null) {
            menu.classList.add('opacity-0', 'scale-95', 'invisible');
            menu.classList.remove('opacity-100', 'scale-100', 'visible');
            if (chevron) {
                chevron.classList.remove('rotate-180');
            }
        }

        function openDropdown(menu, chevron = null) {
            closeAllMenus();
            menu.classList.remove('opacity-0', 'scale-95', 'invisible');
            menu.classList.add('opacity-100', 'scale-100', 'visible');
            if (chevron) {
                chevron.classList.add('rotate-180');
            }
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

        function openMobileMenu() {
            closeAllMenus();
            elements.mobileMenu.classList.add('active');
            elements.overlay.classList.add('active');
            elements.body.classList.add('no-scroll');
        }

        function openFullScreenSearch() {
            closeAllMenus();
            elements.fullScreenSearch.classList.add('active');
            elements.body.classList.add('no-scroll');
            elements.fullScreenSearchInput.focus();
        }

        function closeFullScreenSearch() {
            elements.fullScreenSearch.classList.remove('active');
            elements.body.classList.remove('no-scroll');
            elements.body.style.overflow = '';
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
        if (elements.wishlistBtn) {
            elements.wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openWishlist();
            });
        }

        elements.closeWishlist.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllMenus();
        });

        // Mobile Menu Events
        elements.mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobileMenu();
        });

        elements.closeMobileMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllMenus();
        });

        // Search Events
        elements.desktopSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openFullScreenSearch();
        });

        elements.fullScreenCloseSearch.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeFullScreenSearch();
        });

        // Dropdown Events
        elements.currencyDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (elements.currencyDropdownMenu.classList.contains('visible')) {
                closeAllMenus();
            } else {
                openDropdown(elements.currencyDropdownMenu, elements.currencyChevron);
            }
        });

        elements.languageDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (elements.languageDropdownMenu.classList.contains('visible')) {
                closeAllMenus();
            } else {
                openDropdown(elements.languageDropdownMenu, elements.languageChevron);
            }
        });

        elements.authDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (elements.authDropdownMenu.classList.contains('visible')) {
                closeAllMenus();
            } else {
                openDropdown(elements.authDropdownMenu);
            }
        });

        // Overlay Events
        elements.overlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllMenus();
        });

        // Prevent sidebar content clicks from closing
        [elements.cartSidebar, elements.wishlistSidebar, elements.mobileMenu].forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });

        // Full-screen search events
        elements.fullScreenSearch.querySelector('.full-screen-search-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });

        elements.fullScreenSearch.addEventListener('click', (e) => {
            if (e.target === elements.fullScreenSearch) {
                closeFullScreenSearch();
            }
        });

        // ===== DROPDOWN FUNCTIONALITY =====

        // Currency Selection
        elements.currencyOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                elements.selectedCurrencySpan.textContent = option.dataset.currency;

                // Update checkmarks
                elements.currencyOptions.forEach(opt => {
                    const check = opt.querySelector('.selected-check');
                    if (check) check.style.display = 'none';
                });

                const selectedCheck = option.querySelector('.selected-check');
                if (selectedCheck) selectedCheck.style.display = 'block';

                closeAllMenus();
            });
        });

        // Language Selection
        function changeLanguage(lang, flagUrl, name) {
            elements.selectedLanguageSpan.textContent = lang.toUpperCase();
            if (elements.languageFlagIcon) {
                elements.languageFlagIcon.src = flagUrl;
                elements.languageFlagIcon.alt = `${name} Flag`;
            }

            // Remove existing checkmarks
            elements.languageOptions.forEach(opt => {
                const checkIcon = opt.querySelector('.selected-check');
                if (checkIcon) {
                    checkIcon.remove();
                }
            });

            // Add checkmark to selected option
            const selectedOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
            if (selectedOption) {
                selectedOption.innerHTML += '<i class="ph ph-check ml-auto text-accent selected-check"></i>';
            }

            closeAllMenus();
            document.documentElement.lang = lang.toLowerCase();
        }

        elements.languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.dataset.lang;
                const flagUrl = option.dataset.flag;
                const name = option.querySelector('span')?.textContent || lang;
                changeLanguage(lang, flagUrl, name);
            });
        });

        // ===== QUANTITY CONTROLS =====
        document.querySelectorAll('.quantity-minus').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const quantityDisplay = event.target.nextElementSibling;
                let currentQuantity = parseInt(quantityDisplay.textContent);
                if (currentQuantity > 1) {
                    currentQuantity--;
                    quantityDisplay.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        quantityDisplay.textContent = currentQuantity;
                        quantityDisplay.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });

        document.querySelectorAll('.quantity-plus').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const quantityDisplay = event.target.previousElementSibling;
                let currentQuantity = parseInt(quantityDisplay.textContent);
                currentQuantity++;
                quantityDisplay.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    quantityDisplay.textContent = currentQuantity;
                    quantityDisplay.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // ===== SCROLL BEHAVIOR =====
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                elements.header.style.transform = 'translateY(-100%)';
            } else {
                elements.header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });

        // ===== GLOBAL EVENT LISTENERS =====

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeAllMenus();
            }
        });

        // Responsive Behavior
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                closeAllMenus();
            }
        });

        // Click Outside Dropdowns
        document.addEventListener('click', (e) => {
            // Close currency dropdown if click is outside
            if (!elements.currencyDropdownBtn.contains(e.target) && !elements.currencyDropdownMenu.contains(e.target)) {
                closeDropdown(elements.currencyDropdownMenu, elements.currencyChevron);
            }

            // Close language dropdown if click is outside
            if (!elements.languageDropdownBtn.contains(e.target) && !elements.languageDropdownMenu.contains(e.target)) {
                closeDropdown(elements.languageDropdownMenu, elements.languageChevron);
            }

            // Close auth dropdown if click is outside
            if (!elements.authDropdownBtn.contains(e.target) && !elements.authDropdownMenu.contains(e.target)) {
                closeDropdown(elements.authDropdownMenu);
            }
        });

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize language display
            const initialSelectedLangOption = document.querySelector('.language-option .selected-check')?.closest('.language-option');
            if (initialSelectedLangOption) {
                const lang = initialSelectedLangOption.dataset.lang;
                const flagUrl = initialSelectedLangOption.dataset.flag;
                const name = initialSelectedLangOption.querySelector('span')?.textContent || lang;
                elements.selectedLanguageSpan.textContent = lang.toUpperCase();
                if (elements.languageFlagIcon) {
                    elements.languageFlagIcon.src = flagUrl;
                    elements.languageFlagIcon.alt = `${name} Flag`;
                }
            }
        });

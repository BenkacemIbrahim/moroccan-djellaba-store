document.addEventListener('DOMContentLoaded', () => {
            // Initialize Lucide icons for all new icons
            lucide.createIcons();

            const allInstagramPosts = document.querySelectorAll('.instagram-post');

            allInstagramPosts.forEach(instagramPost => {
                const skeletonLoader = instagramPost.querySelector('.skeleton-loader');
                const actualContent = instagramPost.querySelector('.actual-content');
                const heartIcon = instagramPost.querySelector('.lucide-heart');
                const likesCountSpan = instagramPost.querySelector('.likes-count');
                const captionTextElement = instagramPost.querySelector('.caption-text');
                const imageCarousel = instagramPost.querySelector('.image-carousel');
                const carouselItems = Array.from(imageCarousel ? imageCarousel.querySelectorAll('.carousel-item') : []);

                // Simulate loading time for the skeleton effect
                setTimeout(() => {
                    if (skeletonLoader) skeletonLoader.classList.add('hidden');
                    if (actualContent) {
                        actualContent.classList.remove('hidden');
                        actualContent.classList.add('block');
                    }

                    // Initialize like functionality after content is visible
                    if (heartIcon && likesCountSpan) {
                        let isLiked = false;
                        let initialLikes = parseInt(heartIcon.dataset.likes || '0');

                        function formatNumber(num) {
                            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        likesCountSpan.textContent = formatNumber(initialLikes);

                        heartIcon.addEventListener('click', () => {
                            isLiked = !isLiked;

                            if (isLiked) {
                                heartIcon.classList.add('fill-red-500', 'text-red-500');
                                heartIcon.classList.remove('text-gray-700');
                                initialLikes++;
                            } else {
                                heartIcon.classList.remove('fill-red-500', 'text-red-500');
                                heartIcon.classList.add('text-gray-700');
                                initialLikes--;
                            }
                            likesCountSpan.textContent = formatNumber(initialLikes);
                        });
                    }

                    // Hashtag styling: only change color of the word after '#'
                    if (captionTextElement) {
                        let captionHtml = captionTextElement.innerHTML;
                        captionHtml = captionHtml.replace(/#(\w+)/g, '#<span class="text-blue-600 font-medium">$1</span>');
                        captionTextElement.innerHTML = captionHtml;
                    }

                    // FIXED: Image carousel functionality - touch for mobile, auto-scroll for desktop
                    if (imageCarousel && carouselItems.length > 1) {
                        const isMobile = window.matchMedia('(max-width: 1023px)').matches;

                        if (isMobile) {
                            // FIXED: Touch support for image carousel on mobile ONLY
                            let isScrolling = false;
                            let startX = 0;
                            let scrollLeft = 0;

                            imageCarousel.addEventListener('touchstart', (e) => {
                                isScrolling = true;
                                startX = e.touches[0].pageX - imageCarousel.offsetLeft;
                                scrollLeft = imageCarousel.scrollLeft;
                                // IMPORTANT: Stop propagation to prevent card scrolling
                                e.stopPropagation();
                            });

                            imageCarousel.addEventListener('touchmove', (e) => {
                                if (!isScrolling) return;
                                e.preventDefault();
                                // IMPORTANT: Stop propagation to prevent card scrolling
                                e.stopPropagation();
                                const x = e.touches[0].pageX - imageCarousel.offsetLeft;
                                const walk = (x - startX) * 1.5;
                                imageCarousel.scrollLeft = scrollLeft - walk;
                            });

                            imageCarousel.addEventListener('touchend', (e) => {
                                isScrolling = false;
                                // IMPORTANT: Stop propagation to prevent card scrolling
                                e.stopPropagation();
                            });
                        } else {
                            // Auto-scroll for large screens only
                            let autoScrollInterval;

                            const startAutoScroll = () => {
                                autoScrollInterval = setInterval(() => {
                                    const currentScrollLeft = imageCarousel.scrollLeft;
                                    const itemWidth = imageCarousel.clientWidth;
                                    const maxScrollLeft = imageCarousel.scrollWidth - imageCarousel.clientWidth;

                                    if (currentScrollLeft >= maxScrollLeft - 1) {
                                        imageCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                                    } else {
                                        imageCarousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
                                    }
                                }, 3000);
                            };

                            const stopAutoScroll = () => {
                                if (autoScrollInterval) {
                                    clearInterval(autoScrollInterval);
                                }
                            };

                            startAutoScroll();
                            imageCarousel.addEventListener('pointerdown', stopAutoScroll);
                            imageCarousel.addEventListener('pointerup', () => setTimeout(startAutoScroll, 1000));
                        }
                    }

                }, 2000); // 2 seconds loading time
            });

            // Post carousel navigation - ONLY buttons work, touch scrolling DISABLED
            const smallScreenPostCarousel = document.getElementById('small-screen-post-carousel');
            const carouselLeftBtn = document.getElementById('carousel-left-btn');
            const carouselRightBtn = document.getElementById('carousel-right-btn');

            if (smallScreenPostCarousel && carouselLeftBtn && carouselRightBtn) {
                // Button navigation for post cards
                carouselLeftBtn.addEventListener('click', () => {
                    const itemWidth = smallScreenPostCarousel.clientWidth;
                    smallScreenPostCarousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
                });

                carouselRightBtn.addEventListener('click', () => {
                    const itemWidth = smallScreenPostCarousel.clientWidth;
                    smallScreenPostCarousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
                });

                // FIXED: Completely disable touch scrolling for post cards
                smallScreenPostCarousel.addEventListener('touchstart', (e) => {
                    // Only prevent if the touch is not on an image carousel
                    if (!e.target.closest('.image-carousel')) {
                        e.preventDefault();
                    }
                });

                smallScreenPostCarousel.addEventListener('touchmove', (e) => {
                    // Only prevent if the touch is not on an image carousel
                    if (!e.target.closest('.image-carousel')) {
                        e.preventDefault();
                    }
                });

                smallScreenPostCarousel.addEventListener('touchend', (e) => {
                    // Only prevent if the touch is not on an image carousel
                    if (!e.target.closest('.image-carousel')) {
                        e.preventDefault();
                    }
                });
            }
        });

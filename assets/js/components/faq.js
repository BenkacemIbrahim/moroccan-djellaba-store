document.addEventListener('DOMContentLoaded', () => {
            const faqQuestions = document.querySelectorAll('.faq-question');
            const faqItems = document.querySelectorAll('.faq-item');

            // Lazy load/fade-in effect for FAQ items
            faqItems.forEach((item) => {
                const delay = parseInt(item.dataset.delay || '0', 10);
                setTimeout(() => {
                    item.classList.remove('faq-item-hidden');
                    item.classList.add('faq-item-visible');
                }, 1000 + delay); // 1 second base delay + staggered delay
            });

            // Accordion functionality
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const faqItem = question.closest('.faq-item');
                    const answer = faqItem.querySelector('.faq-answer');
                    const isExpanded = question.getAttribute('aria-expanded') === 'true';

                    // Close all other open FAQ items
                    document.querySelectorAll('.faq-item.open').forEach(openItem => {
                        if (openItem !== faqItem) {
                            const otherAnswer = openItem.querySelector('.faq-answer');
                            openItem.classList.remove('open');
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.classList.remove('open');
                            openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                        }
                    });

                    // Toggle the clicked FAQ item
                    if (isExpanded) {
                        // Close the accordion
                        answer.style.maxHeight = answer.scrollHeight + 'px'; // Set to current height before collapsing
                        requestAnimationFrame(() => {
                            answer.style.maxHeight = '0';
                            answer.classList.remove('open');
                        });
                        faqItem.classList.remove('open');
                        question.setAttribute('aria-expanded', 'false');
                    } else {
                        // Open the accordion
                        answer.classList.add('open');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        faqItem.classList.add('open');
                        question.setAttribute('aria-expanded', 'true');
                        // Reset max-height after transition to allow content to grow if resized
                        answer.addEventListener('transitionend', function handler() {
                            if (answer.classList.contains('open')) {
                                answer.style.maxHeight = 'none';
                            }
                            answer.removeEventListener('transitionend', handler);
                        });
                    }
                });
            });
        });

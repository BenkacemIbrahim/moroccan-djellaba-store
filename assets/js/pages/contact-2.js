// Scroll Progress Functionality
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.getElementById('scrollProgress').style.width = scrollPercent + '%';
    }

    // Contact Form Functionality
    function initContactForm() {
      const form = document.getElementById('contact-form');
      const successMessage = document.getElementById('success-message');
      const buttonText = document.getElementById('button-text');
      const buttonIcon = document.getElementById('button-icon');
      const buttonLoader = document.getElementById('button-loader');
      const submitButton = form.querySelector('button[type="submit"]');

      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Show loading state
        buttonText.textContent = 'Sending...';
        buttonIcon.classList.add('hidden');
        buttonLoader.classList.remove('hidden');
        submitButton.disabled = true;

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        successMessage.classList.add('show');

        // Reset form
        form.reset();

        // Reset button state
        buttonText.textContent = 'Send Message';
        buttonIcon.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
        submitButton.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
      });
    }

    // FAQ Toggle Functionality
    function toggleFAQ(button) {
      const faqItem = button.closest('.faq-item');
      const answer = faqItem.querySelector('.faq-answer');
      const icon = button.querySelector('i');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          const otherAnswer = item.querySelector('.faq-answer');
          const otherIcon = item.querySelector('.faq-question i');
          otherAnswer.classList.remove('show');
          otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current item
      if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        icon.style.transform = 'rotate(0deg)';
      } else {
        answer.classList.add('show');
        icon.style.transform = 'rotate(180deg)';
      }
    }

    // Scroll Event Listener
    let ticking = false;

    function updateOnScroll() {
      updateScrollProgress();
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    });

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', function () {
      initContactForm();
      updateScrollProgress();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

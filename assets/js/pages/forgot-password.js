class ForgotPasswordForm {
      constructor() {
        this.forgotPasswordForm = document.getElementById('forgot-password-form');
        this.forgotPasswordSuccess = document.getElementById('forgot-password-success');
        this.form = document.getElementById('forgotPasswordForm');
        this.emailInput = document.getElementById('email');
        this.statusMessage = document.getElementById('statusMessage');
        this.resetButton = document.getElementById('resetButton');
        this.resendButton = document.getElementById('resendButton');
        this.resetEmailDisplay = document.getElementById('reset-email-display');

        this.init();
      }

      init() {
        this.form.addEventListener('submit', (e) => this.handleClientValidation(e));
        this.resendButton.addEventListener('click', () => this.handleResend());
      }

      handleClientValidation(event) {
        const email = this.emailInput.value.trim();

        if (!email) {
          event.preventDefault();
          this.showMessage('Please enter your email address.', 'error');
          return;
        }

        if (!this.isValidEmail(email)) {
          event.preventDefault();
          this.showMessage('Please enter a valid email address.', 'error');
          return;
        }

        // Form will submit normally to PHP backend
      }

      handleResend() {
        const email = this.resetEmailDisplay.textContent;

        this.resendButton.disabled = true;
        this.resendButton.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i>Link Sent!';

        setTimeout(() => {
          this.resendButton.disabled = false;
          this.resendButton.innerHTML = '<i class="fas fa-redo" style="margin-right: 8px;"></i>Resend Reset Link';
        }, 3000);
      }

      showSuccessState(email) {
        this.resetEmailDisplay.textContent = email;
        this.forgotPasswordForm.style.display = 'none';
        this.forgotPasswordSuccess.style.display = 'block';
        this.forgotPasswordSuccess.style.animation = 'scale-in 0.3s ease-out';
      }

      showMessage(message, type) {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `message ${type}`;

        if (type === 'error') {
          setTimeout(() => {
            this.statusMessage.textContent = '';
            this.statusMessage.className = 'message';
          }, 5000);
        }
      }

      isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }

    class LanguageDropdown {
      constructor() {
        this.languageBtn = document.getElementById('languageBtn');
        this.languageMenu = document.getElementById('languageMenu');
        this.currentFlag = document.getElementById('currentFlag');
        this.currentLang = document.getElementById('currentLang');
        this.languageChevron = document.getElementById('languageChevron');
        this.languageOptions = document.querySelectorAll('.language-option');

        this.init();
      }

      init() {
        this.languageBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleDropdown();
        });

        this.languageOptions.forEach(option => {
          option.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectLanguage(option);
          });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
          this.closeDropdown();
        });
      }

      toggleDropdown() {
        const isOpen = this.languageMenu.classList.contains('show');
        if (isOpen) {
          this.closeDropdown();
        } else {
          this.openDropdown();
        }
      }

      openDropdown() {
        this.languageMenu.classList.add('show');
        this.languageChevron.style.transform = 'rotate(180deg)';
      }

      closeDropdown() {
        this.languageMenu.classList.remove('show');
        this.languageChevron.style.transform = 'rotate(0deg)';
      }

      selectLanguage(option) {
        const lang = option.dataset.lang;
        const flag = option.dataset.flag;

        // Update current selection
        this.currentLang.textContent = lang;
        this.currentFlag.src = flag;
        this.currentFlag.alt = `${lang} Flag`;

        // Update active state
        this.languageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');

        this.closeDropdown();
      }
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      new ForgotPasswordForm();
      new LanguageDropdown();
    });

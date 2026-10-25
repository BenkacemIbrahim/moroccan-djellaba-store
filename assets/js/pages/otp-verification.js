class OTPVerification {
      constructor() {
        this.otpInputs = document.querySelectorAll('.otp-input');
        this.init();
      }

      init() {
        this.setupOTPInputs();
        this.focusFirstInput();
      }

      setupOTPInputs() {
        this.otpInputs.forEach((input, index) => {
          // Handle input
          input.addEventListener('input', (e) => this.handleInput(e, index));

          // Handle keydown for backspace
          input.addEventListener('keydown', (e) => this.handleKeydown(e, index));

          // Handle paste for first input
          if (index === 0) {
            input.addEventListener('paste', (e) => this.handlePaste(e));
          }
        });
      }

      handleInput(event, index) {
        const input = event.target;

        // Allow only digits
        input.value = input.value.replace(/[^0-9]/g, '');

        // Move to next input if current is filled
        if (input.value.length === 1 && index < this.otpInputs.length - 1) {
          this.otpInputs[index + 1].focus();
        }
      }

      handleKeydown(event, index) {
        if (event.key === 'Backspace' && event.target.value.length === 0 && index > 0) {
          this.otpInputs[index - 1].focus();
        }
      }

      handlePaste(event) {
        const pasteData = event.clipboardData.getData('text').trim();

        if (pasteData.length === this.otpInputs.length && /^\d+$/.test(pasteData)) {
          event.preventDefault();

          pasteData.split('').forEach((char, i) => {
            if (this.otpInputs[i]) {
              this.otpInputs[i].value = char;
            }
          });

          this.otpInputs[this.otpInputs.length - 1].focus();
        }
      }

      focusFirstInput() {
        if (this.otpInputs.length > 0) {
          this.otpInputs[0].focus();
        }
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
      new OTPVerification();
      new LanguageDropdown();
    });

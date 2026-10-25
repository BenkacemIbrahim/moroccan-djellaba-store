document.addEventListener('DOMContentLoaded', function () {
            const container = document.getElementById('container');
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const mobileSignUpButton = document.getElementById('mobileSignUp');
            const mobileSignInButton = document.getElementById('mobileSignIn');
            const signUpContainer = document.querySelector('.sign-up-container');
            const signInContainer = document.querySelector('.sign-in-container');
            const backToHomeButton = document.querySelector('.back-to-home');
            const signinForm = document.getElementById('signinForm');
            const signupForm = document.getElementById('signupForm');
            const signupPassword = document.getElementById('signupPassword');
            const signupConfirmPassword = document.getElementById('signupConfirmPassword');
            const termsAgreementCheckbox = document.getElementById('terms-agreement');

            function resetFormFields() {
                document.querySelectorAll('.sign-in-container input, .sign-up-container input').forEach(input => {
                    input.value = '';
                });
                if (termsAgreementCheckbox) {
                    termsAgreementCheckbox.checked = false;
                }
                const newsletterCheckbox = document.getElementById('newsletter-signup');
                if (newsletterCheckbox) {
                    newsletterCheckbox.checked = false;
                }
            }

            function checkMobileView() {
                if (window.innerWidth <= 768) {
                    document.querySelectorAll('.mobile-toggle').forEach(toggle => {
                        toggle.style.display = 'block';
                    });

                    if (container.classList.contains('right-panel-active')) {
                        signInContainer.style.display = 'none';
                        signUpContainer.style.display = 'block';
                    } else {
                        signInContainer.style.display = 'block';
                        signUpContainer.style.display = 'none';
                    }

                    if (backToHomeButton) {
                        backToHomeButton.style.position = 'fixed';
                    }
                } else {
                    document.querySelectorAll('.mobile-toggle').forEach(toggle => {
                        toggle.style.display = 'none';
                    });

                    signInContainer.style.display = 'block';
                    signUpContainer.style.display = 'block';

                    if (backToHomeButton) {
                        backToHomeButton.style.position = 'absolute';
                    }
                }
            }

            checkMobileView();

            signUpButton.addEventListener('click', () => {
                container.classList.add('right-panel-active');
                checkMobileView();
                resetFormFields();
            });

            signInButton.addEventListener('click', () => {
                container.classList.remove('right-panel-active');
                checkMobileView();
                resetFormFields();
            });

            if (mobileSignUpButton) {
                mobileSignUpButton.addEventListener('click', () => {
                    container.classList.add('right-panel-active');
                    signInContainer.style.display = 'none';
                    signUpContainer.style.display = 'block';
                    resetFormFields();
                });
            }

            if (mobileSignInButton) {
                mobileSignInButton.addEventListener('click', () => {
                    container.classList.remove('right-panel-active');
                    signUpContainer.style.display = 'none';
                    signInContainer.style.display = 'block';
                    resetFormFields();
                });
            }

            window.addEventListener('resize', checkMobileView);

            signinForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const email = this.querySelector('input[name="email"]').value;
                const password = this.querySelector('input[name="password"]').value;

                if (!email || !password) {
                    alert('Please fill in all required fields.');
                    return;
                }

                console.log('Login attempt:', { email, password });
                alert('Login successful! (This is a demo)');
                // In a real application, you would send this data to your server
                // and handle the response (e.g., redirect, show error message).
            });

            signupForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const username = this.querySelector('input[name="username"]').value;
                const email = this.querySelector('input[name="email"]').value;
                const password = signupPassword.value;
                const confirmPassword = signupConfirmPassword.value;
                const agreeToTerms = termsAgreementCheckbox.checked;
                const subscribeNewsletter = document.getElementById('newsletter-signup').checked;

                if (!username || !email || !password || !confirmPassword) {
                    alert('Please fill in all required fields.');
                    return;
                }

                if (password !== confirmPassword) {
                    alert('Passwords do not match!');
                    return;
                }

                if (!agreeToTerms) {
                    alert('Please agree to the Terms of Service and Privacy Policy.');
                    return;
                }

                console.log('Signup attempt:', { username, email, password, agreeToTerms, subscribeNewsletter });
                alert('Account created successfully! (This is a demo)');
                // In a real application, you would send this data to your server
                // and handle the response (e.g., redirect, show error message).
            });

            document.querySelectorAll('.social-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log('Social login clicked');
                    alert('Social login would be implemented here');
                });
            });
        });

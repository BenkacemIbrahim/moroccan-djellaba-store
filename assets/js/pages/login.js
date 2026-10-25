tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            DEFAULT: '#0f172a',
                            light: '#1e293b',
                            dark: '#020617'
                        },
                        accent: {
                            DEFAULT: '#C8A95A',
                            light: '#d4b882',
                            dark: '#b8965a'
                        },
                        surface: {
                            DEFAULT: '#ffffff',
                            elevated: '#f8fafc',
                            hover: '#f1f5f9'
                        },
                        border: {
                            DEFAULT: '#e2e8f0',
                            light: '#f1f5f9'
                        },
                        text: {
                            primary: '#0f172a',
                            secondary: '#475569',
                            muted: '#64748b'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        playfair: ['"Playfair Display"', 'serif']
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-down': 'slideDown 0.3s ease-out',
                        'scale-in': 'scaleIn 0.2s ease-out',
                        'shimmer': 'shimmer 2s linear infinite',
                        'modal-in': 'modalIn 0.3s ease-out',
                        'slide-up': 'slideUp 0.3s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' }
                        },
                        slideDown: {
                            '0%': { transform: 'translateY(-10px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        scaleIn: {
                            '0%': { transform: 'scale(0.95)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        },
                        shimmer: {
                            '0%': { backgroundPosition: '-200% 0' },
                            '100%': { backgroundPosition: '200% 0' }
                        },
                        modalIn: {
                            '0%': { transform: 'scale(0.9)', opacity: '0' },
                            '100%': { transform: 'scale(1)', opacity: '1' }
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                    }
                }
            }
        }

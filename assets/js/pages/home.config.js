// Tailwind theme for the home page.
// Merges the themes declared by the header and new-arrivals components so a
// single config covers every section stacked on this page.
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
        searchSlideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        searchSlideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(1.5rem)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        skeleton: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'search-slide-down': 'searchSlideDown 0.3s ease-out',
        'search-slide-up': 'searchSlideUp 0.3s ease-out',
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite'
      }
    }
  }
}

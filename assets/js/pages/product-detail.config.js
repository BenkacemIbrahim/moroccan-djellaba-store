tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: '#0f172a', light: '#1e293b', dark: '#020617' },
                accent: { DEFAULT: '#C8A95A', light: '#d4b882', dark: '#b8965a' },
                surface: { DEFAULT: '#ffffff', elevated: '#f8fafc', hover: '#f1f5f9' },
                border: { DEFAULT: '#e2e8f0', light: '#f1f5f9' },
                text: { primary: '#0f172a', secondary: '#475569', muted: '#64748b' }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                playfair: ['"Playfair Display"', 'serif']
            }
        }
    }
}

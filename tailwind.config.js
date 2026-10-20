/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#140309',
          900: '#1A040B',
          800: '#310A18', // Deep burgundy requested
          700: '#4D1024',
          DEFAULT: '#310A18',
        },
        wine: {
          900: '#4A1121',
          800: '#5F162B',
          DEFAULT: '#781D36', // Romantic wine red requested
          600: '#942644',
          500: '#B03053',
        },
        blush: {
          50: '#FDF6F8',
          100: '#FAECF1',
          200: '#F4D4DF',
          DEFAULT: '#F4B9CA', // Blush pink requested
          400: '#E89EB3',
          500: '#DC7E99',
        },
        cream: {
          50: '#FFFFFD',
          100: '#FFFDF9',
          DEFAULT: '#FFF5EA', // Warm cream requested
          300: '#FCECD6',
          400: '#F7DEC0',
        },
        gold: {
          light: '#F3E4C3',
          DEFAULT: '#D6B16D', // Soft antique gold requested
          dark: '#B08C4A',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        script: ['"Caveat"', '"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'drift': 'drift 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) translateX(40px) rotate(360deg)' },
        },
      },
      boxShadow: {
        'romantic': '0 10px 40px -10px rgba(120, 29, 54, 0.35)',
        'romantic-lg': '0 20px 60px -15px rgba(49, 10, 24, 0.6)',
        'gold-glow': '0 0 25px rgba(214, 177, 109, 0.45)',
        'wine-glow': '0 0 35px rgba(120, 29, 54, 0.5)',
      },
    },
  },
  plugins: [],
}

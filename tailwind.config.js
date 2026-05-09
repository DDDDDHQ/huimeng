/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0f0f23',
        'galaxy-purple': '#1a1a3e',
        'star-gold': '#ffd700',
        'aurora-cyan': '#00d4ff',
        'dream-pink': '#ff6b9d',
        'moonlight': '#e8e8f0',
        'star-mist': '#9090a0',
      },
      fontFamily: {
        'noto-serif': ['Noto Serif SC', 'serif'],
        'noto-sans': ['Noto Sans SC', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'space-mono': ['Space Mono', 'monospace'],
      },
      animation: {
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

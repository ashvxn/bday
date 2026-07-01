/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stark: {
          dark: '#08090c',      // Sleek iron black
          darker: '#040506',    // Deep metal black
          card: '#0f1219',      // Glassmorphic tech card background
          red: '#dc2626',       // Hot-rod red
          gold: '#eab308',      // Stark gold
          cyan: '#00f0ff',      // Arc reactor blue
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-reverse': 'spin-reverse 10s linear infinite',
        'glow-cyan': 'glow-cyan 2s ease-in-out infinite alternate',
        'glow-red': 'glow-red 2s ease-in-out infinite alternate',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' }
        },
        'glow-cyan': {
          'from': { 'box-shadow': '0 0 5px rgba(0, 240, 255, 0.3), 0 0 10px rgba(0, 240, 255, 0.2)' },
          'to': { 'box-shadow': '0 0 15px rgba(0, 240, 255, 0.6), 0 0 25px rgba(0, 240, 255, 0.4)' }
        },
        'glow-red': {
          'from': { 'box-shadow': '0 0 5px rgba(220, 38, 38, 0.3), 0 0 10px rgba(220, 38, 38, 0.2)' },
          'to': { 'box-shadow': '0 0 15px rgba(220, 38, 38, 0.6), 0 0 25px rgba(220, 38, 38, 0.4)' }
        },
        'scan': {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(110%)' }
        }
      }
    },
  },
  plugins: [],
}

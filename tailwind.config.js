
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'hover-hover': {'raw': '(hover: hover)'},
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
      },
      colors: {
        gray: {
          850: '#1f2937',
          900: '#111827',
          950: '#030712', 
        },
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          450: '#10b981', 
          500: '#10b981',
          600: '#059669',
        },
        'light-bg': '#F5F5F7',
        'light-block': '#E2E8F0',
        'deep-slate': '#1A202C',
        'electric-blue': '#2563EB',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'neon-pulse': 'neonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Mascot animations SPLIT for text fix
        'mascot-move': 'mascotMove 20s linear infinite', // Faster cycle (20s total)
        'mascot-flip': 'mascotFlip 20s steps(1) infinite', 
        'leg-wiggle': 'legWiggle 0.5s ease-in-out infinite alternate',
        'marquee': 'marquee 25s linear infinite',
        'wind-flow': 'windFlow 8s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' }, 
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        neonPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5), 0 0 20px rgba(37, 99, 235, 0.3)' },
          '50%': { boxShadow: '0 0 10px rgba(37, 99, 235, 0.8), 0 0 30px rgba(37, 99, 235, 0.6)' },
        },
        // 1. Movement Only (No Scale/Flip)
        mascotMove: {
          '0%': { transform: 'translateX(100%)', opacity: '1' }, // Start just offscreen right
          '40%': { transform: 'translateX(-100vw)', opacity: '1' }, // Run all the way left (past screen)
          '40.01%': { transform: 'translateX(-100vw)', opacity: '0' }, // Hide instantly
          '99.99%': { transform: 'translateX(100%)', opacity: '0' }, // Move back hidden
          '100%': { transform: 'translateX(100%)', opacity: '1' } // Show ready for next loop
        },
        // 2. Flip Only (Applied to child SVG wrapper)
        mascotFlip: {
          '0%': { transform: 'scaleX(1)' },   // Running Left
          '40%': { transform: 'scaleX(1)' },
          '41%': { transform: 'scaleX(-1)' }, // Turn around (hidden)
          '99%': { transform: 'scaleX(-1)' },
          '100%': { transform: 'scaleX(1)' } // Reset
        },
        legWiggle: {
          '0%': { transform: 'rotate(-15deg)' },
          '100%': { transform: 'rotate(15deg)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        windFlow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
}
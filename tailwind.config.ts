import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme')

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'var(--background)',
        foreground: {
          DEFAULT: 'var(--foreground)',
          border: 'var(--foreground-border)',
          ['border-light']: 'var(--foreground-border-light)'
        },
        text: {
          heading: 'var(--text-heading)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          ['gray-light']: 'var(--text-gray-light)',
          gray: 'var(--text-gray)',
          ['gray-dark']: 'var(--text-gray-dark)'
        },
        gray: {
          primary: 'var(--gray-primary)',
          secondary: 'var(--gray-secondary)'
        },
        pink: {
          primary: 'var(--pink-primary)'
        },
        emerald: {
          light: 'var(--emerald-light)',
          primary: 'var(--emerald-primary)',
          dark: 'var(--emerald-dark)'
        },
        cyan: {
          light: 'var(--cyan-light)',
          primary: 'var(--cyan-primary)',
          dark: 'var(--cyan-dark)'
        },
        blue: {
          light: 'var(--blue-light)',
          primary: 'var(--blue-primary)',
          dark: 'var(--blue-dark)'
        },
        magenta: {
          light: 'var(--magenta-light)',
          primary: 'var(--magenta-primary)',
          dark: 'var(--magenta-dark)'
        },
        orange: {
          light: 'var(--orange-light)',
          primary: 'var(--orange-primary)',
          dark: 'var(--orange-dark)'
        },
        error: {
          DEFAULT: 'var(--error)',
          light: 'var(--error-light)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
} satisfies Config

export default config

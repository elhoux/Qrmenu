/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          600: '#16A34A',
        },
        accent: '#F59E0B',
        background: '#F7F8FA',
        surface: '#FFFFFF',
        text: {
          primary: '#101828',
          secondary: '#667085',
        },
        danger: '#EF4444',
      },
      maxWidth: {
        mobile: '430px',
      },
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

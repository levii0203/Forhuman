/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        screens:{
          xxl:'1380px',
        },
        animation: {
          flash: 'flash 1s infinite', // 1s duration, infinite loop
        },
        keyframes: {
            flash: {
                '0%, 100%': { opacity: '1' }, // Fully visible
                '50%': { opacity: '0' },      // Fully invisible
            },
        },
      },

    },
    plugins: [],
  };
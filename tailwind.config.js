/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // make sure this matches your file structure
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF',
          secondary: '#F59E0B',
          neutral: '#F3F4F6',
        },
      },
    },
    
    plugins: [],
  };

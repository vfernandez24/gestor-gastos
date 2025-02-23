/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '/index.html',
    './src/**/*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4d8350',
        secondary: '#FFC107',
        background: '#F5F5F5',
        backgroundDark: '#2a2a2a',
        text: '#212121',
        textDark: '#e0e0e0',
        textAzul: '#000032',
        textSecondary: '#757575',
        alert: '#F44336',
        exito: '#8BC34A',
        border: '#333333',
        borderDark: '#cecece',
        gris: '#ebebeb'
      },
      fontFamily: {
        "roboto": ["'Roboto'", "sans-serif"],
        "inter": ["'Inter'", "sans-serif"],
        "poppins": ["'Poppins'", "sans-serif"],
      }
    }
  },
  plugins: []
}

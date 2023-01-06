// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  content: [
    path.join(__dirname, './src/**/*.{js,ts,jsx,tsx}')
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        blueDisabledButton: '#47afff'
      }
    }

  },
  plugins: []
}

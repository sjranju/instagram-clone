// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  content: [
    path.join(__dirname, './src/**/*.{js,ts,jsx,tsx}')
  ],
  variants: {
    extend: {
      borderColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus'],
      borderStyle: ['responsive', 'hover', 'focus']
    }
  },
  theme: {
    // screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px'
    // },
    extend: {
      colors: {
        blueDisabledButton: '#47afff',
        mainPageBackground: '#FAFAFA',
        signUpColor: '#0095F6',
        inputBorder: '#DBDBDB',
        activeBorderForInput: '#A8A8A8',
        darkBlue: '#1A3B50',
        signUpComments: '#8E8E8E'
      }
    }

  },
  plugins: []
}

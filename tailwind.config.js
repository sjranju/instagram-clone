/* eslint-disable @typescript-eslint/indent */
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
        signUpComments: '#8E8E8E',
        errorMessage: '#ED4956',
        seperator: '#262626',
        hoverBackground: '#121212',
        postSeperator: '#262626',
        notfoundbg: '#464545',
        textColor: '#F5F5F5',
        bgButton: '#000000'
      }
    }

  },
  plugins: []
}

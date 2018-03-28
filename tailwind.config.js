/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '.pansophy-app',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins',
      },
      colors: {
        pansophy: {
          bg: '#242429',
          bgDark: '#18181B',
          text: '#A1A1AA',
          border: 'rgba(39, 39, 42, 1)',
          divider: 'rgba(63, 63, 70, 1)',
        },
        primary: '#0096C7',
        iconBlue: '#023E8A',
        app: {
          black: '#08090A',
          blackish: '#0C0D0F',
          blacker: '#0C0D0F',
          iconBlack: '#18181B',
          blue: '#0096C7',
          border: '#16191e',
          glass: 'rgb(17 18 20)',
          red: '#F2555A',
          green: '#10B981',
        },
        text: {
          300: '#6C757D',
          700: '#282c2f',
        },
      },
      backgroundImage: {
        radial: 'radial-gradient(circle, rgba(37,40,45,1) 0%, rgba(32,36,40,0.6433167016806722) 57%, rgba(8,9,10,0.6573223039215687) 100%)',
      },
      container: {
        center: true,
        screens: {
          '2xl': '1620px',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


// src/@chakra-ui/gatsby-plugin/theme.js
import { extendTheme } from '@chakra-ui/react'
import "@fontsource/figtree/400.css";
import "@fontsource/spline-sans-mono/400.css";

const theme = {
  fonts: {
    heading: `'Figtree', sans-serif`,
    body: `'Spline Sans Mono', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'green.900'
      }
    })
  },
  // colors: {
  //   primary: 'rebeccapurple',
  // },
}

export default extendTheme(theme)
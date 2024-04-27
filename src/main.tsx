import ReactDOM from 'react-dom/client'
import App from 'App/App'
import { createTheme, MantineProvider, rem } from '@mantine/core';

import '@mantine/core/styles.css';
import 'styles/style.scss'

const theme = createTheme({
  colors: {
    blue: [
      "#ffeae8",
      "#ffd4d0",
      "#fba6a0",
      "#f7766d",
      "#f34d41",
      "#f23325",
      "#f22516",
      "#d8180b",
      "#c11007",
      "#a90102"
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
)

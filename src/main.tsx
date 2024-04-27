import ReactDOM from 'react-dom/client'
import App from 'App/App'
import { createTheme, MantineProvider, rem } from '@mantine/core';

import '@mantine/core/styles.css';
import 'styles/style.scss'

const theme = createTheme({
  colors: {
    blue: [
      "#f3fde6",
      "#eaf8d3",
      "#d4efab",
      "#bce67e",
      "#a9de57",
      "#9cd940",
      "#95d731",
      "#80be23",
      "#71a91a",
      "#5f9209"
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
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <App />
  </MantineProvider>
)

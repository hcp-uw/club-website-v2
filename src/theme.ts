import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: '"Space Grotesk", sans-serif',
    heading: '"Space Grotesk", sans-serif',
  },
  semanticTokens: {
    colors: {
      palette: {
        darkPurple: '#422f7e',
        lightPurple: '#dcbee9',
        darkGray: '#282829',
      },
    },
  },
});

export default theme;

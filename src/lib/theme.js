import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#111',
        color: 'white',
      },
    },
  },
  colors: {
    game: {
      base: '#222',
      retroRed: '#EC183F',
      retroPurple: '#7A18EC',
    },
  },
});

export default theme;

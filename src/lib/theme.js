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
      base: '#111',
      retroRed: '#EC183F',
      retroPurple: '#7A18EC',
      retroBlue: '#0783F8',
      retroGreen: '#01FF9F',
    },
  },
});

export default theme;

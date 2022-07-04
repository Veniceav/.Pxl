import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Page from './Page'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Page />
      </Box>
    </ChakraProvider>
  );
}

export default App;

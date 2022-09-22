import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from './lib/theme';
import Page from './Page';
import LoadingPage from './components/LoadingPage';

function App() {
  const [play, setPlay] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      {play ? (
        <Box>
          <Page />
        </Box>
      ) : (
        <LoadingPage setPlay={setPlay} />
      )}
    </ChakraProvider>
  );
}

export default App;

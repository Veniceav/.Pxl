import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import GameWindow from './GameWindow';
import { Box, Flex, HStack } from '@chakra-ui/react';

const Page = () => {
  return (
    <Box
      h="100vh"
      w="100vw"
      bg="#111"
      color="whiteAlpha.800"
      fontFamily="'VT323', monospace;"
      filter="contrast(107%)"
    >
      <Banner />
      <GameWindow />
    </Box>
  );
};

export default Page;

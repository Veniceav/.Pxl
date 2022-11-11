import React, { useEffect, useState } from 'react';
import Banner from './components/Banner';
import GameWindow from './GameWindow';
import { Box, Flex, HStack } from '@chakra-ui/react';

const Page = () => {
  return (
    <Box
      h="100%"
      w="100%"
      bg="#111"
      color="whiteAlpha.800"
      fontFamily="'VT323', monospace;"
      filter="contrast(100%)"
    >
      <Banner />
      <GameWindow />
    </Box>
  );
};

export default Page;

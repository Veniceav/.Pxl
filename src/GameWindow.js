import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ActionWindow from './components/ActionWindow';
import Inventory from './components/Inventory';
import Banner from './components/Banner';

const GameWindow = () => {
  return (
    <Flex h="95%" w="100%" bg="gray" flexWrap="wrap">
      <ActionWindow />
      <Inventory />
    </Flex>
  );
};

export default GameWindow;

import React from 'react';
import Inventory from '../Inventory';
import { Flex, Box, text, VStack } from '@chakra-ui/react';
import { GameDataContext } from '../../context/GameDataContext';

const MobileView = () => {
  const [params, setParam, setParams] = useContext(GameDataContext);
  return <VStack></VStack>;
};

export default MobileView;
